from app import courts_ns, db
from flask import request, jsonify
from flask_restx import Resource
from app.fields.courtsFields import court_data
from app.models.cf_models import Courts
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity, get_jwt
from datetime import datetime

@courts_ns.route("/register")
class RegisterCourt(Resource):
    @courts_ns.doc('register a court')
    @courts_ns.expect(court_data)
    def post(self):
        try:
            # 1. VERIFY JWT
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            claims = get_jwt()
            role = claims.get("role")

            if role not in ["court_owner", "admin"]:
                return {"message": "Only court owners or admin can create a court."}, 403

            # 2. GET DATA
            data = request.get_json() or {}

            name = data.get("name", "").strip().lower()
            location = data.get("location", "").strip().lower()
            hourly_rate = data.get("hourly_rate")
            maintenance = data.get("maintenance", False)
            type_ = data.get("type", "").strip().lower()
            description = data.get("description", "").strip()

            # IMAGE URL
            image_url = data.get("image_url")
            if image_url:
                image_url = image_url.strip().lower()
            else:
                image_url = "https://example.com/default-court.jpg"

            # 3. PARSE TIME
            def parse_time(value):
                try:
                    return datetime.strptime(value, "%H:%M").time()
                except:
                    return None

            opening_time = parse_time(data.get("opening_time"))
            closing_time = parse_time(data.get("closing_time"))

            if not opening_time or not closing_time:
                return {"message": "Invalid time format. Use HH:MM"}, 400

            # 4. CREATE COURT OBJECT
            new_court = Courts(
                name=name,
                location=location,
                hourly_rate=hourly_rate,
                maintenance=maintenance,
                status="pending",
                type=type_,
                owner_id=user_id,
                opening_time=opening_time,
                closing_time=closing_time,
                description=description,
                image_url=image_url
            )

            db.session.add(new_court)
            db.session.commit()

            return {"message": "Court created successfully and is pending approval."}, 201

        except Exception as e:
            db.session.rollback()
            print("REGISTER COURT ERROR:", str(e))
            return {"error": "Something went wrong.", "details": str(e)}, 500


# -------------------------------
# GET ALL COURTS
# -------------------------------
@courts_ns.route("/all")
class AllCourts(Resource):
    @courts_ns.doc("get all courts")
    def get(self):
        try:
            courts = Courts.query.all()
            result = []
            for c in courts:
                result.append({
                    "id": c.id,
                    "name": c.name,
                    "location": c.location,
                    "hourly_rate": float(c.hourly_rate),
                    "maintenance": c.maintenance,
                    "status": c.status,
                    "type": c.type,
                    "owner_id": c.owner_id,
                    "opening_time": c.opening_time.strftime("%H:%M"),
                    "closing_time": c.closing_time.strftime("%H:%M"),
                    "description": c.description,
                    "image_url": c.image_url
                })
            return {"courts": result}, 200
        except Exception as e:
            return {"error": "Something went wrong.", "details": str(e)}, 500



@courts_ns.route("/byuser")
class CourtsByUser(Resource):
    @courts_ns.doc("get courts by current user")
    def get(self):
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            courts = Courts.query.filter_by(owner_id=user_id).all()

            result = []
            for c in courts:
                result.append({
                    "id": c.id,
                    "name": c.name,
                    "location": c.location,
                    "hourly_rate": float(c.hourly_rate),
                    "maintenance": c.maintenance,
                    "status": c.status,
                    "type": c.type,
                    "opening_time": c.opening_time.strftime("%H:%M"),
                    "closing_time": c.closing_time.strftime("%H:%M"),
                    "description": c.description,
                    "image_url": c.image_url
                })

            return {"courts": result}, 200
        except Exception as e:
            return {"error": "Something went wrong.", "details": str(e)}, 500

# -------------------------------
# GET SPECIFIC COURT BY ID
# -------------------------------
@courts_ns.route("/<int:court_id>")
class CourtByID(Resource):
    @courts_ns.doc("get court by ID")
    def get(self, court_id):
        try:
            court = Courts.query.get(court_id)
            if not court:
                return {"message": f"No court found with ID {court_id}"}, 404

            result = {
                "id": court.id,
                "name": court.name,
                "location": court.location,
                "hourly_rate": float(court.hourly_rate),
                "maintenance": court.maintenance,
                "status": court.status,
                "type": court.type,
                "owner_id": court.owner_id,
                "opening_time": court.opening_time.strftime("%H:%M"),
                "closing_time": court.closing_time.strftime("%H:%M"),
                "description": court.description,
                "image_url": court.image_url
            }

            return {"court": result}, 200

        except Exception as e:
            return {"error": "Something went wrong.", "details": str(e)}, 500
        


@courts_ns.route("/<int:court_id>")
class UpdateCourt(Resource):
    @courts_ns.doc("update court by ID")
    def put(self, court_id):
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            role = get_jwt().get("role")

            court = Courts.query.get(court_id)
            if not court:
                return {"message": f"No court found with ID {court_id}"}, 404

            # Only owner or admin can update
            if role != "admin" and court.owner_id != int(user_id):
                return {"message": "You are not allowed to update this court."}, 403

            data = request.get_json() or {}

            # Update fields if present
            if "name" in data:
                court.name = data["name"].strip().lower()
            if "location" in data:
                court.location = data["location"].strip().lower()
            if "hourly_rate" in data:
                court.hourly_rate = data["hourly_rate"]
            if "maintenance" in data:
                court.maintenance = data["maintenance"]
            if "type" in data:
                court.type = data["type"].strip().lower()
            if "description" in data:
                court.description = data["description"].strip()
            if "image_url" in data:
                court.image_url = data["image_url"].strip()
            if "status" in data and role == "admin":
                court.status = data["status"].strip().lower()  # only admin can change status
            if "opening_time" in data:
                court.opening_time = datetime.strptime(data["opening_time"], "%H:%M").time()
            if "closing_time" in data:
                court.closing_time = datetime.strptime(data["closing_time"], "%H:%M").time()

            db.session.commit()

            return {"message": f"Court ID {court_id} updated successfully."}, 200

        except Exception as e:
            db.session.rollback()
            return {"error": "Something went wrong.", "details": str(e)}, 500

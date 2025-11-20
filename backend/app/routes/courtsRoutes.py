from app import courts_ns, db
from flask import request, jsonify
from flask_restx import Resource
from app.fields.courtsFields import court_data
from app.models.cf_models import Courts
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity, get_jwt, jwt_required
from decimal import Decimal
from datetime import datetime, time


def parse_time(value):
    """
    Convert frontend time string to a time object (hours and minutes only).
    Accepts 'HH:MM' or 'HH:MM:SS' and ignores seconds.
    Returns None if invalid format.
    """
    if not value:
        return None
    value = value.strip()
    try:
      
        return datetime.strptime(value, "%H:%M").time()
    except ValueError:
        try:
           
            t = datetime.strptime(value, "%H:%M:%S").time()
            return time(t.hour, t.minute)
        except ValueError:
            return None

# -------------------------------
# MODEL METHOD TO CONVERT TO DICT
# -------------------------------
def court_to_dict(court):
    def format_time(t):
        if isinstance(t, time):
            return t.strftime("%H:%M")  # only hours and minutes
        return t

    return {
        "id": court.id,
        "name": court.name,
        "location": court.location,
        "hourly_rate": float(court.hourly_rate) if isinstance(court.hourly_rate, Decimal) else court.hourly_rate,
        "maintenance": float(court.maintenance) if isinstance(court.maintenance, Decimal) else court.maintenance,
        "status": court.status,
        "type": court.type,
        "opening_time": format_time(court.opening_time),
        "closing_time": format_time(court.closing_time),
        "description": court.description,
        "image_url": court.image_url,
        "owner_id": court.owner_id
    }

# -------------------------------
# REGISTER COURT
# -------------------------------
@courts_ns.route("/register")
class RegisterCourt(Resource):
    @courts_ns.doc('register a court')
    @courts_ns.expect(court_data)
    def post(self):
        try:
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            role = get_jwt().get("role")

            if role not in ["court_owner", "admin"]:
                return {"message": "Only court owners or admin can create a court."}, 403

            data = request.get_json() or {}
            name = data.get("name", "").strip().lower()
            location = data.get("location", "").strip().lower()
            hourly_rate = data.get("hourly_rate")
            maintenance = data.get("maintenance", False)
            type_ = data.get("type", "").strip().lower()
            description = data.get("description", "").strip()
            image_url = data.get("image_url", "https://example.com/default-court.jpg").strip().lower()

            opening_time = parse_time(data.get("opening_time"))
            closing_time = parse_time(data.get("closing_time"))

            if not opening_time or not closing_time:
                return {"message": "Invalid time format. Use HH:MM or HH:MM:SS"}, 400

            # ✅ Check if court name already exists
            existing_court = Courts.query.filter_by(name=name).first()
            if existing_court:
                return {"message": "Court name already taken."}, 409

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
            return {"error": "Something went wrong.", "details": str(e)}, 500


# -------------------------------
# GET ALL COURTS
# -------------------------------
@courts_ns.route("/all/approved")
class AllCourts(Resource):
    @courts_ns.doc("get all approved courts")
    def get(self):
        try:
            # Fetch only courts where status is "approved"
            courts = Courts.query.filter_by(status="approved").all()
            
            result = [court_to_dict(c) for c in courts]
            return {"courts": result}, 200
        except Exception as e:
            return {"error": "Something went wrong.", "details": str(e)}, 500
        

@courts_ns.route("/all")
class AllCourts(Resource):
    @courts_ns.doc("get all courts")
    def get(self):
        try:
           
            courts = Courts.query.all()
            
            result = [court_to_dict(c) for c in courts]
            return {"courts": result}, 200
        except Exception as e:
            return {"error": "Something went wrong.", "details": str(e)}, 500


# -------------------------------
# GET COURTS BY USER
# -------------------------------
@courts_ns.route("/byuser")
class CourtsByUser(Resource):
    @jwt_required()
    def get(self):
        try:
            user_id = int(get_jwt_identity())
            user_courts = Courts.query.filter_by(owner_id=user_id).all()
            return {"courts": [court_to_dict(court) for court in user_courts]}, 200
        except Exception as e:
            return {"error": "Something went wrong.", "details": str(e)}, 500

# -------------------------------
# GET / UPDATE / DELETE COURT BY ID
# -------------------------------
@courts_ns.route("/<int:court_id>")
class CourtResource(Resource):
    @courts_ns.doc("get court by ID")
    def get(self, court_id):
        try:
            court = Courts.query.get(court_id)
            if not court:
                return {"message": f"No court found with ID {court_id}"}, 404
            return {"court": court_to_dict(court)}, 200
        except Exception as e:
            return {"error": "Something went wrong.", "details": str(e)}, 500

    @courts_ns.doc("update court by ID")
    @jwt_required()
    def put(self, court_id):
        try:
            user_id = get_jwt_identity()
            role = get_jwt().get("role")

            court = Courts.query.get(court_id)
            if not court:
                return {"message": f"No court found with ID {court_id}"}, 404

            if role != "admin" and court.owner_id != int(user_id):
                return {"message": "You are not allowed to update this court."}, 403

            data = request.get_json() or {}
            for field in ["name", "location", "hourly_rate", "maintenance", "type", "description", "image_url"]:
                if field in data:
                    setattr(court, field, str(data[field]).strip().lower() if isinstance(data[field], str) else data[field])

            if "status" in data and role == "admin":
                court.status = data["status"].strip().lower()

            if "opening_time" in data:
                parsed = parse_time(data["opening_time"])
                if parsed:
                    court.opening_time = parsed
            if "closing_time" in data:
                parsed = parse_time(data["closing_time"])
                if parsed:
                    court.closing_time = parsed

            db.session.commit()
            return {"message": f"Court ID {court_id} updated successfully."}, 200

        except Exception as e:
            db.session.rollback()
            return {"error": "Something went wrong.", "details": str(e)}, 500

    @courts_ns.doc("delete court by ID")
    @jwt_required()
    def delete(self, court_id):
        try:
            user_id = get_jwt_identity()
            role = get_jwt().get("role")

            court = Courts.query.get(court_id)
            if not court:
                return {"message": f"No court found with ID {court_id}"}, 404

            if role != "admin" and court.owner_id != int(user_id):
                return {"message": "You are not allowed to delete this court."}, 403

            db.session.delete(court)
            db.session.commit()
            return {"message": f"Court ID {court_id} has been deleted successfully."}, 200

        except Exception as e:
            db.session.rollback()
            return {"error": "Something went wrong.", "details": str(e)}, 500

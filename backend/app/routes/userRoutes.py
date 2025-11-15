from app import users_ns, db, bcrypt
from flask import request
from flask_restx import Resource
from app.fields.usersFields import users_data
from app.models.cf_models import Users
from app.helpers.security_helper import generate_jwt, jwt_required
from flask import make_response,jsonify,Response,json
@users_ns.route("/login")
class LoginUser(Resource):
    @users_ns.doc('login a user')
    @users_ns.expect(users_data)
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = Users.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password_hash, password):
            token = generate_jwt(user.id, user.username, user.role)

            # Prepare JSON data manually
            data = {
                "status": "success",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "role": user.role
                }
            }

            # Create Response object manually
            response = Response(
                response=json.dumps(data),
                status=200,
                mimetype='application/json'
            )

            # Set HTTP-only cookie
            response.set_cookie(
                "access_token",
                token,
                httponly=True,
                secure=False,
                samesite="Lax",
                max_age=24*3600
            )

            return response
        
        else:
            return {"status": "error", "message": "Invalid credentials"}, 401

@users_ns.route('/logout')
class UserLogout(Resource):
    @users_ns.doc('logout a user')
    @jwt_required
    def post(self):
        # Create a response manually
        response = Response(
            response=json.dumps({"status": "success", "message": "Logged out successfully"}),
            status=200,
            mimetype='application/json'
        )

        # Clear the cookie by setting max_age=0
        response.set_cookie(
            "access_token",
            "",
            httponly=True,
            secure=False,  # production me True karo
            samesite="Lax",
            max_age=0
        )

        return response



@users_ns.route('/register')
class RegisterUser(Resource):
    @users_ns.doc('register a new user')
    @users_ns.expect(users_data)
    def post(self):
        try:
            data = request.get_json()

            if not data.get("username"):
                return {"status": "error", "message": "Username is required"}, 400
            if not data.get("email"):
                return {"status": "error", "message": "Email is required"}, 400
            if not data.get("password"):
                return {"status": "error", "message": "Password is required"}, 400

            role = data.get("role")
            if role not in ["user", "admin", "court_owner"]:
                return {"status": "error", "message": "Invalid role specified"}, 400

            existing_user = Users.query.filter_by(email=data["email"]).first()
            if existing_user:
                return {"status": "error", "message": "Email already registered"}, 400

            hashed_password = bcrypt.generate_password_hash(
                data["password"]).decode('utf-8')

            new_user = Users(
                username=data["username"],
                email=data["email"],
                password_hash=hashed_password,
                role=role
            )

            db.session.add(new_user)
            db.session.commit()

            return {
                "status": "success",
                "message": "User registered successfully",
                "user": {
                    "id": new_user.id,
                    "username": new_user.username,
                    "email": new_user.email,
                    "role": new_user.role
                }
            }, 201

        except Exception as e:
            return {"status": "error", "message": str(e)}, 500





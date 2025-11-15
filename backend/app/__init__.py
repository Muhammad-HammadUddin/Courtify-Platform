from flask import Flask, jsonify
from flask_restx import Api, Namespace
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta
from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)

# Flask object renamed to flask_app
flask_app = Flask(__name__)
flask_app.config.from_object(Config)

# Extensions
db = SQLAlchemy(flask_app)
bcrypt = Bcrypt(flask_app)
migrate = Migrate(flask_app, db)
jwt = JWTManager(flask_app)


# Swagger
authorizations = {"bearer": {"type": "apiKey", "in": "header", "name": "Authorization"}}
api = Api(flask_app, version="1.0", title="Courtify API", authorizations=authorizations, security="bearer")
from flask_cors import CORS

CORS(
    flask_app,
    supports_credentials=True,             # Allow cookies
    origins=["http://localhost:5173"],     # Frontend URL
    allow_headers=["Content-Type", "Authorization"],
)
# Test route
@flask_app.route("/test")
def test():
    return {"message": "Flask merged app is running!"}

# Namespace
users_ns = Namespace("Users", description="User related operations")
api.add_namespace(users_ns, path="/users")

# Import routes and models
import app.routes.userRoutes
import app.models.cf_models

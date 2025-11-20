# app/routes/matchmaking_routes.py
from app import db, matches_ns
from flask import request
from flask_restx import Resource
from app.fields.matchMakingFields import matchmaking_data
from app.models.cf_models import Matchmaking
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

# ------------------------------------
# Create a match
# ------------------------------------
@matches_ns.route("/create")
class MatchmakingList(Resource):
    @jwt_required()
    @matches_ns.expect(matchmaking_data)
    def post(self):
        """Create a new matchmaking entry"""
        user_id = get_jwt_identity()
        data = request.get_json()

        try:
            new_match = Matchmaking(
    user_id=user_id,
    sport=data.get("sport"),
    location=data.get("location"),
    date_time=datetime.fromisoformat(data.get("dateTime")),   # note the key 'dateTime'
    contact_number=data.get("whatsappNumber"),               # key mapping
    match_details=data.get("message")                        # key mapping
)
            
            db.session.add(new_match)
            db.session.commit()
            return {"message": "Match created successfully", "match_id": new_match.id}, 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400

# ------------------------------------
# Fetch matches by current user
# ------------------------------------
@matches_ns.route("/byuser")
class MatchmakingByUser(Resource):
    @jwt_required()
    def get(self):
        """Fetch all matchmaking entries for logged-in user"""
        user_id = get_jwt_identity()
        matches = Matchmaking.query.filter_by(user_id=user_id).all()

        result = [
            {
                "id": match.id,
                "sport": match.sport,
                "location": match.location,
                "date_time": match.date_time.isoformat(),
                "contact_number": match.contact_number,
                "match_details": match.match_details,
                "created_at": match.created_at.isoformat(),
                "user_id": match.user_id,
            }
            for match in matches
        ]
        return {"matches": result}, 200

# ------------------------------------
# Fetch all matches (admin/public)
# ------------------------------------
@matches_ns.route("/all")
class MatchmakingAll(Resource):
    @jwt_required()
    def get(self):
        """Fetch all matchmaking entries"""
        matches = Matchmaking.query.all()
        result = [
            {
                "id": match.id,
                "sport": match.sport,
                "location": match.location,
                "date_time": match.date_time.isoformat(),
                "contact_number": match.contact_number,
                "match_details": match.match_details,
                "created_at": match.created_at.isoformat(),
                "user_id": match.user_id,
            }
            for match in matches
        ]
        return {"matches": result}, 200

# ------------------------------------
# Delete a match by ID (only owner)
# ------------------------------------
@matches_ns.route("/<int:id>")
class MatchmakingDelete(Resource):
    @jwt_required()
    def delete(self, id):
        """Delete a matchmaking entry by ID (only owner can delete)"""
        user_id = get_jwt_identity()
        match = Matchmaking.query.filter_by(id=id, user_id=user_id).first()
        if not match:
            return {"error": "Match not found or you are not authorized"}, 404

        try:
            db.session.delete(match)
            db.session.commit()
            return {"message": "Match deleted successfully"}, 200
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400

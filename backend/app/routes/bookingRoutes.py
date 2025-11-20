from flask import request
from flask_restx import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from sqlalchemy.exc import IntegrityError
from app import bookings_ns, db
from app.models.cf_models import Bookings, Courts  # Make sure your models are correct

# -------------------------------
# Helper function to serialize booking with court details
# -------------------------------
def booking_to_dict(booking, court=None):
    result = {
        "id": booking.id,
        "user_id": booking.user_id,
        "court_id": booking.court_id,
        "booking_date": booking.booking_date.isoformat(),
        "start_time": booking.start_time.strftime("%H:%M"),
        "end_time": booking.end_time.strftime("%H:%M"),
        "booking_status": booking.booking_status,
        "advance_payment": float(booking.advance_payment),
        "total_amount": float(booking.total_amount),
        "remaining_cash": float(booking.remaining_cash),
        "cancellation_reason": booking.cancellation_reason,
        "created_at": booking.created_at.isoformat(),
    }
    if court:
        result["court"] = {
            "id": court.id,
            "name": court.name,
            "location": court.location,
            "hourly_rate": float(court.hourly_rate),
            "maintenance": float(court.maintenance) if court.maintenance else 0,
            "status": court.status,
            "type": court.type,
            "opening_time": court.opening_time.strftime("%H:%M"),
            "closing_time": court.closing_time.strftime("%H:%M"),
            "description": court.description,
            "image_url": court.image_url,
        }
    return result

# -------------------------------
# Create a new booking
# -------------------------------
@bookings_ns.route("/create")
class CreateBooking(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        data = request.json

        try:
            # Parse date/time
            booking_date = datetime.strptime(data["booking_date"], "%Y-%m-%d").date()
            start_time = datetime.strptime(data["start_time"], "%H:%M").time()
            end_time = datetime.strptime(data["end_time"], "%H:%M").time()

            # Fetch court to get hourly rate
            court = Courts.query.get_or_404(data["court_id"])
            total_amount = float(court.hourly_rate)  # Use court hourly rate
            advance_payment = 0.00
            remaining_cash = total_amount - advance_payment

            booking = Bookings(
                user_id=user_id,
                court_id=court.id,
                booking_date=booking_date,
                start_time=start_time,
                end_time=end_time,
                total_amount=total_amount,
                advance_payment=advance_payment,
                remaining_cash=remaining_cash,
                booking_status="pending"
            )

            db.session.add(booking)
            db.session.commit()

            return {"message": "Booking created successfully", "booking": booking_to_dict(booking)}, 201

        except IntegrityError:
            db.session.rollback()
            return {"error": "Court is already booked for this slot"}, 409
        except KeyError as e:
            return {"error": f"Missing field {str(e)}"}, 400
        except ValueError as e:
            return {"error": "Invalid date/time format", "details": str(e)}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to create booking", "details": str(e)}, 500


# -------------------------------
# Get all bookings for current user (with court info)
# -------------------------------
@bookings_ns.route("/mybookings")
class MyBookings(Resource):
    @jwt_required()
    def get(self):
        user_id = int(get_jwt_identity())

        # Fetch bookings with related court
        bookings = (
            db.session.query(Bookings, Courts)
            .join(Courts, Bookings.court_id == Courts.id)
            .filter(Bookings.user_id == user_id)
            .all()
        )

        result = [booking_to_dict(b, c) for b, c in bookings]
        return {"bookings": result}, 200

# -------------------------------
# Get booking by id
# -------------------------------
@bookings_ns.route("/<int:booking_id>")
class BookingById(Resource):
    @jwt_required()
    def get(self, booking_id):
        booking = Bookings.query.get_or_404(booking_id)
        court = Courts.query.get(booking.court_id)
        return {"booking": booking_to_dict(booking, court)}, 200

# -------------------------------
# Cancel booking with reason
# -------------------------------
@bookings_ns.route("/cancel/<int:booking_id>")
class CancelBooking(Resource):
    @jwt_required()
    def put(self, booking_id):
        booking = Bookings.query.get_or_404(booking_id)
        data = request.json or {}

        try:
            booking.booking_status = "cancelled"
            booking.cancellation_reason = data.get("cancellation_reason", "")
            db.session.commit()
            court = Courts.query.get(booking.court_id)
            return {"message": "Booking cancelled", "booking": booking_to_dict(booking, court)}, 200
        except Exception as e:
            db.session.rollback()
            return {"error": "Failed to cancel booking", "details": str(e)}, 500

# -------------------------------
# Get all bookings for a specific court
# -------------------------------
@bookings_ns.route("/bycourt/<int:court_id>")
class BookingsByCourt(Resource):
    @jwt_required()
    def get(self, court_id):
        try:
            bookings = Bookings.query.filter_by(court_id=court_id).all()
            result = []
            for b in bookings:
                court = Courts.query.get(b.court_id)
                result.append(booking_to_dict(b, court))
            return {"bookings": result}, 200
        except Exception as e:
            return {"error": "Failed to fetch bookings for this court", "details": str(e)}, 500

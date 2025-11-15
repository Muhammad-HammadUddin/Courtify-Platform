from app import app, db
from app.models.cf_models import *   # ✔ make sure models are imported

with app.app_context():
    print("⛔ Dropping all tables...")
    db.drop_all()

    print("🆕 Creating all tables...")
    db.create_all()

    print("✅ Database reset done!")

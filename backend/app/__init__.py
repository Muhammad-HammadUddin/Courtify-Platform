from flask import Flask
from .config import Config
from .extensions import db, migrate, jwt, mail, cors

def create_app():
    app = Flask(__name__, static_folder=None)
    app.config.from_object(Config)

    # init extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    mail.init_app(app)
    cors.init_app(app, resources={r"/api/*": {"origins": "*"}})

    # register blueprints
    from .auth import auth_bp
    from .bookings import bookings_bp
    from .notifications import notifications_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(bookings_bp, url_prefix="/api/bookings")
    app.register_blueprint(notifications_bp, url_prefix="/api/notifications")

    return app

from flask import Flask
from app.config.db_config import init_app, db
from app.routes.auth_routes import auth_route

def create_app():
    app = Flask(__name__)

    # Initialize the app with the database config
    init_app(app)

    # Register blueprints
    app.register_blueprint(auth_route)

    # Create database tables
    with app.app_context():
        try:
            db.create_all()
            print("✅ Database ok!")
        except Exception as e:
            print(f"❌ Database failed: {e}")

    return app
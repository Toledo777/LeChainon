from flask import Flask

def create_app():
    app = Flask(__name__)

    from user_auth.routes import user_auth_bp
    from residents.routes import residents_bp
    from caregivers.routes import caregivers_bp
    from event_calendar.routes import calendar_bp

    app.register_blueprint(user_auth_bp)
    app.register_blueprint(residents_bp)
    app.register_blueprint(caregivers_bp)
    app.register_blueprint(calendar_bp)

    return app

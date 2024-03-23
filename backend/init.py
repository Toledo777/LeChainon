from flask import Flask

def create_app():
    app = Flask(__name__)

    from user_auth.routes import user_auth_bp
    from residents.routes import residents_bp
    from caregivers.routes import caregivers_bp
    from event_calendar.routes import calendar_bp
    from intervention.routes import intervention_bp
    from info_statistics.routes import statistics_bp
    from goals.routes import goals_bp
    from resources.routes import resources_bp

    from housing.routes import housing_bp
    from top_tiles.routes import top_tiles_bp
    from housing_placements.routes import housing_placements_bp

    from manager.routes import manager_bp
    from audit_trail.routes import audit_trail_bp

    app.register_blueprint(user_auth_bp)
    app.register_blueprint(residents_bp)
    app.register_blueprint(caregivers_bp)
    app.register_blueprint(calendar_bp)
    app.register_blueprint(intervention_bp)
    app.register_blueprint(statistics_bp)
    app.register_blueprint(goals_bp)

    app.register_blueprint(housing_bp)
    app.register_blueprint(top_tiles_bp)
    app.register_blueprint(housing_placements_bp)

    app.register_blueprint(manager_bp)
    app.register_blueprint(audit_trail_bp)
    app.register_blueprint(resources_bp)

    return app

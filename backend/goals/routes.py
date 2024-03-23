from flask import *
from firebase.config import db

goals_bp = Blueprint("goals", __name__, url_prefix="/goals")


@goals_bp.route("/create", methods=["POST"])
def create_goals():
    data = {
        "description": request.form.get("description"),
        "goal_title": request.form.get("goal_title"),
        "health_aspects": request.form.get("health_aspects"),
        "means": request.form.get("means"),
        "status": request.form.get("status"),
        "term": request.form.get("term"),
        "uid": request.form.get("uid"),
    }

    db.collection("goals").add(data)
    return jsonify({"message": "Success!"}), 200

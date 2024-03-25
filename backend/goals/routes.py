from flask import *
from firebase.config import db

goals_bp = Blueprint("goals", __name__, url_prefix="/goals")


@goals_bp.route("/create", methods=["POST"])
def create_goals():
    data = {
        "description": request.json.get("description"),
        "goal_title": request.json.get("goal_title"),
        "health_aspects": request.json.get("health_aspects"),
        "means": request.json.get("means"),
        "status": request.json.get("status"),
        "term": request.json.get("term"),
        "uid": request.json.get("uid"),
    }

    db.collection("goals").add(data)
    return jsonify({"message": "Success!"}), 200

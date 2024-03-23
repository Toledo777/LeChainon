from flask import *
from datetime import datetime
from firebase.config import db

statistics_bp = Blueprint("statistics", __name__, url_prefix="/stats")


@statistics_bp.route("/resident-personal", methods=["POST"])
def create_reminder():

    document = {}

    d = (
        db.collection("follow_ups")
        .where("uid", "==", request.form.get("uid")).stream()
        
    )

    t = []

    for a in d:
        t.append(a.to_dict())

    document["follow_ups"] = t

    document["no_follow_ups"] = len(document["follow_ups"])

    document["no_of_days_in_housing"] = int(
        str(
            datetime.now().date()
            - (
                db.collection("residents")
                .where("uid", "==", request.form.get("uid"))
                .get()[0]
                .to_dict()["stay_start_date"]
            ).date()
        ).split(" ")[0]
    )

    d = db.collection("goals").where("uid", "==", request.form.get("uid")).stream()

    t = []

    for a in d:
        t.append(a.to_dict())

    document["goals"] = t

    document["no_of_goals_completed"] = 0
    document["no_of_goals_in_progress"] = 0
    document["no_of_goals_paused"] = 0
    document["no_of_goals_future"] = 0

    for g in document["goals"]:
        if g["status"] == "completed":
            document["no_of_goals_completed"] += 1
        if g["status"] == "paused":
            document["no_of_goals_paused"] += 1
        if g["status"] == "in_progress":
            document["no_of_goals_in_progress"] += 1
        if g["status"] == "future":
            document["no_of_goals_future"] += 1

    return jsonify({"message": "Success!", "stats": document}), 200

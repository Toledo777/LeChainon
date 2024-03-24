from flask import *
from datetime import datetime
from firebase.config import db

statistics_bp = Blueprint("statistics", __name__, url_prefix="/stats")


@statistics_bp.route("/resident-personal", methods=["POST"])
def get_resident_personal_stats():

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


@statistics_bp.route("/global", methods=["GET"])
def get_global_stats():
    docs = db.collection("residents").get()

    document = {}

    temp = []
    for d in docs:
        temp.append(d.to_dict())

    document["residents"] = temp
    document["no_of_residents"] = len(temp)

    docs = db.collection("employees").get()

    temp = []
    for d in docs:
        temp.append(d.to_dict())

    document["caregivers"] = temp
    document["no_of_caregivers"] = len(temp)

    document["avg_ratio_caretaker_residents"] = round((
        document["no_of_caregivers"] / document["no_of_residents"]
    ) * 100, 2)

    document["no_of_first_timers"] = 0

    for d in document["residents"]:
        if d["first_visit"]:
            document["no_of_first_timers"] += 1

    return jsonify({"message": "Success!", "stats": document}), 200

from flask import *
from firebase.config import db
from datetime import datetime

residents_bp = Blueprint("residents", __name__, url_prefix="/resident")


@residents_bp.route("/create", methods=["POST"])
def create_resident():
    data = {
        "first_name": request.json.get("first_name"),
        "last_name": request.json.get("last_name"),
        "plan_start_date": datetime.combine(
            datetime.strptime(request.json.get("plan_start_date"), "%Y-%m-%d").date(),
            datetime.min.time(),
        ),
        "stay_start_date": datetime.combine(
            datetime.strptime(request.json.get("stay_start_date"), "%Y-%m-%d").date(),
            datetime.min.time(),
        ),
        "stay_end_date": datetime.combine(
            datetime.strptime(request.json.get("stay_end_date"), "%Y-%m-%d").date(),
            datetime.min.time(),
        ),
        "current_accommodation": request.json.get("current_accommodation"),
        "first_visit": True if request.json.get("first_visit") == "true" else False,
        "immigration_status": request.json.get("immigration_status"),
        "is_autochthonous": (
            True if request.json.get("is_autochthonous") == "true" else False
        ),
        "is_veteran": True if request.json.get("is_veteran") == "true" else False,
        "has_children": True if request.json.get("has_children") == "true" else False,
        "orientation_at_end_of_stay": request.json.get(
            "orientation_at_end_of_stay"
        ).split(","),
        "challenges_issues": request.json.get("challenges_issues").split(","),
        "age": request.json.get("age"),
        "borough": request.json.get("borough"),
        "monthly_income": request.json.get("monthly_income"),
        "assigned_caregivers": request.json.get("assigned_caregivers").split(","),
        "uid": request.json.get("uid"),
    }
    db.collection("residents").add(data)
    return jsonify({"message": "Success!"}), 200


@residents_bp.route("/get", methods=["POST"])
def get_resident():
    document = (
        db.collection("residents")
        .where("uid", "==", request.json.get("uid"))
        .get()[0]
        .to_dict()
    )

    temp = []
    for a in document["assigned_caregivers"]:
        temp.append(db.collection("employees").where("uid", "==", a).get()[0].to_dict())

    document["assigned_caregivers"] = temp

    return jsonify({"message": "Success!", "document": document}), 200

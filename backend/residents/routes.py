from flask import *
from firebase.config import db
from datetime import datetime

residents_bp = Blueprint("residents", __name__, url_prefix="/resident")


@residents_bp.route("/create", methods=["POST"])
def create_resident():
    data = {
        "first_name": request.form.get("first_name"),
        "last_name": request.form.get("last_name"),
        "plan_start_date": datetime.combine(
            datetime.strptime(request.form.get("plan_start_date"), "%Y-%m-%d").date(),
            datetime.min.time(),
        ),
        "stay_start_date": datetime.combine(
            datetime.strptime(request.form.get("stay_start_date"), "%Y-%m-%d").date(),
            datetime.min.time(),
        ),
        "stay_end_date": datetime.combine(
            datetime.strptime(request.form.get("stay_end_date"), "%Y-%m-%d").date(),
            datetime.min.time(),
        ),
        "current_accommodation": request.form.get("current_accommodation"),
        "first_visit": True if request.form.get("first_visit") == "true" else False,
        "immigration_status": request.form.get("immigration_status"),
        "is_autochthonous": (
            True if request.form.get("is_autochthonous") == "true" else False
        ),
        "is_veteran": True if request.form.get("is_veteran") == "true" else False,
        "has_children": True if request.form.get("has_children") == "true" else False,
        "orientation_at_end_of_stay": request.form.get(
            "orientation_at_end_of_stay"
        ).split(","),
        "challenges_issues": request.form.get("challenges_issues").split(","),
        "age": request.form.get("age"),
        "borough": request.form.get("borough"),
        "monthly_income": request.form.get("monthly_income"),
        "assigned_caregivers": request.form.get("assigned_caregivers").split(","),
        "uid": request.form.get("uid"),
    }
    db.collection("residents").add(data)
    return jsonify({"message": "Success!"}), 200


@residents_bp.route("/get", methods=["POST"])
def get_resident():
    document = (
        db.collection("residents")
        .where("uid", "==", request.form.get("uid"))
        .get()[0]
        .to_dict()
    )
    
    temp = []
    for a in document["assigned_caregivers"]:
        temp.append(db.collection("employees").where("uid", "==", a).get()[0].to_dict())
    
    document["assigned_caregivers"] = temp
        
    return jsonify({"message": "Success!", "document": document}), 200

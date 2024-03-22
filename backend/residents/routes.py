from flask import *
from firebase.config import db

residents_bp = Blueprint("residents", __name__, url_prefix="/resident")


@residents_bp.route("/create", methods=["POST"])
def create_resident():
    data = {
        "first_name": request.form.get("first_name"),
        "last_name": request.form.get("last_name"),
        "plan_start_date": request.form.get("plan_start_date"),
        "stay_start_date": request.form.get("stay_start_date"),
        "stay_end_date": request.form.get("stay_end_date"),
        "current_accommodation": request.form.get("current_accommodation"),
        "first_visit": request.form.get("first_visit"),
        "immigration_status": request.form.get("immigration_status"),
        "is_autochthonous": request.form.get("autochthone"),
        "is_veteran": request.form.get("veteran"),
        "has_children": request.form.get("with_children"),
        "orientation_at_end_of_stay": request.form.get(
            "orientation_at_end_of_stay"
        ).split(","),
        "challenges_issues": request.form.get("challenges_issues").split(","),
        "age": request.form.get("age"),
        "borough": request.form.get("borough"),
        "monthly_income": request.form.get("monthly_income"),
        "assigned_caregivers": request.form.get("assigned_caregivers").split(","),
        "uid": request.form.get("uid")
    }
    db.collection("residents").add(data)
    return jsonify({"message": "Success!"}), 200

from flask import *
from firebase.config import db

caregivers_bp = Blueprint("caregivers", __name__, url_prefix="/caregiver")


@caregivers_bp.route("/create", methods=["POST"])
def create_caregivers():
    data = {
        "first_name": request.form.get("first_name"),
        "last_name": request.form.get("last_name"),
        "role": request.form.get("role"),
        "email": request.form.get("email"),
        "phone": request.form.get("phone"),
        "manager_id": request.form.get("manager_id"),
        "uid": request.form.get("uid"),
    }

    db.collection("employees").add(data)
    return jsonify({"message": "Success!"}), 200

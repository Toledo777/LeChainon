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


@caregivers_bp.route("/get_residents", methods=["POST"])
def create_get_residents():
    data = {
        "uid": request.form.get("uid"),
    }
    
    
@caregivers_bp.route("/get-user-data", methods=["POST"])
def get_user_data():
    docs_ref = (
        db.collection("residents")
        .where("assigned_caregivers", "array_contains", request.form.get("uid"))
        .stream()
    )

    documents = []

    for doc in docs_ref:
        add= db.collection("employees")

    return jsonify({"message": "Success!", "residents": documents}), 200


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


@caregivers_bp.route("/get-user-data", methods=["POST"])
def get_user_data():
    docs_ref = (
        db.collection("residents")
        .where("assigned_caregivers", "array_contains", request.form.get("uid"))
        .stream()
    )

    documents = []

    for d in docs_ref:
        t = d.to_dict()
        temp = []
        for a in t["assigned_caregivers"]:
            temp.append(db.collection("employees").where("uid", "==", a).get()[0].to_dict())
        t["assigned_caregivers"] = temp
        documents.append(t)


    return jsonify({"message": "Success!", "residents": documents}), 200

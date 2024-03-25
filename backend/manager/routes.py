from flask import *
from firebase.config import db

manager_bp = Blueprint("manager", __name__, url_prefix="/manager")


# Create manager data
@manager_bp.route("/create", methods=["POST"])
def create_manager():
    data = {
        "manager_id": request.json.get("manager_id"),
        "first_name": request.json.get("first_name"),
        "last_name": request.json.get("last_name"),
        "email": request.json.get("email"),
    }
    db.collection("manager").add(data)
    return jsonify({"message": "Success!"}), 200


# Fetch manager data
@manager_bp.route("/get-manager", methods=["GET"])
def get_manager():
    docs_ref = db.collection("manager").stream()
    manager_data = []

    for doc in docs_ref:
        manager_data.append(doc.to_dict())

    return jsonify({"message": "Success!", "manager_data": manager_data}), 200

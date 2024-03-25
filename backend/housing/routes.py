from flask import *
from firebase.config import db

housing_bp = Blueprint("housing", __name__, url_prefix="/housing")


# Update housing availability data
@housing_bp.route("/update", methods=["POST"])
def update_housing():
    data = {
        "name": request.json.get("name"),
        "capacity": request.json.get("capacity"),
        "occupancy": request.json.get("occupancy"),
    }
    db.collection("housing").add(data)
    return jsonify({"message": "Success!"}), 200


# Fetch housing availability data
@housing_bp.route("/get-housing-data", methods=["GET"])
def get_housing_data():
    docs_ref = db.collection("housing").stream()
    housing_data = []

    for doc in docs_ref:
        housing_data.append(doc.to_dict())

    return jsonify({"message": "Success!", "housing_data": housing_data}), 200

from flask import *
from firebase.config import db

housing_placements_bp = Blueprint("housing_placements", __name__, url_prefix="/housing_placements")

# Create housing placement data
@housing_placements_bp.route("/create", methods=["POST"])
def create_housing_placements():
    data={
        "resident_id": request.form.get("resident_id"),
        "housing_id": request.form.get("housing_id"),
        "start_date": request.form.get("start_date"),
        "end_date": request.form.get("end_date"),
        "duration": request.form.get("duration"),
    }
    db.collection("housing_placements").add(data)
    return jsonify({"message": "Success!"}), 200

# Fetching housing placement data 
@housing_placements_bp.route("/get-housing-placements", methods=["GET"])
def get_housing_placemnents_data():
    docs_ref = db.collection("housing_placements").stream()
    housing_placements_data = []

    for doc in docs_ref:
        housing_placements_data.append(doc.to_dict())

    return jsonify({"message": "Success!", "housing_placements_data": housing_placements_data}), 200



from flask import *
from firebase.config import db

top_tiles_bp = Blueprint("top_tiles", __name__, url_prefix="/top_tiles")


# Updating top_tiles data
@top_tiles_bp.route("/create", methods=["POST"])
def create_top_tiles():
    data = {
        "c_r_ratio": (request.json.get("c_r_ratio")),
        "total_caregivers": (request.json.get("total_caregivers")),
        "total_residents": (request.json.get("total_residents")),
    }
    db.collection("top_tiles").add(data)
    return jsonify({"message": "Success!"}), 200


# Fetching top tiles data
@top_tiles_bp.route("/get-top-tiles-data", methods=["GET"])
def get_top_tiles_data():
    docs_ref = db.collection("top_tiles").stream()
    top_tiles_data = []

    for doc in docs_ref:
        top_tiles_data.append(doc.to_dict())

    return jsonify({"message": "Success!", "top_tiles_data": top_tiles_data}), 200

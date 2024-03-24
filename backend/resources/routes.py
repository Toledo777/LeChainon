from flask import *
from datetime import datetime
from firebase.config import db

resources_bp = Blueprint("resources", __name__, url_prefix="/resources")


@resources_bp.route("/create", methods=["POST"])
def create_resource():
    data = {
        "description": request.json.get("description"),
        "issues": request.json.get("issues"),
        "link": request.json.get("link"),
        "title": request.json.get("title"),
        "type": request.json.get("type"),
        "uid": request.json.get("uid"),
    }

    db.collection("resources").add(data)
    return jsonify({"message": "Success!"}), 200


@resources_bp.route("/get", methods=["POST"])
def get_resource():
    docs_ref = (
        db.collection("resources").where("uid", "==", request.json.get("uid")).stream()
    )

    documents = []

    for doc in docs_ref:
        documents.append(doc.to_dict())

    return jsonify({"message": "Success!", "resources": documents}), 200

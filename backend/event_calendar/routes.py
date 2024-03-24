from flask import *
from datetime import datetime
from firebase.config import db

calendar_bp = Blueprint("calendar", __name__, url_prefix="/calendar")


@calendar_bp.route("/create-reminder", methods=["POST"])
def create_reminder():
    data = {
        "start_time": datetime.strptime(
            request.json.get("start_time"), "%Y-%m-%d %H:%M:%S"
        ),
        "title": request.json.get("title"),
        "uid": request.json.get("uid").split(","),
        "isReminder": True,
    }

    db.collection("calendar").add(data)
    return jsonify({"message": "Success!"}), 200


@calendar_bp.route("/create-meeting", methods=["POST"])
def create_meeting():
    data = {
        "start_time": datetime.strptime(
            request.json.get("start_time"), "%Y-%m-%d %H:%M:%S"
        ),
        "end_time": datetime.strptime(
            request.json.get("end_time"), "%Y-%m-%d %H:%M:%S"
        ),
        "title": request.json.get("title"),
        "link": request.json.get("link"),
        "uid": request.json.get("uid").split(","),
        "isReminder": False,
    }

    db.collection("calendar").add(data)
    return jsonify({"message": "Success!"}), 200


@calendar_bp.route("/get-user-data", methods=["POST"])
def get_user_data():
    docs_ref = (
        db.collection("calendar")
        .where("uid", "array_contains", request.json.get("uid"))
        .stream()
    )

    documents = []

    for doc in docs_ref:
        documents.append(doc.to_dict())

    return jsonify({"message": "Success!", "events": documents}), 200

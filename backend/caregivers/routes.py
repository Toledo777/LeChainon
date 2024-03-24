from flask import *
from firebase.config import db
from datetime import datetime
import pytz

caregivers_bp = Blueprint("caregivers", __name__, url_prefix="/caregiver")


@caregivers_bp.route("/create", methods=["POST"])
def create_caregivers():
    data = {
        "first_name": request.json.get("first_name"),
        "last_name": request.json.get("last_name"),
        "role": request.json.get("role"),
        "email": request.json.get("email"),
        "phone": request.json.get("phone"),
        "manager_id": request.json.get("manager_id"),
        "uid": request.json.get("uid"),
    }

    db.collection("employees").add(data)
    return jsonify({"message": "Success!"}), 200


@caregivers_bp.route("/get-user-data", methods=["POST"])
def get_user_data():
    docs_ref = (
        db.collection("residents")
        .where("assigned_caregivers", "array_contains", request.json.get("uid"))
        .stream()
    )

    documents = []

    for d in docs_ref:
        t = d.to_dict()
        temp = []
        for a in t["assigned_caregivers"]:
            temp.append(
                db.collection("employees").where("uid", "==", a).get()[0].to_dict()
            )
        t["assigned_caregivers"] = temp
        documents.append(t)

    return jsonify({"message": "Success!", "residents": documents}), 200


@caregivers_bp.route("/get-all-follow-ups", methods=["POST"])
def get_all_follow_ups():
    docs_ref = (
        db.collection("follow_ups")
        .where("cuid", "==", request.json.get("cuid"))
        .stream()
    )
    documents = []

    for d in docs_ref:
        t = d.to_dict()
        t["date"] = t["follow_up_date"]
        x = (
            (db.collection("residents").where("uid", "==", t.get("uid")))
            .get()[0]
            .to_dict()
        )
        t["resident_name"] = x["first_name"] + " " + x["last_name"]
        documents.append(t)

    for d in docs_ref:
        documents.append(d.to_dict())

    return jsonify({"message": "Success!", "follow_ups": documents}), 200


@caregivers_bp.route("/get-resident-follow-ups", methods=["POST"])
def get_resident_follow_ups():
    docs_ref = (
        db.collection("follow_ups")
        .where("cuid", "==", request.json.get("cuid"))
        .where("uid", "==", request.json.get("uid"))
        .stream()
    )
    documents = []

    for d in docs_ref:
        t = d.to_dict()
        t["user"] = (
            (db.collection("residents").where("uid", "==", t.get("uid")))
            .get()[0]
            .to_dict()
        )
        documents.append(t)

    return jsonify({"message": "Success!", "follow_ups": documents}), 200


@caregivers_bp.route("/create-note", methods=["POST"])
def create_note():
    print(request.json.get("chronological_notes"))
    chronological_notes = request.json.get("chronological_notes")
    js_date_object = datetime.fromisoformat(chronological_notes["date"][:-1])

    # Convert timezone to UTC (assuming JavaScript date is in UTC)
    js_date_object = js_date_object.replace(tzinfo=pytz.utc)

    # Convert UTC to desired timezone (e.g., 'America/New_York')
    desired_timezone = pytz.timezone("America/New_York")
    py_datetime_in_desired_tz = js_date_object.astimezone(desired_timezone)
    if not chronological_notes["isEvent"]:
        chronological_notes["date"] = py_datetime_in_desired_tz
        db.collection("chronoogical_notes").add(chronological_notes)
    else:
        chronological_notes["follow_up_date"] = py_datetime_in_desired_tz
        db.collection("follow_ups").add(chronological_notes)

    return jsonify({"message": "Success!"}), 200

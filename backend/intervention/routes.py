from flask import *
from datetime import datetime
from firebase.config import db

intervention_bp = Blueprint("intervention", __name__, url_prefix="/intervention")


@intervention_bp.route("/get-intervention-plan", methods=["POST"])
def get_intervention_plan():
    uid = request.form.get("uid")

    document = db.collection("residents").where("uid", "==", uid).get()[0].to_dict()

    d = db.collection("chronoogical_notes").where("uid", "==", uid).stream()

    t = []

    for a in d:
        t.append(a.to_dict())

    document["chronoogical_notes"] = t

    d = db.collection("follow_ups").where("uid", "==", uid).stream()

    t = []

    for a in d:
        t.append(a.to_dict())

    document["follow_ups"] = t

    d = db.collection("goals").where("uid", "==", uid).stream()

    t = []

    for a in d:
        t.append(a.to_dict())

    document["goals"] = t

    d = db.collection("significant_persons").where("uid", "==", uid).stream()

    t = []

    for a in d:
        t.append(a.to_dict())

    document["significant_persons"] = t

    temp = []
    for a in document["assigned_caregivers"]:
        temp.append(
            db.collection("employees")
            .where("uid", "==", a)
            .get()[0]
            .to_dict()
        )

    document["assigned_caregivers"] = temp

    return jsonify({"message": "Success!", "plan": document}), 200

from flask import *
from datetime import datetime
from firebase.config import db

intervention_bp = Blueprint("intervention", __name__, url_prefix="/intervention")


@intervention_bp.route("/get-intervention-plan", methods=["POST"])
def get_intervention_plan():
    uid = request.json.get("uid")

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

    d = db.collection("interventions").where("uid", "==", uid).stream()

    t = []

    for a in d:
        t.append(a.to_dict())

    document["interventions"] = t

    temp = []
    for a in document["follow_ups"]:
        a["caregiver"] = (
            db.collection("employees").where("uid", "==", a["cuid"]).get()[0].to_dict()
        )

    temp = []
    for a in document["assigned_caregivers"]:
        temp.append(db.collection("employees").where("uid", "==", a).get()[0].to_dict())

    document["assigned_caregivers"] = temp

    return jsonify({"message": "Success!", "plan": document}), 200


@intervention_bp.route("/create-intervention-plan", methods=["POST"])
def create_intervention_plan():
    uid = request.json.get("uid")
    cuid = request.json.get("cuid")

    chronological_notes = request.json.get("chronological_notes")
    chronological_notes["uid"] = uid
    chronological_notes["cuid"] = cuid
    follow_ups = request.json.get("follow_ups")
    follow_ups["uid"] = uid
    follow_ups["cuid"] = cuid
    goals = request.json.get("goals")
    goals["uid"] = uid
    goals["cuid"] = cuid
    significant_persons = request.json.get("significant_persons")
    significant_persons["uid"] = uid
    significant_persons["cuid"] = cuid
    interventions = request.json.get("interventions")
    interventions["uid"] = uid
    interventions["cuid"] = cuid

    db.collection("chronoogical_notes").add(chronological_notes)
    db.collection("follow_ups").add(follow_ups)
    db.collection("goals").add(goals)
    db.collection("significant_persons").add(significant_persons)
    db.collection("interventions").add(interventions)

    return jsonify({"message": "Success!"}), 200


@intervention_bp.route("/get-intervention-plan-page", methods=["POST"])
def create_intervention_plan_page():
    uid = request.json.get("uid")

    d_ref = db.collection("interventions").where("uid", "==", uid).stream()
    o = {}
    documents = []

    for d in d_ref:
        d = d.to_dict()
        idArr = d["goals"]
        g = []
        for i in idArr:
            g.append(db.collection("goals").document(i).get().to_dict())
        d["goals"] = g
        documents.append(d)
    o["plan"] = documents
    d = db.collection("residents").where("uid", "==", uid).get()[0].to_dict()
    o["stay_start_date"] = d["stay_start_date"]
    o["plan_start_date"] = d["plan_start_date"]
    
    o["name"] = d["first_name"] + " " + d["last_name"]
    name = ""
    for a in d["assigned_caregivers"]:
        t = db.collection("employees").where("uid", "==", a).get()[0].to_dict()
        name += t["first_name"] + " " + t["last_name"]

    o["caseworker"] = name


    return jsonify({"message": "Success!", "plan": o}), 200

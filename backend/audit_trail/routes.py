from flask import *
from firebase.config import db

audit_trail_bp = Blueprint("audit_trail", __name__, url_prefix="/audit_trail")

# Create audit trail data
@audit_trail_bp.route("/create", methods=["POST"])
def create_audit_trail():
    data={
        "modifications_by_caregiver":{
            "caregiver_id": request.form.get("caregiver_id"),
        "item_modified": request.form.get("item_modified"),
        "timestamp": request.form.get("timestamp")
        },
        "modifications_by_resident":{
            "resident_id": request.form.get("caregiver_id"),
        "item_modified": request.form.get("item_modified"),
        "timestamp": request.form.get("timestamp")
        }
    }
    db.collection("audit_trail").add(data)
    return jsonify({"message": "Success!"}), 200

# Fetch audit trail data
@audit_trail_bp.route("/get-audit-trail", methods=["GET"])
def get_audit_trail():
    docs_ref = db.collection("audit_trail").stream()
    audit_trail_data = []

    for doc in docs_ref:
        audit_trail_data.append(doc.to_dict())

    return jsonify({"message": "Success!", "audit_trail_data": audit_trail_data}), 200

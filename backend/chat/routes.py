from flask import *
from datetime import datetime
from firebase.config import db

chat_bp = Blueprint("chat", __name__, url_prefix="/chat")


@chat_bp.route("/create", methods=["POST"])
def create_chat():
    data = {
        "text": request.json.get("text"),
        "from": request.json.get("uid1"),
        "to": request.json.get("uid2"),
        "timestamp": datetime.now().timestamp(),
    }

    db.collection("chat").add(data)
    return jsonify({"message": "Success!"}), 200


@chat_bp.route("/get", methods=["POST"])
def get_chats():
    docs_ref = (
        db.collection("chat").where("from", "==", request.json.get("uid")).stream()
    )

    documents = []

    for doc in docs_ref:
        documents.append(doc.to_dict())

    docs_ref = db.collection("chat").where("to", "==", request.json.get("uid")).stream()

    for doc in docs_ref:
        documents.append(doc.to_dict())

    sorted_data = sorted(documents, key=lambda x: x["timestamp"])

    return jsonify({"message": "Success!", "chats": sorted_data}), 200

from flask import *
from firebase.config import auth


user_auth_bp = Blueprint("user_auth", __name__)


def get_email_and_password(request):
    return request.json.get("email"), request.json.get("password")


@user_auth_bp.route("/register", methods=["POST"])
def register():
    user = {}
    email, password = get_email_and_password(request)
    try:
        user = auth.create_user_with_email_and_password(email, password)
    except Exception as e:
        print(e["message"])

    return jsonify(user)


@user_auth_bp.route("/signin", methods=["POST"])
def signin():
    user = {}
    email, password = get_email_and_password(request)
    try:
        user = auth.sign_in_with_email_and_password(email, password)
    except Exception as e:
        print(e["message"])

    return jsonify(user)


@user_auth_bp.route("/account-info", methods=["POST"])
def account_info():
    user = {}
    try:
        user = auth.get_account_info(request.headers["Authorization"].split(" ")[1])
    except Exception as e:
        print(e)

    return jsonify(user)


@user_auth_bp.route("/logout", methods=["POST"])
def logout():
    pass

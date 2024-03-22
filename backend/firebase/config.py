import pyrebase
import os
import firebase_admin

from dotenv import load_dotenv
from firebase_admin import credentials, firestore


load_dotenv()


config = {
    "apiKey": os.getenv("FIREBASE_API_KEY"),
    "authDomain": os.getenv("FIREBASE_AUTH_DOMAIN"),
    "projectId": os.getenv("FIREBASE_PROJECT_ID"),
    "storageBucket": os.getenv("FIREBASE_STORAGE_BUCKET"),
    "messagingSenderId": os.getenv("FIREBASE_MESSAGING_SENDER_ID"),
    "appId": os.getenv("FIREBASE_APP_ID"),
    "measurementId": os.getenv("FIREBASE_MEASUREMENT_ID"),
    "databaseURL": os.getenv("FIREBASE_DATABASE_URL"),
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

cred = credentials.Certificate("../backend/serviceAccountKey.json")

firebase_admin.initialize_app(cred)

db = firestore.client()

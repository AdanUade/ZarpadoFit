from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://mongo:27017")

print(f"🔗 Intentando conectar a MongoDB en: {MONGO_URL}")

try:
    client = MongoClient(MONGO_URL)
    client.admin.command('ping')
    db = client["zarpado_db"]
    print("✅ Conectado a MongoDB")
except Exception as e:
    print(f"❌ Error conectando a MongoDB: {e}")
    db = None

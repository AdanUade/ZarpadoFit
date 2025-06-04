from neo4j import GraphDatabase
import os
from dotenv import load_dotenv

load_dotenv()

NEO4J_URI = os.environ.get("NEO4J_URI", "bolt://localhost:7687")
NEO4J_USER = os.environ.get("NEO4J_USER", "neo4j")
NEO4J_PASSWORD = os.environ.get("NEO4J_PASSWORD", "password123")

try:
    driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
    driver.verify_connectivity()
    print("✅ Conectado a Neo4j")
except Exception as e:
    print(f"❌ Error conectando a Neo4j: {e}")
    raise e

def get_neo4j_session():
    return driver.session()

import os

STORAGE_DIR = os.environ.get("STORAGE_DIR", "/app/storage")

USER_IMG_DIR = os.path.join(STORAGE_DIR, "usuarios")
PRENDA_IMG_DIR = os.path.join(STORAGE_DIR, "prendas")
HISTORIAL_DIR = os.path.join(STORAGE_DIR, "historial")

for d in [USER_IMG_DIR, PRENDA_IMG_DIR, HISTORIAL_DIR]:
    os.makedirs(d, exist_ok=True)
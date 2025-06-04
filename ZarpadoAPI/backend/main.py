import os
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from routers import users, prendas, imagen
from config import STORAGE_DIR

app = FastAPI()

app.mount("/media", StaticFiles(directory=STORAGE_DIR), name="media")

app.include_router(users.router,   prefix="/api", tags=["usuarios"])
app.include_router(prendas.router, prefix="/api", tags=["prendas"])
app.include_router(imagen.router,  prefix="/api", tags=["imagen"])
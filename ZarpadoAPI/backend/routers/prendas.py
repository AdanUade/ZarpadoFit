from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from db.mongo import db
from bson.objectid import ObjectId
from models.prenda import PrendaOut
from config import PRENDA_IMG_DIR
import os, shutil

router = APIRouter()

@router.post("/prendas", response_model=PrendaOut)
def crear_prenda(
    nombre: str = Form(...),
    tipo: str = Form(...),
    descripcion: str = Form(...),
    marca: str = Form(...),
    file: UploadFile = File(...)
):
    ext = file.filename.split('.')[-1]
    filename = f"{nombre}_{marca}_{str(ObjectId())}.{ext}"
    path = os.path.join(PRENDA_IMG_DIR, filename)
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    prenda_dict = {
        "nombre": nombre,
        "tipo": tipo,
        "descripcion": descripcion,
        "marca": marca,
        "image_path": path
    }
    res = db["prendas"].insert_one(prenda_dict)
    prenda_out = {**prenda_dict, "id": str(res.inserted_id)}
    return prenda_out

@router.patch("/prendas/{prenda_id}", response_model=PrendaOut)
def editar_prenda(
    prenda_id: str,
    nombre: str = Form(None),
    tipo: str = Form(None),
    descripcion: str = Form(None),
    marca: str = Form(None),
    file: UploadFile = File(None)
):
    cambios = {}
    if nombre: cambios["nombre"] = nombre
    if tipo: cambios["tipo"] = tipo
    if descripcion: cambios["descripcion"] = descripcion
    if marca: cambios["marca"] = marca
    if file:
        ext = file.filename.split('.')[-1]
        filename = f"{prenda_id}_{str(ObjectId())}.{ext}"
        path = os.path.join(PRENDA_IMG_DIR, filename)
        with open(path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        cambios["image_path"] = path
    if not cambios:
        raise HTTPException(status_code=400, detail="Nada para actualizar")
    res = db["prendas"].update_one({"_id": ObjectId(prenda_id)}, {"$set": cambios})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Prenda no encontrada")
    prenda = db["prendas"].find_one({"_id": ObjectId(prenda_id)})
    prenda["id"] = str(prenda["_id"])
    return prenda

@router.delete("/prendas/{prenda_id}")
def eliminar_prenda(prenda_id: str):
    prenda = db["prendas"].find_one({"_id": ObjectId(prenda_id)})
    if not prenda:
        raise HTTPException(status_code=404, detail="Prenda no encontrada")
    if prenda.get("image_path"):
        try:
            os.remove(prenda["image_path"])
        except Exception:
            pass
    res = db["prendas"].delete_one({"_id": ObjectId(prenda_id)})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Prenda no encontrada")
    return {"msg": "Prenda eliminada"}

@router.get("/prendas/{prenda_id}", response_model=PrendaOut)
def obtener_prenda(prenda_id: str):
    prenda = db["prendas"].find_one({"_id": ObjectId(prenda_id)})
    if not prenda:
        raise HTTPException(status_code=404, detail="Prenda no encontrada")
    prenda["id"] = str(prenda["_id"])
    return prenda

@router.get("/prendas", response_model=list[PrendaOut])
def listar_prendas():
    prendas = list(db["prendas"].find())
    for p in prendas:
        p["id"] = str(p["_id"])
    return prendas

@router.get("/prendas/tipo/{tipo}", response_model=list[PrendaOut])
def listar_por_tipo(tipo: str):
    prendas = list(db["prendas"].find({"tipo": tipo}))
    for p in prendas:
        p["id"] = str(p["_id"])
    return prendas

@router.get("/prendas/marca/{marca}", response_model=list[PrendaOut])
def listar_por_marca(marca: str):
    prendas = list(db["prendas"].find({"marca": marca}))
    for p in prendas:
        p["id"] = str(p["_id"])
    return prendas

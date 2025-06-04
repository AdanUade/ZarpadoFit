from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from db.mongo import db
from bson.objectid import ObjectId
from models.user import UserCreate, UserOut
from config import USER_IMG_DIR, HISTORIAL_DIR
import os, shutil, uuid

router = APIRouter()

@router.post("/usuarios", response_model=UserOut)
def crear_usuario(user: UserCreate):
    user_dict = user.dict()
    user_dict["historial"] = []
    user_dict["favoritos"] = []
    user_dict["profile_image_path"] = None
    res = db["usuarios"].insert_one(user_dict)
    user_out = {**user_dict, "id": str(res.inserted_id)}
    return user_out

@router.get("/usuarios", response_model=list[UserOut])
def obtener_usuarios():
    usuarios = list(db["usuarios"].find())
    for u in usuarios:
        u["id"] = str(u["_id"])
    return usuarios

@router.get("/usuarios/{user_id}", response_model=UserOut)
def obtener_usuario(user_id: str):
    usuario = db["usuarios"].find_one({"_id": ObjectId(user_id)})
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    usuario["id"] = str(usuario["_id"])
    return usuario

@router.patch("/usuarios/{user_id}", response_model=UserOut)
def editar_usuario(
    user_id: str,
    username: str = Form(None),
    email: str = Form(None),
    password: str = Form(None),
):
    cambios = {}
    if username: cambios["username"] = username
    if email: cambios["email"] = email
    if password: cambios["password"] = password
    if not cambios:
        raise HTTPException(status_code=400, detail="Nada para actualizar")
    res = db["usuarios"].update_one({"_id": ObjectId(user_id)}, {"$set": cambios})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    usuario = db["usuarios"].find_one({"_id": ObjectId(user_id)})
    usuario["id"] = str(usuario["_id"])
    return usuario

@router.delete("/usuarios/{user_id}")
def eliminar_usuario(user_id: str):
    res = db["usuarios"].delete_one({"_id": ObjectId(user_id)})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"msg": "Usuario eliminado"}

@router.patch("/usuarios/{user_id}/profile_image")
def subir_profile_image(
    user_id: str,
    file: UploadFile = File(...)
):
    ext = file.filename.split('.')[-1]
    filename = f"{user_id}_profile.{ext}"
    path = os.path.join(USER_IMG_DIR, filename)
    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    db["usuarios"].update_one({"_id": ObjectId(user_id)}, {"$set": {"profile_image_path": path}})
    return {"profile_image_path": path}

@router.get("/usuarios/{user_id}/historial")
def ver_historial(user_id: str):
    usuario = db["usuarios"].find_one({"_id": ObjectId(user_id)})
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"historial": usuario.get("historial", [])}

@router.delete("/usuarios/{user_id}/historial/{img_idx}")
def eliminar_img_historial(user_id: str, img_idx: int):
    usuario = db["usuarios"].find_one({"_id": ObjectId(user_id)})
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    historial = usuario.get("historial", [])
    try:
        img = historial.pop(img_idx)
        try:
            os.remove(img)
        except Exception:
            pass
        db["usuarios"].update_one({"_id": ObjectId(user_id)}, {"$set": {"historial": historial}})
        return {"historial": historial}
    except IndexError:
        raise HTTPException(status_code=400, detail="Índice fuera de rango")

@router.get("/usuarios/{user_id}/favoritos")
def ver_favoritos(user_id: str):
    usuario = db["usuarios"].find_one({"_id": ObjectId(user_id)})
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"favoritos": usuario.get("favoritos", [])}

@router.post("/usuarios/{user_id}/favoritos")
def agregar_favorito(
    user_id: str,
    image_path: str = Form(...)
):
    usuario = db["usuarios"].find_one({"_id": ObjectId(user_id)})
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    favoritos = usuario.get("favoritos", [])
    if image_path not in favoritos:
        favoritos.append(image_path)
        db["usuarios"].update_one({"_id": ObjectId(user_id)}, {"$set": {"favoritos": favoritos}})
    return {"favoritos": favoritos}

@router.delete("/usuarios/{user_id}/favoritos/{img_idx}")
def quitar_favorito(user_id: str, img_idx: int):
    usuario = db["usuarios"].find_one({"_id": ObjectId(user_id)})
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    favoritos = usuario.get("favoritos", [])
    try:
        favoritos.pop(img_idx)
        db["usuarios"].update_one({"_id": ObjectId(user_id)}, {"$set": {"favoritos": favoritos}})
        return {"favoritos": favoritos}
    except IndexError:
        raise HTTPException(status_code=400, detail="Índice fuera de rango")

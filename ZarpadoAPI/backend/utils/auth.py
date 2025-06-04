from fastapi import Depends, HTTPException, Request
from db.mongo import db
from bson.objectid import ObjectId

def get_current_user(request: Request):
    user_id = request.headers.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="No autenticado")
    user = db["usuarios"].find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=401, detail="Usuario inválido")
    user["id"] = str(user["_id"])
    return user

def require_admin(user=Depends(get_current_user)):
    if user["rol"] != "admin":
        raise HTTPException(status_code=403, detail="Permiso solo para admin")
    return user

def require_admin_or_owner(user_id: str, user=Depends(get_current_user)):
    if user["rol"] == "admin" or user["id"] == user_id:
        return user
    raise HTTPException(status_code=403, detail="No autorizado")


# Por si implementamos autenticación JWT en el futuro , pero medio paja
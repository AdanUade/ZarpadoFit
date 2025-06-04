**README – ZarpadoAPI**

---

## 1. Descripción del proyecto

ZarpadoAPI es un backend construido con FastAPI que permite:

* **Gestionar usuarios** (roles “final” y “admin”) y sus imágenes de perfil, historial y favoritos.
* **Administrar prendas** (crear, editar, listar, eliminar) junto a sus imágenes.
* **Probar prendas en una foto de usuario** usando la API de Gemini (Google GenAI). El endpoint toma dos imágenes (prenda y usuario), genera una imagen compuesta y guarda únicamente el resultado en disco. Asimismo registra el resultado en el historial del usuario (máximo 5 entradas).

La arquitectura básica incorpora:

* **FastAPI** para exponer rutas y servir archivos estáticos.
* **MongoDB** como base de datos para usuarios y prendas.
* **Neo4j** para modelos de recomendación (no detallado en este README, pero integrado en el proyecto).
* **Google GenAI (gemini-2.0-flash-exp-image-generation)** para generación y composición de imágenes.
* **Almacenamiento en disco** (carpeta `storage/`) montado como volumen Docker para persistir imágenes.

---

## 2. Requisitos previos

* **Python 3.11+** (si ejecutas localmente sin Docker).
* **Docker 20.10+ y Docker Compose v2** (para correr con contenedores).
* Una cuenta de Google Cloud con acceso y **API KEY de Gemini** (variable de entorno `GOOGLE_API_KEY`).
* Opcionalmente, Git para clonar el repositorio.

---

## 3. Estructura de carpetas (descripción general)

```text
ZarpadoAPI/
├─ docker-compose.yml
├─ storage/                      ← Carpeta local para volcar imágenes
│  ├─ historial/                 ← Resultados generados por el endpoint “probar_prenda”
│  ├─ prendas/                   ← Imágenes de prendas creadas por el admin
│  └─ usuarios/                  ← Fotos de perfil de usuarios
└─ backend/                      ← Código fuente de la API
   ├─ Dockerfile
   ├─ docker-entrypoint.sh       ← Script de arranque (crea carpetas, etc.)
   ├─ requirements.txt
   ├─ main.py                    ← Instalación de FastAPI, StaticFiles, routers
   ├─ config.py                  ← Definición de rutas absolutas a “storage/*”
   ├─ routers/
   │  ├─ usuarios.py             ← Endpoints CRUD para usuarios, historial y favoritos
   │  ├─ prendas.py              ← Endpoints CRUD para prendas (sin auth en producción)
   │  └─ imagen.py               ← Endpoint `/api/probar_prenda` que integra Gemini
   ├─ models/
   │  ├─ user.py                 ← Pydantic Models: UserCreate, UserOut
   │  └─ prenda.py               ← Pydantic Model: PrendaOut
   ├─ db/
   │  ├─ mongo.py                ← Conexión a MongoDB (db = client.get_database(...))
   │  └─ neo4j.py                ← Conexión a Neo4j (driver, session, etc.)
   └─ utils/
      └─ auth.py                 ← Dependencias de autenticación (opcional, puede omitirse) pa futuro
```

---

## 4. Variables de entorno

El proyecto usa un archivo `.env` (en la raíz de `backend/`) con al menos estas variables:

```dotenv
# En Google Cloud Console, genera una API Key y guárdala aquí
GOOGLE_API_KEY=TU_API_KEY_GEMINI

# MongoDB URI (para desarrollo local, sin Docker podría ser: mongodb://localhost:27017)
MONGO_URL=mongodb://mongo:27017

# Credenciales Neo4j (solo si usas recomendación; no es obligatorio para probar la generación de imágenes)
NEO4J_URI=bolt://neo4j:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=admin123
```

> **Nota**: En el contenedor Docker se combinan estas variables con las definidas en `docker-compose.yml`.

---

## 5. Instalación y ejecución

### 5.1. Ejecución local (sin Docker)

1. Clona el repositorio y sitúate en la carpeta raíz del proyecto:

   ```bash
   git clone https://<tu-repositorio>/ZarpadoAPI.git
   cd ZarpadoAPI/backend
   ```

2. Crea y activa un entorno virtual:

   ```bash
   python3 -m venv venv
   source venv/bin/activate   # macOS/Linux
   venv\Scripts\activate      # Windows
   ```

3. Instala dependencias:

   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. Asegúrate de tener MongoDB y Neo4j corriendo localmente (o ajusta `MONGO_URL`/`NEO4J_URI`).

5. Crea manualmente las carpetas de almacenamiento:

   ```bash
   mkdir -p ../storage/usuarios ../storage/prendas ../storage/historial
   ```

6. Inicia la aplicación:

   ```bash
   uvicorn main:app --reload
   ```

   * Ahora FastAPI escucha en `http://127.0.0.1:8000/`.
   * Swagger UI disponible en `http://127.0.0.1:8000/docs`.

7. Prueba el endpoint de generación de imágenes:

   * En Swagger, verás `/api/probar_prenda`. Rellena `user_id` (de un documento ya creado en Mongo) y sube dos archivos: imagen de prenda y foto de usuario.
   * La respuesta incluirá la URL (por ejemplo: `/media/historial/abcd_result_1234.jpg`). Copiala y usála en el navegador:

     ```
     http://127.0.0.1:8000/media/historial/abcd_result_1234.jpg
     ```

---

### 5.2. Ejecución con Docker y Docker Compose

1. Posiciónate en la carpeta raíz del proyecto (donde está `docker-compose.yml`).

   ```bash
   cd ZarpadoAPI
   ```

2. Asegúrate de que **no exista** una carpeta `storage/` con contenido “fantasma”. Si ya la creaste manual o con otra configuración, elimínala y vuelve a crear las subcarpetas vacías:

   ```bash
   rm -rf storage
   mkdir -p storage/usuarios storage/prendas storage/historial
   ```

3. Levanta los contenedores:

   ```bash
   docker-compose up --build
   ```

   Esto hará:

   * Construir la imagen del backend según `backend/Dockerfile`.
   * Iniciar MongoDB (`mongo:5.0`) y Neo4j (`neo4j:5.12`).
   * Generar las carpetas `/app/storage/usuarios`, `/app/storage/prendas` y `/app/storage/historial` dentro del contenedor backend.
   * Montar el volumen `./storage:/app/storage`, de modo que **todo lo que se guarde en** `/app/storage` **aparezca en tu máquina host** dentro de `ZarpadoAPI/storage/`.

4. Verifica en la consola logs como:

   ```
   zarpado-backend  | INFO: Uvicorn running on http://0.0.0.0:8000
   zarpado-mongo    | ...
   zarpado-neo4j    | Neo4j startup logs...
   ```

5. Abre el navegador en:

   ```
   http://127.0.0.1:8000/docs
   ```

   Para probar los endpoints REST.

6. Llama a `/api/probar_prenda` en Swagger:

   * Sube tu imagen de prenda (solo bytes, el endpoint convertirá a JPEG si es necesario).
   * Sube tu imagen de usuario.
   * Rellena `user_id` con un ID válido de MongoDB (puedes crearte un usuario antes con `/api/usuarios`).
   * Envía la petición; la respuesta será algo como:

     ```json
     {
       "img_generada": "/media/historial/abcd1234_result_fa7b9c.jpg",
       "historial": [
         "/media/historial/abcd1234_result_fa7b9c.jpg"
       ]
     }
     ```
   * Copia esa URL y pégala en el navegador:

     ```
     http://127.0.0.1:8000/media/historial/abcd1234_result_fa7b9c.jpg
     ```

     Verás la imagen generada.

7. Verifica que en tu máquina host se cree un archivo dentro de:

   ```
   ZarpadoAPI/storage/historial/abcd1234_result_fa7b9c.jpg
   ```

---

## 6. Endpoints principales

A continuación un resumen de rutas y su comportamiento:

### 6.1. Usuarios

* **POST /api/usuarios**
  Crea un usuario (sin autenticación).
  Body (Pydantic `UserCreate`):

  ```json
  {
    "username": "juan123",
    "email": "juan@example.com",
    "password": "abc123",
    "rol": "final"
  }
  ```

  Respuesta (`UserOut`):

  ```json
  {
    "id": "<ObjectId>",
    "username": "...",
    "email": "...",
    "rol": "...",
    "profile_image_path": null,
    "historial": [],
    "favoritos": []
  }
  ```

* **GET /api/usuarios**
  Lista todos los usuarios (se omite autenticación en esta versión).

* **GET /api/usuarios/{user\_id}**
  Devuelve un usuario por su ID.

* **PATCH /api/usuarios/{user\_id}**
  Edita campos `username`, `email` o `password`.

* **DELETE /api/usuarios/{user\_id}**
  Elimina el usuario correspondiente.

* **PATCH /api/usuarios/{user\_id}/profile\_image**
  Sube o reemplaza la foto de perfil. Guarda en `storage/usuarios/{user_id}_profile.ext`.
  Respuesta:

  ```json
  { "profile_image_path": "/media/usuarios/{user_id}_profile.jpg" }
  ```

* **GET /api/usuarios/{user\_id}/historial**
  Devuelve el array de rutas (hasta 5) que quedaron almacenadas en Mongo:

  ```json
  { "historial": [
      "/media/historial/abcd.jpg",
      "/media/historial/efgh.jpg"
    ]
  }
  ```

* **DELETE /api/usuarios/{user\_id}/historial/{img\_idx}**
  Elimina la imagen en posición `img_idx` dentro del array `historial` y borra el archivo físico si existe.

* **GET /api/usuarios/{user\_id}/favoritos**
  Lista el array `favoritos` (rutas de imágenes guardadas manualmente por el usuario).

* **POST /api/usuarios/{user\_id}/favoritos**
  Agrega un path de imagen (en formato `/media/historial/xxx.jpg`) a la lista de favoritos.

* **DELETE /api/usuarios/{user\_id}/favoritos/{img\_idx}**
  Quita el favorito en índice `img_idx`.

### 6.2. Prendas

* **POST /api/prendas**
  Crea una prenda (solo administrador, si quisieras auth). Recibe `nombre`, `tipo`, `descripcion`, `marca` como campos de formulario y un `file` con la imagen obligatoria. Guarda en `storage/prendas/{nombre}_{marca}_{ObjectId()}.ext`.
  Respuesta (`PrendaOut`):

  ```json
  {
    "id": "<ObjectId>",
    "nombre": "...",
    "tipo": "...",
    "descripcion": "...",
    "marca": "...",
    "image_path": "/media/prendas/mi_prenda.jpg"
  }
  ```

* **PATCH /api/prendas/{prenda\_id}**
  Edita datos de la prenda o reemplaza la imagen si se envía un nuevo archivo.

* **DELETE /api/prendas/{prenda\_id}**
  Elimina prenda y borra su imagen física.

* **GET /api/prendas/{prenda\_id}**
  Devuelve datos de una prenda específica.

* **GET /api/prendas**
  Lista todas las prendas.

* **GET /api/prendas/tipo/{tipo}**
  Lista prendas filtradas por `tipo`.

* **GET /api/prendas/marca/{marca}**
  Lista prendas filtradas por `marca`.

### 6.3. Probar prenda (Generación “Try-On”)

* **POST /api/probar\_prenda**
  Recibe:

  * `user_id` (campo `Form`): ID de un usuario existente.
  * `file_prenda`: archivo de imagen (png/jpg/webp) de la prenda.
  * `file_usuario`: archivo de imagen del usuario (ropa, selfie, etc.).

  Flujo interno:

  1. Lee ambas imágenes en memoria y fuerza formato JPEG si es necesario.
  2. Obtiene la descripción en inglés de la prenda usando `gemini-2.0-flash`.
  3. Con un prompt detallado y las dos imágenes en memoria invoca `gemini-2.0-flash-exp-image-generation`.
  4. Extrae la imagen generada (resultado de reemplazar la prenda en la foto de usuario).
  5. Guarda solo la imagen generada en disco (`storage/historial/{user_id}_result_<uuid>.jpg`).
  6. Actualiza el array `historial` en Mongo (máximo 5 elementos, elimina el más antiguo si es necesario).
  7. Devuelve JSON con:

     ```json
     {
       "img_generada": "/media/historial/archivo.jpg",
       "historial": [
         "/media/historial/archivo.jpg",
         "/media/historial/otro.jpg"
       ]
     }
     ```

  Por último, la URL `/media/historial/archivo.jpg` es accesible públicamente gracias al montaje de `StaticFiles`.

---

## 7. Configuración de rutas y almacenamiento

1. **`config.py`** define rutas absolutas dentro del contenedor:

   ```python
   import os

   # En Docker se recomienda siempre usar ‘/app/storage’
   STORAGE_DIR = os.environ.get("STORAGE_DIR", "/app/storage")

   USER_IMG_DIR    = os.path.join(STORAGE_DIR, "usuarios")
   PRENDA_IMG_DIR  = os.path.join(STORAGE_DIR, "prendas")
   HISTORIAL_DIR   = os.path.join(STORAGE_DIR, "historial")

   for d in [USER_IMG_DIR, PRENDA_IMG_DIR, HISTORIAL_DIR]:
       os.makedirs(d, exist_ok=True)
   ```

   * `STORAGE_DIR` apunta dentro del contenedor a `/app/storage` (mapeado desde tu host `./storage`).
   * Cada subcarpeta se crea automáticamente si no existe.

2. **`main.py`** monta los archivos estáticos de esa carpeta:

   ```python
   from fastapi import FastAPI
   from fastapi.staticfiles import StaticFiles
   from config import STORAGE_DIR

   app = FastAPI()
   app.mount("/media", StaticFiles(directory=STORAGE_DIR), name="media")
   ```

   De esta forma, **cualquier archivo presente en** `STORAGE_DIR` (por ejemplo `/app/storage/historial/algo.jpg`)
   será accesible en `http://<host>:<puerto>/media/historial/algo.jpg`.

---

## 8. Notas finales y recomendaciones

1. **Claves de autenticación**

   * El código incluye métodos `require_admin` y `get_current_user` en `utils/auth.py`, pero en muchos endpoints omitimos `Depends` para simplificar pruebas.
   * En producción, añadí siempre `Depends(require_admin)` o `Depends(get_current_user)` según la ruta.

2. **SSL / HTTPS**

   * En entorno local o Docker Compose no incluimos certificado. En producción, usá un reverse proxy (Nginx, Traefik) con certificado válido.

3. **Límite de imágenes en historial**

   * Se mantiene en 5: al generar la sexta, se borra la más antigua (tanto de Mongo como del disco).

4. **Errores comunes**

   * Si ves 404 en `/media/historial/...`, seguramente la imagen no se guardó en la ruta esperada. Verificá desde dentro del contenedor:

     ```bash
     docker exec -it zarpado-backend bash
     ls /app/storage/historial
     ```
   * Asegurate de que `docker-compose down -v && docker-compose up --build` recrea correctamente el volumen `storage/`.

5. **Extensiones admitidas**

   * JPEG, PNG y WEBP tanto para input como output. Cualquier otro formato se convertirá a JPEG internamente.


Con esta guía deberías tener todo lo necesario para:

1. Configurar tus credenciales (`.env`).
2. Instalar y correr localmente o con Docker.
3. Conocer la estructura de carpetas y rutas de acceso.
4. Entender cada endpoint y su lógica interna.


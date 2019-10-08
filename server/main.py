from fastapi import FastAPI
from api.fotos import list_fotos, get_foto
from starlette.middleware.cors import CORSMiddleware

from starlette.responses import FileResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/api/fotos/")
def read_fotos():
    return list_fotos()


@app.get("/api/fotos/{foto_index}")
def read_foto(foto_index: int):
    return FileResponse(get_foto(foto_index))


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

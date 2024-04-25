from fastapi import FastAPI, HTTPException, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.llms import Ollama


OLLAMA_HOST = "ollama"
OLLAMA_PORT = 11434
OLLAMA_BASE_URL = f"http://{OLLAMA_HOST}:{OLLAMA_PORT}"

llm = Ollama(model="mistral", temperature=0, base_url=OLLAMA_BASE_URL)


app = FastAPI()

class Message(BaseModel):
    text: str

origins = [
    "*",
    "http://localhost:3000/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/messages")
async def get_initial_message():
    return {"message": "Hello!"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            text_data = await websocket.receive_text()
            query = text_data

            for chunks in llm.stream(query):
                print(chunks)
                await websocket.send_text(chunks)
            await websocket.send_text('**|||END|||**')
    except Exception as e:
        print(f'WebSocket error: {str(e)}')
    finally:

        await websocket.close()



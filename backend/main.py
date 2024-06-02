from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import logging
import requests
from typing import List

import database
import schemas
import crud

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)

class CodeData(BaseModel):
    code: str

@app.on_event("startup")
async def startup():
    await database.database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.database.disconnect()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/testCode")
async def post_data(data: CodeData):
    result = execute_code_securely(data.code)
    return result

@app.post("/submitCode", response_model=schemas.CodeExecution)
async def submit_code(data: CodeData, db: Session = Depends(get_db)):
    result = execute_code_securely(data.code)

    if not result["error"]:
        db_code_execution = schemas.CodeExecutionCreate(
            code=data.code,
            output=result["output"],
            status="success"
        )
        return crud.create_code_execution(db=db, code_execution=db_code_execution)
    else:
        return schemas.CodeExecution(
            id=0,
            code=data.code,
            output=result["error"],
            status="error"
        )

@app.get("/history", response_model=List[schemas.CodeExecution])
async def get_history(limit: int = Query(10, description="Limit the number of results returned"), db: Session = Depends(get_db)):
    return crud.get_code_executions(db=db, limit=limit)

def execute_code_securely(code: str):
    url = "http://secure_code_exec:9000"
    try:
        response = requests.post(url, json={"code": code})
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        logging.error(f"Request failed: {e}")
        return {"output": "", "error": "Failed to connect to code execution service. Please restart the service."}

from sqlalchemy.orm import Session
import schemas
import models

def create_code_execution(db: Session, code_execution: schemas.CodeExecutionCreate):
    db_code_execution = models.CodeExecution(**code_execution.dict())
    db.add(db_code_execution)
    db.commit()
    db.refresh(db_code_execution)
    return db_code_execution

def get_code_execution(db: Session, code_execution_id: int):
    return db.query(models.CodeExecution).filter(models.CodeExecution.id == code_execution_id).first()

def get_code_executions(db: Session, limit: int = 10):
    return db.query(models.CodeExecution).order_by(models.CodeExecution.id.desc()).limit(limit).all()

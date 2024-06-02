from pydantic import BaseModel

class CodeExecutionBase(BaseModel):
    code: str
    output: str
    status: str

class CodeExecutionCreate(CodeExecutionBase):
    pass

class CodeExecution(CodeExecutionBase):
    id: int

    class Config:
        orm_mode = True

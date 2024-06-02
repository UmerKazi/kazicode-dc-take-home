from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class CodeExecution(Base):
    __tablename__ = "code_executions"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(Text, nullable=False)
    output = Column(Text, nullable=False)
    status = Column(String, nullable=False)

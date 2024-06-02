from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from databases import Database

DATABASE_URL = "postgresql://admin:datacurve@db:5432/code_execution_db"

database = Database(DATABASE_URL)
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class CodeExecution(Base):
    __tablename__ = "code_executions"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(Text, nullable=False)
    output = Column(Text, nullable=False)
    status = Column(String, nullable=False)

Base.metadata.create_all(bind=engine)

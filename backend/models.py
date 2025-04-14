from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)  # Task Title
    completed = Column(Boolean, default=False)  # Completion Status
    created_at = Column(DateTime, server_default=func.now())  # Timestamp for creation
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())  # Timestamp for update

    def __repr__(self):
        return (
            f"<Task(title={self.title}, completed={self.completed}, "
            f"created_at={self.created_at}, updated_at={self.updated_at})>"
        )

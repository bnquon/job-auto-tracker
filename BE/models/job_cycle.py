from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func
from db.database import Base

class JobCycle(Base):
  __tablename__ = "job_cycles"
  id = Column(Integer, primary_key=True, autoincrement=True)
  user_id = user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
  name = Column(String, nullable=False)
  date_created = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
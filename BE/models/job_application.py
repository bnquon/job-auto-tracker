import enum
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from db.database import Base

class StatusEnum(enum.Enum):
  applied = "applied"
  received_oa = "received_oa"
  rejected = "rejected"
  interviewing = "interviewing"
  offered = "offered"
  ghosted = "ghosted"

class JobApplication(Base):
  __tablename__ = "job_applications"
  id = Column(Integer, primary_key=True, autoincrement=True)
  user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
  cycle_id = Column(Integer, ForeignKey("job_cycles.id", ondelete="CASCADE"), nullable=False)
  company_name = Column(String, nullable=False)
  title = Column(String, nullable=False)
  link = Column(String, nullable=True)
  status = Column(String, nullable=True)
  notes = Column(String, nullable=True)
  updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now()) # will be used to calculate 2 week auto ghosting
  applied_on = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
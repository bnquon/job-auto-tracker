from datetime import datetime
from pydantic import BaseModel

class JobCycleBase(BaseModel):
  name: str

class JobCycleCreate(JobCycleBase):
  pass

class JobCycleUpdate(BaseModel):
  name: str

class JobCycleResponse(JobCycleBase):
  id: int
  user_id: int
  date_created: datetime

  class Config:
    from_attributes = True
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from models.job_application import StatusEnum

class JobApplicationBase(BaseModel):
  company_name: str
  title: str
  link: Optional[str]

class JobApplicationCreate(JobApplicationBase):
  user_id: Optional[int] = None
  status: Optional[StatusEnum] = None
  notes: Optional[str] = None
  applied_on: Optional[datetime] = None

  class Config:
    use_enum_values = True

class JobApplication(JobApplicationBase):
  id: int
  user_id: int
  updated_at: datetime
  status: StatusEnum
  notes: Optional[str] = None
  applied_on: Optional[datetime] = None
  # Pydantic expects dicts but sqlalchemy returns objects
  class Config:
    from_attributes = True

class JobApplicationUpdate(BaseModel):
  company_name: Optional[str] = None
  title: Optional[str] = None
  status: Optional[StatusEnum] = None
  link: Optional[str] = None
  notes: Optional[str] = None
  updated_at: Optional[datetime] = None # updating in the service layer after all form and user validation checks
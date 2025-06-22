from enum import Enum
from sqlalchemy.orm import Session
from typing import Sequence
from models.job_application import JobApplication
from schemas.job_application_schema import JobApplicationCreate, JobApplicationUpdate

def create_job_application(db: Session, job_application: JobApplicationCreate) -> JobApplication:
  new_app = JobApplication(**job_application.model_dump())
  db.add(new_app)
  db.commit()
  db.refresh(new_app)
  return new_app

def delete_job_application(db: Session, job_application_id: int, user_id: int) -> bool:
  try:
    db.query(JobApplication).filter(JobApplication.id == job_application_id, JobApplication.user_id == user_id).delete()
    db.commit()
    return True
  except Exception:
    db.rollback()
    return False

def edit_job_application(db: Session, job_application_id: int, job_application_updates: JobApplicationUpdate, user_id: int) -> bool:
  try:
    update_data = {
      key: (value.value if isinstance(value, Enum) else value)
      for key, value in job_application_updates.model_dump(exclude_unset=True).items()
    }
    db.query(JobApplication).filter(
      (JobApplication.id == job_application_id) &
      (JobApplication.user_id == user_id)
    ).update(
      {getattr(JobApplication, key): value for key, value in update_data.items()}
    )
    db.commit()
    return True
  except Exception:
    db.rollback()
    return False

def get_job_application(db: Session, user_id: int) -> Sequence[JobApplication]:
  return db.query(JobApplication).filter(JobApplication.user_id == user_id).all()
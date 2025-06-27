from fastapi import HTTPException, UploadFile
from schemas.job_application_schema import JobApplication, JobApplicationUpdate, JobApplicationCreate, StatusEnum
from services.ocr_service import extract_text_from_image
from services.gemini_service import get_job_info_from_text
from repository import job_application_repository
from sqlalchemy.orm import Session
from typing import Sequence
from datetime import datetime

def create_job_application(db: Session, job_application: JobApplicationCreate, user_id: int) -> JobApplication:
  job_application_data = job_application.model_dump()
  job_application_data["user_id"] = user_id
  job_application_data["applied_on"] = datetime.now()
  job_application_create = JobApplicationCreate(**job_application_data)
  return job_application_repository.create_job_application(db, job_application_create)

def extract_job_application_info(job_application_image: UploadFile) -> str:
  # validate user?
  if job_application_image.content_type not in ["image/jpeg", "image/png"]:
    raise ValueError("Invalid file type")
  
  if not job_application_image:
    raise ValueError("No file received")
  
  if job_application_image.size is not None and job_application_image.size > 5 * 1024 * 512:
    raise ValueError("File too large")
  
  extracted_text = extract_text_from_image(job_application_image)
  
  if not extracted_text:
    raise ValueError("Could not extract text from image")
  
  extracted_job_info_str = get_job_info_from_text(extracted_text)

  if extracted_job_info_str is None:
    raise ValueError("No extracted job info returned")
  
  return extracted_job_info_str

def delete_job_application(db: Session, job_application_id: int, user_id: int) -> None:
  deleted = job_application_repository.delete_job_application(db, job_application_id, user_id)
  
  if not deleted:
    raise HTTPException(status_code=404, detail="Deleting job application failed")

def edit_job_application(db: Session, job_application_id: int, job_application_updates: JobApplicationUpdate, user_id: int) -> None:
  # updating the updated_at column in the service layer
  job_application_updates.updated_at = datetime.now()
  edited = job_application_repository.edit_job_application(db, job_application_id, job_application_updates, user_id)
  
  if not edited:
    raise HTTPException(status_code=404, detail="Editing job application failed")

def get_job_application(db: Session, user_id: int, job_cycle_id: int) -> Sequence[JobApplication]:
  return job_application_repository.get_job_application(db, user_id, job_cycle_id)
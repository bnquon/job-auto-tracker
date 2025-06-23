from fastapi import APIRouter, Depends, UploadFile, File, status
from sqlalchemy.orm import Session
from db.database import get_db
from services.job_application_service import create_job_application, get_job_application, delete_job_application, edit_job_application, extract_job_application_info
from schemas.job_application_schema import JobApplicationCreate, JobApplicationUpdate
from auth.auth import get_current_user_id

router = APIRouter(
  prefix="/job_applications",
  tags=["job_applications"],
)

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_job_application_route(job_application: JobApplicationCreate, db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
  return create_job_application(db, job_application, user_id)

@router.post("/extract", status_code=status.HTTP_201_CREATED)
def extract_job_info_route(job_application_image: UploadFile = File(...), _ = Depends(get_current_user_id)):
  return extract_job_application_info(job_application_image)

@router.get("/", status_code=status.HTTP_200_OK)
def get_job_application_route(db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
  return get_job_application(db, user_id)

@router.delete("/{job_application_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job_application_route(job_application_id: int, db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
  return delete_job_application(db, job_application_id, user_id)
  
@router.put("/{job_application_id}", status_code=status.HTTP_200_OK)
def edit_job_application_route(job_application_id: int, job_application_updates: JobApplicationUpdate, db: Session = Depends(get_db), user_id: int = Depends(get_current_user_id)):
  return edit_job_application(db, job_application_id, job_application_updates, user_id)
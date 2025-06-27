# controllers/job_cycle_controller.py

from typing import Sequence
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from schemas.job_cycle_schema import JobCycleCreate, JobCycleResponse
from services import job_cycle_service as service
from auth.auth import get_current_user_id
from db.database import get_db

router = APIRouter(
  prefix="/job_cycles",
  tags=["job_cycles"],
)

@router.get("/", response_model=Sequence[JobCycleResponse])
def get_job_cycles_route(
  db: Session = Depends(get_db),
  user_id: int = Depends(get_current_user_id),
):
  return service.get_job_cycles(db, user_id)


@router.post("/", response_model=JobCycleResponse, status_code=status.HTTP_201_CREATED)
def create_job_cycle_route(
  job_cycle: JobCycleCreate,
  db: Session = Depends(get_db),
  user_id: int = Depends(get_current_user_id),
):
  return service.create_job_cycle(db, job_cycle, user_id)

@router.delete("/{job_cycle_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job_cycle_route(
  job_cycle_id: int,
  db: Session = Depends(get_db),
  user_id: int = Depends(get_current_user_id),
):
  return service.delete_job_cycle(db, job_cycle_id, user_id)

@router.put("/{job_cycle_id}", response_model=JobCycleResponse)
def edit_job_cycle_name_route(
  job_cycle_id: int,
  job_cycle_updates: JobCycleCreate,
  db: Session = Depends(get_db),
  user_id: int = Depends(get_current_user_id),
):
  return service.edit_job_cycle_name(db, job_cycle_id, job_cycle_updates.name, user_id)

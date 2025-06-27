from typing import Sequence
from sqlalchemy.orm import Session
from schemas.job_cycle_schema import JobCycleCreate
from models.job_cycle import JobCycle
from typing import Sequence
from sqlalchemy.orm import Session
from models.job_cycle import JobCycle
from schemas.job_cycle_schema import JobCycleCreate
import repository.job_cycle_repository as repo

def create_job_cycle(db: Session, job_cycle_data: JobCycleCreate, user_id: int) -> JobCycle:
  job_cycle = JobCycle(user_id=user_id, name=job_cycle_data.name)
  return repo.create_job_cycle(db, job_cycle)


def get_job_cycles(db: Session, user_id: int) -> Sequence[JobCycle]:
  return repo.get_job_cycles(db, user_id)


def delete_job_cycle(db: Session, job_cycle_id: int, user_id: int) -> bool:
  return repo.delete_job_cycle(db, job_cycle_id, user_id)


def edit_job_cycle_name(db: Session, job_cycle_id: int, name: str, user_id: int) -> bool:
  return repo.edit_job_cycle_name(db, job_cycle_id, name, user_id)

def create_default_job_cycle(db: Session, user_id: int) -> JobCycle:
  return create_job_cycle(db, JobCycleCreate(name="Default"), user_id)
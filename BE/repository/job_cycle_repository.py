from typing import Sequence
from sqlalchemy.orm import Session
from models.job_cycle import JobCycle

def create_job_cycle(db: Session, job_cycle: JobCycle) -> JobCycle:
  try:
    db.add(job_cycle)
    db.commit()
    db.refresh(job_cycle)
    return job_cycle
  except Exception as e:
    db.rollback()
    raise e

def get_job_cycles(db: Session, user_id: int) -> Sequence[JobCycle]:
  try:
    return db.query(JobCycle).filter(JobCycle.user_id == user_id).all()
  except Exception as e:
    raise e

def delete_job_cycle(db: Session, job_cycle_id: int, user_id: int) -> bool:
  try:
    job_cycle = db.query(JobCycle).filter(
        JobCycle.id == job_cycle_id, JobCycle.user_id == user_id
    ).first()
    if not job_cycle:
        return False
    db.delete(job_cycle)
    db.commit()
    return True
  except Exception as e:
    db.rollback()
    raise e

def edit_job_cycle_name(db: Session, job_cycle_id: int, name: str, user_id: int) -> bool:
  try:
    updated = db.query(JobCycle).filter(JobCycle.id == job_cycle_id, JobCycle.user_id == user_id).update({"name": name})
    db.commit()
    return bool(updated)
  except Exception as e:
    db.rollback()
    raise e
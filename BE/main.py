from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import users_controller, job_application_controller, auth_controller, job_cycle_controller

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "https://ss-job-auto-tracker.vercel.app"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(users_controller.router)
app.include_router(job_application_controller.router)
app.include_router(auth_controller.router)
app.include_router(job_cycle_controller.router)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import users_controller, job_application_controller

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(users_controller.router)
app.include_router(job_application_controller.router)
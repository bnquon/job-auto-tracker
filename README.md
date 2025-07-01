# Job Dashboard

Never fill out another spreadsheet to keep track of your jobs, upload a screenshot and extract job info automatically! 
This is a job tracking dashboard with JWT token authentication and Notion-style tabs to manage multiple job cycles easily. Visualize your job applications with graphs and stay organized!

## Features

- JWT token-based authentication for secure access  
- Support for multiple job cycles with intuitive tab navigation  
- Beautiful charts and graphs to track your application progress  
- Uses OCR and Google Gemini to extract job info automatically from job screenshots — no more manual form filling!  
- Dockerized backend running on AWS EC2 with an RDS database  
- Frontend deployed on Vercel with a reverse proxy to handle HTTP/HTTPS issues  

## What’s Done

- Migrated database from local to AWS RDS 
- Created and pushed a Docker image of the backend  
- Set up an EC2 instance to run the backend container successfully  
- Frontend deployed on Vercel (note: backend must be running on EC2 for full functionality)  
- Optimized images and video assets for performance  
- Implemented a reverse proxy on frontend to bypass HTTP/HTTPS mismatch  

## Demo

Check out the dashboard in action:  
[Watch the demo video](https://streamable.com/1kjhob)

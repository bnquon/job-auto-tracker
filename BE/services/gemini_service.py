from google import genai
import json
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
model = os.getenv("MODEL_ID", "")
pre_prompt = os.getenv("GEMINI_PREPROMPT", "")


def get_job_info_from_text(text: str) -> str | None:
  print(text)
  if not api_key or not model:
    print(api_key)
    print(model)
    raise ValueError("GOOGLE_API_KEY or MODEL_ID is not set")
  
  client = genai.Client(api_key=api_key)

  response = client.models.generate_content(
    model=model,
    contents=
      pre_prompt + text,
    config={
      "max_output_tokens": 512,
      "temperature": 0.2
    }
  )
  
  if not response.text:
    raise ValueError("Gemini has no response")
  
  sanitizedText = response.text.strip("```").removeprefix("json")
  return json.loads(sanitizedText) 
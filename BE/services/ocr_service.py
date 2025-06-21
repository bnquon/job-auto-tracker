import pytesseract
from PIL import Image
from fastapi import UploadFile

def extract_text_from_image(file: UploadFile) -> str:
  try:
    extracted_text: str = pytesseract.image_to_string(Image.open(file.file))
  except Exception as e:
    raise e

  return extracted_text
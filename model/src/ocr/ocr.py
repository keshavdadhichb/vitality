# Minimal OCR wrapper example (tesseract required)
from pdf2image import convert_from_path
import pytesseract

def pdf_to_text(pdf_path):
    pages = convert_from_path(pdf_path)
    texts = []
    for p in pages:
        texts.append(pytesseract.image_to_string(p))
    return "\n".join(texts)
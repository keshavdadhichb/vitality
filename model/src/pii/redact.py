import re
def redact_text(text: str) -> str:
    """Very small example of PII masking. Replace with production-safe logic."""
    if text is None:
        return text
    # mask long digit sequences (account numbers)
    text = re.sub(r'\b\d{9,20}\b', lambda m: 'X'*(len(m.group(0))-4) + m.group(0)[-4:], text)
    # mask Aadhaar-like patterns (4 4 4)
    text = re.sub(r'\b\d{4}\s?\d{4}\s?\d{4}\b', '[REDACTED_AADHAAR]', text)
    # mask phone numbers (basic)
    text = re.sub(r'\b\d{10}\b', lambda m: m.group(0)[:6] + 'XXXX', text)
    return text
import json, datetime, uuid, os
AUDIT_FILE = os.getenv('AUDIT_FILE','audit.log')

def write_audit(actor, action, resource, fields, pii_redacted, purpose, extra=None):
    entry = {
        "event_id": str(uuid.uuid4()),
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
        "actor": actor,
        "action": action,
        "resource": resource,
        "fields_accessed": fields,
        "pii_redacted": pii_redacted,
        "purpose": purpose,
        "extra": extra or {}
    }
    with open(AUDIT_FILE, "a") as f:
        f.write(json.dumps(entry) + "\n")
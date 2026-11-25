#!/usr/bin/env python3
"""Mercury Search: pagine del sito e iscrizione alle notifiche.

Avvio, dalla cartella del sito:

    python3 server.py

Ascolta su http://localhost:8765/. La radice è index.html.
Le iscrizioni POST /api/iscrizioni finiscono in data/iscrizioni.json,
che non viene servito.
"""

import json
import os
import re
import threading
from datetime import datetime, timezone
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse

ROOT = Path(__file__).resolve().parent
DATA_FILE = ROOT / "data" / "iscrizioni.json"
HOST = "0.0.0.0"
PORT = 8765
MAX_BODY = 4096
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
LOCK = threading.Lock()


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        if self._blocked():
            self.send_error(404)
            return
        super().do_GET()

    def do_HEAD(self):
        if self._blocked():
            self.send_error(404)
            return
        super().do_HEAD()

    def do_POST(self):
        path = unquote(urlparse(self.path).path)
        if path != "/api/iscrizioni":
            self.send_error(404)
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self._json(400, {"ok": False, "error": "Richiesta non valida."})
            return
        if length <= 0 or length > MAX_BODY:
            self._json(400, {"ok": False, "error": "Richiesta non valida."})
            return
        raw = self.rfile.read(length)
        email = self._email_from(raw)
        if email is None:
            self._json(400, {"ok": False, "error": "Richiesta non valida."})
            return
        if not EMAIL_RE.match(email) or len(email) > 254:
            self._json(400, {"ok": False, "error": "Inserisci un'email valida."})
            return
        already = store_signup(email)
        if already:
            message = "Questa email è già iscritta. Ti avvisiamo sui nuovi capi e sugli aggiornamenti."
        else:
            message = "Iscrizione registrata. Ti avvisiamo sui nuovi capi e sugli aggiornamenti."
        self._json(200, {"ok": True, "already": already, "email": email, "message": message})

    def _blocked(self):
        local = Path(self.translate_path(self.path)).resolve()
        try:
            rel = local.relative_to(ROOT)
        except ValueError:
            return True
        return bool(rel.parts) and rel.parts[0] == "data"

    def _email_from(self, raw):
        try:
            text = raw.decode("utf-8")
        except UnicodeDecodeError:
            return None
        ctype = self.headers.get("Content-Type", "")
        if "application/json" in ctype:
            try:
                payload = json.loads(text or "{}")
            except json.JSONDecodeError:
                return None
            if not isinstance(payload, dict):
                return None
            return str(payload.get("email", "")).strip()
        return parse_qs(text).get("email", [""])[0].strip()

    def _json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)


def store_signup(email):
    """Salva l'email. Ritorna True se era già presente."""
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    with LOCK:
        rows = []
        if DATA_FILE.exists():
            try:
                loaded = json.loads(DATA_FILE.read_text(encoding="utf-8"))
                if isinstance(loaded, list):
                    rows = loaded
            except json.JSONDecodeError:
                rows = []
        now = datetime.now(timezone.utc).replace(microsecond=0).isoformat()
        for row in rows:
            if str(row.get("email", "")).lower() == email.lower():
                row["updatedAt"] = now
                _write_rows(rows)
                return True
        rows.append({"email": email, "createdAt": now})
        _write_rows(rows)
        return False


def _write_rows(rows):
    blob = json.dumps(rows, indent=2, ensure_ascii=False) + "\n"
    tmp = DATA_FILE.with_suffix(".json.tmp")
    fd = os.open(tmp, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(fd, "w", encoding="utf-8") as handle:
        handle.write(blob)
    os.replace(tmp, DATA_FILE)
    os.chmod(DATA_FILE, 0o600)


def main():
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"Mercury Search su http://localhost:{PORT}/", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer fermato.", flush=True)
    finally:
        server.server_close()


if __name__ == "__main__":
    main()

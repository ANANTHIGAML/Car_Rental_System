# Car Rental System (Professional Portfolio Edition)

This is a compact, interview‑friendly full‑stack demo that showcases API design,
data modeling, and frontend integration. Ideal for a portfolio or hiring
conversation: easy to run, inspect, and extend.

---

Why this project is interview‑ready

- Clear REST API (FastAPI) with OpenAPI docs — easy to review endpoints and schemas.
- Well-separated backend layers: SQLAlchemy models, CRUD service layer, and API routes.
- Frontend built with React + Vite: modular components and a small, testable API client.
- Dev-friendly: seed data, init script, short run instructions, and tests.

---

Tech stack

- Backend: Python, FastAPI, SQLAlchemy, SQLite, Uvicorn
- Frontend: React, Vite, Axios
- Testing: pytest

---

Quick start (Windows PowerShell)

1) Backend — create venv, install deps, seed DB, run server

```powershell
cd D:\task-management-system\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Seed the DB with sample cars
python init_db.py

# Start the API (ensure backend folder is on PYTHONPATH)
$env:PYTHONPATH = (Get-Location).Path
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

2) Frontend — install and run

```powershell
cd D:\task-management-system\frontend
npm install
npm run dev
```

Open the URL Vite prints, e.g. `http://localhost:5173` (it may pick 5174/5175).

---

API overview

- GET `/cars/` — list cars
- GET `/cars/{car_id}` — car details with rentals
- POST `/cars/{car_id}/rent` — create a rental (renter_name, renter_email, start_date, end_date)
- DELETE `/rentals/{rental_id}` — cancel a rental

Use the Swagger UI at `/docs` to interact with endpoints.

---

Troubleshooting (quick)

- Network error in frontend: ensure backend is running and reachable from the browser (open `http://127.0.0.1:8000/`). Confirm `frontend/src/api.js` points to the correct base URL.
- CORS: if you serve frontend under a non‑localhost origin (LAN IP), add that origin to `backend/app/main.py` `allow_origins` or use `allow_origins=["*"]` temporarily.
- `ModuleNotFoundError: No module named 'app'`: run uvicorn from `backend/` and set `PYTHONPATH` as shown.

---

Tests

```powershell
cd D:\task-management-system\backend
.\.venv\Scripts\Activate.ps1
pytest -q
```

---

How to present this in an interview

1. Run backend + frontend locally and demo the user flow (list → rent → cancel).
2. Walk through `backend/app` to explain data models and endpoint behavior.
3. Walk through `frontend/src` to explain component structure and API client.
4. Discuss next steps to scale to production (auth, conflict checks, CI).

---

Portfolio / hiring additions (I can add these for you)

- `HIREME.md` — short page describing your role, responsibilities, tech choices, and measurable outcomes (great for recruiters).
- `.gitignore` and `LICENSE` (MIT) files.
- Small GIF or screenshot of the running UI to showcase in the GitHub repo (I can produce one if you run the app and share a quick screen capture).

---

If you want, I will:

- Replace the current `README.md` with this polished version and commit it.
- Add `HIREME.md`, `.gitignore`, and `LICENSE` (MIT).
- Prepare a branch/commit ready to push to GitHub.

Tell me which of these you want next and I’ll apply it.

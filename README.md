# Car Rental System

This repository contains a FastAPI backend (SQLite), a React frontend (Vite), and scripts to generate a Python SDK from the OpenAPI spec.

Quick start (Windows PowerShell)

1. Setup (one-time)

```powershell
cd d:\task-management-system
.\setup.ps1
```

2. Start the app (opens new windows for backend and frontend)

```powershell
cd d:\task-management-system
.\start.ps1
```

3. Backend
- API: http://127.0.0.1:8000
- OpenAPI: http://127.0.0.1:8000/openapi.json
- Swagger UI: http://127.0.0.1:8000/docs

4. Frontend
- Dev server: http://localhost:5173

5. Generate Python SDK (backend must be running):

```powershell
cd d:\task-management-system
.\generate_sdk.ps1
```

6. Run tests (backend venv must be activated):

```powershell
cd d:\task-management-system\backend
.\.venv\Scripts\Activate.ps1
pytest -q
```

Files added/changed
- `backend/init_db.py` - create DB tables and run `seed_data.sql`
- `backend/seed_data.sql` - sample cars
- `backend/app/models.py`, `schemas.py`, `crud.py`, `main.py` - updated to Car/Rental API
- `frontend/src/api.js` - axios helpers
- `frontend/src/components/CarList.jsx`, `RentalForm.jsx`, `CancelRental.jsx` - frontend UI
- `setup.ps1`, `start.ps1`, `generate_sdk.ps1` - convenience scripts
- `backend/app/tests/test_rentals.py` - basic unit test

Notes
- If ports differ, update `frontend/src/api.js` or pass a different `--port` to `uvicorn`.
- The SDK generator requires `npx` (Node) to be available.

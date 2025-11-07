# Car Rental System 🚗

A full-stack car rental platform built using **FastAPI (backend)**, **React + Vite (frontend)**, and **SQLite (database)**.  
It includes an **auto-generated Python SDK** (via OpenAPI Generator CLI) and automation scripts for easy setup and execution.



## 🌟 Features

- **Backend**: FastAPI service with SQLite database
  - Add new cars
  - View all available cars
  - View specific car details
  - Rent a car for a specified period
  - Cancel an active rental
- **Frontend**: React + Vite
  - View available cars with details (make, model, year, daily rate)
  - Rent a car (select car, enter user details, rental period)
  - Cancel a rental
- **Python SDK**: Generated from OpenAPI spec for easy API integration
- **Automation scripts**:
  - Setup environment, install dependencies, initialize database
  - Start backend and frontend servers

---

## 📦 Tech Stack

- **Backend**: Python, FastAPI, SQLAlchemy, SQLite, Uvicorn
- **Frontend**: React, Vite, Axios
- **Testing**: Pytest
- **SDK**: OpenAPI Generator CLI (Python)

 ## 🎯 Objective

To develop a Car Rental System that:

- Provides CRUD operations for cars and rentals.
- Enforces rental date validation and car availability logic.
- Uses **FastAPI** for the backend with an **SQLite database**.
- Implements a **ReactJS frontend** that communicates with the backend via REST API.
- Automatically generates a **Python SDK** from the OpenAPI specification.
- Includes **setup and start automation scripts** for simplified execution.

---

## 🌐 Frontend Features

- ✅ View all available cars
- ✅ Rent a car by entering name & rental period
- ✅ Cancel an existing rental
- ✅ Real-time updates for availability (optional extension)




## 🚀 Quick Start

### 1️⃣ Backend Setup

```powershell
cd D:\task-management-system\backend

# Create virtual environment
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Seed database with sample cars
python init_db.py

# Start FastAPI server
$env:PYTHONPATH = (Get-Location).Path
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

Swagger UI: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) 

---



👩‍💻 Author

Ananthiga M.L
🎓 MSc in Decision and Computing Science | CIT College
💡 Interests: Machine Learning, Data Analytics, Full Stack, and Generative AI
📫 Connect with me: LinkedIn
 | GitHub


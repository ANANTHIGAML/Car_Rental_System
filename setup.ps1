# setup.ps1 - set up python venv, install backend deps, init DB and install frontend deps
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force

$repo = Resolve-Path .
Write-Host "Creating virtual environment .venv in repo root..."
python -m venv .venv
Write-Host "Activating venv and installing backend requirements..."
.\.venv\Scripts\Activate.ps1
cd backend
pip install -r requirements.txt
Write-Host "Initializing database and seeding data..."
python init_db.py
cd ..

Write-Host "Installing frontend npm dependencies..."
cd frontend
npm install

Write-Host "Setup completed. Use .\start.ps1 to run the app."
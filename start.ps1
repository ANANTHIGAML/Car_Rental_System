# start.ps1 - start backend and frontend in new PowerShell windows
$repo = Resolve-Path .

# Start backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command cd $repo\backend; .\..\.venv\Scripts\Activate.ps1; uvicorn app.main:app --reload"

# Start frontend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command cd $repo\frontend; npm run dev"

Write-Host "Started backend and frontend in separate windows."
# Start City Stress Dashboard Backend
# This script starts the Flask API server on localhost:5000

Write-Host "=================================" -ForegroundColor Cyan
Write-Host "City Stress Dashboard - Backend Startup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptPath = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
$backendPath = Join-Path -Path $scriptPath -ChildPath "backend"

Write-Host "Backend directory: $backendPath" -ForegroundColor Yellow
Write-Host ""

# Check if requirements are installed
Write-Host "Checking Python environment..." -ForegroundColor Yellow
python --version

Write-Host ""
Write-Host "Installing/updating requirements..." -ForegroundColor Yellow
Set-Location $backendPath
pip install -r requirements.txt

Write-Host ""
Write-Host "Starting Flask server on http://localhost:5000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Green
Write-Host ""

# Start the Flask app
python app.py

Write-Host ""
Write-Host "Backend stopped." -ForegroundColor Yellow
Read-Host "Press Enter to close this window"

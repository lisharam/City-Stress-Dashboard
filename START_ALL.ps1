# City Stress Dashboard - Complete Startup Script
# Starts both backend API and frontend server

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "City Stress Dashboard - Full Stack Start" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Starting Backend Flask API (Port 5000)..." -ForegroundColor Yellow
$backendProcess = Start-Process -FilePath "python" -ArgumentList "$scriptDir\backend\app.py" -PassThru -NoNewWindow
Write-Host "✓ Backend started (PID: $($backendProcess.Id))" -ForegroundColor Green
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "Starting Frontend HTTP Server (Port 8000)..." -ForegroundColor Yellow
$frontendProcess = Start-Process -FilePath "python" -ArgumentList "-m http.server 8000" -WorkingDirectory $scriptDir -PassThru -NoNewWindow
Write-Host "✓ Frontend started (PID: $($frontendProcess.Id))" -ForegroundColor Green
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✓ All servers started successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: http://localhost:8000/index.html" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:5000/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Yellow
Write-Host ""

# Wait for both processes
$backendProcess | Wait-Process
$frontendProcess | Wait-Process

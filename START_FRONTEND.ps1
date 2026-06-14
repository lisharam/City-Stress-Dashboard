# Start Web Server for City Stress Dashboard
# This serves the frontend files via HTTP on port 8000

Write-Host "=================================" -ForegroundColor Cyan
Write-Host "City Stress Dashboard - Frontend Server" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

$projectPath = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent

Write-Host "Starting web server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Open your browser and go to:" -ForegroundColor Green
Write-Host "  http://localhost:8000/index.html" -ForegroundColor Green
Write-Host ""
Write-Host "Make sure the backend is also running in another terminal:" -ForegroundColor Yellow
Write-Host "  cd backend" -ForegroundColor Gray
Write-Host "  python app.py" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the HTTP server
Set-Location $projectPath
python -m http.server 8000

Write-Host ""
Write-Host "Web server stopped." -ForegroundColor Yellow
Read-Host "Press Enter to close this window"

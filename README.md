# 🌆 City Stress Dashboard

A professional real-time dashboard for monitoring urban stress metrics across traffic, noise pollution, utilities, and healthcare systems.

## ✨ Features

- **Real-time Stress Analytics** - Monitor 4 key stress dimensions
- **Interactive Visualizations** - Charts and graphs for trend analysis
- **Predictive Models** - Traffic forecasting based on weather and events
- **Multi-City Support** - Coverage for 150+ Indian cities
- **Responsive Design** - Optimized for desktop and mobile
- **Secure Login** - Session management with localStorage

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- Windows PowerShell
- Modern web browser

### Installation & Launch

#### Option 1: Automatic (Recommended)
```powershell
.\START_ALL.ps1
```

#### Option 2: Manual
```powershell
# Terminal 1 - Start Backend
.\START_BACKEND.ps1

# Terminal 2 - Start Frontend
.\START_FRONTEND.ps1
```

Then open **http://localhost:8000** in your browser

### Backend Only
```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend API runs on `http://localhost:5000`

## 📊 Dashboard Overview

**Home Dashboard** - Displays aggregated stress metrics:
- Traffic Stress
- Noise Level
- Utility Status
- Healthcare Pressure

**Detail Pages** - In-depth analysis for each metric:
- **Traffic** - Congestion patterns, hotspots, and 24-hour predictions
- **Noise** - Pollution zones and health impact analysis
- **Utility** - Power outages and water supply forecasts
- **Healthcare** - Hospital capacity and service availability

## 🔐 Default Login

```
Email: test@example.com
Password: password123
```

After login, select:
- **State**: Bihar
- **District**: Muzaffarpur
- **City**: Muzaffarpur

## 📁 Project Structure

```
City_Stress_Dashboard/
├── index.html                    # Login page
├── home.html                     # Main dashboard
├── traffic-details.html          # Traffic analysis
├── healthcare-details.html       # Healthcare metrics
├── utility-details.html          # Utility analysis
├── noise-details.html            # Noise pollution
├── apiService.js                 # API wrapper
├── locationManager.js            # Location management
├── data.js                        # Fallback data & charts
├── style.css                      # Styling
├── START_ALL.ps1                 # Auto startup script
├── START_BACKEND.ps1             # Backend launcher
├── START_FRONTEND.ps1            # Frontend launcher
└── backend/
    ├── app.py                    # Flask API server
    └── requirements.txt          # Python dependencies
```

## 🔌 API Reference

### Get City Stress Data
```
GET /api/cityData?city=<city_name>
```

**Response:**
```json
{
  "city": "Muzaffarpur",
  "success": true,
  "data": {
    "traffic": { "stress": 66, "congestion": 63, ... },
    "noise": { "stress": 59, "level": 60, ... },
    "utility": { "stress": 53, "outages": 2, ... },
    "healthcare": { "stress": 52, "hospitals": 8, ... },
    "hourlyPeaks": [...],
    "weeklyTrend": [...]
  }
}
```

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Backend | Python Flask with CORS |
| Visualization | Chart.js |
| Server | Python HTTP Server (port 8000) |
| API | RESTful JSON |
| Storage | Browser localStorage |

## 📱 Supported Cities

System monitors 150+ cities across Indian states with focus on:
- Bihar (Muzaffarpur, Kanti, Darbhanga, Patna, etc.)
- Real-time stress metric generation
- Historical trend data

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## ⚙️ Configuration

### Change API Port
Edit `backend/app.py`:
```python
app.run(host='0.0.0.0', port=5000, debug=False)
```

### Change Frontend Port
Edit `START_FRONTEND.ps1`:
```powershell
python -m http.server 8000
```

### Add New Cities
Edit `backend/app.py` in the `generate_city_stress_data()` function

## 📊 Stress Metrics Explained

| Metric | Range | Status |
|--------|-------|--------|
| Traffic Stress | 0-100 | Low (0-33), Moderate (34-66), High (67-100) |
| Noise Level | dB | Safe (<55), Moderate (55-70), Unsafe (>70) |
| Utility Status | 0-100 | Good (0-33), Fair (34-66), Critical (67-100) |
| Healthcare Load | 0-100 | Low (0-33), Moderate (34-66), High (67-100) |

## 🔄 Maintenance

### Clear Browser Cache
Press `Ctrl+Shift+Del` and clear cache in your browser

### Restart Services
```powershell
# Kill all Python processes and restart
Get-Process python | Stop-Process -Force
.\START_ALL.ps1
```

## 📈 Performance

- Dashboard loads in < 2 seconds
- API responds in < 500ms
- Chart rendering optimized for smooth transitions

---

**Version**: 1.0.0 | **Status**: Production Ready ✅

For issues or questions, contact the development team.

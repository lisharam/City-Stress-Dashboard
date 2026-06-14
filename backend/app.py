"""
City Stress Dashboard - Flask Backend
Provides location data and city stress metrics via REST API
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import random

app = Flask(__name__)

# Enable CORS with detailed configuration for localhost
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:*", "http://127.0.0.1:*"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True,
        "max_age": 3600
    }
})

# ============================================================================
# DATA IMPORT (from cityDatabase structure - kept here for production)
# ============================================================================

# Maps for cascading dropdowns
STATE_DISTRICT_MAP = {
    'Andhra Pradesh': ['Visakhapatnam','Krishna','Guntur','Chittoor'],
    'Arunachal Pradesh': ['Papum Pare','Tawang','Lower Subansiri'],
    'Assam': ['Kamrup Metropolitan','Cachar','Dibrugarh','Jorhat'],
    'Bihar': ['Patna','Gaya','Muzaffarpur','Bhagalpur'],
    'Chhattisgarh': ['Raipur','Durg','Bilaspur'],
    'Goa': ['North Goa','South Goa'],
    'Gujarat': ['Ahmedabad','Surat','Vadodara','Rajkot'],
    'Haryana': ['Gurugram','Faridabad','Panipat','Ambala'],
    'Himachal Pradesh': ['Shimla','Kangra','Mandi'],
    'Jharkhand': ['Ranchi','Dhanbad','East Singhbhum'],
    'Karnataka': ['Bengaluru Urban','Mysuru','Dakshina Kannada','Dharwad'],
    'Kerala': ['Thiruvananthapuram','Ernakulam','Kozhikode','Thrissur'],
    'Madhya Pradesh': ['Bhopal','Indore','Gwalior','Jabalpur'],
    'Maharashtra': ['Mumbai City','Mumbai Suburban','Pune','Nagpur','Nashik'],
    'Manipur': ['Imphal West','Imphal East'],
    'Meghalaya': ['East Khasi Hills','West Garo Hills'],
    'Mizoram': ['Aizawl','Lunglei'],
    'Nagaland': ['Kohima','Dimapur'],
    'Odisha': ['Khordha','Cuttack','Ganjam','Sambalpur'],
    'Punjab': ['Amritsar','Ludhiana','Jalandhar','Patiala'],
    'Rajasthan': ['Jaipur','Jodhpur','Udaipur','Kota'],
    'Sikkim': ['East Sikkim','West Sikkim'],
    'Tamil Nadu': ['Chennai','Coimbatore','Madurai','Tiruchirappalli'],
    'Telangana': ['Hyderabad','Warangal','Nizamabad'],
    'Tripura': ['West Tripura','South Tripura'],
    'Uttar Pradesh': ['Lucknow','Kanpur Nagar','Agra','Varanasi','Gautam Buddha Nagar'],
    'Uttarakhand': ['Dehradun','Haridwar','Nainital'],
    'West Bengal': ['Kolkata','Howrah','Darjeeling','Hooghly'],
    'Delhi': ['New Delhi','North Delhi','South Delhi'],
    'Jammu & Kashmir': ['Srinagar','Jammu'],
    'Ladakh': ['Leh','Kargil'],
    'Puducherry': ['Puducherry'],
    'Chandigarh': ['Chandigarh'],
    'Dadra & Nagar Haveli and Daman & Diu': ['Daman','Silvassa'],
    'Andaman & Nicobar Islands': ['Port Blair'],
    'Lakshadweep': ['Kavaratti']
}

DISTRICT_CITY_MAP = {
    'Bengaluru Urban': ['Bengaluru','Yelahanka','Whitefield','Koramangala'],
    'Mysuru': ['Mysuru','Mandya'],
    'Dakshina Kannada': ['Mangalore','Udupi'],
    'Dharwad': ['Dharwad','Hubballi'],
    'Mumbai City': ['Mumbai','Bandra','Colaba'],
    'Mumbai Suburban': ['Thane','Navi Mumbai'],
    'Pune': ['Pune','Hinjewadi','Wakad'],
    'Nagpur': ['Nagpur'],
    'Nashik': ['Nashik'],
    'Hyderabad': ['Hyderabad','Secunderabad'],
    'Warangal': ['Warangal'],
    'Nizamabad': ['Nizamabad'],
    'Chennai': ['Chennai','Velachery'],
    'Coimbatore': ['Coimbatore'],
    'Madurai': ['Madurai'],
    'Tiruchirappalli': ['Tiruchirappalli'],
    'New Delhi': ['New Delhi','Connaught Place'],
    'North Delhi': ['North Delhi','Chandni Chowk'],
    'South Delhi': ['South Delhi','Lajpat Nagar'],
}

# ============================================================================
# CITY DATABASE (Stress metrics for each city)
# ============================================================================

# Helper function to generate realistic stress data for any city
def generate_city_stress_data(traffic_base=70, noise_base=70, utility_base=50, healthcare_base=65):
    """Generate realistic stress data for a city with variation"""
    import random
    random.seed(hash(traffic_base + noise_base) % 2**32)  # Deterministic but different for each city
    
    # Common hospital names that vary by area
    hospital_names = [
        ['Apollo Hospital', 'Max Healthcare', 'Fortis Hospital'],
        ['Manipal Hospital', 'Narayana Health', 'Sparsh Hospital'],
        ['Cloudnine Hospital', 'Seven Hills Hospital', 'Kokilaben Hospital'],
        ['Lilavati Hospital', 'HN Reliance Hospital', 'Breach Candy Hospital'],
        ['CARE Hospital', 'Aster Hospital', 'Yashoda Hospital'],
    ]
    
    # Generate hospitals by area
    area_hospitals = [
        {'area': 'Central District', 'hospitals': [
            {'name': random.choice(hospital_names[0]), 'beds': random.randint(200, 400), 'occupancy': max(50, min(100, healthcare_base + 15 + random.randint(-10, 10))), 'erWait': max(20, min(120, int((healthcare_base - 40) * 1.5)))},
            {'name': random.choice(hospital_names[1]), 'beds': random.randint(150, 300), 'occupancy': max(50, min(100, healthcare_base + 10 + random.randint(-5, 10))), 'erWait': max(15, min(100, int((healthcare_base - 45) * 1.5)))},
        ]},
        {'area': 'North Zone', 'hospitals': [
            {'name': random.choice(hospital_names[2]), 'beds': random.randint(180, 350), 'occupancy': max(50, min(100, healthcare_base + 8 + random.randint(-8, 8))), 'erWait': max(15, min(100, int((healthcare_base - 50) * 1.4)))},
        ]},
        {'area': 'South Zone', 'hospitals': [
            {'name': random.choice(hospital_names[3]), 'beds': random.randint(200, 380), 'occupancy': max(50, min(100, healthcare_base + 12 + random.randint(-6, 10))), 'erWait': max(20, min(120, int((healthcare_base - 35) * 1.6)))},
            {'name': random.choice(hospital_names[4]), 'beds': random.randint(120, 250), 'occupancy': max(50, min(100, healthcare_base + 5 + random.randint(-8, 15))), 'erWait': max(15, min(100, int((healthcare_base - 50) * 1.3)))},
        ]},
        {'area': 'East Zone', 'hospitals': [
            {'name': random.choice(hospital_names[1]), 'beds': random.randint(160, 300), 'occupancy': max(50, min(100, healthcare_base + 10 + random.randint(-10, 10))), 'erWait': max(18, min(110, int((healthcare_base - 45) * 1.5)))},
        ]},
    ]
    
    return {
        'traffic': {
            'stress': max(20, min(95, traffic_base + random.randint(-15, 15))),
            'congestion': max(20, min(95, traffic_base - 10 + random.randint(-10, 15))),
            'avgDelay': max(5, min(60, int((traffic_base - 40) * 1.2)))
        },
        'noise': {
            'stress': max(20, min(95, noise_base + random.randint(-15, 15))),
            'level': max(60, min(95, noise_base + 5 + random.randint(-10, 10))),
            'affectedAreas': random.randint(3, 25)
        },
        'utility': {
            'stress': max(20, min(95, utility_base + random.randint(-15, 15))),
            'powerOutages': random.randint(0, 8),
            'waterZones': random.randint(1, 12)
        },
        'healthcare': {
            'stress': max(20, min(95, healthcare_base + random.randint(-15, 15))),
            'occupancy': max(50, min(100, healthcare_base + 15 + random.randint(-10, 10))),
            'erWaitTime': max(20, min(120, int((healthcare_base - 40) * 1.5)))
        },
        'hospitals': area_hospitals,
        'ambulanceResponse': [
            {'zone': 'Central District', 'time': max(5, min(30, int((healthcare_base - 40) / 2) + random.randint(-5, 5))), 'status': 'Good' if healthcare_base < 70 else 'Moderate'},
            {'zone': 'North Zone', 'time': max(5, min(25, int((healthcare_base - 45) / 2) + random.randint(-3, 5))), 'status': 'Good'},
            {'zone': 'South Zone', 'time': max(8, min(35, int((healthcare_base - 35) / 2) + random.randint(-5, 8))), 'status': 'Moderate' if healthcare_base > 60 else 'Good'},
            {'zone': 'East Zone', 'time': max(6, min(28, int((healthcare_base - 42) / 2) + random.randint(-4, 6))), 'status': 'Good' if healthcare_base < 65 else 'Moderate'},
        ],
        'hourlyPeaks': {
            'hours': ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
            'stress': [
                max(15, traffic_base - 50 + random.randint(-5, 5)),
                max(10, traffic_base - 55 + random.randint(-5, 5)),
                max(8, traffic_base - 60 + random.randint(-5, 5)),
                max(20, traffic_base - 40 + random.randint(-5, 5)),
                max(50, traffic_base - 15 + random.randint(-5, 5)),
                max(70, traffic_base + 10 + random.randint(-5, 5)),
                max(65, traffic_base + 5 + random.randint(-5, 5)),
                max(55, traffic_base - 10 + random.randint(-5, 5)),
                max(60, traffic_base - 5 + random.randint(-5, 5)),
                max(75, traffic_base + 15 + random.randint(-5, 5)),
                max(70, traffic_base + 10 + random.randint(-5, 5)),
                max(40, traffic_base - 25 + random.randint(-5, 5))
            ]
        },
        'weeklyTrend': {
            'days': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            'stress': [
                max(50, traffic_base - 5),
                max(50, traffic_base - 2),
                max(50, traffic_base),
                max(50, traffic_base + 3),
                max(50, traffic_base + 5),
                max(30, traffic_base - 25),
                max(25, traffic_base - 30)
            ]
        }
    }

CITY_DATABASE = {
    # Karnataka Cities
    'Bengaluru': generate_city_stress_data(78, 72, 52, 68),
    'Yelahanka': generate_city_stress_data(65, 62, 48, 60),
    'Whitefield': generate_city_stress_data(70, 68, 50, 62),
    'Koramangala': generate_city_stress_data(75, 70, 52, 65),
    'Mysuru': generate_city_stress_data(45, 50, 40, 50),
    'Mandya': generate_city_stress_data(38, 45, 38, 48),
    'Mangalore': generate_city_stress_data(55, 58, 45, 55),
    'Udupi': generate_city_stress_data(48, 50, 42, 52),
    'Dharwad': generate_city_stress_data(52, 55, 44, 54),
    'Hubballi': generate_city_stress_data(58, 60, 48, 58),
    
    # Maharashtra Cities
    'Mumbai': generate_city_stress_data(82, 75, 65, 72),
    'Bandra': generate_city_stress_data(75, 72, 60, 68),
    'Colaba': generate_city_stress_data(78, 74, 62, 70),
    'Pune': generate_city_stress_data(68, 65, 55, 62),
    'Hinjewadi': generate_city_stress_data(62, 58, 50, 58),
    'Wakad': generate_city_stress_data(65, 60, 52, 60),
    'Thane': generate_city_stress_data(70, 68, 58, 65),
    'Navi Mumbai': generate_city_stress_data(68, 65, 56, 63),
    'Nagpur': generate_city_stress_data(58, 60, 50, 58),
    'Nashik': generate_city_stress_data(52, 55, 48, 55),
    
    # Telangana Cities
    'Hyderabad': generate_city_stress_data(65, 58, 45, 55),
    'Secunderabad': generate_city_stress_data(62, 55, 43, 53),
    'Warangal': generate_city_stress_data(48, 50, 40, 48),
    'Nizamabad': generate_city_stress_data(45, 48, 38, 46),
    
    # Tamil Nadu Cities
    'Chennai': generate_city_stress_data(62, 55, 58, 60),
    'Velachery': generate_city_stress_data(58, 52, 55, 58),
    'Coimbatore': generate_city_stress_data(55, 52, 50, 55),
    'Madurai': generate_city_stress_data(52, 50, 48, 52),
    'Tiruchirappalli': generate_city_stress_data(50, 48, 46, 50),
    
    # Delhi Cities
    'Delhi': generate_city_stress_data(85, 78, 48, 70),
    'New Delhi': generate_city_stress_data(83, 76, 50, 72),
    'Connaught Place': generate_city_stress_data(85, 78, 48, 68),
    'North Delhi': generate_city_stress_data(82, 75, 48, 70),
    'Chandni Chowk': generate_city_stress_data(85, 80, 50, 72),
    'South Delhi': generate_city_stress_data(80, 74, 50, 70),
    'Lajpat Nagar': generate_city_stress_data(78, 72, 48, 68),
    
    # Andhra Pradesh Cities
    'Visakhapatnam': generate_city_stress_data(58, 55, 48, 56),
    'Krishna': generate_city_stress_data(52, 50, 45, 52),
    'Guntur': generate_city_stress_data(55, 52, 46, 54),
    'Chittoor': generate_city_stress_data(50, 48, 44, 50),
    
    # Other Major Cities
    'Aizawl': generate_city_stress_data(42, 45, 38, 45),
    'Lunglei': generate_city_stress_data(38, 42, 36, 42),
    'Shimla': generate_city_stress_data(40, 45, 40, 48),
    'Kangra': generate_city_stress_data(38, 42, 38, 45),
    'Mandi': generate_city_stress_data(35, 40, 36, 42),
    'Ranchi': generate_city_stress_data(55, 52, 48, 55),
    'Dhanbad': generate_city_stress_data(62, 58, 52, 58),
    'East Singhbhum': generate_city_stress_data(58, 55, 50, 56),
    'Raipur': generate_city_stress_data(60, 55, 50, 58),
    'Durg': generate_city_stress_data(58, 52, 48, 56),
    'Bilaspur': generate_city_stress_data(55, 50, 46, 54),
    'Ahmedabad': generate_city_stress_data(75, 70, 55, 65),
    'Surat': generate_city_stress_data(72, 68, 52, 63),
    'Vadodara': generate_city_stress_data(65, 62, 50, 60),
    'Rajkot': generate_city_stress_data(60, 58, 48, 58),
    'North Goa': generate_city_stress_data(48, 50, 42, 50),
    'South Goa': generate_city_stress_data(45, 48, 40, 48),
    'Gurugram': generate_city_stress_data(78, 72, 55, 68),
    'Faridabad': generate_city_stress_data(75, 70, 52, 65),
    'Panipat': generate_city_stress_data(65, 62, 48, 60),
    'Ambala': generate_city_stress_data(62, 58, 46, 58),
    'Amritsar': generate_city_stress_data(65, 62, 50, 60),
    'Ludhiana': generate_city_stress_data(70, 65, 52, 62),
    'Jalandhar': generate_city_stress_data(68, 63, 50, 60),
    'Patiala': generate_city_stress_data(60, 58, 48, 58),
    'Jaipur': generate_city_stress_data(72, 68, 52, 65),
    'Jodhpur': generate_city_stress_data(55, 52, 48, 55),
    'Udaipur': generate_city_stress_data(50, 50, 46, 52),
    'Kota': generate_city_stress_data(58, 55, 48, 56),
    'Lucknow': generate_city_stress_data(65, 62, 50, 60),
    'Kanpur Nagar': generate_city_stress_data(70, 65, 52, 62),
    'Agra': generate_city_stress_data(62, 60, 48, 58),
    'Varanasi': generate_city_stress_data(60, 58, 48, 56),
    'Gautam Buddha Nagar': generate_city_stress_data(70, 65, 52, 62),
    'Dehradun': generate_city_stress_data(58, 55, 48, 56),
    'Haridwar': generate_city_stress_data(55, 52, 46, 54),
    'Nainital': generate_city_stress_data(42, 45, 40, 48),
    'Kolkata': generate_city_stress_data(65, 62, 55, 60),
    'Howrah': generate_city_stress_data(68, 65, 58, 62),
    'Darjeeling': generate_city_stress_data(45, 48, 42, 50),
    'Hooghly': generate_city_stress_data(60, 58, 50, 58),
    'Thiruvananthapuram': generate_city_stress_data(55, 52, 48, 56),
    'Ernakulam': generate_city_stress_data(60, 58, 50, 58),
    'Kozhikode': generate_city_stress_data(58, 55, 48, 56),
    'Thrissur': generate_city_stress_data(52, 50, 46, 54),
    'Bhopal': generate_city_stress_data(65, 60, 52, 62),
    'Indore': generate_city_stress_data(62, 58, 50, 60),
    'Gwalior': generate_city_stress_data(58, 55, 48, 56),
    'Jabalpur': generate_city_stress_data(55, 52, 46, 54),
    'Imphal West': generate_city_stress_data(48, 50, 44, 50),
    'Imphal East': generate_city_stress_data(50, 52, 46, 52),
    'East Khasi Hills': generate_city_stress_data(45, 48, 42, 48),
    'West Garo Hills': generate_city_stress_data(42, 45, 40, 46),
    'Kohima': generate_city_stress_data(48, 50, 44, 50),
    'Dimapur': generate_city_stress_data(50, 52, 46, 52),
    'Khordha': generate_city_stress_data(60, 58, 50, 58),
    'Cuttack': generate_city_stress_data(62, 60, 52, 60),
    'Ganjam': generate_city_stress_data(55, 52, 48, 55),
    'Sambalpur': generate_city_stress_data(52, 50, 46, 52),
    'East Sikkim': generate_city_stress_data(40, 45, 38, 46),
    'West Sikkim': generate_city_stress_data(38, 42, 36, 44),
    'Srinagar': generate_city_stress_data(52, 55, 48, 56),
    'Jammu': generate_city_stress_data(55, 58, 50, 58),
    'Leh': generate_city_stress_data(35, 40, 38, 42),
    'Kargil': generate_city_stress_data(38, 42, 40, 44),
    'Puducherry': generate_city_stress_data(55, 52, 48, 56),
    'Chandigarh': generate_city_stress_data(65, 60, 50, 60),
    'Daman': generate_city_stress_data(50, 48, 44, 50),
    'Silvassa': generate_city_stress_data(48, 46, 42, 48),
    'Port Blair': generate_city_stress_data(45, 48, 42, 50),
    'Kavaratti': generate_city_stress_data(40, 42, 40, 45),
    'Papum Pare': generate_city_stress_data(45, 48, 42, 50),
    'Tawang': generate_city_stress_data(35, 40, 38, 42),
    'Lower Subansiri': generate_city_stress_data(38, 42, 40, 44),
    'Kamrup Metropolitan': generate_city_stress_data(60, 58, 50, 58),
    'Cachar': generate_city_stress_data(55, 52, 48, 55),
    'Dibrugarh': generate_city_stress_data(52, 50, 46, 52),
    'Jorhat': generate_city_stress_data(50, 48, 44, 50),
    'Patna': generate_city_stress_data(65, 62, 50, 60),
    'Gaya': generate_city_stress_data(58, 55, 48, 56),
    'Muzaffarpur': generate_city_stress_data(60, 58, 50, 58),
    'Bhagalpur': generate_city_stress_data(55, 52, 48, 55)
}

# Add simple per-city hotspot lists so frontend area selectors and area-level
# status can show meaningful names tied to each city. This creates a few
# trafficHotspots and noiseHotspots per city derived from city-level indices.
for cname, cdata in list(CITY_DATABASE.items()):
    try:
        t_base = cdata.get('traffic', {}).get('stress', 50)
        n_base = cdata.get('noise', {}).get('level', 60)

        hotspots = [
            {'name': f'{cname} Central', 'traffic': max(20, min(95, t_base + 5))},
            {'name': f'{cname} Market Area', 'traffic': max(20, min(95, t_base - 5))},
            {'name': f'{cname} Railway Station', 'traffic': max(20, min(95, t_base + 8))},
            {'name': f'{cname} Industrial Area', 'traffic': max(20, min(95, t_base + 10))},
            {'name': f'{cname} University Area', 'traffic': max(20, min(95, t_base - 8))}
        ]

        noise_spots = [
            {'name': f'{cname} Market Area', 'level': max(40, min(100, n_base + 3))},
            {'name': f'{cname} Central', 'level': max(40, min(100, n_base + 1))},
            {'name': f'{cname} Railway Station', 'level': max(40, min(100, n_base + 5))}
        ]

        cdata['trafficHotspots'] = hotspots
        cdata['noiseHotspots'] = noise_spots
    except Exception:
        # ignore per-city hotspot generation failures
        pass

# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.route('/api/location-maps', methods=['GET'])
def get_location_maps():
    """
    Returns state→district and district→city mappings.
    Used to populate cascading dropdowns on frontend.
    """
    # ensure every district present in STATE_DISTRICT_MAP appears in
    # districtCityMap (empty list if no cities defined)
    complete_map = {**DISTRICT_CITY_MAP}
    for districts in STATE_DISTRICT_MAP.values():
        for dist in districts:
            if dist not in complete_map:
                complete_map[dist] = []

    return jsonify({
        'stateDistrictMap': STATE_DISTRICT_MAP,
        'districtCityMap': complete_map,
        'success': True
    }), 200

@app.route('/api/cityData', methods=['GET'])
def get_city_data():
    """
    Returns stress metrics for a given city.
    Query param: ?city=Mumbai
    """
    city = request.args.get('city')
    
    if not city:
        return jsonify({'error': 'City parameter required'}), 400
    
    if city not in CITY_DATABASE:
        return jsonify({'error': f'City {city} not found'}), 404
    
    return jsonify({
        'city': city,
        'data': CITY_DATABASE[city],
        'success': True
    }), 200

@app.route('/api/login', methods=['POST'])
def login():
    """
    Validates user credentials and location selection.
    Body: { email, password, state, district, city }
    """
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')
    state = data.get('state')
    district = data.get('district')
    city = data.get('city')
    
    # Basic validation
    if not all([email, password, state, district, city]):
        return jsonify({'error': 'All fields required'}), 400
    
    # Validate location hierarchy
    if state not in STATE_DISTRICT_MAP:
        return jsonify({'error': 'Invalid state'}), 400
    
    if district not in STATE_DISTRICT_MAP[state]:
        return jsonify({'error': 'Invalid district for state'}), 400
    
    if district not in DISTRICT_CITY_MAP:
        return jsonify({'error': 'District not found in city map'}), 400
    
    if city not in DISTRICT_CITY_MAP[district]:
        return jsonify({'error': 'Invalid city for district'}), 400
    
    # In real app, validate email/password against database
    # For now, just accept valid locations
    
    return jsonify({
        'success': True,
        'user': {'email': email, 'state': state, 'district': district, 'city': city}
    }), 200

@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple health check endpoint."""
    return jsonify({'status': 'ok', 'service': 'City Stress Dashboard API'}), 200

# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# ============================================================================
# MAIN
# ============================================================================

if __name__ == '__main__':
    print("Starting City Stress Dashboard API on http://localhost:5000")
    print("Available endpoints:")
    print("  GET  /api/health          - Health check")
    print("  GET  /api/location-maps   - Get state/district/city maps")
    print("  GET  /api/cityData?city=X - Get stress data for city")
    print("  POST /api/login           - User login & validation")
    app.run(debug=True, port=5000)

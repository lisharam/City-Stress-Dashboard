// Sample City Data with Stress Indicators
const cityDatabase = {
  'Bengaluru': {
    traffic: {
      stress: 78,
      congestion: 65,
      avgDelay: 28,
      description: 'High congestion during peak hours'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [25,20,18,35,72,85,78,65,72,88,76,45]
      }
    },
    noise: {
      stress: 72,
      level: 82,
      affectedAreas: 12,
      description: 'Noise exceeds safe limits in commercial zones'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [22,20,18,30,65,80,75,68,70,82,78,42]
      }
    },
    utility: {
      stress: 52,
      powerOutages: 3,
      waterZones: 5,
      description: 'Moderate power and water issues'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [18,17,16,22,40,55,50,48,52,60,55,30]
      }
    },
    healthcare: {
      stress: 68,
      occupancy: 85,
      erWaitTime: 45,
      description: 'High hospital occupancy during peak hours'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [30,25,20,40,70,88,82,75,78,90,85,50]
      }
    },
    hourlyPeaks: {
      hours: ['12AM', '2AM', '4AM', '6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
      stress: [25, 20, 18, 35, 72, 85, 78, 65, 72, 88, 76, 45]
    },
    weeklyTrend: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      stress: [75, 78, 72, 80, 82, 55, 48]
    },
    trafficHotspots: [
      { name: 'Silk Board Interchange', severity: 'Critical', traffic: 92 },
      { name: 'MG Road', severity: 'High', traffic: 85 },
      { name: 'Whitefield Corridor', severity: 'High', traffic: 78 },
      { name: 'Brigade Road', severity: 'Moderate', traffic: 62 },
      { name: 'Commercial Street', severity: 'Moderate', traffic: 58 },
      { name: 'Hebbal Flyover', severity: 'High', traffic: 88 },
      { name: 'Koramangala Junction', severity: 'High', traffic: 80 },
      { name: 'KR Puram (Old Madras Rd)', severity: 'Critical', traffic: 93 },
      { name: 'Yeshwanthpur Circle', severity: 'Moderate', traffic: 66 },
      { name: 'Hosur Road Junction', severity: 'High', traffic: 79 }
    ],
    noiseHotspots: [
      { name: 'MG Road', level: 85, cause: 'Heavy traffic, honking' },
      { name: 'Silk Board', level: 82, cause: 'Construction + vehicles' },
      { name: 'Commercial Street', level: 78, cause: 'Street vendors, traffic' },
      { name: 'Airport Road', level: 88, cause: 'Aircraft noise' },
      { name: 'Railway Station', level: 80, cause: 'Train arrivals' }
    ],
    hospitals: [
      { name: 'Apollo Hospital Bengaluru', beds: 450, occupancy: 88, erWait: 40 },
      { name: 'Manipal Hospital Bengaluru', beds: 380, occupancy: 82, erWait: 35 },
      { name: 'Fortis Hospital Whitefield', beds: 320, occupancy: 90, erWait: 50 },
      { name: 'St. John\'s Medical College Hospital', beds: 250, occupancy: 75, erWait: 25 },
      { name: 'Victoria Hospital (Govt)', beds: 600, occupancy: 85, erWait: 45 }
    ],
    ambulanceResponse: [
      { zone: 'Whitefield Zone', time: 8, status: 'Good' },
      { zone: 'South Bengaluru', time: 15, status: 'Moderate' },
      { zone: 'East Bengaluru', time: 14, status: 'Moderate' },
      { zone: 'West Bengaluru', time: 22, status: 'Slow' }
    ],
    trafficRecommendations: [
      { icon: '🛣️', title: 'Use Silk Board Flyover', desc: 'Reduces travel time from Silk Board to Airport by 35%' },
      { icon: '🚌', title: 'Metro from Whitefield to Indiranagar', desc: 'Purple Line is 40% faster during peak hours' },
      { icon: '🛴', title: 'Use Outer Ring Road', desc: 'Bypass MG Road - saves 20-30 minutes' },
      { icon: '⏰', title: 'Travel Off-Peak', desc: 'Best times: 10 AM-4 PM, After 8 PM' }
    ],
    noiseRecommendations: [
      { icon: '🏠', title: 'Noise-Proof Your Space', desc: 'Double glazing in Whitefield area can reduce 30-40 dB' },
      { icon: '🎧', title: 'Avoid MG Road After 6 PM', desc: 'Traffic + commercial noise peaks here' },
      { icon: '🌳', title: 'Stay in Banjara Hills', desc: 'Quietest residential area in Bengaluru (60-65 dB)' },
      { icon: '⏰', title: 'Silent Hours', desc: 'Quietest: 2-6 AM and 12-2 PM' }
    ],
    healthcareRecommendations: [
      { icon: '⏰', title: 'Visit During Daylight', desc: 'Whitefield Apollo is fastest 2-4 PM' },
      { icon: '📞', title: 'Book Apollo Bengaluru', desc: 'Lowest ER wait time (40 min)' },
      { icon: '🏥', title: 'Use Victoria Hospital', desc: 'Government hospital - affordable, moderate waits' },
      { icon: '💊', title: 'Telemedicine Option', desc: 'St. John\'s offers online consultations' }
    ]
  },
  'Mumbai': {
    traffic: {
      stress: 82,
      congestion: 78,
      avgDelay: 35,
      description: 'Very high congestion, major traffic delays'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [30,25,22,45,80,88,82,75,78,90,85,52]
      }
    },
    noise: {
      stress: 75,
      level: 85,
      affectedAreas: 18,
      description: 'Extensive noise pollution across city'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [28,25,23,48,78,86,80,72,76,88,84,58]
      }
    },
    utility: {
      stress: 65,
      powerOutages: 5,
      waterZones: 8,
      description: 'Significant power and water supply issues'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [22,20,18,30,60,75,70,68,72,85,80,50]
      }
    },
    healthcare: {
      stress: 72,
      occupancy: 90,
      erWaitTime: 60,
      description: 'Very high hospital occupancy'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [35,30,28,50,82,92,88,80,82,94,90,60]
      }
    },
    hourlyPeaks: {
      hours: ['12AM', '2AM', '4AM', '6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
      stress: [30, 25, 22, 45, 80, 88, 82, 75, 78, 90, 85, 52]
    },
    weeklyTrend: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      stress: [80, 82, 78, 85, 88, 65, 58]
    },
    trafficHotspots: [
      { name: 'Bandra-Worli Sea Link', severity: 'Critical', traffic: 94 },
      { name: 'Western Express Highway', severity: 'High', traffic: 88 },
      { name: 'Eastern Freeway', severity: 'High', traffic: 85 },
      { name: 'Chembur Roundabout', severity: 'High', traffic: 80 },
      { name: 'Fort Area', severity: 'Moderate', traffic: 65 },
      { name: 'Dadar Chowpatty Junction', severity: 'High', traffic: 83 },
      { name: 'Sion-Panvel Highway', severity: 'High', traffic: 86 },
      { name: 'Andheri West (Link Rd)', severity: 'High', traffic: 82 },
      { name: 'Vile Parle Flyover', severity: 'Moderate', traffic: 70 },
      { name: 'Kurla Junction', severity: 'High', traffic: 84 }
    ],
    noiseHotspots: [
      { name: 'Bandra Station', level: 88, cause: 'Heavy traffic + trains' },
      { name: 'Dadar East', level: 85, cause: 'Commercial hub traffic' },
      { name: 'Colaba Causeway', level: 82, cause: 'Tourist traffic' },
      { name: 'Marine Drive', level: 80, cause: 'Vehicle honking' },
      { name: 'Fort (Business District)', level: 84, cause: 'Heavy congestion' }
    ],
    hospitals: [
      { name: 'Apollo Hospital Mumbai', beds: 500, occupancy: 92, erWait: 55 },
      { name: 'Kokilaben Hospital', beds: 450, occupancy: 88, erWait: 50 },
      { name: 'Hinduja Healthcare', beds: 400, occupancy: 85, erWait: 45 },
      { name: 'Lilavati Hospital', beds: 380, occupancy: 90, erWait: 60 },
      { name: 'JJ Hospital (Govt)', beds: 700, occupancy: 88, erWait: 65 }
    ],
    ambulanceResponse: [
      { zone: 'Bandra-Worli', time: 12, status: 'Moderate' },
      { zone: 'South Mumbai', time: 18, status: 'Moderate' },
      { zone: 'Central Mumbai', time: 15, status: 'Moderate' },
      { zone: 'North Mumbai', time: 25, status: 'Slow' }
    ],
    trafficRecommendations: [
      { icon: '🛣️', title: 'Use Bandra-Worli Late Night', desc: 'Sea Link fastest between 2-7 AM (15 min vs 45 min)' },
      { icon: '🚌', title: 'Metro from Dadar to South Mumbai', desc: 'Red Line avoids Fort area traffic' },
      { icon: '🛴', title: 'Use Eastern Express Highway', desc: 'Bypass Western route - 25% faster' },
      { icon: '⏰', title: 'Avoid 8-10 AM & 5-8 PM', desc: 'Peak congestion on all major routes' }
    ],
    noiseRecommendations: [
      { icon: '🏠', title: 'Avoid Fort & Colaba', desc: 'Business district + tourist hotspots = 84-88 dB' },
      { icon: '🎧', title: 'Stay in Suburban Areas', desc: 'Thane/Navi Mumbai quieter (70-75 dB)' },
      { icon: '🌳', title: 'Beach Promenade Best', desc: 'Marine Drive early morning (65-70 dB)' },
      { icon: '⏰', title: 'Silent Hours', desc: 'Quietest: 1-5 AM and 12-1 PM' }
    ],
    healthcareRecommendations: [
      { icon: '⏰', title: 'Visit Hinduja Healthcare', desc: 'Best ER wait time (45 min) in South Mumbai' },
      { icon: '📞', title: 'Book Apollo in Advance', desc: 'Online booking reduces waiting by 50%' },
      { icon: '🏥', title: 'Use JJ Hospital (Govt)', desc: 'Affordable care, best for routine checkups' },
      { icon: '💊', title: 'Avoid Evening Hours', desc: 'Morning 7-10 AM has shortest waits' }
    ]
  },
  'Delhi': {
    traffic: {
      stress: 85,
      congestion: 80,
      avgDelay: 40,
      description: 'Severe traffic congestion'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [28,24,20,50,82,90,85,78,80,92,88,55]
      }
    },
    noise: {
      stress: 78,
      level: 87,
      affectedAreas: 20,
      description: 'High noise pollution throughout'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [30,26,22,52,84,92,86,78,82,94,90,60]
      }
    },
    utility: {
      stress: 48,
      powerOutages: 2,
      waterZones: 3,
      description: 'Good utility infrastructure'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [20,18,16,28,50,65,60,58,62,72,66,36]
      }
    },
    healthcare: {
      stress: 70,
      occupancy: 82,
      erWaitTime: 50,
      description: 'Moderate healthcare stress'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [32,28,24,52,80,90,84,76,78,92,88,58]
      }
    },
    hourlyPeaks: {
      hours: ['12AM', '2AM', '4AM', '6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
      stress: [28, 24, 20, 50, 82, 90, 85, 78, 80, 92, 88, 55]
    },
    weeklyTrend: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      stress: [82, 85, 80, 88, 90, 62, 55]
    },
    trafficHotspots: [
      { name: 'Delhi Gate - ITO Intersection', severity: 'Critical', traffic: 95 },
      { name: 'Ring Road (Multiple Junctions)', severity: 'High', traffic: 90 },
      { name: 'NH-48 / Gurgaon Expressway', severity: 'High', traffic: 89 },
      { name: 'AIIMS Flyover', severity: 'High', traffic: 82 },
      { name: 'Connaught Place (CP)', severity: 'Moderate', traffic: 68 },
      { name: 'Kashmere Gate', severity: 'High', traffic: 88 },
      { name: 'Anand Vihar / GTB Nagar', severity: 'High', traffic: 86 },
      { name: 'Nizamuddin Bridge', severity: 'Moderate', traffic: 72 },
      { name: 'Janpath / Rafi Marg', severity: 'High', traffic: 81 },
      { name: 'Lajpat Nagar Circle', severity: 'Moderate', traffic: 69 }
    ],
    noiseHotspots: [
      { name: 'Chandni Chowk', level: 92, cause: 'Market + heavy traffic' },
      { name: 'ITO Junction', level: 88, cause: 'Major intersection' },
      { name: 'Delhi Gate', level: 86, cause: 'Congestion + honking' },
      { name: 'Kasturba Nagar', level: 84, cause: 'Heavy vehicles' },
      { name: 'Vikas Marg', level: 85, cause: 'Traffic flow' }
    ],
    hospitals: [
      { name: 'All India Institute of Medical Sciences (AIIMS)', beds: 800, occupancy: 85, erWait: 48 },
      { name: 'Apollo Hospital Delhi', beds: 550, occupancy: 80, erWait: 42 },
      { name: 'Indraprastha Apollo', beds: 500, occupancy: 78, erWait: 40 },
      { name: 'Fortis Flt Lt Rajan Dhall', beds: 400, occupancy: 82, erWait: 50 },
      { name: 'Government Medical Hospital', beds: 600, occupancy: 88, erWait: 55 }
    ],
    ambulanceResponse: [
      { zone: 'Central Delhi', time: 10, status: 'Good' },
      { zone: 'South Delhi', time: 14, status: 'Good' },
      { zone: 'East Delhi', time: 16, status: 'Moderate' },
      { zone: 'North Delhi', time: 20, status: 'Moderate' }
    ],
    trafficRecommendations: [
      { icon: '🛣️', title: 'Use Outer Ring Road', desc: 'Bypass Chandni Chowk - saves 40 minutes' },
      { icon: '🚌', title: 'Metro from Central Delhi', desc: 'Blue/Yellow lines avoid ITO congestion' },
      { icon: '🛴', title: 'Use NH-48 to Gurgaon', desc: 'Faster than Ring Road by 30%' },
      { icon: '⏰', title: 'Travel Early Morning', desc: 'Best: 5-7 AM before rush hour' }
    ],
    noiseRecommendations: [
      { icon: '🏠', title: 'Avoid Old Delhi', desc: 'Chandni Chowk area = 92 dB (extremely loud)' },
      { icon: '🎧', title: 'Stay in South Delhi', desc: 'Quieter neighborhoods like Green Park (72-75 dB)' },
      { icon: '🌳', title: 'Visit Lodhi Gardens', desc: 'Peaceful morning walks (60-65 dB)' },
      { icon: '⏰', title: 'Silent Hours', desc: 'Quietest: 3-6 AM, avoid evenings' }
    ],
    healthcareRecommendations: [
      { icon: '⏰', title: 'AIIMS is Best Option', desc: 'Government hospital, lowest ER wait (48 min)' },
      { icon: '📞', title: 'Book Apollo Early', desc: 'Morning slots available 7-9 AM' },
      { icon: '🏥', title: 'Indraprastha Apollo', desc: 'Fastest ER (40 min) - private hospital' },
      { icon: '💊', title: 'Telemedicine Available', desc: 'All major hospitals offer online consultation' }
    ]
  },
  'Hyderabad': {
    traffic: {
      stress: 65,
      congestion: 55,
      avgDelay: 20,
      description: 'Moderate traffic congestion'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [22,18,15,32,60,75,70,62,65,78,68,38]
      }
    },
    noise: {
      stress: 58,
      level: 78,
      affectedAreas: 8,
      description: 'Moderate noise levels'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [20,18,16,30,58,72,68,60,62,75,66,36]
      }
    },
    utility: {
      stress: 45,
      powerOutages: 1,
      waterZones: 2,
      description: 'Good utility services'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [15,14,13,20,40,55,50,45,48,60,52,28]
      }
    },
    healthcare: {
      stress: 55,
      occupancy: 70,
      erWaitTime: 35,
      description: 'Manageable healthcare services'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [24,20,18,36,62,78,74,66,68,82,72,40]
      }
    },
    hourlyPeaks: {
      hours: ['12AM', '2AM', '4AM', '6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
      stress: [22, 18, 15, 32, 60, 75, 70, 62, 65, 78, 68, 38]
    },
    weeklyTrend: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      stress: [65, 68, 62, 72, 75, 48, 42]
    },
    trafficHotspots: [
      { name: 'Hitech City Junction', severity: 'High', traffic: 78 },
      { name: 'JNTU Road', severity: 'High', traffic: 72 },
      { name: 'Kukatpally Intersection', severity: 'Moderate', traffic: 65 },
      { name: 'Madhapur Bridge', severity: 'Moderate', traffic: 60 },
      { name: 'Banjara Hills', severity: 'Low', traffic: 48 },
      { name: 'Punjagutta Circle', severity: 'High', traffic: 80 },
      { name: 'Mehdipatnam Junction', severity: 'High', traffic: 82 },
      { name: 'Secunderabad Railway Junction Area', severity: 'High', traffic: 85 },
      { name: 'Kothapet / Dilsukhnagar', severity: 'Moderate', traffic: 70 },
      { name: 'Charminar Surroundings', severity: 'High', traffic: 77 }
    ],
    noiseHotspots: [
      { name: 'Hitech City', level: 75, cause: 'IT hub traffic' },
      { name: 'JNTU Hyderabad', level: 72, cause: 'Academic area traffic' },
      { name: 'Secunderabad Station', level: 74, cause: 'Train + vehicles' },
      { name: 'Begumpet', level: 70, cause: 'Commercial area' },
      { name: 'Road No. 1 Banjara Hills', level: 68, cause: 'Moderate traffic' }
    ],
    hospitals: [
      { name: 'Apollo Hospital Hyderabad', beds: 400, occupancy: 72, erWait: 38 },
      { name: 'Continental Hospital', beds: 350, occupancy: 68, erWait: 32 },
      { name: 'Maxcure Hospitals', beds: 320, occupancy: 70, erWait: 35 },
      { name: 'Fernandez Hospital', beds: 280, occupancy: 65, erWait: 28 },
      { name: 'Gandhi Medical College (Govt)', beds: 500, occupancy: 75, erWait: 42 }
    ],
    ambulanceResponse: [
      { zone: 'Hitech City', time: 9, status: 'Good' },
      { zone: 'JNTU Area', time: 12, status: 'Good' },
      { zone: 'Secunderabad', time: 13, status: 'Good' },
      { zone: 'Outer Ring Road', time: 18, status: 'Moderate' }
    ],
    trafficRecommendations: [
      { icon: '🛣️', title: 'Use Outer Ring Road', desc: 'Bypass Hitech City congestion' },
      { icon: '🚌', title: 'MMTS Train Preferred', desc: 'Red Line from Secunderabad to Begumpet = 20 min' },
      { icon: '🛴', title: 'Banjara Hills Route', desc: 'Quieter and less congested (48% traffic)' },
      { icon: '⏰', title: 'Best Time: 11 AM-3 PM', desc: 'Lowest congestion window' }
    ],
    noiseRecommendations: [
      { icon: '🏠', title: 'Hitech City Least Quiet', desc: 'IT hub = 75 dB, try Banjara Hills' },
      { icon: '🎧', title: 'Secunderabad Quieter Option', desc: 'Station area but manageable (74 dB)' },
      { icon: '🌳', title: 'Osman Sagar Lake', desc: 'Best peaceful spot (60-65 dB)' },
      { icon: '⏰', title: 'Silent Hours', desc: 'Quietest: 4-7 AM' }
    ],
    healthcareRecommendations: [
      { icon: '⏰', title: 'Visit Fernandez Hospital', desc: 'Shortest ER wait time (28 min)' },
      { icon: '📞', title: 'Continental Hospital', desc: 'Low occupancy (68%) - best choice' },
      { icon: '🏥', title: 'Apollo Hyderabad', desc: 'Most reliable, established reputation' },
      { icon: '💊', title: 'Anytime Best', desc: 'Hyderabad hospitals least crowded - visit anytime' }
    ]
  },
  'Chennai': {
    traffic: {
      stress: 62,
      congestion: 48,
      avgDelay: 18,
      description: 'Moderate traffic levels'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [20,16,14,28,55,70,65,58,62,75,65,35]
      }
    },
    noise: {
      stress: 55,
      level: 75,
      affectedAreas: 6,
      description: 'Moderate noise pollution'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [18,15,13,26,50,68,60,54,58,72,60,32]
      }
    },
    utility: {
      stress: 58,
      powerOutages: 4,
      waterZones: 6,
      description: 'Seasonal utility challenges'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [20,18,16,30,52,68,62,58,60,74,64,34]
      }
    },
    healthcare: {
      stress: 60,
      occupancy: 75,
      erWaitTime: 40,
      description: 'Moderate healthcare load'
    ,
      hourly: {
        hours: ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'],
        stress: [26,22,20,40,64,78,72,64,68,82,70,38]
      }
    },
    hourlyPeaks: {
      hours: ['12AM', '2AM', '4AM', '6AM', '8AM', '10AM', '12PM', '2PM', '4PM', '6PM', '8PM', '10PM'],
      stress: [20, 16, 14, 28, 55, 70, 65, 58, 62, 75, 65, 35]
    },
    weeklyTrend: {
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      stress: [60, 62, 58, 68, 70, 45, 38]
    },
    trafficHotspots: [
      { name: 'Anna Nagar Junction', severity: 'Moderate', traffic: 65 },
      { name: 'Mount Road (Anna Salai)', severity: 'High', traffic: 72 },
      { name: 'OMR (Old Mahabalipuram Road)', severity: 'High', traffic: 68 },
      { name: 'Guindy Intersection', severity: 'Moderate', traffic: 58 },
      { name: 'Saidapet Bridge', severity: 'Low', traffic: 42 },
      { name: 'T Nagar (Ranganathan St)', severity: 'High', traffic: 77 },
      { name: 'Velachery Main Road', severity: 'High', traffic: 75 },
      { name: 'Tambaram Junction', severity: 'High', traffic: 80 },
      { name: 'Royapettah / Anna Salai Crossing', severity: 'Moderate', traffic: 63 },
      { name: 'Porur Junction', severity: 'Moderate', traffic: 60 }
    ],
    noiseHotspots: [
      { name: 'Mount Road (Anna Salai)', level: 78, cause: 'Business district traffic' },
      { name: 'Central Station Area', level: 76, cause: 'Train + traffic' },
      { name: 'Anna Nagar Circle', level: 72, cause: 'Junction congestion' },
      { name: 'OMR Chennai', level: 70, cause: 'IT corridor traffic' },
      { name: 'Villivakkam', level: 68, cause: 'Residential traffic' }
    ],
    hospitals: [
      { name: 'Apollo Hospital Chennai', beds: 420, occupancy: 78, erWait: 42 },
      { name: 'Fortis Malar Hospital', beds: 380, occupancy: 72, erWait: 35 },
      { name: 'Sri Ramakrishna Hospital', beds: 350, occupancy: 75, erWait: 40 },
      { name: 'MIOT International Hospital', beds: 300, occupancy: 70, erWait: 32 },
      { name: 'Government Medical College Hospital', beds: 550, occupancy: 80, erWait: 48 }
    ],
    ambulanceResponse: [
      { zone: 'Central Chennai', time: 11, status: 'Good' },
      { zone: 'South Chennai', time: 14, status: 'Good' },
      { zone: 'North Chennai', time: 16, status: 'Moderate' },
      { zone: 'OMR Corridor', time: 19, status: 'Moderate' }
    ],
    trafficRecommendations: [
      { icon: '🛣️', title: 'Use OMR Express Highway', desc: 'Bypass Mount Road - 30% faster' },
      { icon: '🚌', title: 'Metro from Anna Nagar', desc: 'Blue Line fastest option available' },
      { icon: '🛴', title: 'Saidapet Bridge Route', desc: 'Least congested (42% - slowest)' },
      { icon: '⏰', title: 'Travel 10 AM-4 PM', desc: 'Best time to avoid rush hours' }
    ],
    noiseRecommendations: [
      { icon: '🏠', title: 'Avoid Mount Road Evening', desc: 'Business district + peak traffic = 78 dB' },
      { icon: '🎧', title: 'Stay in Adyar', desc: 'Quieter residential area (65-68 dB)' },
      { icon: '🌳', title: 'Marina Beach Early Morning', desc: 'Most peaceful spot (62-65 dB)' },
      { icon: '⏰', title: 'Silent Hours', desc: 'Quietest: 5-7 AM, after 9 PM' }
    ],
    healthcareRecommendations: [
      { icon: '⏰', title: 'MIOT Hospital Best', desc: 'Lowest ER wait (32 min)' },
      { icon: '📞', title: 'Fortis Malar OMR', desc: 'Good location, low wait time (35 min)' },
      { icon: '🏥', title: 'Apollo Chennai Downtown', desc: 'Most accessible, established' },
      { icon: '💊', title: 'Visit Morning 8-10 AM', desc: 'All hospitals have lowest occupancy then' }
    ]
  }
};

// Mapping of States/Union Territories to Cities/Districts (user-provided list)
// Mapping of States/Union Territories to Districts (with headquarters)
const stateDistrictMap = {
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
  'Karnataka': [
    'Bengaluru Urban','Bengaluru Rural','Bagalkot','Ballari','Belgaum',
    'Bidar','Chikballapur','Chikmagalur','Chitradurga','Dakshina Kannada',
    'Davangere','Dharwad','Gadag','Gulbarga','Hassan',
    'Haveri','Kalaburagi','Kodagu','Kolar','Koppal',
    'Mandya','Mysuru','Raichur','Ramanagara','Shimoga',
    'Tumkur','Udupi','Uttara Kannada','Vijayapura','Yadgiri','Bijapur'
  ],
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
};

// District Headquarters Mapping (for reference)
const districtHeadquarters = {
  'Bengaluru Urban': 'Bengaluru',
  'Bengaluru Rural': 'Bengaluru',
  'Bagalkot': 'Bagalkot',
  'Ballari': 'Ballari',
  'Belgaum': 'Belgaum',
  'Bidar': 'Bidar',
  'Chikballapur': 'Chikballapur',
  'Chikmagalur': 'Chikmagalur',
  'Chitradurga': 'Chitradurga',
  'Dakshina Kannada': 'Mangalore',
  'Davangere': 'Davangere',
  'Dharwad': 'Dharwad',
  'Gadag': 'Gadag',
  'Gulbarga': 'Gulbarga',
  'Hassan': 'Hassan',
  'Haveri': 'Haveri',
  'Kalaburagi': 'Kalaburagi',
  'Kodagu': 'Madikeri',
  'Kolar': 'Kolar',
  'Koppal': 'Koppal',
  'Mandya': 'Mandya',
  'Mysuru': 'Mysuru',
  'Raichur': 'Raichur',
  'Ramanagara': 'Ramanagara',
  'Shimoga': 'Shimoga',
  'Tumkur': 'Tumkur',
  'Udupi': 'Udupi',
  'Uttara Kannada': 'Karwar',
  'Vijayapura': 'Vijayapura',
  'Yadgiri': 'Yadgiri',
  'Bijapur': 'Bijapur'
};

// expose mapping
window.stateCityMap = stateDistrictMap; // for backward compatibility
window.stateDistrictMap = stateDistrictMap;
window.districtHeadquarters = districtHeadquarters;


// Mapping of Districts to Cities (per user specification)
const districtCityMap = {
  // Andhra Pradesh
  'Visakhapatnam': ['Visakhapatnam','Gajuwaka','Bheemunipatnam','Anakapalle'],
  'Krishna': ['Vijayawada','Machilipatnam','Gudivada'],
  'Guntur': ['Guntur','Tenali','Mangalagiri'],
  'Chittoor': ['Tirupati','Chittoor','Madanapalle'],
  // Arunachal Pradesh
  'Papum Pare': ['Itanagar','Naharlagun'],
  'Tawang': ['Tawang'],
  'Lower Subansiri': ['Ziro'],
  // Assam
  'Kamrup Metropolitan': ['Guwahati'],
  'Cachar': ['Silchar','Lakhipur'],
  'Dibrugarh': ['Dibrugarh','Chabua'],
  'Jorhat': ['Jorhat','Mariani'],
  // Bihar
  'Patna': ['Patna','Danapur','Phulwari'],
  'Gaya': ['Gaya','Bodh Gaya','Tekari'],
  'Muzaffarpur': ['Muzaffarpur','Kanti'],
  'Bhagalpur': ['Bhagalpur','Naugachhia'],
  // Chhattisgarh
  'Raipur': ['Raipur','Naya Raipur'],
  'Durg': ['Durg','Bhilai'],
  'Bilaspur': ['Bilaspur','Takhatpur'],
  // Goa
  'North Goa': ['Panaji','Mapusa','Bicholim'],
  'South Goa': ['Margao','Vasco da Gama','Quepem'],
  // Gujarat
  'Ahmedabad': ['Ahmedabad','Sanand','Bavla'],
  'Surat': ['Surat','Bardoli'],
  'Vadodara': ['Vadodara','Padra'],
  'Rajkot': ['Rajkot','Gondal'],
  // Haryana
  'Gurugram': ['Gurugram','Sohna'],
  'Faridabad': ['Faridabad','Ballabgarh'],
  'Panipat': ['Panipat','Samalkha'],
  'Ambala': ['Ambala','Naraingarh'],
  // Himachal Pradesh
  'Shimla': ['Shimla','Theog'],
  'Kangra': ['Dharamshala','Palampur'],
  'Mandi': ['Mandi','Sundarnagar'],
  // Jharkhand
  'Ranchi': ['Ranchi','Khunti'],
  'Dhanbad': ['Dhanbad','Jharia'],
  'East Singhbhum': ['Jamshedpur','Ghatshila'],
  // Karnataka - All 31 Districts
  'Bengaluru Urban': ['Bengaluru','Whitefield','Yelahanka','Electronic City','Koramangala','Indiranagar','Marathahalli'],
  'Bengaluru Rural': ['Bengaluru (Rural)','Kanakapura','Magadi','Channapatna'],
  'Bagalkot': ['Bagalkot','Ilkal','Jamkhandi','Badami'],
  'Ballari': ['Ballari','Hospet','Sandur','Vikarabad'],
  'Belgaum': ['Belgaum','Londa','Gokak','Savadatti'],
  'Bidar': ['Bidar','Bhalki','Ashtur','Parli'],
  'Chikballapur': ['Chikballapur','Chintamani','Gauribidanur','Muddenahalli'],
  'Chikmagalur': ['Chikmagalur','Kemmanagundi','Mudigere','Bhadravathi'],
  'Chitradurga': ['Chitradurga','Holalkere','Hiriyur','Molakalmuru'],
  'Dakshina Kannada': ['Mangalore','Puttur','Bantwal','Sullia','Kundapura'],
  'Davangere': ['Davangere','Harihar','Jagalur','Channagiri'],
  'Dharwad': ['Dharwad','Hubballi','Kundgol','Londa'],
  'Gadag': ['Gadag','Londa','Ron','Mundargi'],
  'Gulbarga': ['Gulbarga','Sedam','Chincholi','Aland'],
  'Hassan': ['Hassan','Alur','Arkalgud','Belur'],
  'Haveri': ['Haveri','Byadagi','Savanur','Shiggaon'],
  'Kalaburagi': ['Kalaburagi','Jevargi','Afzalpur','Tandur'],
  'Kodagu': ['Madikeri','Virajpet','Somwarpet','Kushalnagar'],
  'Kolar': ['Kolar','Chikballapur','Mulbagal','Bangarapet'],
  'Koppal': ['Koppal','Yelburga','Kushtagi','Gangavati'],
  'Mandya': ['Mandya','Maddur','Srirangapatna','Nagamangala'],
  'Mysuru': ['Mysuru','Nanjangud','Hunsur','Gundlupet','Periyapatna'],
  'Raichur': ['Raichur','Londa','Manvi','Devadurga'],
  'Ramanagara': ['Ramanagara','Kanakapura','Magadi','Channapatna'],
  'Shimoga': ['Shimoga','Bhadravathi','Sagar','Tirthahalli'],
  'Tumkur': ['Tumkur','Kunigal','Madhugiri','Koratagere'],
  'Udupi': ['Udupi','Kundapura','Kaup','Hebri'],
  'Uttara Kannada': ['Karwar','Sirsi','Kumta','Honnavar'],
  'Vijayapura': ['Vijayapura','Bailhongal','Soundatti','Muddebihal'],
  'Yadgiri': ['Yadgiri','Shahapur','Shorapur','Tandur'],
  'Bijapur': ['Bijapur','Basavanabagewadi','Bheemini','Chadchan'],
  // Kerala
  'Thiruvananthapuram': ['Thiruvananthapuram','Neyyattinkara'],
  'Ernakulam': ['Kochi','Aluva','Perumbavoor'],
  'Kozhikode': ['Kozhikode','Vadakara'],
  'Thrissur': ['Thrissur','Chalakkudy'],
  // Madhya Pradesh
  'Bhopal': ['Bhopal','Berasia'],
  'Indore': ['Indore','Mhow'],
  'Gwalior': ['Gwalior','Dabra'],
  'Jabalpur': ['Jabalpur','Panagar'],
  // Maharashtra
  'Mumbai City': ['Mumbai'],
  'Mumbai Suburban': ['Andheri','Borivali','Bandra'],
  'Pune': ['Pune','Pimpri-Chinchwad','Baramati'],
  'Nagpur': ['Nagpur','Kamptee'],
  'Nashik': ['Nashik','Malegaon'],
  // Manipur
  'Imphal West': ['Imphal'],
  'Imphal East': ['Porompat'],
  // Meghalaya
  'East Khasi Hills': ['Shillong'],
  'West Garo Hills': ['Tura'],
  // Mizoram
  'Aizawl': ['Aizawl'],
  'Lunglei': ['Lunglei'],
  // Nagaland
  'Kohima': ['Kohima'],
  'Dimapur': ['Dimapur'],
  // Odisha
  'Khordha': ['Bhubaneswar','Jatni'],
  'Cuttack': ['Cuttack','Choudwar'],
  'Ganjam': ['Berhampur','Chhatrapur'],
  'Sambalpur': ['Sambalpur','Hirakud'],
  // Punjab
  'Amritsar': ['Amritsar','Ajnala'],
  'Ludhiana': ['Ludhiana','Khanna'],
  'Jalandhar': ['Jalandhar','Nakodar'],
  'Patiala': ['Patiala','Rajpura'],
  // Rajasthan
  'Jaipur': ['Jaipur','Sanganer'],
  'Jodhpur': ['Jodhpur','Phalodi'],
  'Udaipur': ['Udaipur','Salumber'],
  'Kota': ['Kota','Ramganj Mandi'],
  // Sikkim
  'East Sikkim': ['Gangtok'],
  'West Sikkim': ['Gyalshing'],
  // Tamil Nadu
  'Chennai': ['Chennai','Ambattur','Avadi'],
  'Coimbatore': ['Coimbatore','Pollachi','Mettupalayam'],
  'Madurai': ['Madurai','Thirumangalam'],
  'Tiruchirappalli': ['Trichy','Srirangam'],
  // Telangana
  'Hyderabad': ['Hyderabad','Secunderabad','Kukatpally'],
  'Warangal': ['Warangal','Hanamkonda'],
  'Nizamabad': ['Nizamabad','Bodhan'],
  // Tripura
  'West Tripura': ['Agartala'],
  'South Tripura': ['Udaipur'],
  // Uttar Pradesh
  'Lucknow': ['Lucknow','Malihabad'],
  'Kanpur Nagar': ['Kanpur'],
  'Agra': ['Agra','Fatehabad'],
  'Varanasi': ['Varanasi','Ramnagar'],
  'Gautam Buddha Nagar': ['Noida','Greater Noida'],
  // Uttarakhand
  'Dehradun': ['Dehradun'],
  'Haridwar': ['Haridwar'],
  'Nainital': ['Haldwani'],
  // West Bengal
  'Kolkata': ['Kolkata'],
  'Howrah': ['Howrah','Uluberia'],
  'Darjeeling': ['Darjeeling','Siliguri'],
  'Hooghly': ['Chinsurah','Serampore'],
  // Delhi
  'New Delhi': ['New Delhi','Connaught Place'],
  'North Delhi': ['Rohini','Burari'],
  'South Delhi': ['Saket','Hauz Khas'],
  // Jammu & Kashmir
  'Srinagar': ['Srinagar'],
  'Jammu': ['Jammu'],
  // Ladakh
  'Leh': ['Leh'],
  'Kargil': ['Kargil'],
  // Puducherry
  'Puducherry': ['Puducherry'],
  // Chandigarh
  'Chandigarh': ['Chandigarh'],
  // Dadra & Nagar Haveli and Daman & Diu
  'Daman': ['Daman'],
  'Silvassa': ['Silvassa'],
  // Andaman & Nicobar Islands
  'Port Blair': ['Port Blair'],
  // Lakshadweep
  'Kavaratti': ['Kavaratti']
};

window.districtCityMap = districtCityMap;
window.cityDatabase = cityDatabase;
function getCityData(cityName) {
  if (!cityName) return null;

  cityName = cityName.trim();

  if (cityDatabase[cityName]) {
    return cityDatabase[cityName];
  }

  return null;
}

// Function to calculate overall city stress index
function calculateCityStressIndex(data) {
  // Formula: 0.3×Traffic + 0.2×Noise + 0.25×Utility + 0.25×Healthcare
  return (
    0.3 * data.traffic.stress +
    0.2 * data.noise.stress +
    0.25 * data.utility.stress +
    0.25 * data.healthcare.stress
  );
}

// Function to get stress level description
function getStressDescription(score) {
  if (score < 40) return '🟢 Low Stress - City is functioning well';
  if (score < 65) return '🟡 Moderate Stress - Some challenges present';
  return '🔴 High Stress - Multiple issues affecting city';
}

// Get current hourly status and 1-hour change for a city's hourlyPeaks
function getHourlyStatus(cityName, category) {
  const city = getCityData(cityName);
  // Prefer category-specific hourly data if present
  let hours = null;
  let stress = null;

  if (category && city[category] && city[category].hourly) {
    hours = city[category].hourly.hours;
    stress = city[category].hourly.stress;
  } else if (city.hourlyPeaks) {
    hours = city.hourlyPeaks.hours;
    stress = city.hourlyPeaks.stress;
  } else {
    // fallback to a default 12-slot day
    hours = ['12AM','2AM','4AM','6AM','8AM','10AM','12PM','2PM','4PM','6PM','8PM','10PM'];
    stress = [20,20,20,30,60,75,70,60,65,80,70,40];
  }

  const len = hours.length;
  const nowHour = new Date().getHours();
  const idx = Math.round(nowHour / 2) % len;

  const nowValue = stress[idx];
  const prevIdx = (idx - 1 + len) % len;
  const prevValue = stress[prevIdx];

  const label = nowValue >= 75 ? 'High' : nowValue >= 50 ? 'Moderate' : 'Low';
  const change = nowValue > prevValue ? 'increased' : nowValue < prevValue ? 'decreased' : 'no-change';
  const diff = Math.abs(nowValue - prevValue);

  return {
    index: idx,
    hourLabel: hours[idx],
    nowValue,
    prevValue,
    label,
    change,
    diff
  };
}

// Return list of area names for a city (prefer trafficHotspots names)
function getAreaList(cityName) {
  const city = getCityData(cityName);
  if (!city) return [];
  if (city.trafficHotspots && city.trafficHotspots.length) {
    return city.trafficHotspots.map(s => s.name);
  }
  // fallback generation
  const common = ['Central Junction','Market Area','Railway Station','Airport Road','Ring Road','Industrial Area','Hospital Junction','University Area','Bus Terminal','Main Road'];
  return common.map(s => `${cityName} - ${s}`);
}

// Compute area-level status across categories: traffic, noise, utility, healthcare
function getAreaStatus(cityName, areaName) {
  const city = getCityData(cityName);
  if (!city) return {};

  const trafficHourly = getHourlyStatus(cityName, 'traffic');
  const noiseHourly = getHourlyStatus(cityName, 'noise');
  const utilHourly = getHourlyStatus(cityName, 'utility');
  const healthHourly = getHourlyStatus(cityName, 'healthcare');

  // traffic value: prefer explicit area value
  let trafficValue = null;
  if (city.trafficHotspots) {
    const s = city.trafficHotspots.find(x => x.name === areaName);
    if (s) trafficValue = s.traffic;
  }
  if (trafficValue === null) trafficValue = trafficHourly.nowValue;

  // noise value: prefer explicit
  let noiseValue = null;
  if (city.noiseHotspots) {
    const n = city.noiseHotspots.find(x => x.name === areaName || areaName.includes(x.name));
    if (n) noiseValue = n.level;
  }
  if (noiseValue === null) noiseValue = noiseHourly.nowValue;

  // utility and healthcare use city-level indices (no per-area data available)
  const utilityValue = city.utility && city.utility.stress ? city.utility.stress : utilHourly.nowValue;
  const healthcareValue = city.healthcare && city.healthcare.stress ? city.healthcare.stress : healthHourly.nowValue;

  function labelFor(v) {
    if (v >= 75) return 'High';
    if (v >= 50) return 'Moderate';
    return 'Low';
  }

  return {
    area: areaName,
    traffic: { value: Math.round(trafficValue), label: labelFor(trafficValue), change: trafficHourly.change, diff: trafficHourly.diff },
    noise: { value: Math.round(noiseValue), label: labelFor(noiseValue), change: noiseHourly.change, diff: noiseHourly.diff },
    utility: { value: Math.round(utilityValue), label: labelFor(utilityValue), change: utilHourly.change, diff: utilHourly.diff },
    healthcare: { value: Math.round(healthcareValue), label: labelFor(healthcareValue), change: healthHourly.change, diff: healthHourly.diff }
  };
}

// Export for use in dashboard
window.getCityData = getCityData;
window.calculateCityStressIndex = calculateCityStressIndex;
window.getStressDescription = getStressDescription;
window.getHourlyStatus = getHourlyStatus;
window.getAreaList = getAreaList;
window.getAreaStatus = getAreaStatus;


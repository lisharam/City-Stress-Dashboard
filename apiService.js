// apiService.js
// Central service for all backend API calls
// Handles communication with Flask backend

const ApiService = (() => {
  // Base URL for API (change if backend runs on different port)
  const BASE_URL = 'http://localhost:5000/api';
  let backendAvailable = null; // Cache backend availability

  // Wrapper for fetch with error handling and timeout
  async function fetchAPI(endpoint, options = {}) {
    try {
      console.log(`[API] Calling: ${BASE_URL}${endpoint}`);
      
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        signal: controller.signal,
        body: options.body ? JSON.stringify(options.body) : undefined,
        ...options
      });

      clearTimeout(timeout);

      if (!response.ok) {
        console.error(`[API] Response not OK: ${response.status} ${response.statusText}`);
        let error = {};
        try {
          error = await response.json();
        } catch (e) {
          error = { error: response.statusText };
        }
        throw new Error(error.error || `API Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`[API] Success:`, data);
      backendAvailable = true;
      return data;
    } catch (error) {
      console.error(`[API] Call Failed (${endpoint}):`, error.message);
      backendAvailable = false;
      throw error;
    }
  }

  /**
   * Get state → district and district → city mappings
   * Used for populating cascading dropdowns
   */
  async function getLocationMaps() {
    const result = await fetchAPI('/location-maps');
    return {
      stateDistrictMap: result.stateDistrictMap,
      districtCityMap: result.districtCityMap
    };
  }

  /**
   * Get stress data for a specific city
   * @param {string} cityName - Name of city (e.g., "Mumbai")
   * @returns {object} - City data with traffic, noise, utility, healthcare, hourly and weekly trends
   */
  async function getCityData(cityName) {
    const result = await fetchAPI(`/cityData?city=${encodeURIComponent(cityName)}`);
    return result.data;
  }

  /**
   * Validate user login and location selection
   * @param {object} user - { email, password, state, district, city }
   * @returns {object} - { success, user }
   */
  async function loginUser(user) {
    return await fetchAPI('/login', {
      method: 'POST',
      body: user,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Health check - verify backend is running
   */
  async function healthCheck() {
    try {
      const result = await fetchAPI('/health');
      return { ok: true, data: result };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  /**
   * Check if backend is available (cached result)
   */
  function isBackendAvailable() {
    return backendAvailable === true;
  }

  return {
    getLocationMaps,
    getCityData,
    loginUser,
    healthCheck,
    isBackendAvailable,
    BASE_URL
  };
})();

// expose globally
window.ApiService = ApiService;

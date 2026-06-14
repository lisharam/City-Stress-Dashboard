// locationManager.js
// Centralized location/user state management
// Communicates with backend API for validation and data

const LocationManager = (() => {
  // Cache for location maps (loaded from backend)
  let mapsCache = { stateDistrictMap: {}, districtCityMap: {} };

  /**
   * Load location maps from backend if not already cached.
   * Falls back to local data.js if backend is unavailable.
   */
  async function initializeMaps() {
    if (Object.keys(mapsCache.stateDistrictMap).length === 0) {
      try {
        console.log('[LocationManager] Initializing maps from backend...');
        const maps = await ApiService.getLocationMaps();
        console.log('[LocationManager] Maps received from backend:', maps);
        
        if (!maps || !maps.stateDistrictMap) {
          throw new Error('Invalid map data: missing stateDistrictMap');
        }
        
        mapsCache = maps;
        console.log('[LocationManager] Cache updated from backend. States:', Object.keys(mapsCache.stateDistrictMap).length);
      } catch (error) {
        console.error('[LocationManager] Failed to load location maps from backend:', error);
        
        // FALLBACK: Use local data from data.js
        if (window.stateDistrictMap && Object.keys(window.stateDistrictMap).length > 0) {
          console.log('[LocationManager] Falling back to local data.js maps...');
          mapsCache = {
            stateDistrictMap: window.stateDistrictMap,
            districtCityMap: window.districtCityMap
          };
          console.log('[LocationManager] Cache updated from local data. States:', Object.keys(mapsCache.stateDistrictMap).length);
        } else {
          console.error('[LocationManager] No local maps available either!');
          throw error;
        }
      }
    }
    return mapsCache;
  }
  /**
   * Read the saved user object from localStorage.
   * Returns an object (may be empty) with keys email,state,district,city
   */
  function loadUser() {
    try {
      return JSON.parse(localStorage.getItem('user')) || {};
    } catch {
      return {};
    }
  }

  /**
   * Persist a user/location object to localStorage.
   */
  function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    // Emit custom event for location change
    document.dispatchEvent(new CustomEvent('locationChanged', { detail: user }));
  }

  /**
   * Remove stored user data.
   */
  function clearUser() {
    localStorage.removeItem('user');
    document.dispatchEvent(new CustomEvent('userCleared'));
  }

  /**
   * Validate that the provided state/district/city triple exists in the maps.
   * Returns true if all provided values are present and consistent; false otherwise.
   */
  function validateUser(user) {
    if (!user.state || !user.district || !user.city) return false;
    const sList = mapsCache.stateDistrictMap && mapsCache.stateDistrictMap[user.state];
    if (!sList || !sList.includes(user.district)) return false;
    const cList = mapsCache.districtCityMap && mapsCache.districtCityMap[user.district];
    // if no cities defined for this district, treat the district itself as valid
    if (!cList || cList.length === 0) {
      if (user.city === user.district) return true;
      return false;
    }
    if (!cList.includes(user.city)) return false;
    return true;
  }

  /**
   * Auto-repair user object.
   * If city is invalid but state/district are valid, clears only the city.
   * Returns the repaired user object.
   */
  function autoRepair(user) {
    const repaired = { ...user };

    if (!mapsCache.stateDistrictMap[repaired.state]) {
      repaired.state = '';
      repaired.district = '';
      repaired.city = '';
      repaired.area = '';
      return repaired;
    }

    const districtList = mapsCache.stateDistrictMap[repaired.state] || [];
    if (!districtList.includes(repaired.district)) {
      repaired.district = '';
      repaired.city = '';
      repaired.area = '';
      return repaired;
    }

    const cityList = mapsCache.districtCityMap[repaired.district] || [];
    if (!cityList.includes(repaired.city)) {
      repaired.city = '';
      repaired.area = '';
      return repaired;
    }

    return repaired;
  }

  /**
   * Populate a set of cascading selectors (state → district → city → [area]).
   * cfg = {
   *   stateId, districtId, cityId, areaId?, countId?,               // element ids
   *   initial: {state, district, city},                             // optional preselection
   *   onStateChange(state), onDistrictChange(dist), onCityChange(city), onAreaChange(area)
   * }
   */
  function populateSelectors(cfg) {
    const stateSel = document.getElementById(cfg.stateId);
    const districtSel = document.getElementById(cfg.districtId);
    const citySel = document.getElementById(cfg.cityId);
    const areaSel = cfg.areaId ? document.getElementById(cfg.areaId) : null;
    const countEl = cfg.countId ? document.getElementById(cfg.countId) : null;

    // helper to reset a select
    function reset(select, label) {
      select.innerHTML = `<option value="">-- Select ${label} --</option>`;
    }

    // initial clean
    reset(stateSel, 'State');
    reset(districtSel, 'District');
    reset(citySel, 'City');
    if (areaSel) reset(areaSel, 'Area');

    const map = mapsCache.stateDistrictMap || {};
    let states = Object.keys(map);
    
    // SAFETY NET: If map is somehow still empty, force-load from window data
    if (states.length === 0 && window.stateDistrictMap) {
      console.log('[populateSelectors] FALLBACK: mapsCache empty, using window.stateDistrictMap directly');
      mapsCache = {
        stateDistrictMap: window.stateDistrictMap,
        districtCityMap: window.districtCityMap
      };
      states = Object.keys(mapsCache.stateDistrictMap);
    }
    
    console.log('[populateSelectors] mapsCache available?', !!mapsCache);
    console.log('[populateSelectors] mapsCache.stateDistrictMap keys:', states.length);
    
    if (countEl) {
      countEl.textContent = states.length;
      console.log('[populateSelectors] Updated counter to:', states.length);
    }

    states.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s;
      opt.textContent = s;
      stateSel.appendChild(opt);
    });

    stateSel.addEventListener('change', function () {
      const state = this.value;
      reset(districtSel, 'District');
      reset(citySel, 'City');
      if (areaSel) reset(areaSel, 'Area');
      if (state) {
        (mapsCache.stateDistrictMap[state] || []).forEach(d => {
          const opt = document.createElement('option');
          opt.value = d;
          opt.textContent = d;
          districtSel.appendChild(opt);
        });
      }
      if (cfg.onStateChange) cfg.onStateChange(state);
    });

    districtSel.addEventListener('change', function () {
      const dist = this.value;
      reset(citySel, 'City');
      if (areaSel) reset(areaSel, 'Area');
      if (dist) {
        const cities = mapsCache.districtCityMap[dist] || [];
        if (cities.length === 0) {
          // no cities defined yet – fall back to showing the district itself so
          // the user still has a valid selection
          const opt = document.createElement('option');
          opt.value = dist;
          opt.textContent = dist;
          citySel.appendChild(opt);
        } else {
          cities.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c;
            opt.textContent = c;
            citySel.appendChild(opt);
          });
        }
      }
      if (cfg.onDistrictChange) cfg.onDistrictChange(dist);
    });

    citySel.addEventListener('change', function () {
      const city = this.value;
      if (areaSel) {
        reset(areaSel, 'Area');
        // populate areas asynchronously: prefer backend data (ApiService.getCityData)
        (async () => {
          try {
            console.log('[LocationManager] Populating areas for city:', city);
            let areas = [];
            if (window.ApiService && city) {
              try {
                console.log('[LocationManager] Calling ApiService.getCityData for', city);
                const res = await ApiService.getCityData(city);
                console.log('[LocationManager] ApiService.getCityData response for', city, res);
                const d = res && res.data ? res.data : res;
                if (d) {
                  if (d.trafficHotspots && d.trafficHotspots.length) {
                    areas = d.trafficHotspots.map(x => x.name);
                  } else if (d.noiseHotspots && d.noiseHotspots.length) {
                    areas = d.noiseHotspots.map(x => x.name);
                  }
                }
              } catch (e) {
                // backend may not have city details - ignore and fallback
                console.warn('[LocationManager] ApiService.getCityData failed for', city, 'falling back to local data', e);
              }
            } else {
              console.log('[LocationManager] Skipping backend call (no ApiService or empty city)');
            }

            if (!areas || areas.length === 0) {
              if (window.getAreaList) {
                try {
                  console.log('[LocationManager] Falling back to window.getAreaList for', city);
                  areas = window.getAreaList(city) || [];
                  console.log('[LocationManager] window.getAreaList result:', areas && areas.length);
                } catch (e) {
                  console.warn('[LocationManager] window.getAreaList threw for', city, e);
                }
              }
            }

            // final fallback: use city name as single area so UI remains usable
            if (!areas || areas.length === 0) {
              console.log('[LocationManager] No areas found for', city, 'using city as fallback');
              areas = [city];
            }

            areas.forEach(a => {
              const opt = document.createElement('option');
              opt.value = a;
              opt.textContent = a;
              areaSel.appendChild(opt);
            });
            console.log('[LocationManager] Populated areas count:', areaSel.options.length - 1);
          } catch (err) {
            console.error('[LocationManager] Failed to load area list:', err);
          }
        })();
      }
      if (cfg.onCityChange) cfg.onCityChange(city);
    });

    if (areaSel) {
      areaSel.addEventListener('change', function () {
        if (cfg.onAreaChange) cfg.onAreaChange(this.value);
      });
    }

    // preselect initial values if provided
    if (cfg.initial) {
      if (cfg.initial.state) {
        stateSel.value = cfg.initial.state;
        stateSel.dispatchEvent(new Event('change'));
      }
      if (cfg.initial.district) {
        districtSel.value = cfg.initial.district;
        districtSel.dispatchEvent(new Event('change'));
      }
      if (cfg.initial.city) {
        citySel.value = cfg.initial.city;
        citySel.dispatchEvent(new Event('change'));
      }
      if (areaSel && cfg.initial.area) {
        areaSel.value = cfg.initial.area;
      }
    }
  }

  // Public API (frozen to prevent accidental modification)
  const publicAPI = {
    initializeMaps,
    loadUser,
    saveUser,
    clearUser,
    validateUser,
    autoRepair,
    populateSelectors
  };

  return Object.freeze(publicAPI);
})();

// expose globally
window.LocationManager = LocationManager;

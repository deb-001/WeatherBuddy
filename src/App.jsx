import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import GeolocationButton from './components/GeolocationButton';
import WeatherCard from './components/WeatherCard';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import SearchHistory from './components/SearchHistory';
import ThemeToggle from './components/ThemeToggle';
import Forecast from './components/Forecast';
import { ArrowPathIcon } from '@heroicons/react/24/outline'; 


import './index.css'; 

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

if (!API_KEY) {
  console.warn("OpenWeatherMap API key missing: VITE_OPENWEATHERMAP_API_KEY in .env file");
}


const HISTORY_STORAGE_KEY = 'weatherSearchHistory';
const THEME_STORAGE_KEY = 'weatherTheme';
const MAX_HISTORY_LENGTH = 5;

function App() {
  // --- State Variables ---
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [theme, setTheme] = useState('light');
  const [geolocationLoading, setGeolocationLoading] = useState(false);
  const [geolocationError, setGeolocationError] = useState(null);


  useEffect(() => {

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    } else {
      setTheme('light'); 
    }
  }, []);

  useEffect(() => {
  
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]); 


  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };


  useEffect(() => {
 
    const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          setSearchHistory(parsedHistory);
        }
      } catch (e) {
        console.error("Failed to parse search history:", e);
        localStorage.removeItem(HISTORY_STORAGE_KEY);
      }
    }
  }, []); 


  const updateSearchHistory = useCallback((city) => {
    setSearchHistory(prevHistory => {
      const normalizedCity = city.toLowerCase();
      const filteredHistory = prevHistory.filter(item => item.toLowerCase() !== normalizedCity);
      const updatedHistory = [city, ...filteredHistory];
      const finalHistory = updatedHistory.slice(0, MAX_HISTORY_LENGTH);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(finalHistory));
      return finalHistory;
    });
  }, []);


  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  };


 
  const fetchWeatherDataByCoords = useCallback(async (lat, lon) => {
    if (!API_KEY) {
      setError("API Key is not configured.");
      setGeolocationLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setGeolocationError(null);
    setWeatherData(null);
    setForecastData(null);

    try {
      const results = await Promise.allSettled([
        axios.get(CURRENT_WEATHER_URL, { params: { lat, lon, appid: API_KEY, units: 'metric' } }),
        axios.get(FORECAST_URL, { params: { lat, lon, appid: API_KEY, units: 'metric' } })
      ]);
      const weatherResult = results[0];
      const forecastResult = results[1];
      let fetchError = null;

      if (weatherResult.status === 'fulfilled') {
        const fetchedData = weatherResult.value.data;
        setWeatherData(fetchedData);
        setCurrentCity(fetchedData.name);
      } else {
        const err = weatherResult.reason;
        console.error("Weather API Error (Coords):", err);
        setWeatherData(null);
        fetchError = "Could not fetch weather data for your location.";
      }

      if (forecastResult.status === 'fulfilled') {
        setForecastData(forecastResult.value.data);
      } else {
        const err = forecastResult.reason;
        console.error("Forecast API Error (Coords):", err);
        setForecastData(null);
        if (!fetchError) { fetchError = "Could not load forecast data for your location."; }
      }

      if (fetchError) { setError(fetchError); }

    } catch (err) {
        console.error("General Fetch Error (Coords):", err);
        setError('An unexpected error occurred fetching weather by location.');
        setWeatherData(null); setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, []);


  const fetchWeatherDataByCity = useCallback(async (city, shouldUpdateHistory = true) => {
    if (!city || city.trim() === '') { setError("Please enter a city name."); return; }
    if (!API_KEY) { setError("API Key is not configured."); return; }

    setLoading(true);
    setError(null);
    setGeolocationError(null); 
    const trimmedCity = city.trim();
 
    if (trimmedCity.toLowerCase() !== currentCity.toLowerCase()) {
      setWeatherData(null); setForecastData(null);
    }
    setCurrentCity(trimmedCity); 

    try {
      const results = await Promise.allSettled([
        axios.get(CURRENT_WEATHER_URL, { params: { q: trimmedCity, appid: API_KEY, units: 'metric' } }),
        axios.get(FORECAST_URL, { params: { q: trimmedCity, appid: API_KEY, units: 'metric' } })
      ]);
      const weatherResult = results[0];
      const forecastResult = results[1];
      let fetchError = null;

      if (weatherResult.status === 'fulfilled') {
        const fetchedData = weatherResult.value.data;
        setWeatherData(fetchedData);
        setCurrentCity(fetchedData.name);
        if (shouldUpdateHistory) {
          updateSearchHistory(fetchedData.name);
        }
      } else {
        const err = weatherResult.reason; 
        console.error("Weather API Error (City):", err);
        setWeatherData(null);
        if (err.response) {
          if (err.response.status === 401) fetchError = "Invalid API Key.";
          else if (err.response.status === 404) fetchError = `City "${trimmedCity}" not found.`;
          else if (err.response.status >= 500) fetchError = "Weather service unavailable.";
          else fetchError = `Weather Error: ${err.response.status}.`;
        } else if (err.request) { fetchError = 'Network error fetching weather.';
        } else { fetchError = 'Unexpected weather fetch error.'; }
      }

      if (forecastResult.status === 'fulfilled') {
        setForecastData(forecastResult.value.data);
      } else {
        const err = forecastResult.reason; 
        console.error("Forecast API Error (City):", err);
        setForecastData(null);
        if (!fetchError) { fetchError = "Could not load forecast data."; }
      }

      if (fetchError) { setError(fetchError); }

    } catch (err) { 
      console.error("General Fetch Error (City):", err);
      setError('An unexpected error occurred during city fetch.');
      setWeatherData(null); setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, [currentCity, updateSearchHistory]);


  const handleGeolocationClick = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setGeolocationLoading(true);
    setGeolocationError(null);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGeolocationLoading(false);
        fetchWeatherDataByCoords(latitude, longitude);
      },
      (error) => {
        setGeolocationLoading(false);
        setWeatherData(null);
        setForecastData(null);
        setCurrentCity('');
        let errorMessage = '';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "📍 Please turn on your location services to use this feature.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "📡 Unable to detect your location. Please try again.";
            break;
          case error.TIMEOUT:
            errorMessage = "⌛ Location request timed out. Please try again.";
            break;
          default:
            errorMessage = "🔍 An error occurred while getting your location.";
            break;
        }
        setError(errorMessage);
      },
      { 
        timeout: 10000,
        maximumAge: 60000,
        enableHighAccuracy: false 
      }
    );
  };



  const handleSearch = (city) => {
    fetchWeatherDataByCity(city, true);
  };

  const handleHistorySearch = (city) => {
    if (city.toLowerCase() !== currentCity.toLowerCase() || !weatherData) {
      fetchWeatherDataByCity(city, false);
    }
  };

  const handleRefresh = () => {
  
    if (currentCity && !loading && !geolocationLoading) {
      fetchWeatherDataByCity(currentCity, false);
    }
 
  };


  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100 text-gray-900'}`}>
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-7xl">
        
        <header className="flex flex-col items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="flex items-center gap-3 sm:gap-4">
            <h1 
              onClick={() => {
                setWeatherData(null);
                setForecastData(null);
                setError(null);
                setCurrentCity('');
                setLoading(false);
                setGeolocationLoading(false);
                setGeolocationError(null);
              }}
              className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm cursor-pointer hover:scale-105 transform transition-all duration-200"
            >
              WeatherBuddy
            </h1>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
          
        
          <div className="flex flex-row items-center gap-2 w-full max-w-2xl mx-auto px-2 sm:px-0">
            <div className="flex-1">
              <SearchBar onSearch={handleSearch} disabled={loading} />
            </div>
            <GeolocationButton 
              onClick={handleGeolocationClick} 
              loading={geolocationLoading}
              disabled={loading}
            />
          </div>
        </header>

        
        <main className="space-y-4 sm:space-y-8">
          
          {error && (
            <div className="px-2 sm:px-0">
              <ErrorMessage message={error} onClose={() => setError(null)} />
            </div>
          )}

          
          {loading && (
            <div className="flex justify-center items-center min-h-[300px] sm:min-h-[400px]">
              <Loader />
            </div>
          )}

          
          {weatherData && !loading && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 px-2 sm:px-0">
              
              <div className="lg:col-span-2">
                <div className="bg-white/60 dark:bg-gray-800/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border border-white/20 dark:border-gray-700 p-4 sm:p-6 transform transition-all duration-300 hover:shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 dark:text-white">{currentCity}</h2>
                    <button
                      onClick={handleRefresh}
                      className="p-1.5 sm:p-2 rounded-full hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors text-blue-600 dark:text-gray-300"
                      title="Refresh weather data"
                    >
                      <ArrowPathIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                  <WeatherCard data={weatherData} />
                </div>
              </div>

              
              <div className="lg:col-span-1">
                <div className="bg-white/60 dark:bg-gray-800/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border border-white/20 dark:border-gray-700 p-4 sm:p-6 h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-blue-800 dark:text-white">Recent Searches</h2>
                    {searchHistory.length > 0 && (
                      <button
                        onClick={handleClearHistory}
                        className="text-xs sm:text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                      >
                        Clear History
                      </button>
                    )}
                  </div>
                  <SearchHistory
                    history={searchHistory}
                    onSearch={handleHistorySearch}
                  />
                </div>
              </div>
            </div>
          )}

          
          {forecastData && !loading && (
            <div className="mt-4 sm:mt-8 px-2 sm:px-0">
              <div className="bg-white/60 dark:bg-gray-800/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg border border-white/20 dark:border-gray-700 p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-800 dark:text-white mb-4">5-Day Forecast</h2>
                <Forecast data={forecastData} />
              </div>
            </div>
          )}

          
          {!weatherData && !loading && !error && (
            <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] text-center space-y-6 sm:space-y-8 animate-fade-in relative px-3 sm:px-0">
              
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-24 sm:w-32 h-24 sm:h-32 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-10 right-10 w-32 sm:w-40 h-32 sm:h-40 bg-indigo-400/20 rounded-full blur-3xl animate-float-delayed"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-sky-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
              </div>

              
              <div className="relative">
                <div className="transform hover:scale-105 transition-transform duration-300 space-y-4">
                  
                  <div className="mb-4 sm:mb-6 animate-float">
                    <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>

                  
                  <h2 className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                    Welcome to WeatherBuddy
                  </h2>
                  <div className="h-1 w-24 sm:w-32 mx-auto bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 rounded-full transform origin-left animate-scale-x"></div>
                </div>
              </div>

              
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed animate-fade-up font-light px-4 sm:px-0">
                Get real-time weather updates and forecasts for any city worldwide. Your personal window to weather conditions, anywhere, anytime.
              </p>

              
              <div className="flex flex-col items-center space-y-3 sm:space-y-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center justify-center space-x-2 text-blue-500 dark:text-blue-400 animate-bounce-subtle">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <span className="text-sm sm:text-base font-medium">Start your weather journey</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Search by city name or use your current location
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
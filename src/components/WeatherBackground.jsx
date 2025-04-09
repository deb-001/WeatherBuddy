// src/components/WeatherBackground.jsx
import React from 'react';

const getWeatherGradient = (weatherCode, isDay) => {
  // Weather condition codes from OpenWeatherMap API
  const conditions = {
    thunderstorm: weatherCode >= 200 && weatherCode < 300,
    drizzle: weatherCode >= 300 && weatherCode < 400,
    rain: weatherCode >= 500 && weatherCode < 600,
    snow: weatherCode >= 600 && weatherCode < 700,
    atmosphere: weatherCode >= 700 && weatherCode < 800,
    clear: weatherCode === 800,
    clouds: weatherCode > 800 && weatherCode < 900
  };

  if (conditions.thunderstorm) {
    return isDay
      ? 'from-indigo-900 via-purple-600 to-blue-900 bg-opacity-90'
      : 'from-gray-900 via-purple-800 to-indigo-900 bg-opacity-95';
  } else if (conditions.drizzle || conditions.rain) {
    return isDay
      ? 'from-blue-400 via-blue-500 to-gray-600 bg-opacity-85'
      : 'from-gray-900 via-blue-800 to-gray-700 bg-opacity-90';
  } else if (conditions.snow) {
    return isDay
      ? 'from-blue-50 via-blue-100 to-gray-100 bg-opacity-80'
      : 'from-blue-900 via-blue-700 to-gray-800 bg-opacity-85';
  } else if (conditions.atmosphere) {
    return isDay
      ? 'from-gray-300 via-gray-400 to-gray-500 bg-opacity-75'
      : 'from-gray-800 via-gray-700 to-gray-600 bg-opacity-80';
  } else if (conditions.clear) {
    return isDay
      ? 'from-sky-400 via-blue-400 to-blue-500 bg-opacity-75'
      : 'from-gray-900 via-blue-800 to-purple-900 bg-opacity-85';
  } else if (conditions.clouds) {
    return isDay
      ? 'from-gray-200 via-blue-300 to-gray-300 bg-opacity-80'
      : 'from-gray-800 via-gray-700 to-gray-600 bg-opacity-85';
  }
  
  // Default gradient
  return isDay ? 'from-blue-400 to-purple-500' : 'from-gray-800 to-black';
};

function WeatherBackground({ children, weatherCode, isDay }) {
  const gradientClasses = getWeatherGradient(weatherCode, isDay);

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${gradientClasses} flex flex-col items-center justify-start pt-10 sm:pt-16 p-4 font-sans transition-all duration-1000 ease-in-out overflow-hidden`}>
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] pointer-events-none transition-opacity duration-1000" />
      <div className="relative z-10 w-full max-w-6xl mx-auto animate-fade-in transition-transform duration-500">
        {children}
      </div>
    </div>
  );
}

export default WeatherBackground;
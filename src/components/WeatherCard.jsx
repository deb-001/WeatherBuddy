// src/components/WeatherCard.jsx (Updated)
import React from 'react';

function WeatherCard({ data }) {
  if (!data) return null;

  // Destructure data for easier access (refer to OpenWeatherMap API docs for structure)
  const { name, main, weather, wind, sys } = data;
  const iconCode = weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="bg-white/80 dark:bg-gray-800/90 rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 sm:gap-6">
        {/* Left section - Main weather info */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-white mb-2">
            {name}, {sys.country}
          </h2>
          <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-700 dark:to-transparent p-1 sm:p-2 rounded-lg">
              <img 
                src={iconUrl} 
                alt={weather[0].description} 
                className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md transform hover:scale-110 transition-transform duration-200"
              />
            </div>
            <p className="text-4xl sm:text-5xl font-light text-blue-800 dark:text-blue-100">
              {Math.round(main.temp)}°C
            </p>
          </div>
          <p className="text-base sm:text-lg text-blue-700 dark:text-blue-200 capitalize mb-1 sm:mb-2">
            {weather[0].description}
          </p>
          <p className="text-sm sm:text-base text-blue-600 dark:text-blue-300">
            Feels like {Math.round(main.feels_like)}°C
          </p>
        </div>

        {/* Right section - Weather details */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full md:w-auto">
          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-3 sm:p-4 backdrop-blur-sm border border-blue-100 dark:border-gray-600">
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-300 mb-1">Humidity</p>
            <p className="text-xl sm:text-2xl font-semibold text-blue-900 dark:text-white">{main.humidity}%</p>
          </div>
          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-3 sm:p-4 backdrop-blur-sm border border-blue-100 dark:border-gray-600">
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-300 mb-1">Wind Speed</p>
            <p className="text-xl sm:text-2xl font-semibold text-blue-900 dark:text-white">{Math.round(wind.speed * 3.6)} km/h</p>
          </div>
          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-3 sm:p-4 backdrop-blur-sm border border-blue-100 dark:border-gray-600">
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-300 mb-1">Pressure</p>
            <p className="text-xl sm:text-2xl font-semibold text-blue-900 dark:text-white">{main.pressure} hPa</p>
          </div>
          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-3 sm:p-4 backdrop-blur-sm border border-blue-100 dark:border-gray-600">
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-300 mb-1">Visibility</p>
            <p className="text-xl sm:text-2xl font-semibold text-blue-900 dark:text-white">{Math.round(data.visibility / 1000)} km</p>
          </div>
        </div>
      </div>
    </div>
  );
}
// Add simple fade-in animation in your CSS/Tailwind config if desired
// Example in index.css:
// @layer utilities {
//   .animate-fade-in {
//     animation: fadeIn 0.5s ease-out;
//   }
//   @keyframes fadeIn {
//     from { opacity: 0; transform: translateY(10px); }
//     to { opacity: 1; transform: translateY(0); }
//   }
// }

export default WeatherCard;
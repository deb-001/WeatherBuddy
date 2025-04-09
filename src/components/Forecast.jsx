import React from 'react';

function Forecast({ data, loading, error }) {
  if (loading) {
    return <p className="text-center text-gray-600 dark:text-gray-300 mt-4">Loading forecast...</p>;
  }
  if (error) {
    return <p className="text-center text-red-600 dark:text-red-300 mt-4">{error}</p>;
  }
  if (!data || !data.list || data.list.length === 0) {
    return null;
  }
  const nextForecasts = data.list.slice(0, 5);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {nextForecasts.map((item, index) => (
        <div key={index} className="bg-white/80 dark:bg-gray-800/90 shadow-lg rounded-lg p-3 sm:p-4 text-center border border-blue-200 dark:border-gray-600 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
          <p className="text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">{formatDate(item.dt)}</p>
          <div className="relative bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-700 dark:to-transparent p-1 sm:p-2 rounded-lg">
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto drop-shadow-md transform hover:scale-110 transition-transform duration-200"
            />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-blue-900 dark:text-white mb-1">{Math.round(item.main.temp)}°C</p>
          <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 capitalize mb-2 line-clamp-1">{item.weather[0].description}</p>
          <div className="mt-1 sm:mt-2 pt-2 border-t border-blue-100 dark:border-gray-600">
            <p className="text-xs text-blue-600 dark:text-blue-200 mb-1">
              Humidity: {item.main.humidity}%
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-200">
              Wind: {Math.round(item.wind.speed * 3.6)} km/h
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Forecast;
// src/components/WeatherEffects.jsx
import React from 'react';

const RainEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute w-0.5 h-8 bg-blue-200 opacity-30 animate-rain"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${0.5 + Math.random() * 0.5}s`
        }}
      />
    ))}
  </div>
);

const SnowEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 rounded-full bg-white opacity-70 animate-snow"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${3 + Math.random() * 2}s`
        }}
      />
    ))}
  </div>
);

const CloudEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="absolute bg-white opacity-30 rounded-full animate-cloud"
        style={{
          width: `${100 + Math.random() * 100}px`,
          height: `${60 + Math.random() * 60}px`,
          left: `${Math.random() * 100}%`,
          top: `${10 + Math.random() * 20}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${20 + Math.random() * 10}s`
        }}
      />
    ))}
  </div>
);

const ThunderEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-yellow-400 opacity-0 animate-lightning" />
  </div>
);

function WeatherEffects({ weatherCode }) {
  // Weather condition codes from OpenWeatherMap API
  const conditions = {
    thunderstorm: weatherCode >= 200 && weatherCode < 300,
    rain: (weatherCode >= 300 && weatherCode < 400) || (weatherCode >= 500 && weatherCode < 600),
    snow: weatherCode >= 600 && weatherCode < 700,
    clouds: weatherCode > 800 && weatherCode < 900
  };

  return (
    <>
      {conditions.thunderstorm && <ThunderEffect />}
      {conditions.rain && <RainEffect />}
      {conditions.snow && <SnowEffect />}
      {conditions.clouds && <CloudEffect />}
    </>
  );
}

export default WeatherEffects;
import React from 'react';
import './ForecastDay.scss'; // Подключаем SCSS стили

const ForecastDay = ({ dayData }) => {
  // Преобразуем unix-время в читаемую дату
  const date = new Date(dayData.dt * 1000).toLocaleDateString("en-US", { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });

  return (
    <div className="forecast-day">
      <h3 className="forecast-text">{date}</h3>
      <img 
        src={`https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`} 
        alt={dayData.weather[0].description} 
      />
      <p>{dayData.weather[0].description}</p>
      <p><strong>{Math.round(dayData.main.temp)}°C</strong></p>
    </div>
  );
};

export default ForecastDay;

import React from "react";
import './WeatherCard.scss'; // Подключаем SCSS стили


const WeatherCard = ({ data }) => {
  const weatherIcon = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`;
  const date = new Date( data.list[0].dt_txt);
  const options = { weekday: 'long', day: 'numeric' };
const formattedDate = date.toLocaleDateString('en-GB', options);

// Добавляем суффиксы для чисел (st, nd, rd, th)
const getDaySuffix = (day) => {
  if (day > 3 && day < 21) return 'th'; // 4th, 5th, ... 20th
  switch (day % 10) {
    case 1: return 'st'; // 1st
    case 2: return 'nd'; // 2nd
    case 3: return 'rd'; // 3rd
    default: return 'th'; // 4th, 5th, ...
  }
};

const day = date.getDate();
const suffix = getDaySuffix(day);

const finalDate = formattedDate.replace(/\d+/, `${day}${suffix}`);

  return (
    <div className="weather-card">
      <div className="city-name">{data.city.name}</div>

      {/* Центральная часть с иконкой и температурой */}
      <div className="weather-main">
        <img src={weatherIcon} alt="Weather Icon" className="weather-icon" />
        <p className="temp">{Math.round(data.list[0].main.temp)}°C</p>
        <p className="date_today">{finalDate}</p>
      </div>

      {/* Дополнительная информация слева */}
      <div className="weather-details">
        <p>Humidity: {data.list[0].main.humidity}%</p>
        <p>Pressue: {data.list[0].main.pressure} hPa</p>
        <p>Wind speed: {Math.round(data.list[0].wind.speed)} m/s</p>
        <p>Feels like: {data.list[0].main.feels_like}°C</p>
      </div>

    </div>
  );
};

export default WeatherCard;

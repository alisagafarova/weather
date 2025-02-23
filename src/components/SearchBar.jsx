import React, { useState, useEffect, useRef } from "react";
import useWeatherApi from "../hooks/useWeatherApi";
import './SearchBar.scss';
import WeatherCard from "./WeatherCard";
import ForecastDay from "./ForecastDay";
import DefaultBackground from "../images/DefaultBackground.jpg";
import {cities} from '../data/cities_list';


const SearchBar = () => {

  const { weatherData, error, loading, fetchWeatherData } = useWeatherApi();

  const uniqueDays = {};
  const fiveDayForecast = weatherData?.list
    ? weatherData.list.filter(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: 'long', day: 'numeric', month: 'long' });
        if (!uniqueDays[date]) {
          uniqueDays[date] = true;
          return true;
        }
        return false;
      })
    : [];

  const handleSearch = () => {
    if (city) {
      fetchWeatherData(city);
      setShowList(false); // Закрываем список после поиска
    }
  };

  const [city, setCity] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showList, setShowList] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const value = event.target.value;
    setCity(value);
    if (value.length > 0) {
      // Сначала фильтруем по первой букве
      const filteredByFirstLetter = cities.filter(cityName =>
        cityName.toLowerCase().startsWith(value.toLowerCase())
      );
      
      // Затем фильтруем по всем совпадениям
      const filteredByMatch = cities.filter(cityName =>
        cityName.toLowerCase().includes(value.toLowerCase())
      );
      
      // Выводим только совпадения, которые есть
      const combinedFilteredCities = [...new Set([...filteredByFirstLetter, ...filteredByMatch])];

      setFilteredCities(combinedFilteredCities);

      if (combinedFilteredCities.length > 0) {
        setShowList(true);
      } else {
        setShowList(false); // Если нет совпадений, не показываем список
      }
    } else {
      setShowList(false); // Если поле пустое, скрываем список
    }
  };

  const handleSelectCity = (cityName) => {
    setCity(cityName);
    setShowList(false); // Закрываем список при выборе города
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowList(false); // Закрываем список при клике вне поля ввода
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="content">
      <img src={DefaultBackground} className="background" alt="background" />
      <div className="search_pannel">
        <div className="datalist-container" ref={inputRef}>
          <input
            type="text"
            className="input"
            placeholder="Enter city"
            value={city}
            onChange={handleChange}
          />
          {showList && (
            <ul className="custom-datalist">
              {filteredCities.map((cityName, index) => (
                <li key={index} onClick={() => handleSelectCity(cityName)}>
                  {cityName}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="button" onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>

      </div>
      {weatherData && <WeatherCard data={weatherData} />}
      <div className="forecast">
        {fiveDayForecast.map((day) => (
          <ForecastDay key={day.dt} dayData={day} />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;

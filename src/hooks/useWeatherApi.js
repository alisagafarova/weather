import { useState } from 'react';
import axios from 'axios';

const useWeatherApi = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a5108601dc30cac0c409e8d9cbb77210&units=metric`,
      );
      setWeatherData(response.data); // Setting the full data response
      setError(null);
    } catch (err) {
      setError('City not found');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return { weatherData, error, loading, fetchWeatherData };
};

export default useWeatherApi;

import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { apikey, CurrentWeatherUrl } from './api';
import { useState } from 'react';
function App() {

  const [currentWeather, setCurrentWeather] = useState('');
  const [forecastWeather, setForecastWeather] = useState('');

  const handleOnSearchChange = (searchData) => {
    const [lat, long] = searchData.value.split(" ");
    console.log(lat, long);
    const CurrentWeatherFetch = fetch(`${CurrentWeatherUrl}/weather?lat=${lat}&lon=${long}&appid=${apikey}&units=metric`);
    const WeatherForecastFetch = fetch(`${CurrentWeatherUrl}/forecast?lat=${lat}&lon=${long}&appid=${apikey}&units=metric`);
    Promise.all([CurrentWeatherFetch, WeatherForecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastWeather({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));

    console.log(currentWeather);
    console.log(forecastWeather);
  }
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <Forecast data={forecastWeather} />}
    </div>
  );
}
export default App;

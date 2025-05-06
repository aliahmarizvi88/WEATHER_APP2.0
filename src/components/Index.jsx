import React, { useState, useRef, useEffect } from 'react';
import Search from './Search';
import WeatherIcons from './WeatherIcons';
import axios from 'axios';

const Index = () => {
  const [currData, setCurrData] = useState('');
  const [forecaste, setForecaste] = useState('');

  //small Sorting functions:
  function getCurrentDayTime() {
    const now = new Date();

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const day = days[now.getDay()];

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;

    return `${day} ${hours}:${minutes}${ampm}`;
  }

  function getHumidityLevel(humidity) {
    if (humidity <= 30) return 'Low 🌵';
    if (humidity <= 60) return 'Normal 😊';
    if (humidity <= 80) return 'High 💧';
    return 'Very High 🌊';
  }

  function formatUnixTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  }

  function getVisibilityLevel(visibilityInMeters) {
    const km = visibilityInMeters / 1000;

    if (km > 10) return 'Excellent 🌞';
    if (km > 5) return 'Good 🌤️';
    if (km >= 4) return 'Moderate 🌫️';
    if (km >= 1) return 'Poor 🌁';
    return 'Very Poor 🌪️';
  }

  const handleSearch = (city) => {
    currWeather(city);
    fetchForecaste(city);
  };
  //Fetching current Weather Data:
  const currWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=aa0d9046057cdf6f131714c9699243a6`
      );
      setCurrData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Fetching forecast data:
  const fetchForecaste = async (city) => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=6&units=metric&appid=aa0d9046057cdf6f131714c9699243a6`
      );
      setForecaste(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    currWeather('Lahore');
    fetchForecaste('Lahore');
  }, []);

  function getDayName(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  }

  return (
    <>
      <div className="bg-background p-6 rounded-lg ">
        <div className="flex justify-center mb-6">
          <Search onSearch={handleSearch} />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-card p-6 rounded-lg bg-zinc-300">
            <p className="text-lg text-muted-foreground">
              {getCurrentDayTime()}
            </p>
            <h1 className="text-5xl font-bold text-primary">
              {currData?.main?.temp
                ? `${Math.floor(currData.main.temp)}°C`
                : 'Loading...'}
            </h1>
            <div className="mt-2 text-muted-foreground">
              <WeatherIcons
                weatherType={currData?.weather?.[0]?.main || 'Loading...'}
                size={80}
              />
            </div>
            <p className="mt-2 text-muted-foreground">
              {'Feels like: '}
              {currData?.main?.temp
                ? `${Math.floor(currData.main.feels_like)}°C`
                : 'Loading...'}
            </p>
            <p className="mt-2 text-muted-foreground uppercase">
              {currData?.weather?.[0]?.description || 'Loading...'}
            </p>

            <button className="bg-gray-200 text-accent-foreground mt-4 p-2 rounded-lg hover:bg-accent/80 transition">
              {currData?.name ? `${currData.name}` : 'Loading'}
              {', '}
              {currData?.sys?.country ? `${currData.sys.country}` : 'Loading'}
            </button>
          </div>
          <div className="md:w-2/3 md:ml-4 mt-4 md:mt-0">
            <h2 className="text-3xl font-semibold text-primary">Forecast</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-4">
              {forecaste?.list
                ? forecaste.list.map((items) => {
                    return (
                      <div
                        key={items.dt}
                        className="bg-card p-4 rounded-lg text-center shadow h-28"
                      >
                        <p className="font-bold">
                          {items?.dt ? getDayName(items.dt) : 'Loading'}
                        </p>
                        <div className="flex justify-center items-center">
                          <WeatherIcons
                            weatherType={
                              items?.weather[0]?.main
                                ? `${items.weather[0].main}`
                                : 'Loading'
                            }
                            size={50}
                          />
                        </div>
                        <p>
                          {items?.temp?.max && items?.temp?.min
                            ? `${Math.floor(items.temp.max)}°/${Math.floor(
                                items.temp.min
                              )}°C`
                            : 'Loading'}
                        </p>
                      </div>
                    );
                  })
                : 'Loading'}
            </div>
            <h3 className="text-lg font-semibold text-primary mt-6">
              Today Highlight
            </h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-muted p-4 rounded-lg shadow">
                <p className="font-semibold">Humidity</p>
                <p>
                  {currData?.main?.humidity
                    ? `${currData.main.humidity}`
                    : 'Loading'}
                </p>
                <p>
                  {getHumidityLevel(
                    currData?.main?.humidity
                      ? `${currData.main.humidity}`
                      : 'Loading'
                  )}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg shadow">
                <p className="font-semibold">Wind Speed</p>
                <p>
                  {currData?.wind?.speed
                    ? `${currData.wind.speed} m/s`
                    : 'Loading...'}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg shadow">
                <p className="font-semibold">Visibility</p>
                <p>
                  {currData?.visibility
                    ? `${currData.visibility / 100} km`
                    : 'Loading...'}
                </p>
                <p>
                  {getVisibilityLevel(
                    currData?.visibility
                      ? `${currData.visibility / 100} km`
                      : 'Loading...'
                  )}
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg shadow">
                <p className="font-semibold">Sunrise and Sunset</p>
                <p>
                  {currData?.sys?.sunrise
                    ? `${formatUnixTime(currData.sys.sunrise)}🌅`
                    : 'Loading'}
                </p>
                <p>
                  {currData?.sys?.sunset
                    ? `${formatUnixTime(currData.sys.sunset)}🌇`
                    : 'Loading'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;

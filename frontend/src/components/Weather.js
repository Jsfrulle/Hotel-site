import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Weather.css";


import dotenv from "dotenv";
dotenv.config();

export const Weather = () => {
  const location = useSelector((store) => store.hotelLocation.place);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    if (location) {
      fetch(
        `https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=${location}&cnt=5`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": process.env.REACT_APP_HOST_WEATHER,
            "x-rapidapi-key": process.env.REACT_APP_KEY_WEATHER
          }
        }
      )
        .then((res) => res.json())
        .then((res) => setWeather(res.list))

        .catch((err) => {
          console.error(err);
          setWeather([])
        });
    } else {
      setWeather([])
    }
  }, [location]);

  return (
    <div className="weatherContainer">
      {weather === []  ? '' : <p className="weatherContent">todays weather and 4 days forward</p>}
       
      

      <div className="weatherDisplay">
        {weather &&
          weather.map((item) => (
            <div key={item.dt} className="weatherContent">
              <p> {item.weather[0].main} </p>
              <img
                src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt='weather-icon'
              />
            </div>
          ))}
      </div>
    </div>
  );
};

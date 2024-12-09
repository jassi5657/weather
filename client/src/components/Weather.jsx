import React, { useEffect, useState } from 'react';
import { Search, MapPin, Wind, LogOut } from 'react-feather'; // Import LogOut icon
import dateFormat from 'dateformat';
import "./weather.css";
import getWeather from '../api2/api';
import { Link, useNavigate } from 'react-router-dom';

const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate()

  const getWeatherbyCity = async () => {
    try {
      const weatherData = await getWeather(city);
      console.log(weatherData); // Log the data to confirm structure
      setWeather(weatherData);
      
      // Store the report in the database
      await storeReport(city, weatherData.current.temperature, weatherData.current.wind_speed);
      
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null); // Reset weather state on error
    }
    setCity("");
  };

  const storeReport = async (city, temperature, windSpeed) => {
    try {
      const token = localStorage.getItem('token'); // Adjust this line based on where your token is stored
  
      const response = await fetch('http://localhost:4000/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({
          city,
          temperature,
          windSpeed,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to store report');
      }
  
      const result = await response.json();
      console.log('Report stored successfully:', result);
    } catch (error) {
      console.error("Error storing report:", error);
    }
  };

  const renderDate = () => {
    let now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail); // Set the email state if it exists
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('email'); // Remove email from local storage
    localStorage.removeItem('token'); // Remove token from local storage
    setEmail(null); // Reset email state
    setWeather(null); // Optionally reset weather state
    navigate("/login")
  };

  return (
    <>

    <div className='report'>

        <Link to="/reports" className='rpt'>Reports</Link>

          <button className='btn' onClick={handleLogout}>
            <LogOut /> 
          </button>
    </div>
    <div className="app">
      <h1>Weather App</h1>
      {email && (
        <div>
          <h2>Logged in as: {email}</h2>
        </div>
      )}
      <div className="input-wrapper">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City Name"
        />
        <button onClick={getWeatherbyCity}>
          <Search />
        </button>
      </div>

      {weather && weather.current ? (
        <div className="content">
          <div className="location d-flex">
            <MapPin />
            <h2>
              {weather.location.name} <span>({weather.location.country})</span>
            </h2>
          </div>
          <p className="datetext">{renderDate()}</p>

          <div className="weatherdesc d-flex flex-c">
            <img src={weather.current.weather_icons[0]} alt="" />
            <h3>{weather.current.weather_descriptions[0]}</h3>
          </div>

          <div className="tempstats d-flex flex-c">
            <h1>
              {weather.current.temperature} <span>&deg;C</span>
            </h1>
          </div>

          <div className="windstats d-flex">
            <Wind />
            <h3>
              Wind is {weather.current.wind_speed} Knots in{" "}
              {weather.current.wind_degree}&deg;
            </h3>
          </div>
        </div>
      ) : (
        <div className="content">
          <h4>No Data Found!</h4>
        </div>
      )}
    </div>
    </>

  );
};

export default WeatherSearch;
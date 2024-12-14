import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import clear_icon from '../assets/clear.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(false);
    const inputRef = useRef();
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };
    
    const search = async (city) => {
        if (city === '') {
            alert("Enter City Name");
            return;
        }
        try {
            // Construct the API URL
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            // Fetch data from the API
            const response = await fetch(url);

            // Parse and log the JSON response
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }
            // Ensure data.weather exists and has items before accessing the icon
            if (data.weather && data.weather.length > 0) {
                const icon = allIcons[data.weather[0].icon] || clear_icon;
                setWeatherData({
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    temperature: Math.floor(data.main.temp),
                    location: data.name,
                    icon: icon,
                });
            }
            // Clear the input field
            inputRef.current.value = '';
        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching data");
        }
    };

    useEffect(() => {
        // Call the search function with a default city
        search("pune");
    }, []);

    return (
        <div className="wheather">
            <div className="searchbar">
                <input ref={inputRef} type="text" placeholder="search" />
                <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
            </div>
            {weatherData ? (
                <>
                    <img className="weather-icon" src={weatherData.icon} alt="" />
                    <p className="temp">{weatherData.temperature}°c</p>
                    <p className="location">{weatherData.location}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidity_icon} alt="" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="" />
                            <div>
                                <p>{weatherData.windSpeed} km/hr</p>
                                <span>Wind speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Weather;

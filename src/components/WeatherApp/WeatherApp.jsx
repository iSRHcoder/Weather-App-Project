/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  getWeatherReport,
  getWeatherReportByCoords,
} from "../Services/Weather";
import style from "./WeatherApp.module.css";
import Loader from "../Loader/Loader";
import { dateFinder, timestampToTime } from "../Services/Utility";
import { Button } from "react-bootstrap";

const WeatherApp = () => {
  const [date, setDate] = useState(null);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState(null);

  const [tempInCel, setTempInCel] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [pressure, setPressure] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [cloud, setCloud] = useState(null);
  const [wind, setWind] = useState(null);

  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const cityInputHandler = (data) => {
    setSearch(data);
  };

  const buttonClickHandler = () => {
    setCity((search.charAt(0).toUpperCase() + search.slice(1)).trim());
    setSearch("");
  };

  const enterKeyHandler = (e) => {
    if (e.key === "Enter") {
      buttonClickHandler();
    }
  };

  useEffect(() => {
    getCurrentLocationWeather();
    setDate(dateFinder());
  }, []);

  useEffect(() => {
    if (city) {
      setIsLoader(true);
      setIsError(false);
      getWeatherReport(city)
        .then((res) => {
          console.log("res", res.cod);
          if (res.cod === 200) {
            setIsLoader(false);
            setCityName(res.name);
            setCloud(res.weather[0].description);
            setSunrise(timestampToTime(res.sys.sunrise));
            setSunset(timestampToTime(res.sys.sunset));
            setWind(res.wind.speed);
            setTempInCel((res.main.temp - 273.15).toFixed(2));
            setHumidity(res.main.humidity);
            setPressure(res.main.pressure);
          } else if (res.cod !== 404) {
            setIsLoader(false);
            setIsError(true);
            setErrorMsg("City Not Found, Enter Valid city...!");
          } else {
            setIsError(true);
            setErrorMsg("Something went wrong Please try again later...!");
          }
        })
        .catch((error) => {
          setIsError(true);
          setIsLoader(false);
          setErrorMsg("Something went wrong Please try again later...!");
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("position", position);
          getWeatherReportByCoords(latitude, longitude)
            .then((res) => {
              if (res.cod === 200) {
                setIsLoader(false);
                setCityName(res.name);
                setCloud(res.weather[0].description);
                setSunrise(timestampToTime(res.sys.sunrise));
                setSunset(timestampToTime(res.sys.sunset));
                setWind(res.wind.speed);
                setTempInCel((res.main.temp - 273.15).toFixed(2));
                setHumidity(res.main.humidity);
                setPressure(res.main.pressure);
              } else if (res.cod !== 404) {
                setIsLoader(false);
                setIsError(true);
                setErrorMsg("City Not Found, Enter Valid city...!");
              } else {
                setErrorMsg("Something went wrong Please try again later...!");
              }
            })
            .catch(() => {
              setErrorMsg("Something went wrong Please try again later...!");
            });
        },
        (error) => {
          setCity("New Delhi");
        }
      );
    } else {
      window.alert("Geolocation is not supported by your browser");
    }
  };

  return (
    <div>
      <div className={style.inputButton}>
        <input
          value={search}
          placeholder="Enter City Name"
          type="text"
          onChange={(e) => cityInputHandler(e.target.value)}
          onKeyUp={enterKeyHandler}
        />
        <button
          className={style.checkWeatherButton}
          onClick={buttonClickHandler}
        >
          Check
        </button>
      </div>

      {isLoader && <Loader />}

      {!isLoader && isError && (
        <div style={{ marginTop: "10rem" }}>
          <p style={{ color: "red", fontSize: "3rem", fontWeight: "bold" }}>
            {errorMsg}
          </p>
        </div>
      )}

      {!isLoader && !isError && (
        <div className={style.container}>
          <div className={style.box}>
            <div className={style.timeDate}>
              <img
                src="/Images/weather-sunny-and-cloudy-svgrepo-com.svg"
                width="50"
              />{" "}
              <h1>{date}</h1>
            </div>

            <div className={style.cityAndLogo}>
              <div className={style.city}>{cityName}</div>

              <div className={style.tempCelcius}>
                <img src="/Images/temperature-svgrepo-com.svg" width="45" />{" "}
                <p className={style.temp}>{tempInCel}</p>
                <p className={style.celcius}>°C</p>
              </div>
            </div>

            <div className={style.data}>
              <div className={style.item}>
                <div>
                  <img src="/Images/humidity-svgrepo-com.svg" width="40" />{" "}
                  Humidity:
                  {humidity}%
                </div>
                <div>
                  <img
                    src="/Images/sunrise-over-mountains-svgrepo-com.svg"
                    width="35"
                  />{" "}
                  Sunrise: {sunrise}
                </div>
                <div>
                  <img
                    src="/Images/clouds-strom-2-svgrepo-com.svg"
                    width="40"
                  />{" "}
                  Cloud: {cloud}
                </div>
              </div>
              <div className={style.item}>
                <div>
                  <img
                    src="/Images/pressure-meter-svgrepo-com.svg"
                    width="40"
                  />{" "}
                  Pressure: {pressure}mb
                </div>
                <div>
                  <img src="/Images/sunrise-svgrepo-com.svg" width="35" />{" "}
                  Sunset: {sunset}
                </div>
                <div>
                  <img
                    src="/Images/wind-sign-wind-svgrepo-com.svg"
                    width="40"
                  />{" "}
                  Wind: {wind} km/hr
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

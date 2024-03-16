export const getWeatherReport = async (city) => {
  return await fetch(
    `https://weatherapp-backend-0hu8.onrender.com/api/weather?city=${city}`
  ).then((res) => res.json());
};

export const getWeatherReportByCoords = async (lat, lon) => {
  return await fetch(
    `https://weatherapp-backend-0hu8.onrender.com/api/weather?lat=${lat}&lon=${lon}`
  ).then((res) => res.json());
};

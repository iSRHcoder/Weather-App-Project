export const getWeatherReport = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&appid=88f2c30681ef3d7fd287876f375145f0`
  ).then((res) => res.json());
};

export const getWeatherReportByCoords = (lat, lon) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&l&appid=88f2c30681ef3d7fd287876f375145f0`
  ).then((res) => res.json());
};

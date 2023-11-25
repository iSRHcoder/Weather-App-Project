export const dateFinder = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dayName = daysOfWeek[currentDate.getDay()];

  return `${day}/${month}/${year} ${dayName}`;
};

// export const timeFinder = () => {
//   const currentDate = new Date();
//   let hours = currentDate.getHours();
//   const minutes = currentDate.getMinutes();
//   const seconds = currentDate.getSeconds();

//   const pad = (value) => (value < 10 ? `0${value}` : value);

//   const amPm = hours >= 12 ? "PM" : "AM";
//   hours = hours % 12 || 12;
//   return `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${amPm}`;
// };

export const timestampToTime = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formattedTime;
};

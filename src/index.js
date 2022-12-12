function formatDate(nowDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  let day = days[nowDate.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[nowDate.getMonth()];
  let date = nowDate.getDate();
  let year = nowDate.getFullYear();
  let hours = nowDate.getHours();
  let minutes = nowDate.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let ampm = hours >= 12 ? "pm" : "am";
  return `${day} ${month} ${date}, ${year} ${hours}:${minutes} ${ampm}`;
}
let nowDate = new Date();
let currentDateTime = document.querySelector("#current-date-time");

currentDateTime.innerHTML = formatDate(nowDate);

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  console.log(response.data.weather[0].description);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#speed");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function search(city) {
  let apiKey = "bd7277198bf393124b32a1bd91b32944";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("London");

let apiKey = "bd7277198bf393124b32a1bd91b32944";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function getCurrentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "9f1515c6d557b936bd2810b8784d57c8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function showTempForCurrentLoc() {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", showTempForCurrentLoc);

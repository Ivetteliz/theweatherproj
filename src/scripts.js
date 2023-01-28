let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
  "December",
];

let currentYear = currentTime.getFullYear();
let currentDay = days[currentTime.getDay()];
let currentMonth = months[currentTime.getMonth()];
let currentDate = currentTime.getDate();

let todaysDate = document.querySelector("#presentTime");
todaysDate.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} `;

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round((response.data.main.temp * 9) / 5 + 32);
  let cityName = document.querySelector("#city-name");
  let searchBar = document.querySelector("#temp");
  searchBar.innerHTML = `${temperature}ºF`;
  cityName.innerHTML = `${response.data.name}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )}mph`;
}

function search(city) {
  let apiKey = "1c4934061b454ec4a155b894f41b1a39";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;

  search(city);
}

search("Los Angeles");

let formSubmit = document.querySelector("#search-form");
formSubmit.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "1c4934061b454ec4a155b894f41b1a39";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function myLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", myLocation);

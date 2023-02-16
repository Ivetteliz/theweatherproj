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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "MOnday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML = `${forecastHTML}
  <div class= "col">

  <img
  class="forecastIcons"
  src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
  alt=""
  width="85"/> 
  
<div class= "forecast-description">
${forecastDay.weather[0].description}
</div>

  <div class="weather-forecast-temperatures">

  <span class="max-forecast-temp"> 
  ${Math.round((forecastDay.temp.max * 9) / 5 + 32)}º 
  </span>


  <span class="min-forecast-temp"> 
  ${Math.round((forecastDay.temp.min * 9) / 5 + 32)}º 
  </span>
  
  </div>

  <span class= "forecast-humidity">
Humidity: ${forecastDay.humidity}
</span>

<div class="forecast-wind">
Wind Speed:${Math.round(forecastDay.wind_speed)}
</div>
  
  <span class= "forecast-day">
  ${formatDay(forecastDay.dt)}
  </span>
  
  </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "0dc40d3d7cda209ca40e77430c74cf57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
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

  getForecast(response.data.coord);
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

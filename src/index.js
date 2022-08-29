let now = new Date();
formatDate(now);

function formatDate(date) {
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
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
    "December"
];

let currentWeekday = days[date.getDay()];
let currentDate = date.getDate();
let currentMonth = months[date.getMonth()];

let currentHour = date.getHours();
if (currentHour < 10) {
    currentHour = `0${currentHour}`;
}

let currentMin = date.getMinutes();
if (currentMin < 10) {
    currentMin = `0${currentMin}`;
}

let dateToday = document.querySelector("#current-date-time");
dateToday.innerHTML = `${currentWeekday}, ${currentDate} ${currentMonth}`;

let todayTime = document.querySelector("#todaysTime");
todayTime.innerHTML = `${currentHour}:${currentMin}`;
}

function enterCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    let cityName = document.querySelector("#cityTyped");
    cityName.innerHTML = `${cityInput.value}`;
}
let searchCityForm = document.querySelector("#city-searchbar");
searchCityForm.addEventListener("submit", enterCity);


function convertToCelsius(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureValue = document.querySelector("#current-temperature");
    temperatureValue.innerHTML = Math.round(celsiusTemperature);
}

function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureValue = document.querySelector("#current-temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureValue.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-conversion");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-conversion");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function showWeather(response) {
    document.querySelector("#cityTyped").innerHTML = response.data.name;
    document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#weather-desc").innerHTML = response.data.weather[0].description;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
    // document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed * 3.6);
    document.querySelector("#icon").setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

    celsiusTemperature = response.data.main.temp;
}

function searchCity(city) {
    let apiKey = "8aacd15d7bc361635e37fddcd79d6f8c";
    let unit = "metric";
    let apiEndPoint = "https://api.openweathermap.org/data";
    let apiUrl = `${apiEndPoint}/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

searchCity("Japan");

function showCurrentTemperature(position) {
    let apiKey ="8aacd15d7bc361635e37fddcd79d6f8c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showCurrentTemperature);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
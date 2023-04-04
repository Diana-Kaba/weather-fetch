"use srtrict";

const weatherBlock = document.querySelector("#weather");

function selectCity() {
  let city = document.getElementById("mySelect").value;
  return city;
}

async function loadWeather() {
  const city = selectCity();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=06ddd03d11d9a328c9ecbdd226fb407f`;
  weatherBlock.innerHTML = `
    <div class="weather_loading"><img class="loader" src="./images/loading.gif" alt=""></div>
    `;
  let response = await fetch(url, { method: "GET" });
  let data = await response.json();
  if (response.ok) {
    getWeather(data, city);
  } else {
    weatherBlock.innerHTML = data.message;
  }
}

function getWeather(data, city) {
  console.log(data);
  const temp = data.main.temp;
  const tempFeels = data.main.feels_like;
  const icon = data.weather[0].icon;
  const description = data.weather[0].description;
  const windSpeed = data.wind.speed;
  const humidity = data.main.humidity;
  const template = `
    <div id="city"><h2>${city}</h2></div>
    <div id="temp">${temp}°C, but feels like: ${tempFeels}°C</div>
    <div id="icon"><img src="https://api.openweathermap.org/img/w/${icon}.png" alt="">
    <div id="descr">${description}</div>
    <br>
    <div id="wind">Speed wind: ${windSpeed}</div>
    <div id="humidity">Humidity: ${humidity}%</div>
    </div>
    `;
  weatherBlock.innerHTML = template;
}
let button = document.getElementById("show_weather");
button.addEventListener("click", loadWeather);

let now = new Date();
let h6 = document.querySelector("#currentDate")
let date = now.getDate();
    let hours = now.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[now.getDay()];
    h6.innerHTML = `${date}, ${day}, ${hours}:${minutes}`;
  
    
    function getDay(timestamp){
        let date = new Date(timestamp * 1000);
        let day = date.getDay();
        let days = ["Sun","Mon","Tue","Wed","Thu", "Fri","Sat"]
        return days[day];
        }
        function showCoord(coordinates) {
          let lat= coordinates.lat;
          let lon= coordinates.lon;
          let apiKey = `449d98831278c89f8af4fbd4fabe2bcb`;
          let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
          axios.get(apiUrl).then(showForecast);
        }
        function showForecast(response){
        let forecast = response.data.daily;
          let forecastElement = document.querySelector("#forecast");
          let forecastHTML = `<div class="box">`;
          
        forecast.forEach(function (forecastDay, index) {
          if(index < 5){
            forecastHTML =
              forecastHTML +
              `<div class="days">
                  <div>${getDay(forecastDay.dt)}</div>
                    <div class="icon"> <img
                    src=" http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt="weather"
                  /></div>
                     <div class="info">
                    <span class="max-temp">${Math.round(forecastDay.temp.max)}°C</span>
                    <span class="min-temp">${Math.round(forecastDay.temp.min)}°C</span>
                  </div>
                </div>`;
          }
          });
                forecastHTML = forecastHTML + `</div>`;
          forecastElement.innerHTML = forecastHTML;
        }

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h5 = document.querySelector("h5");
  h5.innerHTML = `${searchInput.value}`;
  console.log(searchInput.value);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

function displayWeather (response) {
    let city = document.querySelector("#city");
    let temperature = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let icon = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;
    
    city.innerHTML = response.data.name;
    temperature.innerHTML = Math.round(celsiusTemperature);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);


    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    icon.setAttribute("alt", response.data.weather[0].description);
    showCoord(response.data.coord);
  }

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    let fahrenheitTemperature = (celsiusTemperature * 9)/5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }
  
  function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
  
  let celsiusTemperature = null;
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);

  function search(city) {
    let apiKey = "449d98831278c89f8af4fbd4fabe2bcb";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input");
    search(city.value);
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  search("London");
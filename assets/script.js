var key = "6f099a0d6878d2a980bd7fcc1a540b74";

//search div variables
var userCity = document.getElementById("userCity");
var searchBtn = document.getElementById("searchBtn");
var searchHistory = document.getElementById("searchHistory");
var searchCityArray = JSON.parse(localStorage.getItem("cityArray")) || [];

function submitCity() {
    searchCityArray.push(userCity.value);
    localStorage.setItem("cityArray", JSON.stringify(searchCityArray));
    currentWeather(userCity.value);
}

searchBtn.addEventListener('click', submitCity);

//function to fetch lon lat and current weather
function currentWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&appid=${key}&units=imperial`)
    .then(response => response.json())
    .then(data => 
    {
        console.log(data);
        
        //show user's search result, today's date, and icon for weather
        var currentSearch = document.getElementById("current-search");
        currentSearch.innerText = data.name;

        var d = new Date();
        var today = '(' + (d.getMonth()+1) + '/' + d.getDate() + '/' +d.getFullYear() + ')';
        var date = document.getElementById("date");
        date.innerText = today;

        var icon = document.createElement("img");
        var iconURL = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        icon.setAttribute('src', iconURL);
        document.getElementById("icon").appendChild(icon);

        //show current weather conditions
        var temp = document.createElement("p");
        var wind = document.createElement("p");
        var humidity = document.createElement("p");
        var uv = document.createElement("p");

        temp.innerHTML = `Temp: ${data.main.temp}°F`;
        wind.innerHTML  = `Wind: ${data.wind.speed} MPH`;
        humidity.innerHTML  = `Humidity: ${data.main.humidity}%`;

        const uvIndex = getUv(data.coord.lat, data.coord.lon);
        //determine uv index color
        uv.innerHTML = `UV Index: ${uvIndex}`;
            if (uvIndex < 2) {
                uv.classList.add("low-uv");
            } else if (uvIndex >= 2 && uvIndex < 5) {
                uv.classList.add("moderate-uv");
            } else if (uvIndex >= 5 && uvIndex < 10) {
                uv.classList.add("high-uv");
            } else {
                uv.classList.add("very-high-uv");
            };
       
        

        var currentStats = document.getElementById("current-stats");
        currentStats.appendChild(temp);
        currentStats.appendChild(wind);
        currentStats.appendChild(humidity);
        currentStats.appendChild(uv);
        
        //call forecast function with search city data
        forecast(data.coord.lat, data.coord.lon);
    });
    
}

function getUv(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`)
    .then(response => response.json())
    .then(data =>
        {
            const uvIndex = data.current.uvi;

        });
}

//displays the secleted city current weather
function forecast(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=imperial&cnt=5`)
    .then(response => response.json())
    .then(data =>
        {
            console.log(data);
            for (let i = 0; i < data.daily.length; i++) {
                createCard(data.daily[i]);
            }
        });
}

function createCard(day) {
    var forecastContainer = document.getElementById("forecast");
    var dayDiv = document.createElement("div");
    dayDiv.classList.add("col-2");
    dayDiv.classList.add("forecast-day");
    forecastContainer.appendChild(dayDiv);

    var forecastTemp = document.createElement("p");
    var forecastIcon = document.createElement("img");
    var forecastWind = document.createElement("p");
    var forecastHumidity = document.createElement("p");
    
    var forecastIconURL = `https://openweathermap.org/img/w/${day.weather[0].icon}.png`;
    forecastIcon.setAttribute('src', forecastIconURL);
    
    forecastTemp.innerHTML = `Temp: ${day.temp.day}`;
    forecastIcon.innerHTML = `${forecastIcon}`;
    forecastWind.innerHTML = `Wind: ${day.wind_speed} MPH`;
    forecastHumidity.innerHTML = `Humidity: ${day.humidity}%`;

    dayDiv.appendChild(forecastTemp);
    dayDiv.appendChild(forecastIcon);
    dayDiv.appendChild(forecastWind);
    dayDiv.appendChild(forecastHumidity);
    
}

function showHistory() {
    searchHistory.innerHTML = [...new Set(searchCityArray)];
    searchHistory.classList.add("search-history");
}

showHistory();

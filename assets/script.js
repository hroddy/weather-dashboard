//one call https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// current weather api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

var key = "6f099a0d6878d2a980bd7fcc1a540b74";

//searching the user's city of choice
//dom text area value log into local storage and pass into a variable and then send to api to fetch data

var userCity = document.getElementById("userCity");
var searchBtn = document.getElementById("searchBtn");
var searchCityArray = localStorage.getItem("cityArray") || [];

function submitCity() {
    searchCityArray.push(userCity.value);
    localStorage.setItem("cityArray", searchCityArray);
    currentWeather(userCity.value);
}

searchBtn.addEventListener('click', submitCity);

//function to fetch lon lat and current weather
function currentWeather(city) {
    fetch(`api.openweathermap.org/data/2.5/weather?q=${userCity.value}&appid=${key}`);
}

//displays the secleted city current weather
//take locally stored variable and call api to fetch current weather
//display in a div using dom

//displays the city's five day forecast
//take locally stored variable and call api to fetch five day forecast
//display in a div using dom
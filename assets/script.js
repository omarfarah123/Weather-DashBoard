var searchForCity = document.querySelector("h3");
var cityInput = document.querySelector("#search-input");
var cityHistory = document.querySelector("#cityHistory")
var citySearch = document.querySelector("#citySearch");
var searchButton = document.querySelector("#search-button");
var cityName = document.querySelector("#cityName");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uvIndex = document.querySelector("#UVindex");
var uv = document.querySelector("#uv")
var lat;
var lng;

var cities = []


cityInput.addEventListener("input", function(event) {
    event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase()
  })

var continents = ["Africa", "Asia", "America", "North America", "South America", "Antartica"];


function uvIndexRetriever(lat, lng){
    var requestUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lng + "&appid=02024b9f7001696a944662ca0b291629&units=metric"

    fetch(requestUrl)
    .then(function (response){
        return response.json()
    })
    .then(function (data) {
        uv.innerHTML = `${data.value}`
        if(data.value <= 2.99){
            uv.style.backgroundColor = "green"
        } else if(data.value >= 3 && uvIndex <= 5.99){
            uv.style.backgroundColor  = "yellow"
        } else if(data.value >= 6 && data.value <= 7.99){
            uv.style.backgroundColor = "orange"
        } else {
            uv.style.backgroundColor = "red"
        }
    })

       
}






function getWeather(city){

    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&exclude=hourly,daily&appid=02024b9f7001696a944662ca0b291629&units=imperial&cnt=40`


        fetch(requestUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            var name = data.city.name
            //Checks the input data if it was succesful
            if(data.cod !== "200"){
                alert(data.message)
            } else {
                console.log(data.city.name)
                //Checks if the data entered was a continent
                if(name === continents[0] || name === continents[1] || name === continents[2] || name === continents[3] || name === continents[4] || name === continents[5]){
                    alert("Please enter a city or a country")
                } else {
                    var num = 0
                    //Checks to see if the location entered is not alredy in local storage
                    for(let i = 0; i < cities.length; i++){
                        if(cities[i] != cityInput.value){
                            num++
                        }
                    }
                    //Adds the location to the local storage and adds it to the bistory
                    if(num == cities.length){
                        cities.push(cityInput.value)
                        localStorage.setItem("my_cities", JSON.stringify(cities))
                        historyButton()
                    }
                    console.log(data)
                    console.log(data.list[0].weather[0].icon)
                    var lat = data.city.coord.lat;
                    var lon = data.city.coord.lon;
                    cityName.innerHTML = `${data.city.name} ${data.list[0].dt_txt.slice(0, 10)}`
                    temp.innerHTML = `Temp: ${data.list[0].main.temp}°F`
                    wind.innerHTML = `Wind: ${data.list[0].wind.speed} MPH`
                    humidity.innerHTML = `Humidity ${data.list[0].main.humidity}%`
                    uvIndexRetriever(lat, lon)
                    var current = 8
                    for(let i = 1; i <= 5; i++){
                        var day;
                        console.log(day)
                        if(i < 5){
                            //Adds the data for each of the daily forcast blocks
                            day = document.getElementById(`day${i}`);
                            day.children[0].innerHTML = data.list[current].dt_txt.slice(0, 10)
                            console.log(data.list[current].dt_txt.slice(0, 10))
                            var icon = `${data.list[current].weather[0].icon}`
                            day.children[1].src = `https://openweathermap.org/img/wn/${icon}@2x.png`
                            day.children[2].innerHTML = `Temp ${data.list[current].main.temp}°F`;
                            console.log(`Temp ${data.list[current].main.temp}°F`)
                            day.children[3].innerHTML = `Wind ${data.list[current].wind.speed} MPH`;
                            console.log(`Wind ${data.list[current].wind.speed} MPH`)
                            day.children[4].innerHTML = `Humidity ${data.list[current].main.humidity}`
                            console.log(`Humidity ${data.list[current].main.humidity}`)
                            current += 8;
                        } else {
                            day = document.getElementById(`day5`);
                            day.children[0].innerHTML = data.list[39].dt_txt.slice(0, 10)
                            console.log(data.list[39].dt_txt.slice(0, 10))
                            var icon = `${data.list[39].weather[0].icon}`
                            day.children[1].src = `https://openweathermap.org/img/wn/${icon}@2x.png`
                            day.children[2].innerHTML = `Temp ${data.list[39].main.temp}°F`;
                            console.log(`Temp ${data.list[39].main.temp}°F`)
                            day.children[3].innerHTML = `Wind ${data.list[39].wind.speed} MPH`;
                            console.log(`Wind ${data.list[39].wind.speed} MPH`)
                            day.children[4].innerHTML = `Humidity ${data.list[39].main.humidity}`
                            console.log(`Humidity ${data.list[39].main.humidity}`)
                        }
                    }
                
                }
            }
                
            
            }            
    );
}
//Function to add city to the history
function historyButton(){
    var button = document.createElement('button');
    button.classList.add("col-12", "btn", "btn-secondary")
    for(let i = 0; i < cities.length; i++){
        button.innerHTML = cities[i];
        cityHistory.append(button)
    }
}

//When the users searches for the city or country the data gets passed to e the getWeather() function
searchButton.addEventListener("click", function(){
    getWeather(cityInput.value)
    }
)





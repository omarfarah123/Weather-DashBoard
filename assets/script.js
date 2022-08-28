var searchForCity = document.querySelector("h3");
var cityInput = document.querySelector("#search-input");
var cityHistory = document.querySelector("#cityHistory")
var citySearch = document.querySelector("#citySearch");
var searchButton = document.querySelector("#search-button");
var cityName = document.querySelector("#cityName");
var temp = document.querySelector("#temp");
var wind = document.querySelector("#wind");
var humidity = document.querySelector("#humidity");
var uvIndex = document.querySelector("#UVindex")
var lat;
var lng;


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
        uvIndex.innerHTML = `UV: ${data.value}`
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
            if(data.cod !== "200"){
                alert(data.message)
            }
            for(let i = 0; i < continents.length; i++){
                console.log(data.city.name)
                if(name === continents[0] || name === continents[1] || name === continents[2] || name === continents[3] || name === continents[4] || name === continents[5]){
                    alert("Please enter a city or a country")
                    break;
                } 
                else {
                    console.log(data)
                    console.log(data.list[0].weather[0].icon)
                    var historyButton = document.createElement('button');
                    historyButton.id = name;
                    historyButton.classList.add("col-12", "btn", "btn-secondary")
                    var lat = data.city.coord.lat;
                    var lon = data.city.coord.lon;
                    historyButton.innerHTML = cityInput.value
                    cityName.innerHTML = `${data.city.name} ${data.list[0].dt_txt.slice(0, 10)}`
                    temp.innerHTML = `Temp: ${data.list[0].main.temp}°F`
                    wind.innerHTML = `Wind: ${data.list[0].wind.speed} MPH`
                    humidity.innerHTML = `Humidity ${data.list[0].main.humidity}%`
                    uvIndexRetriever(lat, lon)
                    var current = 8
                    for(let i = 1; i < 5; i++){
                        var day = document.getElementById(`day${i}`);
                        console.log()
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
                    }
                    let num = 0;
                    for(let i = 0; i < cityHistory.children.length; i++){
                        console.log(`${cityHistory.children[i].innerHTML} and ${num}`)
                        if(cityHistory.children[i].innerHTML !== cityInput.value){
                            num++;
                        }
                    }
                    console.log(num)
                    if(num === cityHistory.children.length){
                        cityHistory.append(historyButton)
                    }
                    break;
                }
            }
            }            
    );
}


searchButton.addEventListener("click", function(){
      var city = cityInput.value 
      getWeather(city)  
    }
)




const cities_select = document.getElementById('select-city');
const api_key = "ff0ed85d936b39b952700f07222bdfea";
const weather_result = document.getElementById("section-weather-result");

addCitiesToSelect();

function addCitiesToSelect() {
    if (cities == "") {
        cities_select.innerHTML = `<option value="empty" disabled selected>No hay ciudades</option>`
    } else {
        for (i=0; i<cities.length; i++) {
            cities_select.innerHTML += `<option value="${cities[i]}">${cities[i]}</option>`
        }
    }
}

async function consultApi(city_to_consult) {
    if (weather_result) {
        weather_result.innerHTML = "";
    }
    try {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_to_consult}&appid=${api_key}&units=metric&lang=es`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            weatherInfo(data);
        })
    } catch (error) {
        console.error("Error encontrado: " + error)
    }
}

function weatherInfo(data) {
    let city = data.name;
    let icon = data.weather[0].icon;
    let temp = data.main.temp;
    let feels_like = data.main.feels_like;
    let humidity = data.main.humidity;
    let wind_speed = data.wind.speed;
    let pressure = data.main.pressure;
    
    if (weather_result) {
        weather_result.innerHTML += `<div class="card">
        <h3>${city}</h3>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Imagen">
        <p>Temperatura: ${temp}°</p>
        <p>Sensación térmica: ${feels_like}°</p>
        <p>Humedad: ${humidity}%</p>
        <p>Velocidad del viento: ${wind_speed}km/h</p>
        <p>Presión: ${pressure} P</p>
    </div>`
    }
}
import { getWeatherData } from "./api.js";

const button = document.getElementById('search__city');
const query = document.getElementById('query');
const video = document.getElementById('background-video');

const storm = [200, 201, 202, 230, 231, 232, 233];
const lightRain = [300, 301, 302, 500, 501, 900];
const heavyRain = [502, 511, 520, 521, 522];
const snow = [600, 601, 602, 610, 621, 622, 623];
const sleet = [611, 612];
const clear = [800, 801]
const cloudy = [802, 803, 804];
const fog = [751, 741, 731, 721, 711, 700];

let data = {};

const setData = (data) => {

    let temperature = document.querySelector('.temperature');
    let city = document.querySelector('.data__location > h2');
    let countryCode = document.querySelector('.data__location > span');
    let weatherIcon = document.getElementById('img');
    let weatherDescription = document.querySelector('.weather__description');
    let weatherData = document.querySelector('.details__values').children;
    let weatherCode = data.weather.code;

    temperature.textContent = data.temp + '°';
    city.textContent = data.city_name;
    weatherIcon.src = `https://cdn.weatherbit.io/static/img/icons/${data.weather.icon}.png`;
    countryCode.textContent = data.country_code;
    weatherDescription.textContent = data.weather.description;
    weatherData[0].textContent = data.rh + '%';
    weatherData[1].textContent = data.wind_spd.toFixed(1) + ' m/s';
    weatherData[2].textContent = data.wind_dir + '°';
    weatherData[3].textContent = data.clouds + '%';
    weatherData[4].textContent = data.precip + ' mm/hr';
    weatherData[5].textContent = data.aqi;
    weatherData[6].textContent = data.uv.toFixed(1);

    if(storm.includes(weatherCode)){
        video.src = 'img/storm.mp4';
    }else if(lightRain.includes(weatherCode)){
        video.src = 'img/lightRain.mp4';
    }else if(heavyRain.includes(weatherCode)){
        video.src = 'img/heavyRain.mp4';
    }else if(snow.includes(weatherCode)){
        video.src = 'img/snow.mp4';
    }else if(sleet.includes(weatherCode)){
        video.src = 'img/sleet.mp4';
    }else if(clear.includes(weatherCode)){
        video.src = 'img/clear.mp4';
    }else if(cloudy.includes(weatherCode)){
        video.src = 'img/cloudy.mp4';
    }else{
        video.src = 'img/fog.mp4';
    }
    setTimeout(() => {
        video.classList.add('video--play');
    }, 200);
    
    video.addEventListener('transitionend', function() {
      video.play();
    });
    
}

button.addEventListener('click', function (e) {
    e.preventDefault();
    if (query.value.trim() === '') {
        alert('Search field is empty');
    } else {
        getWeatherData(query.value)
            .then(apiResponse => {
                // Manejar la apiResponse aquí
                video.classList.remove('video--play');
                setData(apiResponse);
                data = apiResponse;
            })
            .catch(error => {
                // Manejar el error aquí
                console.log(error);
            });
    }
})

document.addEventListener('DOMContentLoaded', function() {
    getWeatherData('cali')
        .then(apiResponse => {
            setData(apiResponse);
            data = apiResponse;
        })
        .catch(error => {
            console.log(error);
        });
});
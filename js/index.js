const apiKey = 'c3157056c90a8f65d9095aea9cf63ec4';
const input = document.querySelector('.cityInput');
const weather = document.querySelector(".weather")
const displayer = document.querySelector('.displayer')

// conseguir data con .then

// try {
//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(weatherData => {
//             console.log(weatherData)
//         })
// } catch(err) {
//     console.log(err)
// }

// conseguir data con async await

async function getData(city) {
    const metricSelect = document.getElementById("metricSelect");
    const metrics = metricSelect.value; // 'metric' for Celsius, 'imperial' for Fahrenheit

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${metrics}`;

    try {
        const response = await fetch(apiUrl);
        const weatherData = await response.json();
        const humidity = document.querySelector(".humidity").innerHTML = `
        <p>${weatherData.main.humidity} %</p>
        `;
        const temp = document.querySelector(".temp").innerHTML = `
        <p>${weatherData.main.temp} °${metrics === "metric" ? "C" : "F"}</p>
        `;
        const wind = document.querySelector(".wind").innerHTML = `
        <p>${weatherData.wind.speed} ${metrics === "metric" ? "km" : "mp"}/h</p>
        `;
        
        if (weatherData.weather[0].main === 'Clouds') {
            weather.innerHTML = `
                <img src="/img/clouds.png" alt="">
            `
        } else if (weatherData.weather[0].main === 'Clear') {
            weather.innerHTML = `
                <img src="/img/clear.png" alt="">
            `
        } else if (weatherData.weather[0].main === 'Drizzle') {
            weather.innerHTML = `
                <img src="/img/drizzle.png" alt="">
            `
        } else if (weatherData.weather[0].main === 'Mist') {
            weather.innerHTML = `
                <img src="/img/mist.png" alt="">
            `
        } else if (weatherData.weather[0].main === 'Rain') {
            weather.innerHTML = `
                <img src="/img/rain.png" alt="">
            `
        } else if (weatherData.weather[0].main === 'Snow') {
            weather.innerHTML = `
                <img src="/img/snow.png" alt="">
            `
        } else {
            return
        }
    } catch (error) {
        console.log(error);
        alert('No se encontró la ciudad, porfavor ingrese otra distinta')
    }
}

input.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        searchWeather();
        displayer.classList.remove('displayer')
    }
})

function searchWeather() {
    const city = document.querySelector('.cityInput').value;
    getData(city);
}
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '6e4876a6c89a11ef806a0242ac130003';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    fetch('https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric')
        .then(response => response.json()).then(json => {

            if (json.cod == '404') {
                container.computedStyleMap.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return
            }

            container.computedStyleMap.height = '555px';
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'assets/image/clear.png';
                    break;
                case 'Rain':
                    image.src = 'assets/image/rain.png';
                    break;
                case 'Snow':
                    image.src = 'assets/image/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'assets/image/cloud.png';
                    break;
                case 'Mist':
                    image.src = 'assets/image/mist.png';
                    break;
                case 'Haze':
                    image.src = 'assets/image/mist.png';
                    break;

                default:
                    image.src = 'assets/image/cloud.png';
            }

            temperature.innerHTML = '${parseInt(json.main.temp)}<span>°C</span>';
            description.innerHTML = '${json.wearther[0].description}';
            humidity.innerHTML = '${json.main.humidity}%';
            wind.innerHTML = '${parseInt(json.wind.speed)}Km/h';

        });
});
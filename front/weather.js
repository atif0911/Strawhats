document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'f9e7f6a70a5e607279650a2e14591460'; // Replace with your actual API key

    function fetchWeather(city) {
        // First, get latitude and longitude of the city
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('City not found. Please enter a valid city name.');
                }
                return response.json();
            })
            .then(data => {
                const { lat, lon } = data.coord;
                const cityName = data.name;
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

                // Update current weather
                document.getElementById('city-name').textContent = cityName;
                document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
                document.getElementById('description').textContent = description;
                document.getElementById('weather-icon').setAttribute('src', weatherIcon);

                // Fetch 3-day forecast
                fetchForecast(lat, lon);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert(error.message);
            });
    }

    function fetchForecast(lat, lon) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching forecast data.');
                }
                return response.json();
            })
            .then(data => {
                const forecastContainer = document.querySelector('.forecast-cards');
                forecastContainer.innerHTML = '';

                // Only show 3 days of forecast
                let count = 0;
                data.list.forEach(item => {
                    if (item.dt_txt.includes('12:00:00') && count < 3) { // Show only daily forecasts
                        const forecastCard = document.createElement('div');
                        forecastCard.classList.add('forecast-card');
                        forecastCard.innerHTML = `
                            <h4>${new Date(item.dt * 1000).toLocaleDateString()}</h4>
                            <img src="http://openweathermap.org/img/wn/${item.weather[0].icon}.png" alt="${item.weather[0].description}">
                            <p>${item.main.temp}°C</p>
                            <p>${item.weather[0].description}</p>
                        `;
                        forecastContainer.appendChild(forecastCard);
                        count++;
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching forecast data:', error);
                alert('Unable to fetch weather forecast data. Please try again later.');
            });
    }

    document.getElementById('fetch-weather-btn').addEventListener('click', () => {
        const city = document.getElementById('city-input').value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            alert('Please enter a city name.');
        }
    });
});

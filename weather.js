
const apiKey = 'b9518897c742feea21960d79654cc851';
const weatherDataDiv = document.getElementById('weatherData');
const adviceDiv = document.getElementById('advice');



async function getWeather() {
  const cityInput = document.getElementById('cityInput').value;
  if (!cityInput) {
    alert('Please enter a city name.');
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Weather data not found for the given city. Please check the city name.');
    }
    const data = await response.json();
    displayWeatherData(data);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    weatherDataDiv.textContent = 'Error fetching weather data. Please try again later.';
  }
}


function displayWeatherData(data) {
  const temperature = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  var temp;
  var whatToWear;  


  if(temperature < 10 || temperature > 10 && temperature < 19) {
    whatToWear = `<h2>I think you should bring a coat today as it is ${temperature} &#x2103 today</h2>
    <img class="cold" src="cold.jpg">`
    temp = `<img class="tempImg" src="Cold Emoji.png"`

} else if(temperature > 19) {
    whatToWear = `<h2>I think you should wear shorts today as it is ${temperature} &#x2103 today </h2>
    <img class="warm" src="warm.jpg">`
    temp = `<img class="tempImg" src="sun.png"`
 }

 /* ${temperature}°C   put back into Temperature p tag if bugs*/
  const weatherInfo = `
    <h2 class="info">Weather Information for ${data.name}</h2>
    
    <div class="box">
    <p>Temperature: ${temperature}°C ${temp}</p>  
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
    </div>

    <div class="advice">
    <p> ${whatToWear} </p>
    </div>
  `;

  weatherDataDiv.innerHTML = weatherInfo;
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

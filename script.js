function getWeather() {
  // Fetching weather data from OpenWeather API
  let weather, imageUrl;
  let city = document.getElementById("city-input").value;
  const apiKey = "08f521eb83ce3fa0cb189edc68e954f4";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        weather = data.weather[0].description;

        // Show weather details
        document.getElementById(
          "city-name"
        ).innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById(
          "temperature"
        ).innerText = `Temperature: ${data.main.temp}°C`;
        document.getElementById(
          "description"
        ).innerText = `Weather: ${data.weather[0].description}`;
        document.getElementById(
          "humidity"
        ).innerText = `Humidity: ${data.main.humidity}%`;
        document.getElementById(
          "wind-speed"
        ).innerText = `Wind Speed: ${data.wind.speed} m/s`;

        let temp = data.main.temp;
        if (temp > 25) {
          document.body.style.background = "#ffeb3b"; // Warm weather
        } else if (temp < 10) {
          document.body.style.background = "#2196f3"; // Cold weather
        } else {
          document.body.style.background = "#81c784"; // Moderate weather
        }

        // Log the weather description after fetching the data
        console.log(weather);

        // Fetch image based on the weather description
        imageUrl = `https://api.unsplash.com/search/photos?query=${weather}&client_id=vGXghmrjT-en_uYKsU6QGhk8P73GhXYPWw_IEMstwpA`;
        fetch(imageUrl)
          .then((response) => response.json())
          .then((data) => {
            const weatherBackground = document.getElementById("weather-box");
            if (weatherBackground) {
              weatherBackground.style.backgroundImage = `url(${
                data.results[0].urls.large || data.results[0].urls.regular
              })`;
              weatherBackground.style.backgroundSize = "cover"; // Ensure the image covers the container
              weatherBackground.style.backgroundPosition = "center"; // Center the image
            } else {
              console.error("Element with id 'weather-box' not found.");
            }
          })
          .catch((error) => {
            console.error("Error fetching Unsplash image:", error);
          });
      } else {
        alert("City not found!");
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("An error occurred, please try again!");
    });
}

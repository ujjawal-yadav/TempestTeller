const inputBox = document.getElementById("input-box");
const weatherIcon = document.querySelector(".weather-icon");

async function extractCity() {
    if (inputBox.value === "") {
        alert("You must write something");
    } else {
        const inputValue = inputBox.value.trim();

        try {
            const data = await getWeatherData(inputValue);

            // Extracted data
            const { temperature, windSpeed, humidity, icon } = data;

            // Display data
            displayWeatherData(inputValue, temperature, humidity, windSpeed, icon);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            // Handle the error appropriately, e.g., show an error message to the user
        }

        // Clear the input box after processing
        inputBox.value = "";
    }
}

function displayWeatherData(city, temperature, humidity, windSpeed, icon) {
    // Display data
    document.querySelector(".city").innerHTML = city;
    document.querySelector(".temp").innerHTML = `${temperature}°C`;
    document.querySelector(".humidity").innerHTML = `${humidity}%`;
    document.querySelector(".wind").innerHTML = `${windSpeed} km/h`;
    document.querySelector(".wind-img").src = "images/wind.png";
    document.querySelector(".humi-img").src = "images/humidity.png";
    document.querySelector("#windspeed").innerHTML = "wind speed";
    document.querySelector("#humi").innerHTML = "humidity";

    // Map weather conditions to images
    const weatherImageMap = {
        sunny: "sun1.png",
        mostly_sunny: "sun1.png",
        cloudy: "clouds.png",
        mostly_cloudy: "clouds.png",
        overcast: "clouds.png",
        overcast_with_low_clouds: "clouds.png",
        rain: "heavy-rain.png",
        rain_shower: "heavy-rain.png",
        thunderstorm: "scattered-thunderstorms.png",
        local_thunderstorms: "scattered-thunderstorms.png",
        snow: "snow1.png",
        light_snow: "snow1.png",
        possible_snow: "snow1.png",
        snow_shower: "snow1.png",
        clear: "clear-sky.png",
        light_rain: "drizzle.png",
        possible_rain: "drizzle.png",
        partly_sunny: "mist.png",
        hail: "hail.png",
    };

    weatherIcon.src = "images/" + (weatherImageMap[icon] || "default-image.png");
    weatherIcon.alt = icon;
}

inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        extractCity();
    }
});

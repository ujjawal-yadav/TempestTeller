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

    document.querySelector(".weather-name").innerHTML = getWeatherName(icon);


    const cardElement = document.querySelector(".card");
    cardElement.classList.remove("background-gradient-basic");

    // Add background gradient class based on the weather
    switch (icon) {
        case "sunny":
        case "mostly_sunny":
            cardElement.classList.add("background-gradient-sunny");
            break;
        case "cloudy":
        case "mostly_cloudy":
        case "overcast":
        case "overcast_with_low_clouds":
            cardElement.classList.add("background-gradient-cloud");
            break;
        case "rain":
        case "rain_shower":
        case "thunderstorm":
        case "local_thunderstorms":
        case "hail":
            cardElement.classList.add("background-gradient-rain");
            break;
        case "snow":
        case "light_snow":
        case "possible_snow":
        case "snow_shower":
            cardElement.classList.add("background-gradient-snow");
            break;

        // Add more cases for other weather conditions as needed
        default:
            // Use a default background gradient class if the weather condition is not recognized
            cardElement.classList.add("background-gradient-basic");
            break;
    }
}



    


inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        extractCity();
    }

});

async function getWeatherData(placeId) {
    const url = `https://ai-weather-by-meteosource.p.rapidapi.com/current?place_id=${placeId}&timezone=auto&language=en&units=ca`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f0543198e8msh67bed1821e75f8cp1a3c70jsn13f240c570c6',
            'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Extract relevant data from the response
        const {
            current: {
                temperature,
                wind: { speed },
                humidity,
                icon
            }
        } = data;

        // Return the extracted data
        return {
            temperature,
            windSpeed: speed,
            humidity,
            icon
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Rethrow the error for handling in the calling code
    }
}
function getWeatherName(icon) {
    const weatherNameMap = {
        sunny: "sunny",
        mostly_sunny: "mostly sunny",
        cloudy: "cloudy",
        mostly_cloudy: "mostly cloudy",
        overcast: "overcast",
        overcast_with_low_clouds: "overcast",
        rain: "rain",
        rain_shower: "heavy rain",
        thunderstorm: "thunderstorm",
        local_thunderstorms: "thunderstorms",
        snow: "snow",
        light_snow: "snow",
        possible_snow: "snow",
        snow_shower: "heavy snow",
        clear: "clear",
        light_rain: "drizzle",
        possible_rain: "drizzle",
        partly_sunny: "partly sunny",
        hail: "hail",

        // Add more mappings as needed
    };

    return weatherNameMap[icon] || "Unknown";
}

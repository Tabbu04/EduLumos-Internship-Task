const apiKey = "e4ab2c7ab2b1437db0284205261301";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const locationEl = document.getElementById("location");
const localTimeEl = document.getElementById("localTime");
const tempEl = document.getElementById("temp");
const conditionEl = document.getElementById("condition");
const adviceEl = document.getElementById("advice");
const errorMsg = document.getElementById("errorMsg");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) fetchWeatherByCity(city);
});

locationBtn.addEventListener("click", getLocationWeather);

async function fetchWeatherByCity(city) {
    try {
        const res = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
        );
        const data = await res.json();
        if (data.error) throw new Error();
        updateUI(data);
    } catch {
        errorMsg.innerText = "City not found.";
    }
}

function getLocationWeather() {
    if (!navigator.geolocation) {
        errorMsg.innerText = "Location not supported.";
        return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
        );
        const data = await res.json();
        updateUI(data);
    });
}

function updateUI(data) {
    errorMsg.innerText = "";

    locationEl.innerText = `${data.location.name}, ${data.location.country}`;
    localTimeEl.innerText = `Local time: ${data.location.localtime}`;

    tempEl.innerText = data.current.temp_c;
    conditionEl.innerText = data.current.condition.text;

    adviceEl.innerText = generateAdvice(
        data.current.temp_c,
        data.current.condition.text
    );
}

function generateAdvice(temp, condition) {
    if (condition.includes("Rain")) return "🌧 Carry an umbrella. Roads may be slippery.";
    if (temp > 35) return "☀️ Very hot today. Stay hydrated and avoid going out.";
    if (temp < 15) return "🧥 It's cold. Wear warm clothes.";
    return "✅ Weather looks comfortable. Have a great day!";
}

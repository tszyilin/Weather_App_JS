// Weather App

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "38ed744348dd1c115c7478a681bf7395"

// Weather Form
weatherForm.addEventListener("submit", async event =>{
    // Avoid refreshing the page
    event.preventDefault();

    // Take the value from city input
    const city = cityInput.value;

    // Check the availability of city value
    if (city){
         try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
         }
         catch(error){
            console.error(error);
            displayError(error);
         }
    }
    else{
        displayError("Please enter a city");
    }    
});

// Get weather data function
async function getWeatherData(city){
    // Get the url from current weather data
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    
    return await response.json();
}

// Display weather data
function displayWeatherInfo(data){
    
    // Get properties from the json
    const {name: city, 
           main: {temp, humidity},
           weather: [{description, id}]} = data;
    
    // Let card show the content
    card.textContent = "";
    card.style.display = "flex";

    // Creating the element for displaying
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");
    
    // Display the content
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;    
    weatherEmoji.textContent = getWeatherEmoji(id);    

    
    // Use CSS style
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");
     
    // Display in card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

// Get the weather emoji
function getWeatherEmoji(weatherId){
    // Check the weather condition code from the website
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";

        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
            
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";   
        
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        
        case (weatherId === 800):
            return "☀️";

        case (weatherId >= 801 && weatherId < 800):
            return "☀️";
        default:
            return "😆";
    }
}

// Error display function
function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;

    // Use the class style
    errorDisplay.classList.add("errorDisplay");

    // Change the Card
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}










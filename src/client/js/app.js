// Fetches the geographical coordinates and country name for a given location
const fetchCoordinates = async (location) => {
    try {
        const response = await fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=l.j.alfar`);
        if (!response.ok) {
            throw new Error(`GeoNames API error: ${response.status}`);
        }
        const data = await response.json();
        if (data.geonames && data.geonames.length > 0) {
            const { lat, lng, countryName } = data.geonames[0];
            return { lat, lng, countryName };
        } else {
            throw new Error('Location not found');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
};

// Fetches the weather forecast for a given latitude and longitude
const fetchWeather = async (lat, lng) => {
    try {
        const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=9e810c2403cf423ab7133a337a017326`);
        if (!response.ok) {
            throw new Error(`Weatherbit API error: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
};

// Fetches an image related to the location from Pixabay
const fetchImage = async (location) => {
    try {
        const response = await fetch(`https://pixabay.com/api/?key=45780797-404895488723f1c55119eb259&q=${encodeURIComponent(location)}&image_type=photo`);
        if (!response.ok) {
            throw new Error(`Pixabay API error: ${response.status}`);
        }
        const data = await response.json();
        if (data.hits.length > 0) {
            return data.hits[0].webformatURL;
        } else {
            return 'default_image_url'; // Use a default image if no results found
        }
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
};

// Calculates the number of days until the trip starts
const calculateCountDown = (date) => {
    const tripDate = new Date(date);
    const today = new Date();
    const timeDifference = tripDate - today;
    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0; // Ensure the countdown is not negative
};

// Calculates the duration of the trip in days
const calculateTripDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return duration >= 0 ? duration : 0; // Ensure duration is not negative
};

// Displays the trip information in the UI
const displayTripInfo = (coordinates, weather, image, startDate, endDate, tripDuration) => {
    const tripInfoDiv = document.getElementById('trip-info');
    const countdown = calculateCountDown(startDate);
    tripInfoDiv.style.display = 'none'; // Hide while updating content

    // Construct the HTML for the trip information
    tripInfoDiv.innerHTML = `
        <h2>Trip to ${coordinates.countryName}</h2>
        <img src="${image}" alt="${coordinates.countryName}" class="trip-img">
        <p>Trip Start Date: ${startDate}</p>
        <p>End Date: ${endDate}</p>
        <p>Days until the trip start: ${countdown}</p>
        <p>Trip Duration: ${tripDuration} days</p>
        <p>Weather Forecast: ${weather.data[0].temp}°C, ${weather.data[0].weather.description}</p>
    `;

    tripInfoDiv.style.display = 'block'; // Show the updated content
};

export { fetchCoordinates, fetchWeather, fetchImage, displayTripInfo, calculateTripDuration };

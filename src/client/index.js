import './styles/styles.scss';
import { fetchCoordinates, fetchWeather, fetchImage, displayTripInfo, calculateTripDuration } from './js/app';

document.getElementById('travel-form').addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Extract form data
    const { location, startDate, endDate } = getFormData();

    // Show loading state
    setLoadingState(true);

    try {
        const coordinates = await fetchCoordinates(location);
        const weather = await fetchWeather(coordinates.lat, coordinates.lng);
        const image = await fetchImage(location);

        const tripDuration = calculateTripDuration(startDate, endDate);

        // Display the trip information
        displayTripInfo(coordinates, weather, image, startDate, endDate, tripDuration);
    } catch (error) {
        handleError(error);
    } finally {
        // Hide loading state
        setLoadingState(false);
    }
}

function getFormData() {
    const location = document.getElementById('location').value.trim();
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    return { location, startDate, endDate };
}

function setLoadingState(isLoading) {
    const loader = document.getElementById('loader');
    const form = document.getElementById('travel-form');
    const submitButton = form.querySelector('button[type="submit"]');

    if (isLoading) {
        loader.style.display = 'block';
        submitButton.disabled = true;
        submitButton.textContent = 'Loading...';
    } else {
        loader.style.display = 'none';
        submitButton.disabled = false;
        submitButton.textContent = 'Get trip Info';
    }
}

function handleError(error) {
    console.error('Error fetching data:', error);

    let errorMessage = 'Failed to fetch data. Please try again later.';
    if (error.message.includes('GeoNames API error')) {
        errorMessage = 'Location data could not be retrieved. Please check the location input.';
    } else if (error.message.includes('Weatherbit API error')) {
        errorMessage = 'Weather data could not be retrieved. Please try again later.';
    } else if (error.message.includes('Pixabay API error')) {
        errorMessage = 'Image data could not be retrieved. Please try again later.';
    }

    // Display error message in the UI
    displayErrorMessage(errorMessage);
}

function displayErrorMessage(message) {
    const errorDiv = document.getElementById('error-message');
    if (!errorDiv) {
        const newErrorDiv = document.createElement('div');
        newErrorDiv.id = 'error-message';
        newErrorDiv.textContent = message;
        newErrorDiv.style.color = 'red';
        newErrorDiv.style.marginTop = '20px';
        document.getElementById('app').appendChild(newErrorDiv);
    } else {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

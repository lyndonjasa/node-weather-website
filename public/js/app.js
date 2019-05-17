
const form = document.querySelector('form');
const txtLocation = document.getElementById('txtLocation');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const locationValue = txtLocation.value;

    const locations = locationValue.split(';');
    locations.forEach(location => {
        const el = document.createElement('p');
        el.innerHTML = 'Loading...';
        resultsDiv.appendChild(el);

        getWeatherForecast(location, (error, response) => {
            if (error) {
                appendError(error, el);
            } else {
                appendResult(response, el);
            }
        });
    });
});

getWeatherForecast = (location, callback) => {
    // gets the response from the url
    fetch('http://localhost:3000/weather?location=' + location).then((response) => {
        // parses the response as json object
        response.json().then((data) => {
            if (data.error) {
                callback(data.error, undefined);
            } else {
                callback(undefined, data);
            }
        });
    });
};

appendError = (error, element) => {
    element.innerHTML = error;
};

appendResult = ({ geocode, forecast }, element) => {
    const htmlString = `<b>Location:</b> ${geocode.location}<br/><b>Temperature:</b> ${forecast.temperature}<br/><b>Weather:</b> ${forecast.weather}`;
    element.innerHTML = htmlString;
}
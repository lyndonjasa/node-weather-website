const request = require('request');

const geocode = (address, callback) => {
    const geocodingApiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
    const accessToken = 'pk.eyJ1IjoiZG9uLWphc2EiLCJhIjoiY2p2ZXM3c3B6MXh2cDQzbm04YnozZGJrZSJ9.TowslE31J5TeltlmoS0nQw';

    const geocodeRequestUrl = `${geocodingApiUrl}/${encodeURI(address)}.json?access_token=${accessToken}`;

    request({ url: geocodeRequestUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Geocoding service', undefined);
        } else if (response.body.features.length === 0) {
            callback('Location does not exist', undefined)
        } else {
            const location = response.body.features[0];
    
            callback(undefined, {
                latitude: location.center[1],
                longitude: location.center[0],
                location: location.place_name
            });
        }
    });
}

module.exports = { geocode };
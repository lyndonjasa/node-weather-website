const request = require('request');

const forecast = ({ latitude, longitude }, callback) => {
    const darkSkyApi = 'https://api.darksky.net/forecast';
    const secretKey = '6e801f1d55b2a6a9176d0f7d7f2bc974';

    const darkSkyUrl = `${darkSkyApi}/${secretKey}/${latitude},${longitude}`

    request({ url: darkSkyUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather servcie', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            const current = response.body.currently;

            callback(undefined, {
                temperature: current.temperature,
                weather: current.summary
            });
        }
    });
};

module.exports = { forecast };
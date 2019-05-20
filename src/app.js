// core/npm modules
const path = require('path');
const express = require('express');
const hbs = require('hbs');

// local modules
const locationService = require('./utils/geocodeUtil');
const weatherService = require('./utils/weatherUtil');

const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

const app = express();
const port = process.env.PORT || 3000;

// setup handlebars 
app.set('views', viewPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);

app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Don Jasa'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        res.send({
            error: 'No location provided'
        });
        return;
    }

    const { location } = req.query;

    locationService.geocode(location, (error, locationResponse) => {
        if (error) {
            res.send({ error });
            return;
        } else {
            weatherService.forecast(locationResponse, (error, weatherResponse) => {
                if (error) {
                    res.send({ error });
                } else {
                    res.send({
                        geocode: locationResponse,
                        forecast: weatherResponse
                    });
                }
            });
        }
    });
});

app.get('*', (req, res) => {
    res.send('<h1>404 Page</h1>');
});

app.listen(port, () => {
    console.log('server up on port ' + port);
});

const request = require('request');

const forecast = (lat, long, cb) => {
    const url = 'http://api.weatherstack.com/current?access_key=c0bd9ccf73fdf7597c5ed0a8d8b016e6&query=' + lat + ',' + long + '&units=f';

    request({ url, json: true }, (error, { body }) => {
       if (error) {
           cb('Unable to connect to weather service!', undefined);
       } else if (body.error) {
           cb('Unable to find location', undefined);
       } else {
           const {temperature, feelslike: feelsLikeTemperature, weather_descriptions: weatherDescriptions} = body.current;
           const forecastMsg = weatherDescriptions[0] + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelsLikeTemperature + ' degrees out.';

           cb(undefined, forecastMsg);
       }
    });
};

module.exports = forecast;

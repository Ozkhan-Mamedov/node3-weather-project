const request = require('request');

const geocode = (address, cb) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib3poYW5tIiwiYSI6ImNrZ2F6a3IycDBjOWcyc3FmODYzY2R3N3EifQ.9SXg7jxlbbKll1P1ncRMNw&limit=1';

    request({ url, json: true}, (error, { body }) => {
        const {features} = body;

        if (error) {
            cb('Unable to connect to location services!', undefined);
        } else if (features.length === 0) {
            cb('Unable to find location. Try another search.', undefined);
        } else {
            cb(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            });
        }
    });
};

module.exports = geocode;

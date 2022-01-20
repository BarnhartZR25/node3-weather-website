const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmFybmhhcnR6cjI1IiwiYSI6ImNreTh2eWU3bzAwaTMydXA4d2ppMnh6anoifQ.y7PGL_4tbtU_2Co708mT_A&limit=1`;

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to Connect to Map Box Service', undefined);
        }
        else if (body.features.length === 0) {
            callback('No results returned for given location. Try another search.', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;
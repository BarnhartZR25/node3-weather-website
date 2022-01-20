const request = require('postman-request');

const forecast = (long, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=856134669d48c1656fc8f2e7d89ad8c6&query=${lat},${long}&units=f`;

    request({url, json: true}, (error, { body } = {}) => {
        if(error){
            callback('Could not connect to Weatherstack service', undefined);
        }
        else if (body.error) {
            callback('Invalid Location provided. Please try again.', undefined);
        }
        else {
            callback(undefined, `current temperature is ${body.current.temperature} degrees, and there is a ${body.current.precip}% chance of precipitation.`);
        }
    });
}

module.exports = forecast;
const request = require('request');

const getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/7052845bc089278227e6970aa9cd28b1/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: convertCelcius(body.currently.temperature),
                apparentTemperature: convertCelcius(body.currently.apparentTemperature)
            });
        } else {
            callback('Unable to fetch weather.');
        }
    });
};

const convertCelcius = (temp) => {
    return parseFloat(Math.round((temp - 32)* (5/9)));
};

module.exports.getWeather = getWeather;
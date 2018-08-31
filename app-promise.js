const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .default('a', 'battaramulla')
    .help()
    .alias('help', 'h')
    .argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyCgJjtUSGl6bsrXfjNSpdLpjqLwGllOZzg`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    const lat = response.data.results[0].geometry.location.lat;
    const lng = response.data.results[0].geometry.location.lng;
    const weatherUrl =  `https://api.darksky.net/forecast/7052845bc089278227e6970aa9cd28b1/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    const temperature = convertCelcius(response.data.currently.temperature);
    const apparentTemperature = convertCelcius(response.data.currently.apparentTemperature);
    const daySummary = response.data.hourly.summary;
    console.log(`The current temperature is ${temperature}\xB0C, but it feels like ${apparentTemperature}\xB0C.`)
    console.log(daySummary);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.')
    } else {
        console.log(e.message);
    }
});

const convertCelcius = (temp) => {
    return parseFloat(Math.round((temp - 32)* (5/9)));
};

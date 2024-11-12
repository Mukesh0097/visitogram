const axios = require('axios')
const httpError = require('../model/error-http')
const API_KEY = process.env.API_KEY

async function getCordinates(address){

    return {
        lat:37.42,
        lng:2.080
    }

    // const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`) ;

    // const data = response.data;

    // if(!data || data.status !== 'ok'){

    //     throw new httpError("invalid address",404);

    // }

    // const coordinates = data.results[0].geometry.location;

    // return coordinates;



}

module.exports = getCordinates;

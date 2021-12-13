//now require the request
const request = require('request')

//we will be creating the function which will communicate with mapbox api
const geocode = (address,callback) => {
    //now we have a dynamic url based off the geocode
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY3JtYW5vaiIsImEiOiJja3dvbzJ6Ym4wNHIwMm9wM2c2eTNnOGw2In0.PdKTvBrkxCgRJWUxy-g6hw&limit=1'

    request({ url, json : true}, (error,response) => {
        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(response.body.features.length == 0){
            callback('Unable to find the location.Try another search.',undefined)
        }else{
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}

//now we will be exporting the geocode module
module.exports = geocode
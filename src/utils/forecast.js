//now require the request
const request = require('request')

//creating the function for the forecast 
const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=241cf1cb66e98b0ec19e79b04394be1f&query='+latitude+','+longitude+'&units=f'

    //now we will fire of the request to get response 
    request({ url: url, json: true }, (error, response) => {
        if(error){
            callback('Unable to connect to weather service',undefined)
        }
        else if(response.body.error){
            callback('Unable to find the location',undefined)
        }
        else{
            callback(undefined,{
                temp:'It is Currently = ' + response.body.current.temperature + ' degress out.\n\r',
                weat:'Weather Condition is ' + response.body.current.weather_descriptions,
                rain:'There is a ' + response.body.current.humidity + '% of Humidity.',
                imag:response.body.current.weather_icons
            })
        }
    })
}

//export the forecast function
module.exports = forecast
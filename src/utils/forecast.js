const request = require('request')

// Set the API key
const weatherApi = '95be497b39715b60e202af77aaf97ac2'

const forecast = (lat,lon,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + weatherApi + '&query=' + lat + ',' + lon + '&units=m'

    request({url: url,json: true}, (error,{body} = {}) => {        
        if (error) {
            callback('Error: Unable to connect to weather services!',undefined)
        } else if (body.error === 0) {
            callback('Error: Unable to find the location.',undefined)
        } else {
            const current = body.current
            const temp = current.temperature
            const feelsLike = current.feelslike
            const wxDesc = current.weather_descriptions[0]
            data = wxDesc + '. The current temperature is ' + temp + ' Deg C. But it feels like ' + feelsLike + ' Deg C.'
            callback(undefined, data)
        }
    })
}

module.exports = forecast
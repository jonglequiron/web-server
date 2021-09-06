const request = require('request')

// Set the API key
const geoCodeApi = 'pk.eyJ1Ijoiam9uZ2xlcXVpcm9uIiwiYSI6ImNrcjAxMjNkNDB3enAyb283dmE5ZHpiaHAifQ.KO-yxgOLgiBnJKYxiffEhA'

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=' + geoCodeApi + '&limit=1'

    request({url: url,json: true}, (error,{body} = {}) => {
        if (error) {
            callback('Error: Unable to connect to location services!',undefined)
        } else if (body.features.length === 0) {
            callback('Error: Location not found, try a different location.',undefined)
        } else {
            const features = body.features[0]
            const longitude = features.center[0]
            const latitude = features.center[1]
            const placeName = features.place_name
            callback(undefined, {
                latitude,
                longitude,
                location: placeName
            })
        }
    })
}

module.exports = geocode
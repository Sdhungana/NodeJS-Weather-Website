const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=1dcb7cadfbca58e8c8b4a025a48480a8&query=${encodeURIComponent(latitude)}${encodeURIComponent(longitude)}?units=si`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                precip: body.current.precip,
                weather: body.current.weather_descriptions[0],
                forecast: `${body.current.weather_descriptions[0]}.It is currently ${body.current.temperature} degrees out.There is ${body.current.precip}% chance of rainfall`,
                icon: body.current.weather_icons[0]

            })
        }
    })

}

module.exports = forecast;

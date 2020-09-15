const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//  Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        developer: 'Sulab'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        developer: 'Sulab'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        developer: 'Sulab'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, { temperature, precip, weather, forecast }) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast,
                address: req.query.address,
                location,
                temperature,
                precip

            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error :(',
        developer: 'Sulab',
        errorMessage: 'Help Article Not Found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error :(',
        developer: 'Sulab',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
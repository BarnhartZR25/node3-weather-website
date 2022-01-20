const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('postman-request');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// setting up handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// set up static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Zach Barnhart'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Zach Barnhart'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Zach Barnhart',
        exampleMessage: 'For Help, Contact the author'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address to search must be provided'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(longitude, latitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send(
                {
                    forecast,
                    location,
                    address: req.query.address
                }
            );
        });
    });

});

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404',
        name: 'Zach Barnhart',
        errorMessage: 'Help Article Not Found',
    });
});

app.get('*', (req,res) => {
    res.render('error', {
        title: '404',
        name: 'Zach Barnhart',
        errorMessage: 'Page Not Found'
    });
});

app.listen(3000, () => {
    console.log('Server Started on Port 3000.');
});

// app.get('/arrayexample', (req, res) => {
//     res.send([
//         {
//             name: 'Zach',
//             age: 26
//         },
//         {
//             name: 'Alayna',
//             age:24
//         }
//     ]);
// });
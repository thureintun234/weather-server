const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')

const app = express()
const PORT = 3000

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup handlebar template engine
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

// setup for static files(css/js/img)
app.use(express.static(publicDirectory))

//  Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Weathers App', name: 'Shadow' })
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me', name: 'Shadow' })
})

app.get('/help', (req, res) => {
  res.render('help', { title: 'Help Message', name: 'Shadow', helpText: 'This is some helpful text.' })
})

app.get('/help/*', (req, res) => {
  res.render('404', { title: '404', name: 'Shadow', errorMessage: 'Help Article Not Found' })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'You must provide a address term' })
  }
  const address = req.query.address
  geocode(address, (err, data) => {
    if (err) {
      return res.send({ error: err })
    }
    else {
      res.send({
        latitude: data.latitude,
        longitude: data.longitude,
        location: data.location
      })
    }
  })

})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search);
  res.send({})
})


app.get('*', (req, res) => {
  res.render('404', { title: '404', name: 'Shadow', errorMessage: 'Page Not Found' })
})



app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
})
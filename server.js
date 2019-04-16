const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const api = require('./server/routes/api')
const dataDao = require("./dataDao.js")

// 2 options - one whenever we upload for the heroku, the other for simply testing connection
// mongoose.connect(process.env.CONNECTION_STRING || "mongodb://localhost/weatherDB", {useNewUrlParser: true})
mongoose.connect("mongodb://localhost/weatherDB", {useNewUrlParser: true})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', api)

const port = 4200   
app.listen(process.env.PORT || port, function () {
    console.log(`Server running on ${port}`)
})


const dataLoader = new dataDao()
dataLoader.dropAndCleanDB() 
dataLoader.populateDB_with_dummyData()

const express = require('express')
const router = express.Router()
const request = require('request')
const ConfigClass = require("../config")

const configClass = new ConfigClass()

console.log(configClass.getApiKey())
router.get('/sanity', function (req, res) {
    console.log("in api.js, router.get")
    res.send("OK!")
})

// request(`https://apifootball.com/api/?action=get_H2H&firstTeam=Chelsea&secondTeam=Arsenal&APIkey=${configClass.getApiKey()}`
//     , function (error, result, body) {
//         console.log(result)
//     }
// )

router.get('/teams', function( req,res) {
    console.log("got teams from db..")
    res.send([{name1: "vova", nam2: "avishii", team1: "chelsea", team2:"liverpool"}])
})


module.exports = router
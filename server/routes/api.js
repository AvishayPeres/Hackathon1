const express = require('express')
const router = express.Router()
const request = require('request')
const ConfigClass = require("../config")
const DataDao = require("../dataDao")
const configClass = new ConfigClass()
const dataDao = new DataDao()

router.get('/sanity', function (req, res) {
    console.log("in api.js, router.get")
    res.send("OK!")
})


const arrMainTeams = ["Chelsea", "Arsenal", "Liverpool", "Everton", "Fulham", "Watford"]
// hardcoded array. 
// we will get this thru apis.. 

let arrGames = []
const populateWithApi = async function () {
    for (let i = 0; i < arrMainTeams.length; i++) {
        for (let j = 0; j < arrMainTeams.length; j++) {
            const team1 = arrMainTeams[i]
            const team2 = arrMainTeams[j]
            if (team1 == team2)
                continue
            await dataDao.saveToDB({ team1: team1, team2: team2 })

            // request(`https://apifootball.com/api/?action=get_H2H&firstTeam=Napoli&secondTeam=Juventus&APIkey=${configClass.getApiKey()}`
            //     , function (error, result, body) {
            //         console.log(result)
            //     }

            // )

            /*
            for example with body parser...
            router.post('/city', function(req,res) {
                let cityName = req.body.cityName
                const url = `http://api.apixu.com/v1/current.json?key=b2bd4bdcb0124f36bec75135191104&q=${cityName}`
                request.get(url, (error, response, body) => {
                    const arg = JSON.parse(body)   
                    cityDao.saveCityToDB(arg)
                });
            })
            */
        }
    }
    return await dataDao.getGames()
}
// -------------------------------
// suppouse to populate whenever its empty. 
// -------------------------------
const getPopulatedGames = async function () {
    let dbAnswer = await dataDao.getGames()

    console.log(dbAnswer)
    if (dbAnswer.length == 0) {
        dbAnswer = await populateWithApi()
        console.log(dbAnswer)
    }
    console.log(dbAnswer)
    return dbAnswer
}
// will return arrOfTeams = [ {team1: 'Chelsea', team2: 'Liverpool}, 
//                            {team1: 'Arsenal', team2: 'Watford'} ,..  ]
router.get('/teams', async function (req, res) {
    const teams = await getPopulatedGames()
    res.send(teams)
})

// provide me a param with name: 'betCardToSave' that will look like this
// betCardToSave = {
//      user1: 'someName',
//      user2: 'null',
//      team1: 't1',
//      team2: 't2'
// }
// save it to db. 
// no answer!
router.post('/betcards', async function (req, res) {
    let betCardToSave = req.body
    dataDao.saveBetCard(betCardToSave)
})

// will return array of betcards.
router.get('/betcards', async function (req, res) {
    const arrBetCards = await dataDao.getBetCards()
    return arrBetCards
})

module.exports = router
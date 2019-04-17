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



// const arrMainTeams = ["Chelsea", "Arsenal", "Liverpool", "Everton", "Fulham", "Watford"]
const arrMainTeams = ["Chelsea", "Arsenal", "Liverpool", "Everton"]
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
const dummyArrOfTeams = [
    {team1: 'Chelsea', team2: 'Liverpool'},
    {team1: 'Watford', team2: 'Juventus'},
    {team1: 'Man_Utd', team2: 'Man_City'},
    {team1: 'Real_Madrid', team2: 'Tottenham'},
    {team1: 'Inter', team2: 'Atalanta'},
    {team1: 'Milan', team2: 'LA_Galaxy'}
]

router.get('/resetdb', function (req,res){
    dataDao.clearDB()
    dataDao.populate(dummyArrOfTeams)
})
// ToDo: return real data.

router.get('/teams', async function (req, res) {
    // const teams = await getPopulatedGames()
    const arr = await dataDao.getGames()
    res.send(arr)
})

router.post('/betcards', async function (req, res) {
    let betCardToSave = req.body
    dataDao.saveBetCard(betCardToSave)
    res.send()
})

// will return array of betcards.
router.get('/betcards', async function (req, res) {
    const arrBetCards = await dataDao.getBetCards()
    res.send(arrBetCards)
})

router.post('/openbetcards', async function (req, res) {
    let openBetCardToSave = req.body
    dataDao.saveOpenBetCards(openBetCardToSave)
    res.send()
})

router.get('/openbetcards', async function (req, res) {
    const arrOpenCards = await dataDao.getOpenBets()
    res.send(arrOpenCards)
})

router.delete('/game', async function(req,res){
    let gameToDelete = req.body
    const deletingMSG = await dataDao.deleteGame(gameToDelete)
    res.send(deletingMSG)
})


router.post('/closedBetCard', async function(req,res){
    let cardToClose = req.body
    dataDao.saveClosedBetCard(cardToClose)
    res.send() 
})

router.get('/closedBetCards', async function(req,res){
    const arrClosedBetCards = await dataDao.getClosedBets()
    res.send(arrClosedBetCards)
})
module.exports = router
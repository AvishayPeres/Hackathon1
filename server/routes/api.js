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
// -----------------------------------------
// Helping function.
// cuz we dont have user collection, we have to retrieve it from closedBetCards that we have in db.
// -----------------------------------------
const retrieveUsersFromClosedBetCards = function (argArrClosedBetCards) {
    let arrOnlyNames = []
    argArrClosedBetCards.forEach(element => {
        const curUser1 = element.user1
        const curUser2 = element.user2
        // push user1 if he doenst exist in the array... 
        if (arrOnlyNames.indexOf(curUser1) === -1)
            arrOnlyNames.push(curUser1)
        // same with user2
        if (arrOnlyNames.indexOf(curUser2) === -1)
            arrOnlyNames.push(curUser2)
    });
    return arrOnlyNames
}
// -----------------------------------------
// Helping function.
// calculating wins...
// -----------------------------------------

// const calculateUsersWins = async function (argArrUsers, argArrClosedBetCards, argArrMatchResults) {
//     let arrUserWin = []
//     console.log("jere")
//     for (let i = 0; i < argArrUsers.length; i++) {
//         let curUser = {
//             user: argArrUsers[i],
//             wins: 0
//         }

//         console.log(curUser)
//         for (let j = 0; j < argArrClosedBetCards.length; j++) {
//             let curBet = argArrClosedBetCards[j]
//             if ((curBet.user1 == curUser) || (curBet.user2 == curUser))
//                 continue
//             else {
//                 for (let k = 0; k < argArrMatchResults.length; k++) {
//                     console.log("------------------------------")

//                     let curMatchResult = argArrMatchResults[k]

//                     console.log(curBet)
//                     console.log(curMatchResult)
//                     // if ((isUserWonMatch(curMatchResult, curUsersTeam)==1) || (isUserWonMatch(curMatchResult, curUsersTeam)==2)){
//                     //     console.log(`${curUser.user} just won!!!`)
//                     //     break
//                     // }
//                     // if ((curMatchResult.team1_score > curMatchResult.team2_score) && (curUsersTeam == curMatchResult.team1)){
//                     //     curUser.wins = curUser.wins + 1 
//                     //     console.log(`${curUser.user} just won!!! 1 `)
//                     // }
//                     // if ((curMatchResult.team1_score < curMatchResult.team2_score) && (curUsersTeam == curMatchResult.team2)){
//                     //     curUser.wins = curUser.wins + 1
//                     //     console.log(`${curUser.user} just won!!! 2 `)
//                     // }
//                     console.log("------------------------------")
//                 }
//             }
//         }
//         console.log(`pushing user ${curUser.user} with wins: ${curUser.wins}`)
//         arrUserWin.push(curUser)
//     }
//     for (let i = 0; i < arrUserWin.length; i++) {
//         dataDao.saveUser(arrUserWin[i])
//     }
//     let result = await dataDao.getUsersWin()
// }
const isUserWonMatch = function (argMatch, argTeam) {
    // 1 - home team won
    // 2 - away team won
    // 3 - draw
    let isHomeTeamWon = 1
    if ((argMatch.team1_score > argMatch.team2_score) && (argTeam == argMatch.team1))
        isHomeTeamWon = 1
    else if ((argMatch.team1_score < argMatch.team2_score) && (argTeam == argMatch.team2))
        isHomeTeamWon = 2
    else
        isHomeTeamWon = 3

    // console.log(`isHomeTeamWon: ${isHomeTeamWon}`)
    return isUserWonMatch
}
// const arrMainTeams = ["Chelsea", "Arsenal", "Liverpool", "Everton", "Fulham", "Watford"]
const arrMainTeams = ["Chelsea", "Arsenal", "Liverpool", "Everton"]
// hardcoded array. 
// we will get this thru apis.. 

let arrGames = []
// const populateWithApi = async function () {
//     for (let i = 0; i < arrMainTeams.length; i++) {
//         for (let j = 0; j < arrMainTeams.length; j++) {
//             const team1 = arrMainTeams[i]
//             const team2 = arrMainTeams[j]
//             if (team1 == team2)
//                 continue
//             await dataDao.saveToDB({ team1: team1, team2: team2 })

//             // request(`https://apifootball.com/api/?action=get_H2H&firstTeam=Napoli&secondTeam=Juventus&APIkey=${configClass.getApiKey()}`
//             //     , function (error, result, body) {
//             //         console.log(result)
//             //     }

//             // )

//             /*
//             for example with body parser...
//             router.post('/city', function(req,res) {
//                 let cityName = req.body.cityName
//                 const url = `http://api.apixu.com/v1/current.json?key=b2bd4bdcb0124f36bec75135191104&q=${cityName}`
//                 request.get(url, (error, response, body) => {
//                     const arg = JSON.parse(body)   
//                     cityDao.saveCityToDB(arg)
//                 });
//             })
//             */
//         }
//     }
//     return await dataDao.getGames()
// }

const populateWithApi = async function () {
    const url = `https://apifootball.com/api/?action=get_events&from=2016-10-29&to=2016-11-01&league_id=63&APIkey=${configClass.getApiKey()}`
    // const url = `https://apifootball.com/api/?action=get_events&from=2016-10-30&to=2016-11-01&league_id=63&APIkey=${configClass.getApiKey()}`
    const arrPairOfTeamsFromUrl = await request(url, function (error, result, body) {
            const arg = JSON.parse(result.body)
            console.log(arg)
            const arr = arg.map(e => {
                return {
                    team1: e.match_hometeam_name.split(' ').join('_'),
                    team2: e.match_awayteam_name.split(' ').join('_')
                }
            })
            for(let i = 0 ; i < arr.length ; i ++ )
                dataDao.saveGameToDB(arr[i])
        }
    )
    
}

router.get('/resetdb', function (req, res) {
    dataDao.clearDB()
    dataDao.populate(dummyArrOfTeams)
})

router.get('/games', async function (req, res) {
    let arr = []
    arr = await dataDao.getGames()
    if (arr.length == 0) {
        await dataDao.populateWithApi()
    }
    arr = await dataDao.getGames()
    res.send(arr)
})
router.delete('/openBetCard', async function (req, res) {
    let betCardToDelete = req.body
    const deletingMSG = await dataDao.deleteOpenBetCard(betCardToDelete)
    res.send(deletingMSG)
})
router.post('/betcards', async function (req, res) {
    let betCardToSave = req.body
    dataDao.saveBetCard(betCardToSave)
    res.send()
})

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

router.delete('/game', async function (req, res) {
    let gameToDelete = req.body
    const deletingMSG = await dataDao.deleteGame(gameToDelete)
    res.send(deletingMSG)
})

router.get('/populate', async function (req, res) {
    console.log("populating...")
    await populateWithApi()
    console.log("done populating...")
})
router.post('/closedBetCard', async function (req, res) {
    let cardToClose = req.body
    dataDao.saveClosedBetCard(cardToClose)
    res.send()
})
router.get('/matchresults', async function (req, res) {
    let arrResults = []
    arrResults = await dataDao.getMatchResults()
    if (arrResults.length == 0) {
        arrResults = await dataDao.generateMatchResults()
    }
    arrResults = await dataDao.getMatchResults()

    res.send(arrResults)
})

router.get('/closedBetCards', async function (req, res) {
    const arrClosedBetCards = await dataDao.getClosedBets()
    res.send(arrClosedBetCards)
})

router.get('/userwintable', async function (req, res) {

    let arrUsersWin = []
    // arrUsersWin = await dataDao.getUsersWin() //getting users. if empty - create them
    // if (arrUsersWin.length == 0) {
    //     // but... we dont... so we have to create them from the closedBetCards. 
    //     // const arrUsersToSend = await dataDao.getUsers()
    //     let arrMatchResults = await dataDao.getMatchResults()
    //     if ( arrMatchResults.length = 0){
    //         dataDao.generateMatchResults()
    //         arrMatchResults = await dataDao.getMatchResults()
    //     }

    //     const arrClosedBetCards = await dataDao.getClosedBets()
    //     const arrUsersFromClosedBetCards = retrieveUsersFromClosedBetCards(arrClosedBetCards)

    //     arrUsersWin = calculateUsersWins(arrUsersFromClosedBetCards, arrClosedBetCards, arrMatchResults)
    // }
    // ------------------------------------
    let arrMatchResults = await dataDao.getMatchResults()
    const arrClosedBetCards = await dataDao.getClosedBets()
    const arrUsersFromClosedBetCards = retrieveUsersFromClosedBetCards(arrClosedBetCards)
    arrUsersWin = calculateUsersWins(arrUsersFromClosedBetCards, arrClosedBetCards, arrMatchResults)
    // ------------------------------------

    res.send(arrUsersWin)
})
module.exports = router
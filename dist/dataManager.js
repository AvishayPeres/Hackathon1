// commented out - exists in Master

// let arrPendingBets = []
// let arrTeams = []
// let arrClosedBets = []
// let arrUsers = []


class DataManager {
    constructor() {
        this.arrTeams = [],
        // this.arrUsers = [],
        this.arrPendingBets = [],
        this.arrClosedBets = []
    }

    async getListOfMatches () {
        let getMatch = await $.get(`/teams`)
            this.arrTeams = getMatch
        console.log(this.arrTeams)
        
    }

    async getUsers() {
        this.arrUsers = await $.get(`/users`)
        }

    async saveUser() {
        await $.post(`/users`, this., function (user) {
            console.log("s!")
            })
        }

// provide param with name: 'betCardToSave'
// save it to db.
// no answer!
router.post('/betcards', async function(req,res){
    let betCardToSave = req.body.betCardToSave
    dataDao.saveBetCard(betCardToSave)
 })

 
 // will return arrOfTeams = [ {team1: 'Chelsea', team2: 'Liverpool},
 //                            {team1: 'Arsenal', team2: 'Watford'} ,..  ]
 router.get('/teams', async function (req, res) {
    const teams = await getPopulatedGames()
    res.send(teams)
 })



/*
ToDO:
1. send get request to server using jquery to route '_____' ( will define between us)
    get the list of matches to render.

2. send
*/

    const getPendingBets= function(){
        let 

        return arrPendingBets
    }

    const getPendingBetById = async function(pendingBetId) {

    }

    // const deleteFromPendingBetsById = async function(pendingBetId) {

    // }

    const getClosedBets = async function(){

    }
    const addToClosedBets = async function ( id ) {
        
    }

    const clearPendingBets = async function(){

    }

    const clearClosedBets = async function(){

    }

    return {
        getPendingPosts: getPendingPosts,
        getListOfMatches: getListOfMatches
    }

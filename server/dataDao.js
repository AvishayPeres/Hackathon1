const Game = require("./models/Game")
const BetCard = require("./models/BetCard")
const OpenBetCard = require("./models/OpenBetCard")
const ClosedBetCard = require("./models/ClosedBetCard")
const UserWin = require("./models/UserWin")
const MatchResult = require("./models/MatchResult")
class helper {
    constructor() {
    }

  
    // ------------------------------------
    // Helping function.
    // gets and array of closedBets and generates its score according to the team.
    // in Version 1.1 it will generate according to the previous match. 
    // means it will send an api request to the server to get a privious match result, according to 2 teams.
    // ------------------------------------
    async generateMatchResults() {
        
        const arr = []
        const arrClosedBets = await this.getClosedBets()
        arrClosedBets.forEach(element => {
            const random1 = Math.floor(Math.random() * 10) + 0 // generate number between 0 and 10
            const random2 = Math.floor(Math.random() * 10) + 0 // ....

            const curScore = {
                team1: element.team1,
                team2: element.team2,
                team1_score: random1,
                team2_score: random2
            }

            arr.push(curScore)

        });

        for( let i = 0 ; i < arr.length ; i ++ )
            await this.saveMatchResult(arr[i])

        const arr2 = await this.getMatchResults()
        return arr2
    }
    async saveMatchResult(argMatchResult){
        let matchResult = new MatchResult({
            team1: argMatchResult.team1,
            team2: argMatchResult.team2,
            team1_score: argMatchResult.team1_score,
            team2_score: argMatchResult.team2_score
        })
        matchResult.save()
        console.log(`MatchResult with id of ${matchResult._id} was saved`)
    }
    async clearDB() {
        // Game.collection.drop()
        // OpenBetCard.collection.drop()
        // BetCard.collection.drop()
    }
    async populate(arr) {
        arr.forEach(element => this.saveToDB(element));
    }
    async saveToDB(argGame) {
        let game = new Game({
            team1: argGame.team1,
            team2: argGame.team2
        })
        game.save()
        console.log(`game with ${game.team1} vs ${game.team2} was saved.`)
    }

    async getBetCards() {
        return await BetCard.find({})
    }

    async saveBetCard(argCard) {
        let cardToSave = new BetCard({
            user1: argCard.user1,
            team1: argCard.team1,
            user2: argCard.user2,
            team2: argCard.team2
        })
        cardToSave.save()
        console.log(cardToSave)
        console.log(`card with id of ${cardToSave._id} was saved`)
    }
    async saveUser(argUser){
        console.log(`in dataDao, saveUser: got win: ${argUser.win}, user: ${argUser.user}`)
        let userWin = new UserWin({
            user: argUser.user,
            wins : argUser.wins
        })
        userWin.save()
        console.log(`user with id of ${userWin._id} was saved`)
    }
    async saveOpenBetCards(argCard) {
        let openBetCardToSave = new OpenBetCard({
            user1: argCard.user1,
            team1: argCard.team1,
            user2: argCard.user2,
            team2: argCard.team2
        })

        openBetCardToSave.save()
        console.log(`openBetCardToSave with id of ${openBetCardToSave._id} was saved`)
    }

    async saveGameToDB(argGame){
        let game = new Game({
            team1: argGame.team1,
            team2: argGame.team2
        })
        game.save()
        console.log(`game with ${game.team1} vs ${game.team2} was saved.`)
    }
    async saveClosedBetCard(argCard) {
        let closedBetCard = new ClosedBetCard({
            user1: argCard.user1,
            team1: argCard.team1,
            user2: argCard.user2,
            team2: argCard.team2
        })

        closedBetCard.save()
        console.log(`closedCard with id of ${closedBetCard._id} was saved...`)
    }

    async deleteOpenBetCard(argBetCard){
        const betCardToDelete = await OpenBetCard.find({ team1: argBetCard.team1, team2: argBetCard.team2 })
        const curID = betCardToDelete[0]._id
        console.log(`ID to delete: ${curID}`)

        const deleteBetCardMSG = await OpenBetCard.findByIdAndDelete(curID, function (err) {
            let message = ""
            if (!err) {
                message = `the game with ${curID} was deleted`;
            }
            else {
                message = `error deleting game with id ${curID}`;
            }
            return message
        })
        return deleteBetCardMSG
    }
    async deleteGame(argGame) {
        const gameToDelete = await Game.find({ team1: argGame.team1, team2: argGame.team2 })
        const curID = gameToDelete[0]._id
        console.log(`ID to delete: ${curID}`)

        const deletedGameMSG = await Game.findByIdAndDelete(curID, function (err) {
            let message = ""
            if (!err) {
                message = `the game with ${curID} was deleted`;
            }
            else {
                message = `error deleting game with id ${curID}`;
            }
            return message
        })
        return deletedGameMSG
    }

    async getGames() {
        let arr = await Game.find({})
        return arr
    }

    async getOpenBets() {
        let arr = await OpenBetCard.find({})
        return arr
    }

    async getClosedBets() {
        let arr = await ClosedBetCard.find({})
        return arr
    }

    async getUsersWin() {
        let arr = await UserWin.find({})
        return arr
    }
    async getMatchResults(){
        let arr = await MatchResult.find({})
        return arr
    }
}

module.exports = helper
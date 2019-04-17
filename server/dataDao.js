const Game = require("./models/Game")
const BetCard = require("./models/BetCard")
const OpenBetCard = require("./models/OpenBetCard")
const ClosedBetCard = require("./models/ClosedBetCard")
class helper {
    constructor() {
    }
    dropAndCleanDB() {
        Game.collection.drop()
        console.log("collection game is dropped")
    }
    async clearDB(){
        // Game.collection.drop()
        // OpenBetCard.collection.drop()
        // BetCard.collection.drop()
    }
    async populate(arr){
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
    
    async getBetCards(){
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

    async saveOpenBetCards(argCard){
        let openBetCardToSave = new OpenBetCard({
            user1: argCard.user1,
            team1: argCard.team1,
            user2: argCard.user2,
            team2: argCard.team2
        })
        
        openBetCardToSave.save()
        console.log(`openBetCardToSave with id of ${openBetCardToSave._id} was saved`)
    }

    async saveClosedBetCard(argCard){
        let closedBetCard = new ClosedBetCard({
            user1: argCard.user1,
            team1: argCard.team1,
            user2: argCard.user2,
            team2: argCard.team2
        })

        closedBetCard.save()
        console.log(`closedCard with id of ${closedBetCard._id} was saved...`)
    }
    async deleteGame(argGame){
        const gameToDelete = await Game.find({ team1: argGame.team1 , team2: argGame.team2})
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
    async getOpenBets(){
       let arr = await OpenBetCard.find({})
       return arr
    }
    async getClosedBets(){
        let arr = await ClosedBetCard.find({})
        return arr
    }
}

module.exports = helper
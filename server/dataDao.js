const Game = require("./models/Game")
const BetCard = require("./models/BetCard")
class helper {
    constructor() {
    }
    dropAndCleanDB() {
        Game.collection.drop()
        console.log("collection game is dropped")
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
        console.log(cardToSave)
        console.log(`openBetCardToSave with id of ${openBetCardToSave._id} was saved`)
    }
    async getGames() {
        let arr = await Game.find({})
        return arr
    }
}

module.exports = helper
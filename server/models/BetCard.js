const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BetCardSchema = new Schema({
    user1: String,
    user2: String,
    team1: String,
    team2: String
})

const BetCard = mongoose.model("BetCard", BetCardSchema)

module.exports = BetCard
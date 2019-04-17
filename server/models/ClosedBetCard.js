const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ClosedBetCardSchema = new Schema({
    user1: String,
    user2: String,
    team1: String,
    team2: String
})

const ClosedBetCard = mongoose.model("ClosedBetCard", ClosedBetCardSchema)
module.exports = ClosedBetCard


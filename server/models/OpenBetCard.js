const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OpenBetCardSchema = new Schema({
    user1: String,
    team1: String,
    user2: String,
    team2: String
})

const OpenBetCard = mongoose.model("OpenBetCard", OpenBetCardSchema)

module.exports = OpenBetCard
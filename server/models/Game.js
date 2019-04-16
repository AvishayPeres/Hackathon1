const mongoose = require("mongoose")
const Schema = mongoose.Schema

const GameSchema = new Schema({
    team1: String,
    team2: String
})

const Game = mongoose.model("Game", GameSchema)

module.exports = Game
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MatchResultSchema = new Schema({
    team1: String,
    team2: String,
    team1_score: Number,
    team2_score: Number
})
const MatchResult = mongoose.model("MatchResult", MatchResultSchema)

module.exports = MatchResult

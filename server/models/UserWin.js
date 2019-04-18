const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserWinSchema = new Schema({
    user: String,
    wins: Number
})

const UserWin = mongoose.model("UserWin", UserWinSchema)

module.exports = UserWin
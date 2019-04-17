
// asd


const arrUsers = [
    {name: "user1", timesWon: "2"},
    {name: "user2", timesWon: "5"},
    {name: "user3", timesWon: "3"},
    {name: "loser", timesWon: "0"}
]
const arrScores = [
    {team1: "Chelsea", team2: "Liverpool", team1_score:"0", team2_score:"2"},
    {team1: "Juventus", team2: "Ajax", team1_score:"1", team2_score:"2"},
    {team1: "Barcelona", team2: "Man Utd", team1_score:"3", team2_score:"0"},
    {team1: "Milan", team2: "Hapoel TelAviv", team1_score:"0", team2_score:"0"},
]
$("#render-games").on("click", async function(){
    const arrGames = await $.get('/teams')
    renderer.renderGames(arrGames)
})

$("#render-openBets").on("click", async function(){
    const arrOpenBets = await $.get('/openbetcards')
    renderer.renderOpenBets(arrOpenBets)
})

$("#render-users").on("click", function(){
    renderer.renderUsers(arrUsers)
})

$("#generateScores").on("click",function(){
    renderer.renderScoreTables(arrScores)
})
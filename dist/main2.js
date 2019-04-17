
// asd


const arrUsers = [
    {name: "user1", timesWon: "2"},
    {name: "user2", timesWon: "5"},
    {name: "user3", timesWon: "3"},
    {name: "loser", timesWon: "0"}
]

$("#render-games").on("click", async function(){
    const arrGames = await $.get('/teams')
    renderer.renderGames(arrGames)
})

$("#render-openBets").on("click", async function(){
    const arrOpenBets = await $.get('/openbetcards')
    renderer.renderOpenBets(arrOpenBets)
})

$("#render-users").on("click", async function(){
    const arrUsers = await $.get('/users')
     
    // renderer.renderUsers(arrUsers)
})

$("#generateScores").on("click", async function(){
    const arrMatchResults = await $.get('/matchresults')
    renderer.renderScoreTables(arrMatchResults)
})

$('#render-closedBets').on("click", async function(){
    const arrClosedBets = await $.get('/closedBetCards')
    renderer.renderClosedBets(arrClosedBets)
})
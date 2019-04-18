
$("#render-games").on("click", async function(){
    const arrGames = await $.get('/games')
    renderer.renderGames(arrGames)
})

$("#render-openBets").on("click", async function(){
    const arrOpenBets = await $.get('/openbetcards')
    renderer.renderOpenBets(arrOpenBets)
})

$("#render-users").on("click", async function(){
    const arrUsers = await $.get('/userwintable')
    renderer.renderUsers(arrUsers)
})

$("#populate").on("click", async function(){
    const arrGames = await $.get('/populate')
})
$("#generateScores").on("click", async function(){
    const arrMatchResults = await $.get('/matchresults')
    renderer.renderScoreTables(arrMatchResults)
})

$('#render-closedBets').on("click", async function(){
    const arrClosedBets = await $.get('/closedBetCards')
    renderer.renderClosedBets(arrClosedBets)
})
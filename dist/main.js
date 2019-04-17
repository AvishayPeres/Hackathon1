
// asd

const renderer = Renderer()

const loadPage = async function () {
    console.log("in main.js, loadPage()")
    renderer.render(["emptyArray"])
    console.log("done loading page...")

}
loadPage()

$(".currentGamesContainer").find(".team-btn").on("click", function () {
    let saveTeam1 = $(this).text()
        console.log(saveTeam1)
    let saveTeam2 = $(this).siblings(".team-btn").text()
        console.log(saveTeam2)
    let saveUser1 = $("#input-name").val()
        console.log(saveUser1)
    let saveUser2 = null
        console.log(saveUser2)

    let saveBetCard = { user1: saveUser1, team1: saveTeam1, user2: saveUser2, team2: saveTeam2 }
    $.post('/betcards', saveBetCard, function (response) {
        console.log(saveBetCard)
    })
})

// --->> pending bets waiting
$(".openBetsMenu").find(".team-btn").on("click", function () {
    // let saveTeam1 = $(this).siblings(".team-btn").attr("disabled", true)()
    let saveUser2 = $("input-secondName").val()
        console.log(saveUser2)
    let saveTeam2 = $(this).text()
        console.log(saveTeam2)
 
    let saveBetCard = { user1: saveUser1, team1: saveTeam1, user2: saveUser2, team2: saveTeam2 }
    $.post('/betcards', saveBetCard, function (response) {
        console.log(saveBetCard)
    })
})




// router.get('/teams', async function (req, res) {
//     const teams = await getPopulatedGames()
//     res.send(teams)
// })

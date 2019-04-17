const Renderer = function () {

    // -----------------------------
    // Main and only function.
    // -----------------------------
    const render = function (arrOfSomething) {
    }

    // -----------------------------
    // rending the OpenBet menu.
    // -----------------------------
    const renderOpenBets = function (arrOpenBets) {
        $(".openBetsMenu").empty();
        const source = $("#openBetsMenu-script").html()
        const template = Handlebars.compile(source)
        let newHtml = template({ arrOpenBets })
        $(".openBetsMenu").append(newHtml)
    }

    // -----------------------------
    // rending the closedbets menu.
    // -----------------------------
    const renderClosedBets = function (arrClosedBets) {
        $(".closedBetsMenu").empty();
        const source = $("#closedBetsMenu-script").html()
        const template = Handlebars.compile(source)
        let newHtml = template({ arrClosedBets })
        $(".closedBetsMenu").append(newHtml)
    }

    // -----------------------------
    // rending the scores table menu.
    // -----------------------------
    const renderScoreTables = function (arrScores) {
        $(".scoresTable").empty();
        const source = $("#render-scores-script").html()
        const template = Handlebars.compile(source)
        let newHtml = template({ arrScores })
        $(".scoresTable").append(newHtml)
    }

    // -----------------------------
    // rending the games eamstable menu.
    // -----------------------------
    const renderGames = function (arrGames) {
        $(".currentGamesContainer").empty();

        const source = $("#render-games-script").html()
        const template = Handlebars.compile(source)
        let newHtml = template({ arrGames })

        $(".currentGamesContainer").append(newHtml)

        $(".currentGamesContainer").find(".team-btn").on("click", async function () {
            let saveTeam1 = $(this).text()
            console.log(saveTeam1)
            let saveTeam2 = $(this).siblings(".team-btn").text()
            console.log(saveTeam2)
            let saveUser1 = $("#input-name").val()
            console.log(saveUser1)
            let saveUser2 = null
            console.log(saveUser2)

            let tempOpenBetCard = { user1: saveUser1, team1: saveTeam1, user2: saveUser2, team2: saveTeam2 }
            
            // -------------------------------------
            // this is way out of archytecture, where to put it ? 
            // not suppouse to be here... 
            // -------------------------------------

            //1. saving the card in db.
            await $.post('/openbetcards', tempOpenBetCard)

            // //2. delete the game from array of games.
            await $.ajax({
                type: "DELETE",
                url: '/game',
                data: { team1: saveTeam1, team2: saveTeam2 },
            });
            
            // //3. render again the games.
            const arrGames = await $.get('/teams')
            renderGames(arrGames)
            

            // renderGames(await $.get('/teams'))
            const arrOpenBets = await $.get('/openbetcards')
            renderOpenBets(arrOpenBets)
            
            
            
        })
    }

    return {
        render: render,
        renderGames: renderGames,
        renderClosedBets: renderClosedBets,
        renderScoreTables: renderScoreTables,
        renderOpenBets: renderOpenBets
    }
}
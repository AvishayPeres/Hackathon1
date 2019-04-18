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

        $(".openSingleBet").find(".button-submit-openBet").on("click", async function () {
            const saveUser1 = $(this).siblings(".teamChosen1").find(".userSpan").text()
            const saveTeam1 = $(this).siblings(".teamChosen1").find(".spanTeam1").text()
            const saveTeam2 = $(this).siblings(".teamChosen2").find(".spanTeam2").text()
            
            const saveUser2 = $(".input-secondName").val()           
            const curCard = { user1: saveUser1, team1: saveTeam1, user2: saveUser2, team2: saveTeam2 }
          
            // ===============================================
            //1. saving the openCardIn as closed in db.
            await $.post('/closedBetCard', curCard)
            // //2. delete this from array of openBetCards.
            await $.ajax({
                type: "DELETE",
                url: '/openBetCard',
                data: { team1: saveTeam1, team2: saveTeam2 },
            });

            // //3. render again the openBetCards.
            const arrOpenBets = await $.get('/openbetcards')
            renderOpenBets(arrOpenBets)

            // 4. render closedBetCards
            const arrClosedBets = await $.get('/closedBetCards')
            renderClosedBets(arrClosedBets)
            // ===============================================
        })
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

        $(".currentGamesContainer").find(".submit-bet").on("click", async function () {
            let homeTeam = $(this).siblings('input[name="team"]').val() // getting home team radio button val()
            let saveTeam1 = $(this).siblings('input[name="team"]:checked').val()
            let saveTeam2 = $(this).siblings('input[name="team"]').not(':checked').val()

            //checking if the home team is the selected, if not -> change
            if ( saveTeam1 != homeTeam){
                saveTeam2 = $(this).siblings('input[name="team"]:checked').val()
                saveTeam1 = $(this).siblings('input[name="team"]').not(':checked').val()
            }
            else{
                saveTeam1 = $(this).siblings('input[name="team"]:checked').val()
                saveTeam2 = $(this).siblings('input[name="team"]').not(':checked').val()
            }
            
            const saveUser1 = $("#input-name").val()
            const saveUser2 = null         
            
            const tempOpenBetCard = { user1: saveUser1, team1: saveTeam1, user2: saveUser2, team2: saveTeam2 }

            // ===============================================
            //1. saving the card in db.
            await $.post('/openbetcards', tempOpenBetCard)
            //2. delete the game from array of games.
            // console.log("to delete game as : " + saveTeam1 + ":"+ saveTeam2)
            await $.ajax({
                type: "DELETE",
                url: '/game',
                data: { team1: saveTeam1, team2: saveTeam2 },
            });
            //3. render again the games.
            const arrGames = await $.get('/games')
            renderGames(arrGames)
            //4. render open bets
            const arrOpenBets = await $.get('/openbetcards')
            renderOpenBets(arrOpenBets)
            // ===============================================
        })
    }
    const renderUsers = function (arrUsers){
        $(".winnerTable").empty();
        const source = $("#render-winners-script").html()
        const template = Handlebars.compile(source)
        let newHtml = template({ arrUsers })
        $(".winnerTable").append(newHtml)
    }
    return {
        render: render,
        renderGames: renderGames,
        renderClosedBets: renderClosedBets,
        renderScoreTables: renderScoreTables,
        renderOpenBets: renderOpenBets,
        renderUsers:renderUsers
    }
}
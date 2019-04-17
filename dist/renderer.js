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

        $(".openSingleBet").find(".team-btn").on("click", async function () {
            const saveTeam1 = $(this).text()
            const saveTeam2 = $(this).siblings(".team-btn").text()
            const saveUser1 = $(this).siblings(".user1").text()
            
            const saveUser2 = $(".input-secondName").val()           
            const curCard = { user1: saveUser1, team1: saveTeam1, user2: saveUser2, team2: saveTeam2 }

            console.log(curCard)
            // ===============================================
            //1. saving the openCardIn as closed in db.
            await $.post('/closedBetCard', curCard)
            // //2. delete this from array of openBetCards.
            // await $.ajax({
            //     type: "DELETE",
            //     url: '/game',
            //     data: { team1: saveTeam1, team2: saveTeam2 },
            // });

            // //3. render again the openBetCards.
            // const arrGames = await $.get('/teams')
            // renderGames(arrGames)

            //4. render closedBetCards
            // const arrClosedBets = await $.get('/closedBetCards')
            // console.log(arrClosedBets)
            // renderOpenBets(arrOpenBets)
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

        $(".currentGamesContainer").find(".submit-bet").on("click", function(){
            // const ch = $('input[name="team"]:checked').val()
            
            console.log(saveTeam1)
            console.log(saveTeam2)
        })

        // $(".currentGamesContainer").find(".team-btn").on("click", async function () {
        //     const saveTeam1 = $(this).text()
        //     const saveTeam2 = $(this).siblings(".team-btn").text()
        //     const saveUser1 = $("#input-name").val()
        //     const saveUser2 = null         
            
        //     const saveTeam1 = $('input[name="team"]:checked').val()
        //     console.log(saveTeam1)
        //     const tempOpenBetCard = { user1: saveUser1, team1: saveTeam1, user2: saveUser2, team2: saveTeam2 }

        //     // ===============================================
        //     //1. saving the card in db.
        //     await $.post('/openbetcards', tempOpenBetCard)
        //     //2. delete the game from array of games.
        //     await $.ajax({
        //         type: "DELETE",
        //         url: '/game',
        //         data: { team1: saveTeam1, team2: saveTeam2 },
        //     });
        //     //3. render again the games.
        //     const arrGames = await $.get('/teams')
        //     renderGames(arrGames)
        //     //4. render open bets
        //     const arrOpenBets = await $.get('/openbetcards')
        //     renderOpenBets(arrOpenBets)
        //     // ===============================================
        // })
    }

    return {
        render: render,
        renderGames: renderGames,
        renderClosedBets: renderClosedBets,
        renderScoreTables: renderScoreTables,
        renderOpenBets: renderOpenBets
    }
}
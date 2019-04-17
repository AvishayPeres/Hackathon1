const Renderer = function () {


    // -----------------------------
    // Main and only function.
    // -----------------------------
    const render = function (arrOfSomething) {
        console.log("in renderer.js, render()")
        console.log("done rendering...")
    }

    // -----------------------------
    // rending the OpenBet menu.
    // -----------------------------
    const renderOpenBets = function (arrOpenBets) {
        const source = $("#openBetsMenu-script").html()
        const template = Handlebars.compile(source)
        let newHtml = template({ arrOpenBets })
        $(".openBetsMenu").append(newHtml)
    }

    // -----------------------------
    // rending the closedbets menu.
    // -----------------------------
    const renderClosedBets = function (arrClosedBets) {
        const source = $("#closedBetsMenu-script").html()
        const template = Handlebars.compile(source)
        let newHtml = template({ arrClosedBets })
        $(".closedBetsMenu").append(newHtml)
    }

    // -----------------------------
    // rending the scores table menu.
    // -----------------------------
    const renderScoreTables = function (arrScores) {
        const source = $("#render-scores-script").html()
        const template = Handlebars.compile(source)
        let newHtml = template({ arrScores })
        $(".scoresTable").append(newHtml)
    }

    return {
        render: render,
        renderClosedBets: renderClosedBets,
        renderScoreTables: renderScoreTables,
        renderOpenBets: renderOpenBets
    }
}
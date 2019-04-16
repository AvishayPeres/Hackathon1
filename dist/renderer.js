const Renderer = function () {

    
    // -----------------------------
    // Main and only function.
    // -----------------------------
    const render = function (arrOfSomething) {   
        console.log("in renderer.js, render()")
        console.log("done rendering...")
    }

    return {
        render: render
    }
}
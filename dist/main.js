
const renderer = Renderer()

const loadPage = async function () {
    console.log("in main.js, loadPage()")
    renderer.render(["emptyArray"])
    console.log("done loading page...")
}
loadPage()
    
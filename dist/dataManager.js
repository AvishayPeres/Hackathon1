let arrPendingBets = []
let arrTeams = []
let arrClosedBets = []
let arrUsers = []

/*
ToDO:
1. send get request to server using jquery to route '_____' ( will define between us)
    get the list of matches to render.

2. send
*/

const DataManager = function(){
    const getPendingBets= function(){
        return arrPendingBets
    }

    const getListOfMatches = async function() {
        
    }

    const getPendingBetById = async function(pendingBetId) {

    }

    const deleteFromPendingBetsById = async function(pendingBetId) {

    }

    const getClosedBets = async function(){

    }
    const addToClosedBets = async function ( id ) {
        
    }

    const clearPendingBets = async function(){

    }

    const clearClosedBets = async function(){

    }

    return {
        getPendingPosts: getPendingPosts,
        getListOfMatches: getListOfMatches
    }
}
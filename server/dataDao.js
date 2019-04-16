class helper {
    constructor() {
    }
    dropAndCleanDB() {
       console.log("just dropped the db.collection (cleaned the db)")
    }
    
    populateDB_with_dummyData() {
        console.log("done populating with dummy data..")
    }
    
}
module.exports = helper
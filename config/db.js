const mongoose = require("mongoose");

class Database {
    constructor(uri) {
        this.uri = uri
    }

    async connectDB() {
        try {
            await mongoose.connect(this.uri);
            console.log("Connected to DB");
        } catch (error) {
            console.log(error);
        }
    }
};


module.exports = Database;
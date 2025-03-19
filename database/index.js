require("dotenv").config()
const mongoose = require("mongoose")


function connectDatabase() {
    //connecting string from mongoDB
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully...");
}

module.exports = connectDatabase;
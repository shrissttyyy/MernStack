require("dotenv").config()
const mongoose = require("mongoose")


async function connectDatabase() {
    //connecting string from mongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully...");
}

module.exports = connectDatabase;
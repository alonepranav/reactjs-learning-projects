const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        if (mongoose.connection)
            console.log("Connected to database");
        else
            throw new Error("Error in connecting Database")
    } catch (err) {
        throw new Error("Error in connecting Database")
    }
}

module.exports = connectDB
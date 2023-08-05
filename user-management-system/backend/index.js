const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const { userRoute } = require("./routes/userRoute.js")
const connectDB = require("./connection/connection.js")

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/user", userRoute)


app.get('/', (req, res) => {
    res.send(`
    <br/>
    <br/>
    <h1>User Management System Project </h1>
    <br/>
    <a href="https://github.com/pranavshilavane">Developer : Pranav</a>
    `)
});


app.listen(8000, () => {
    console.log(`Server : http://localhost:8000`);
})
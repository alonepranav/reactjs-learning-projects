const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


const connectDB = async () => {
    mongoose.connect(process.env.URL, { useUnifiedTopology: true, useNewUrlParser: true })
    if (mongoose.connection)
        console.log("Connected to database");
    else
        throw new Error("Error in connection")
}

connectDB()


const notesSchema = new mongoose.Schema({
    color: String,
    title: String,
    note: String,
    date: String,
})


const Note = mongoose.model("Note", notesSchema)


app.get('/getnotes', async (req, res) => {
    try {
        const data = await Note.find({})
        res.json({ success: true, data })
    } catch (err) {
        res.json({ success: false })
    }
})


app.post('/addnote', async (req, res) => {
    const { date, note, title, color } = req.body;
    try {
        const data = await Note.create({ date, note, title, color })
        res.json({ success: true })
    } catch (err) {
        res.json({ success: false })
    }
})


app.post('/editnote', async (req, res) => {
    const { date, note, title, color, _id } = req.body;
    try {
        const data = await Note.updateOne({ _id }, { $set: { date, note, title, color } })
        res.json({ success: true })
    } catch (err) {
        res.json({ success: false })
    }
})


app.post('/deletenote', async (req, res) => {
    const { _id } = req.body;
    try {
        const data = await Note.deleteOne({ _id })
        res.json({ success: true })
    } catch (err) {
        res.json({ success: false })
    }
})


app.get('/', (req, res) => {
    res.send("Home")
})


app.listen(8000, () => {
    console.log("Server : http://localhost:8000");
})
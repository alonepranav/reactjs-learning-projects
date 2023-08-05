const { default: mongoose } = require("mongoose");
const User = require("../model/model.js")


const getUsers = async (req, res) => {
    try {
        const data = await User.find({})
        res.json({ success: true, data })
    }
    catch (err) {
        res.json({ success: false })
    }
}


const addUser = async (req, res) => {
    const { firstName, lastName, email, phone } = req.body
    try {
        const data = await User.create({ firstName, lastName, email, phone })
        res.json({ success: true })
    }
    catch (err) {
        res.json({ success: false })
    }
}


const editUser = async (req, res) => {
    const { firstName, lastName, email, phone, _id } = req.body
    try {
        const data = await User.updateOne({ _id }, { $set: { firstName, lastName, email, phone } })
        res.json({ success: true })
    }
    catch (err) {
        res.json({ success: false })
    }
}


const deleteUser = async (req, res) => {
    const { _id } = req.body
    try {
        const data = await User.deleteOne({ _id })
        res.json({ success: true })
    }
    catch (err) {
        res.json({ success: false })
    }
}


const getUserDataById = async (req, res) => {
    const { _id } = req.body;
    try {
        const data = await User.findOne({ _id })
        res.json({ success: true, data })
    }
    catch (err) {
        res.json({ success: false })
    }
}


module.exports = {
    getUsers,
    addUser,
    editUser,
    deleteUser,
    getUserDataById
}
const express = require('express')
const { getUsers, addUser, editUser, deleteUser, getUserDataById } = require('../controller/userController')

const router = express.Router()

router.get('/getusers', getUsers)

router.post('/adduser', addUser)

router.post('/edituser', editUser)

router.post('/deleteuser', deleteUser)

router.post('/getuserdatabyid', getUserDataById)

module.exports = { userRoute: router }
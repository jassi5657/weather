
const express = require('express')
const { getAllUsers, addUser, loginUser } = require('../controller/user.controller')
const authenticate = require('../middleware/auth')

const router = express.Router()

router.get('/users' , authenticate, getAllUsers)
router.post('/users', addUser)
router.post('/login',  loginUser)








module.exports = router
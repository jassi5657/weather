
const express = require('express')

const authenticate = require('../middleware/auth')
const { getUserWeatherReports, weatherReport } = require('../controller/reports.controller')

const router = express.Router()


router.get('/getReports' ,authenticate, getUserWeatherReports)
router.post('/reports' ,authenticate, weatherReport)













module.exports = router
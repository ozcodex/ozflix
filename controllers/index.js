const express = require('express')
const router = express.Router()

router.use('/', require('./movie'))
//router.use('/users', require('./users'))

module.exports = router
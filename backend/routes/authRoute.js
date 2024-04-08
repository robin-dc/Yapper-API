const express = require('express');
const router = express.Router()

const {
    login,
    register
} = require('../controller/auth.controller')

router.get('/', login)
router.get('/register', register)

module.exports = router

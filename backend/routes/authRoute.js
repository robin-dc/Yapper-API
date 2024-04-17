const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')
const upload = require('../middleware/multerMiddleware')

const {
    login,
    register,
    getMe
} = require('../controller/auth.controller')

router.post('/', login)
router.post('/register', upload.single("avatar"), register)
router.get('/me', verifyToken, getMe)

module.exports = router

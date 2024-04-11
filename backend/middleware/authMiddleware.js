const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')

const verifyToken = asyncHandler(async (req, res, next) => {
    try {
        let token = req.headers.authorization

        if(!token) {
            res.status(303)
            throw new Error('Access denied, no token available')
        }

        if(token.startsWith('Bearer')){
            token = token.split(' ')[1]
        }

        const verified = await jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = await User.findById(verified.id).select('-password')
        next()
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = verifyToken

const asyncHandler = require('express-async-handler')

const register = asyncHandler((req,res) => {
    try {

    } catch (error) {
       res.status(500)
       throw new Error(error.message)
    }
})

const login = asyncHandler((req,res) => {
    try {

    } catch (error) {
       res.status(500)
       throw new Error(error.message)
    }
})

module.exports = {
    register,
    login
}

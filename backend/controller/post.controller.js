const asyncHandler = require('express-async-handler')

const createPost = asyncHandler((req,res) => {
    try {

    } catch (error) {
       res.status(500)
       throw new Error(error.message)
    }
})

const getAllPosts = asyncHandler((req,res) => {
    try {

    } catch (error) {
       res.status(500)
       throw new Error(error.message)
    }
})

const getUserPosts = asyncHandler((req,res) => {
    try {

    } catch (error) {
       res.status(500)
       throw new Error(error.message)
    }
})

const likePost = asyncHandler((req,res) => {
    try {

    } catch (error) {
       res.status(500)
       throw new Error(error.message)
    }
})

const deletePost = asyncHandler((req,res) => {
    try {

    } catch (error) {
       res.status(500)
       throw new Error(error.message)
    }
})

const updatePost = asyncHandler((req,res) => {
    try {

    } catch (error) {
       res.status(500)
       throw new Error(error.message)
    }
})


module.exports = {
    createPost,
    getAllPosts,
    getUserPosts,
    likePost,
    deletePost,
    updatePost
}

const asyncHandler = require('express-async-handler')
const Post = require('../models/post.model')

// @desc Create a new post
// @route POST /api/posts
// @access private
const createPost = asyncHandler(async (req,res) => {
    try {
        const {
            userId,
            firstName,
            lastName,
            userAvatar,
            description,
            postImagePath
        } = req.body


        if(!userId || !firstName || !lastName || !userAvatar || !description) {
            res.status(400)
            throw new Error('Insufficient credentials')
        }

        const newPost = new Post({
            userId,
            firstName,
            lastName,
            userAvatar,
            description,
            postImagePath,
            likes: {},
            comments: []
        })

        await newPost.save()

        res.status(201).json(newPost)
    } catch (error) {
       res.status(500)
       throw new Error(error.message)
    }
})

// @desc Retrieve all posts
// @route GET /api/posts
// @access private
const getAllPosts = asyncHandler(async (req,res) => {
    try {
        const allPost = await Post.find({})

        res.status(200).json(allPost)
    } catch (error) {
       res.status(500)
       throw new Error(error.message)
    }
})

// @desc Retrieve single user posts
// @route GET /api/posts/:userId/posts
// @access private
const getUserPosts = asyncHandler(async (req,res) => {
    try {
        const { userId } = req.params;

        const userPosts = await Post.find({userId: userId})

        res.status(200).json(userPosts)
    } catch (error) {
       res.status(500)
       throw new Error(error.message)
    }
})

// @desc Likes a single post
// @route PATCH /api/posts/:postId/like
// @access private
const likePost = asyncHandler(async (req,res) => {
    try {
        const { postId } = req.params
        const { userId } = req.body

        const postToBeLike = await Post.findById(postId)
        const isLiked = postToBeLike.get(userId) // check if user exist in liked list

        if(isLiked) {
            postToBeLike.likes.delete(userId) // remove user from liked list
        }
        else{
            postToBeLike.likes.set(userId) // add user from liked list
        }

        const updatedPost = await Post.findByIdAndUpdate(postId, {likes: postToBeLike.likes}, {new: true})

        res.status(200).json(updatedPost)
    } catch (error) {
       res.status(500)
       throw new Error(error.message)
    }
})

// @desc Deletes a single post
// @route DELETE /api/posts/:postId
// @access private
const deletePost = asyncHandler(async (req,res) => {
    try {
        const { postId } = req.params

        const postToDelete = await Post.findByIdAndDelete(postId)

        res.status(200).json({postToDelete, message: 'Deleted post successfully'})
    } catch (error) {
       res.status(500)
       throw new Error(error.message)
    }
})

// @desc Deletes a single post
// @route PATCH /api/posts/:postId
// @access private
const updatePost = asyncHandler(async (req,res) => {
    try {
        const { postId } = req.params
        const post = await Post.findById(postId)
        const { description, postImagePath } = req.body

        if(post.userId !== req.user._id.toString()){
            res.status(400)
            throw new Error("Access to edit denied")
        }

        // if(!description){
        //     description = post.description
        // }
        // if(!postImagePath){
        //     postImagePath = post.postImagePath
        // }

        const newPost = await Post.findByIdAndUpdate(postId, { $set: { description: description, postImagePath: postImagePath }}, {new: true})

        res.status(200).json(newPost)
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

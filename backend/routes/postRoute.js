const express = require('express');
const router = express.Router()

const {
    createPost,
    getAllPosts,
    getUserPosts,
    likePost,
    deletePost,
    updatePost
} = require('../controller/post.controller')

router.get('/', getAllPosts)
router.get('/:userId/posts', getUserPosts)

router.post('/', createPost)

router.patch('/:id/like', likePost)
router.patch('/:id/update', updatePost)

router.delete('/:id/delete', deletePost)




module.exports = router

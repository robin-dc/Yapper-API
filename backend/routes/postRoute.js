const express = require('express');
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')
const upload = require('../middleware/multerMiddleware')

const {
    createPost,
    getAllPosts,
    getUserPosts,
    likePost,
    deletePost,
    updatePost
} = require('../controller/post.controller')

router.get('/', verifyToken, getAllPosts)
router.get('/:userId/posts', verifyToken, getUserPosts)

router.post('/', verifyToken, upload.array('post-images', 12), createPost)

router.patch('/:postId/like', verifyToken, likePost)
router.patch('/:postId', verifyToken, updatePost)

router.delete('/:postId', verifyToken, deletePost)




module.exports = router

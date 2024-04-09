const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')

const {
    getUserProfile,
    getFriends,
    getFriendRequests,
    addFriendRequest,
    confirmRequest,
    cancelRequest,
    unfriend,
} = require('../controller/user.controller')


router.get('/:userId', verifyToken, getUserProfile)
router.get('/:userId/requests', verifyToken, getFriendRequests)
router.get('/:userId/friends', verifyToken, getFriends)

router.patch('/:userId/add/:friendId', verifyToken, addFriendRequest)
router.patch('/:userId/cancel/:friendId', verifyToken, cancelRequest)
router.patch('/:userId/unfriend/:friendId', verifyToken, unfriend)
router.patch('/:userId/confirm/:friendId', verifyToken, confirmRequest)


module.exports = router

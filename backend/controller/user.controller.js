const User = require('../models/user.model')
const asyncHandler = require('express-async-handler')


// @desc Get a single user profile
// @route GET /api/users/:userId
// @access private
const getUserProfile = asyncHandler(async(req,res) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId).select('-password')

        res.status(200).json(user)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// @desc Get a single user friends list
// @route GET /api/users/:userId/friends
// @access private
const getFriends = asyncHandler(async(req,res) => {
    try {
        const { userId } = req.params
        const userFriends = await findById(userId, {friends: 1})

        const friends = await Promise.all(
            userFriends.map((id) => User.findById(id))
        )

        const essentialInfo = friends.map(({_id, firstName, lastName, location, picturePath}) => {
            return {_id, firstName, lastName, location, picturePath}
        })

        res.status(200).json(essentialInfo)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// @desc Get a single user friend request list
// @route GET /api/users/:userId/requests
// @access private
const getFriendRequests = asyncHandler(async(req,res) => {
    try {
        const { userId } = req.params
        const userFriendRequests = await findById(userId, {friendRequests: 1})

        const friendRequests = await Promise.all(
            userFriendRequests.map((id) => User.findById(id))
        )

        const essentialInfo = friendRequests.map(({_id, firstName, lastName, location, picturePath}) => {
            return {_id, firstName, lastName, location, picturePath}
        })

        res.status(200).json(essentialInfo)
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// @desc Add a friend
// @route GET /api/users/:userId/add/:friendId
// @access private
const addFriendRequest = asyncHandler(async(req,res) => {
    try {
        const { userId, friendId } = req.params
        const user = await User.findById(userId)
        const friendToBeAdded = await User.findById(friendId)

        user.friendRequests.push(friendId)
        friendToBeAdded.friendRequests.push(userId)

        await user.save()
        await friendToBeAdded.save()

        res.status(200).json({message: `Added ${friendToBeAdded.firstName} Successfully`})
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// @desc Remove a friend request
// @route GET /api/users/:userId/cancel/:friendId
// @access private
const cancelRequest = asyncHandler(async(req,res) => {
    try {
        const { userId, friendId } = req.params
        const user = await User.findById(userId)
        const friendToBeCancel = await User.findById(friendId)

        user.friendRequests.filter((id) => id !== friendId)
        friendToBeCancel.friendRequests.filter((id) => id !== userId)

        await user.save()
        await friendToBeCancel.save()

        res.status(200).json({message: `Cancel Request to ${friendToBeCancel.firstName} Successfully`})
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// @desc Unfriend a user
// @route GET /api/users/:userId/unfriend/:friendId
// @access private
const unfriend = asyncHandler(async(req,res) => {
    try {
        const { userId, friendId } = req.params
        const user = await User.findById(userId)
        const friendToBeRemove = await User.findById(friendId)

        user.friends.filter((id) => id !== friendId)
        friendToBeRemove.friends.filter((id) => id !== userId)

        await user.save()
        await friendToBeRemove.save()

        res.status(200).json({message: `Unfriend ${friendToBeRemove.firstName} Successfully`})
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// @desc Confirm a friend request
// @route GET /api/users/:userId/confirm/:friendId
// @access private
const confirmRequest = asyncHandler(async(req,res) => {
    try {
        const { userId, friendId } = req.params
        const user = await User.findById(userId)
        const friendToBeConfirm = await User.findById(friendId)

        user.friends.push(friendId)
        friendToBeConfirm.friends.push(userId)

        await user.save()
        await friendToBeConfirm.save()

        res.status(200).json({message: `You're now friends with ${friendToBeConfirm.firstName}`})
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    getUserProfile,
    getFriends,
    getFriendRequests,
    addFriendRequest,
    confirmRequest,
    cancelRequest,
    unfriend,
}

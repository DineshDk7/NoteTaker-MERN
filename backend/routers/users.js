const express = require('express')
const { registerUser, loginUser, logoutUser, logoutAll, updateUserProfile, deleteAccount, resetPassword, resetPasswordRequest } = require('../controllers/userController')
const auth = require('../middleware/auth')
const router = express.Router()

router.route('/register').post(registerUser)

router.route('/login').post(loginUser)

router.route('/logout').post(auth, logoutUser)

router.route('/logoutAll').post(auth, logoutAll)

router.route('/me').patch(auth, updateUserProfile)

router.route('/password-reset').post(resetPasswordRequest)

router.route('/reset/:resetToken/:id').post(resetPassword)

router.route('/me/delete-account').delete(auth, deleteAccount)

module.exports = router

// router.delete('/users/me/avatar', auth, async (req,res) => {
//     req.user.avatar = undefined
//     await req.user.save()
//     res.send("Profile pic removed!")
// })
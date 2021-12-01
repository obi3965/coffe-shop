const express = require('express');
const { createOrUpdateUser, currentUser } = require('../controllers/auth');
const { isAuthenticatedUser, isAuthenticatedAdmin } = require('../middleware/auth');



const router = express.Router()


router.post('/create-or-update-user', isAuthenticatedUser, createOrUpdateUser)
router.post('/current-user', isAuthenticatedUser, currentUser)
router.post('/current-admin',isAuthenticatedUser, isAuthenticatedAdmin, currentUser)
// router.post('/signup', signUp)
// router.post('/signin', signIn)
// router.get('/logout', logout)
// router.post('/password/forgot', forgetPassword)
// router.get('/me',isAuthenticatedUser, userProfile)
// router.put('/me/update', isAuthenticatedUser, userProfileUpdate)
// router.put('/me/password/update', isAuthenticatedUser, passwordUpdate)
// router.get('/admin/users',isAuthenticatedUser, authorizeRoles("admin"), getAllUsers )
// router.get('/admin/users/:id', isAuthenticatedUser, authorizeRoles('admin'), getSingleUser)
// router.put('/admin/users/:id', isAuthenticatedUser, authorizeRoles('admin'), updateUserRole)
// router.delete('/admin/users/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteUser)
module.exports = router
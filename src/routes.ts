import express from 'express'
import * as UsersController from './controllers/users.controller'
import protectedRoute from './middlewares/protectedRoute'

const router = express.Router()

router.get('/', (req, res) => {
    return res.json({
        message: "Hello World"
    })
})

// Users resource
router.get('/users', protectedRoute, UsersController.listUsers)
router.post('/users', UsersController.register)
router.post('/login', UsersController.login)
router.post('/users/upload', protectedRoute, UsersController.uploadProfilePic)
router.get('/users/:id', protectedRoute, UsersController.getUser)
router.delete('/users/:id', protectedRoute, UsersController.deleteUser)

export default router
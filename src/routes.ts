import express from 'express'
import * as UsersController from './controllers/users.controller'

const router = express.Router()

router.get('/', (req, res) => {
    return res.json({
        message: "Hello World"
    })
})

// Users resource
router.get('/users', UsersController.listUsers)
router.post('/users', UsersController.register)
router.post('/login', UsersController.login)
router.post('/users/upload', UsersController.uploadProfilePic)

export default router
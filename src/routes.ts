import express from 'express'
import { listUsers } from './controllers/users.controller'

const router = express.Router()

router.get('/', (req, res) => {
    return res.json({
        message: "Hello World"
    })
})

// Users resource
router.get('/users', listUsers)

export default router
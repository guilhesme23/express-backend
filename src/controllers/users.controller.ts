import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { writeFile } from "fs";
import bcrypt from 'bcrypt'
import { generateAccessToken } from "../utils/jwt";

interface IUser {
    email: string
    id: string
    password: string
}

const users: IUser[] = []

export const listUsers = (req: Request, res: Response) => {
    return res.status(200).json(users)
}

export const register = async (req: Request, res: Response) => {
    const user = req.body as {
        email: string,
        username: string,
        password: string,
        id: string
    }

    users.push({
        ...user,
        password: await bcrypt.hash(user.password, 12)
    })

    return res.status(201).json(user)
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body as {
        email: string,
        password: string
    }

    const user = users.find(u => u.email == email)
    if (user) {
        const result = await bcrypt.compare(password, user.password)
        if (result) {
            const jwt = generateAccessToken({
                id: user.id,
                email: user.email
            })

            return res.status(200).json({
                token: jwt
            })
        } else {
            res.status(401).json({
                message: 'Incorrect password'
            })
        }
    } else {
        return res.status(404).json({
            message: 'User not found'
        })
    }
}

export const uploadProfilePic = (req: Request, res: Response) => {
    if (req.files != undefined) {
        const file = req.files.readme as UploadedFile
        writeFile('./tmp/readme.md', file.data, (err) => {
            if (err) console.log(err)
        })
    } else {
        return res.status(400).json({
            message: 'file missing'
        })
    }

    return res.status(200).json({
        message: 'ok'
    })
}
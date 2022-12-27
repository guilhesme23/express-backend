import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { writeFile } from "fs";
import bcrypt from 'bcrypt'
import { generateAccessToken } from "../utils/jwt";
import { IUser, User } from '../models/user.model'
import { RegisterUserDTO } from "../DTOs/user/register.dto";

const users: IUser[] = []

export const listUsers = (req: Request, res: Response) => {
    return res.status(200).json(users)
}

export const register = async (req: Request, res: Response) => {
    const user = req.body as RegisterUserDTO

    const newUser = new User(user)

    try {
        newUser.password = await bcrypt.hash(newUser.password, 12);
        await newUser.save()
        return res.status(201).json(newUser)
    } catch(err) {
        console.log(err)
        return res.status(400).json({
            message: 'Error creating user'
        })
    }

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
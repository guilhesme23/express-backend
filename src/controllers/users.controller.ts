import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { writeFile } from "fs";

const users = [
    {
        email: 'john_doe@email.com',
        username: 'john_doe',
        id: '1234'
    },
    {
        email: 'random@email.com',
        username: 'some_random_dude',
        id: '4321'
    }
]

export const listUsers = (req: Request, res: Response) => {
    return res.status(200).json(users)
}

export const register = (req: Request, res: Response) => {
    const user = req.body as {
        email: string,
        username: string,
        id: string
    }

    console.log(user)
    users.push(user)
    return res.status(201).json(user)
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
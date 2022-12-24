import { Request, Response } from "express";

const users = [
    {
        email: 'john_doe@email.com',
        username: 'john_doe',
        role: 'employee',
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
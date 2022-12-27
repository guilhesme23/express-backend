import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']

    if (!token) {
        res.sendStatus(401)
    } else {
        try {
            const result = verifyToken(token)
            console.log(result)
            next()
        } catch(err) {
            res.sendStatus(403)
        }
    }

}

export default protectedRoute
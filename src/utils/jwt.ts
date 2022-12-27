import jwt from 'jsonwebtoken'

export const generateAccessToken = (data: any) => {
    const {
        TOKEN_SECRET
    } = process.env

    if (TOKEN_SECRET == undefined) {
        throw new Error('TOKEN_SECRET variable not defined')
    }

    return jwt.sign(data, TOKEN_SECRET) 
}

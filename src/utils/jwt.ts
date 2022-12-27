import jwt from 'jsonwebtoken'

const getTokenSecret = (): string => {
    const { TOKEN_SECRET } = process.env;

    if (TOKEN_SECRET == undefined) {
      throw new Error("TOKEN_SECRET variable not defined");
    }

    return TOKEN_SECRET
}

export const generateAccessToken = (data: any) => {
    const TOKEN_SECRET = getTokenSecret()

    return jwt.sign(data, TOKEN_SECRET) 
}

export const verifyToken = (token: string) => {
    const TOKEN_SECRET = getTokenSecret();
    return jwt.verify(token, TOKEN_SECRET)
}
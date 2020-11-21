import jwt from "jsonwebtoken"

export const generateJWT = payload => {
    return jwt.sign(payload, process.env.KEY, {
        expiresIn: 1440,
    })
}
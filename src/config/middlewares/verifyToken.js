import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']

    if (token) {
        return jwt.verify(token, process.env.KEY, (err, decoded) => {
            if (err)
                return res.status(401).send({ message: "Invalid Token" })

            req.decoded = decoded
            next()
        })
    } 
    
    return res.status(401).send({
        error: true,
        errors: "Token should be in headers",
        message: "Token is not present on headers",
        statusCode: 401
    })
}
import Service from "./Service"
import jwt from "jsonwebtoken"
import { HashPassword, ComparePassword } from "../utils/HashPassword"
import { generateJWT } from "../utils/GenerateJWT"

class UserService extends Service {
    async insert(data) {
        try {
            data.password_hash = await HashPassword(data.password)
            
            let item = await this.model.create(data)
            let payload = {
                id: item._id,
                email: item.email
            }

            let token = generateJWT(payload)

            return {
                error: false,
                item,
                token
            }
        } catch(error) {
            let isMongoDuplicationError = error.code && error.code === 11000

            if (error.name === 'ValidationError') {
                let errors = [];
                for (let field in error.errors) {
                    errors.push(`${error.errors[field].path} is ${error.errors[field].kind}`)
                }

                return {
                    message: "There are validation errors",
                    errors,
                    error: true,
                    statusCode: 400,
                }
            }

            return {
                error: true,
                statusCode: isMongoDuplicationError? 409 : 500,
                message: isMongoDuplicationError? "Email already been registered" : error.toString()
            }
        }
    }

    async login(email, password) {
        try {
            let user = await this.model.findOne({
                email
            })

            if (!user) {
                return {
                    error: true,
                    statusCode: 404,
                    message: "User not found"
                }
            }

            if (await ComparePassword(password, user.password_hash)) {
                const payload = {
                    id: user._id,
                    email,
                }

                const token = generateJWT(payload)
                
                return {
                    token,
                    error: false,
                    statusCode: 202,
                }
            }

            return {
                error: true,
                statusCode: 401,
                message: "Password is not valid",
            }
        } catch (error) {
            return {
                error: true,
                statusCode: 500,
                message: error.toString() || "Not be able to login at this time",
            }
        }
    }
}

export default UserService

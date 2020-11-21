import Service from "./Service"
import jwt from "jsonwebtoken"
import { HashPassword, ComparePassword } from "../utils/HashPassword"

class UserService extends Service {
    async insert(data) {
        try {
            data.password_hash = await HashPassword(data.password)
            
            let item = await this.model.create(data)

            return {
                error: false,
                item
            }
        } catch(errors) {
            return {
                error: true,
                statusCode: 500,
                message: errors.toString() || "Not able to create User",
                errors
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
                    errors: "Not able to login",
                    message: "User not found"
                }
            }

            if (await ComparePassword(password, user.password_hash)) {
                const payload = {
                    id: user._id,
                    email,
                }

                const token = jwt.sign(payload, process.env.KEY, {
                    expiresIn: 1440,
                })
                
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
                errors: "Not be able to login at this time"
            }
        } catch (errors) {
            return {
                error: true,
                statusCode: 500,
                message: errors.toString() || "Not be able to login at this time",
                errors
            }
        }
    }
}

export default UserService

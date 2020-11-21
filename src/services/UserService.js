import Service from "./Service"
import jwt from "jsonwebtoken"
import { HashPassword, ComparePassword } from "../utils/HashPassword"
import { generateJWT } from "../utils/GenerateJWT"

class UserService extends Service {
    async insert(data) {
        try {
            data.password_hash = await HashPassword(data.password)
            
            let item = await this.model.create(data)

            return {
                error: false,
                item
            }
        } catch(error) {
            return {
                error: true,
                statusCode: 500,
                message: error.toString() || "Not able to create User",
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

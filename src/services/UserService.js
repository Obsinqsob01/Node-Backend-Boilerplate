import Service from "./Service"
import { HashPassword } from "../utils/HashPassword"

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
}

export default UserService

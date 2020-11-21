import Service from "./Service"

class UserService extends Service {
    async insert(data) {
        try {
            data.password_hash = data.password + "hola mundo"
            
            let item = await this.model.save(data)

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

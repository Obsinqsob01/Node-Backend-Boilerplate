import Controller from "./Controller"
import UserService from "../services/UserService"
import { User } from "../models/User"

const userService = new UserService(User)

class UserController extends Controller {
    constructor(service) {
        super(service)

        this.login = this.login.bind(this)
    }

    async login(req, res) {
        let response = await this.service.login(req.body.email, req.body.password)
        if (response.error) return res.status(response.statusCode).send(response)

        return res.status(response.statusCode).send(response)
    }
}

export default new UserController(userService)

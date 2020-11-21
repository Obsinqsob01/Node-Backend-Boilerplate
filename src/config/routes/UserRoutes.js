import UserController from "../../controllers/UserController"
import { User } from "../../models/User"

export default server => {
    server.get("", UserController.getAll)
    server.post("", UserController.insert)
    server.put("/:id", UserController.update)
    server.delete("/:id", UserController.delete)
}
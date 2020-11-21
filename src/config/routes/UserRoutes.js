import UserController from "../../controllers/UserController"
import express from "express"

const router = express.Router()

router.get("", UserController.getAll)
router.post("", UserController.insert)
router.post("/login", UserController.login)
router.put("/:id", UserController.update)
router.delete("/:id", UserController.delete)

export default router
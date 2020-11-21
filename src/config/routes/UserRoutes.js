import UserController from "../../controllers/UserController"
import express from "express"
import { verifyToken } from "../middlewares/verifyToken"

const router = express.Router()

router.get("", UserController.getAll)
router.post("", UserController.insert)
router.post("/login", UserController.login)
router.put("/:id", verifyToken, UserController.update)
router.delete("/:id", UserController.delete)

export default router
import UserRoutes from "./routes/UserRoutes"
import express from "express"

const router = express.Router()

export default server => {

    server.use("/api", router)

    router.use("/users", UserRoutes)

    server.use('*', (req, res) => {
        return res.status(200).send({
            "message": "Welcome to api my friend"
        })
    })
}
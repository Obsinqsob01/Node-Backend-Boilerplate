import express from "express"
import setRoutes from "./routes.js"

const server = express()

server.use(express.json({ extended: true }))

setRoutes(server)

export default server
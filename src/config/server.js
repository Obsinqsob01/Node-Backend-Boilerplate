import express from "express"
import setRoutes from "./routes.js"

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json({ extended: true }))
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*')

    next()
})

setRoutes(server)

export default server
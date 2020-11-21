import UserRoutes from "./routes/UserRoutes"

export default server => {
    server.get('*', (req, res) => {
        message: "Welcome to api"
    })

    server.use("/api/users", UserRoutes)
}
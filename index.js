import server from "./src/config/server"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const mongoURI = process.env.mongoURI || new Error("MongoURI is not defined")

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
    console.log("Connected to mongodb")
}).catch(error => {
    console.error(`Error conntecting to mongo ${error}`)
})

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`)
})
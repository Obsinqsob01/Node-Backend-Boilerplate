import mongoose from "mongoose"

const { Schema } = mongoose

const mongoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password_hash: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    }
})

class UserClass {
    static async HashPassword(password) {
        console.log(this, password)
    }
}

mongoSchema.loadClass(UserClass)

export const User = mongoose.Model('User', mongoSchema)

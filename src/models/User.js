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
}, {
    timestamps: true
})

export const User = mongoose.model('User', mongoSchema)

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    register_date: { type: Date, required: true, default: Date.now }
})

export const User = new mongoose.model('Users', UserSchema)
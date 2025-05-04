import mongoose from "mongoose";

let userSchema = mongoose.Schema({
    email: String,
    password: String,
    serect: Number
})

let userModel = new mongoose.model("super_admin", userSchema)

export default userModel
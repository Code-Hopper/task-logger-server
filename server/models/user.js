import mongoose from "mongoose";
import bcrypt from "bcrypt"

let userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    serect: Number,
    registerTimeStamp: String,
})

userSchema.pre("save", async function () {
    try {

        this.password = await bcrypt.hash(this.password, 12)

        this.registerTimeStamp = new Date().toLocaleDateString() + " | " + new Date().toLocaleTimeString()

    } catch (err) {
        console.log("error while saving | encrypt : ", err)
    }
})

let userModel = new mongoose.model("users", userSchema)

export default userModel
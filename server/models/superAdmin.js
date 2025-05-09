import mongoose from "mongoose";

let superAdminSchema = mongoose.Schema({
    email: String,
    password: String,
    serect: Number
})

let superAdminModel = new mongoose.model("super_admin", superAdminSchema)

export default superAdminModel
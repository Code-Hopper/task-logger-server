import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({ path: './config.env' })

async function conn() {
    try {
        await mongoose.connect(process.env.MONGODBSTRING)
        console.log("connected to database successfully !")
    } catch (err) {
        console.log("Error while conecting to database !")
    }
}

conn();
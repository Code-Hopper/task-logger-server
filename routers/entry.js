import express from "express"
import { getHome, verifyOTP, checkEmail } from "../controllers/controller.js"

let entryRouter = express()

entryRouter.get("/", getHome)

entryRouter.post("/checkemail", checkEmail)

entryRouter.post("/verify-email", verifyOTP)

export default entryRouter 
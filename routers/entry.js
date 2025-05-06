import express from "express"
import { getHome, registerUser } from "../controllers/controller.js"

let entryRouter = express()

entryRouter.get("/", getHome)

entryRouter.post("/register", registerUser)

export default entryRouter 
import express from "express"
import { getHome } from "../controllers/controller.js"

let entryRouter = express()

entryRouter.get("/", getHome)

export default entryRouter 
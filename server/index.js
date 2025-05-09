import express from "express"
import dotenv from "dotenv"
import os from "os"
import entryRouter from "./routers/entry.js"

dotenv.config({ path: "./config.env" })

const port = process.env.PORT || 3000
const app = express()

// Function to get local network IP
function getLocalIP() {
    const interfaces = os.networkInterfaces()
    for (const iface of Object.values(interfaces)) {
        for (const config of iface) {
            if (config.family === 'IPv4' && !config.internal) {
                return config.address
            }
        }
    }
    return 'localhost'
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(entryRouter)

app.listen(port, () => {
    const localIP = getLocalIP()
    console.log(`Server is running on:`)
    console.log(`- Local: http://localhost:${port}`)
    console.log(`- Network: http://${localIP}:${port}`)
})

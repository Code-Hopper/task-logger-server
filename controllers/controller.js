import "../database/conn.js"
import userModel from "../models/user.js"

let getHome = (req, res) => {
    res.status(200).json({
        greeting: "welcome to task-logger",
        toGetStarted: [
            {
                task: "Login",
                message: "to access dashboard content to create & manage task."
            },
            {
                task: "Register",
                message: "get a personalised and prative login(will have to verify email via OTP)."
            }
        ]
    })
}

let registerUser = async (req, res) => {
    try {

        let userData = req.body

        if (!userData || !(!userData.name && !userData.password && !userData.email)) {
            throw ("invalid or missing user data")
        }

        let userEntry = new userModel(userData)

        await userEntry.save()

        console.log("use successfully registered")

        res.status(202).json({ message: "we have sent you email id for verfication please confirm." })

    } catch (err) {
        console.log("error while registering the user : ", err)
        res.status(400).json({ message: "error while added user please try again.", error: err })
    }
}

export { getHome, registerUser }
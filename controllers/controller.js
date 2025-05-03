import "../database/conn.js"

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

export { getHome }
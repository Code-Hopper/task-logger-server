import nodemailer from "nodemailer"
import "../database/conn.js"
import userModel from "../models/user.js"

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

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

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Store OTP in memory with expiration (for production, use Redis)
let otpStore = {};

const sendOTP = async (email) => {
    try {
        const email = email
        console.log("Sending OPT to:", email);

        if (!email) return { message: "unable to send opt | din't have email  !", status: false }


        const otp = generateOTP();
        otpStore[email] = { otp, expiresAt: Date.now() + 30 * 60 * 1000 }; // OTP expires in 30 minutes

        await transporter.sendMail({
            from: `"Code-Hopper" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Code-hopper Login OTP",
            html: `<p>your opt is <span style="color:red;"> ${otp} </span> , it is valid for 30 mins!</p>`
        });

        // now when opt is genrated return to login function 

        return { message: "opt sent successfully !", status: true }

    } catch (error) {
        console.error("Error sending OPT:", error);
        return { message: "unable to send opt ", status: false }
    }
};

// ✅ Verify OTP Endpoint
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        console.log(email, "send otp", otp)

        if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

        // Check if OTP exists for the given email
        const storedOTP = otpStore[email];

        console.log("stored Otp ", storedOTP)

        console.log("matching opt...")

        if (!storedOTP) return res.status(400).json({ message: "OTP expired or not requested" });

        // Check if OTP matches and is not expired
        if (storedOTP.otp !== otp || storedOTP.expiresAt < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        console.log("otp matched !")

        // ✅ OTP verified, proceed with login
        delete otpStore[email];  // Remove OTP after successful verification

        // ✅ Generate JWT Token (optional)
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        let result = await AdminModel.updateOne({ email: email, $set: { token: token } })

        console.log(result)

        res.status(202).json({ message: "OTP verified successfully and genrated token", token });

    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Error verifying OTP", err: error.message });
    }
};

let registerUser = async (req, res) => {
    try {

        let userData = req.body

        if (!userData || !(!userData.name && !userData.password && !userData.email)) {
            throw ("invalid or missing user data")
        }

        // send otp to userData.email to verify email

        let opt_sending_result = await sendOTP(userData.email)

        if (!opt_sending_result.status) {
            throw (opt_sending_result.message)
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
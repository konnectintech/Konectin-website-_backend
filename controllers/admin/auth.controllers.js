
const Admin = require('../../models/admin.model')
const { passwordHash, passwordCompare } = require("../../helpers/bcrypt")


exports.register = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email && !password) {
            return res.status(400).json({ message: "Please fill all required fields" })
        }

        const hashedPassword = await passwordHash(password)
        const admin = new Admin({
            email: email,
            password: hashedPassword
        })
        await admin.save()
        return res.status(201).json({ message: "Admin record created successfully", admin })
    }
    catch (err) {

        return res.status(500).json({ message: "Server error, try again later" })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email && !password) {
            return res.status(400).json({ message: "Please fill all required fields" })
        }
        const admin = await Admin.findOne({ email: email })
        if (!admin) {
            return res.status(400).json({ message: "Admin account does not exist, please create one" })
        }
        const passwordMatch = await passwordCompare(password, admin.password)
        if (!passwordMatch) {
            return res.status(400).json({ message: "Incorrect password" })
        }

        return res.status(200).json({ message: "Admin logged in successfully", admin })
    }
    catch (err) {
        return res.status(500).json({ message: "Server error, try again later" })
    }
}
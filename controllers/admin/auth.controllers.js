
const Admin = require('../../models/admin.model')
const { passwordHash, passwordCompare } = require("../../helpers/bcrypt")
const { jwtSign } = require("../../helpers/jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body
        if (!email && !password && !firstName && !lastName) {
            return res.status(400).json({ message: "Please fill all required fields" })
        }
        const emailExists = await Admin.findOne({ email: email })
        if (emailExists) {
            return res.status(400).json({ message: "Email Already Exists" })
        }

        const hashedPassword = await passwordHash(password)
        const admin = new Admin({
            email: email,
            password: hashedPassword,
            firstName,
            lastName
        })
        await admin.save()
        const { password: _, ...data } = JSON.parse(JSON.stringify(admin))
        return res.status(201).json({ message: "Admin record created successfully", data })
    }
    catch (err) {
        console.error(err)
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
        const payload = {
            id: admin.id,
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
        };
        const token = jwtSign(payload);
        const { password: _, ...data } = JSON.parse(JSON.stringify(admin))
        return res.status(200).json({ message: "Admin logged in successfully", data, token: token })
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server error, try again later" })
    }
}
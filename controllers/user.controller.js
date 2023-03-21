const User = require('../models/user.model')
const { passwordCompare, passwordHash} = require('../helpers/bcrypt')

const register = async(request, response) => {
    try{
        const {fullname, email, password } = request.body
        if(!fullname && !email & !password){
            return response.status(400).json({message: 'Please fill all required fields'})
        }
        const userExists = await User.findOne({email: email})
        if(userExists){
            return response.status(401).json({message: "User already exists"})
        }

        const hashedPassword = await passwordHash(password)
        const user = new User({
            fullname: fullname,
            email: email,
            password: hashedPassword
        })

        await user.save()
        return response.status(201).json({message: "User created successfully", user})
    }
    catch(err){
        return response.status(500).json({message: "Server error, try again later!"})
    }
}

const login = async(request, response) => {
    try{
        const {email, password} = request.body
        if(!email && !password){
            return response.status(400).json({message: "Please fill all required fields"})
        }
        const user = await User.findOne({email: email})
        if(!user){
            return response.status(400).json({ message: "User does not exist"})
        }
        const passwordMatch = await passwordCompare(password, user.password)
        if(!passwordMatch){
            return response.status(400).json({message: "Incorrect password"})
        }

        return response.status(200).json({message: "User logged in successfully!"})
    }
    catch(err){
        return response.status(500).json({message: "Server error, try again later!"})
    }
}

const getUser = async(request, response) => {
    try {
        const userId = request.query.userId
        const user = await User.findById({_id: userId})
        if(!user){
            return response.status(400).json({message: "No such user exists"})
        }
        return response.status(200).json({message: "User profile fetched successfully", user})
    }
    catch(err){
        return response.status(500).json({message: 'Server error, try again later!'})
    }
}



module.exports = {
    register, login, getUser
}
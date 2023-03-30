const jwt = require("jsonwebtoken")
require("dotenv").config()

const jwtSign = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '24h'})
}

const jwtVerify = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
    catch(error){
        return false;
    }
}

const verifyUserToken = (request, response, next) => {
    try {
        const authHeader = request.headers.token
        let result;
        if(authHeader) {
            const token = authHeader.split(" ")[1]
            result = jwtVerify(token)

            if(!result){
                return response.status(400).json({message: "Please login again"})
            }
            else{
                request.decoded = result;
                next()
            }
        }
        else{
            return response.status(400).json({message: "An access token is required to proceed, please login to get one"})
        }
    }
    catch(err) {
        return response.status(500).json({message: "An error occured", Error: err})
    }
}

module.exports = {
    jwtSign, verifyUserToken
}
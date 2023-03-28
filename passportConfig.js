const GoogleStrategy = require("passport-google-oauth2").Strategy
const GoogleUser = require('./models/userGoogle.model')
require("dotenv").config()

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await GoogleUser.findOne({googleId: profile.id})
            if(existingUser) {
                return done(null, existingUser)
            }
            const newUser = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
            })
            await newUser.save()
            return done(null, newUser)
        }
        catch(error){
            return done(error, false)
        }
    }
    ))
}
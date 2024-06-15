const user = require("./user.json")
const resume = require("./resume.json")
const letter = require("./letter.json")
const internship = require("./internship.json")
const partnership = require("./partnership.json")
module.exports = {
    ...user,
    ...resume,
    ...letter,
    ...internship,
    ...partnership
}
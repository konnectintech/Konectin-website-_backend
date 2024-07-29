const auth = require("./auth.json")
const resume = require("./resume.json")
const letter = require("./letter.json")
const dashboard = require("./dashboard.json")

module.exports = {
    ...auth,
    ...resume,
    ...letter,
    ...dashboard
}

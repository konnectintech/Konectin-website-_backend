const schemas = require("./schemas")
const securitySchemes = require("./securitySchemes.json")
module.exports = {
    schemas: {
        ...schemas
    },
    ...securitySchemes
}
const fs = require("fs");

exports.createTempFile = function (filename) {
    let filePath = "tmp"
    if (!fs.existsSync(filePath)) {
        filePath = fs.mkdirSync(filePath, { recursive: true })
    }
    if (filename) return filePath + filename;
    return filePath
}

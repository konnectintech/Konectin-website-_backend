const fs = require("fs");

exports.createTempFile = function (filename) {
    let filePath = "tmp"
    if (!fs.existsSync(filePath)) {
        filePath = fs.mkdirSync(filePath, { recursive: true })
    }
    if (filename) return filePath + filename;
    return filePath
}

// This function gets the intersection between two sets
exports.intersection = function (set1, set2) {
    return new Set([...set1].filter(val => set2.has(val)));
}

exports.difference = function (set1, set2) {
    return new Set([...set1].filter(val => !set2.has(val)));
}
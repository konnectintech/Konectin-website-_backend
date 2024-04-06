const User = require("../../models/user.model")
const fs = require("fs");
const converter = require('json-2-csv')
const { createTempFile } = require("../../utils/functions")

exports.getUsers = async (req, res) => {
    try {
        const data = await User.find().select("-password").sort({ createdAt: -1 })
        const file_type = req.query.file_type
        if (file_type) {
            switch (file_type) {
                case "json": {
                    let filePath = createTempFile("/konectin.users.json");
                    // return json file to be downloaded
                    fs.writeFileSync(filePath, JSON.stringify(data))
                    return res.download(filePath);
                }
                default:
                    // return csv file to be downloaded
                    let filePath = createTempFile("/konectin.users.csv");
                    const docs_in_json = JSON.parse(JSON.stringify(data))
                    const result = converter.json2csv(docs_in_json)
                    fs.writeFileSync(filePath, result)
                    return res.download(filePath);
            }
        }
        return res.status(200).json({ message: "User records retrieved successfully", data })
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server error, try again later" })
    }
}

exports.getUser = async (req, res) => {
    try {
        const data = await User.findById(req.params.userId).select("-password")
        if (!data) {
            return res.status(404).json({ message: "User record not found" })
        }
        return res.status(200).json({ message: "User record retrieved successfully", data })
    }
    catch (err) {
        return res.status(500).json({ message: "Server error, try again later" })
    }
}
const Resume = require("../../models/resume.model")
const fs = require("fs");
const converter = require('json-2-csv')
const { createJSONFile, createCSVFile } = require("../../helpers/fileCreator");

exports.getResumes = async (req, res) => {
    try {
        const { file_type, ...filters } = req.query;
        const data = await Resume.find(req.params.resumeId)
        if (file_type) {
            switch (file_type) {
                case "json": {
                    let filePath = createJSONFile("konectin.resumes", data)
                    return res.download(filePath);
                }
                default:
                    // return csv file to be downloaded
                    let filePath = createCSVFile("konectin.resumes", data)
                    return res.download(filePath);
            }
        }
        return res.status(200).json({ message: "Resume records retrieved successfully", data })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server error, try again later" })
    }
}

exports.getResume = async (req, res) => {
    try {
        const data = await Resume.findById(req.params.resumeId)
        if (!data) {
            return res.status(404).json({ message: "Resume record not found" })
        }
        return res.status(200).json({ message: "Resume record retrieved successfully", data })
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: "Server error, try again later" })
    }
}
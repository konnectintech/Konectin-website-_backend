const InternSubscription = require("../../models/internSubscription.model");
const { createTempFile } = require("../../utils/functions");
const converter = require("json-2-csv");
const fs = require("fs");

exports.getInterns = async (req, res) => {
  try {
    const data = await InternSubscription.find().sort({ createdAt: -1 });
    const file_type = req.query.file_type;
    if (file_type) {
      switch (file_type) {
        case "json": {
          // return json file to be downloaded
          let filePath = createTempFile("/konectin.interns.json");
          // return json file to be downloaded
          fs.writeFileSync(filePath, JSON.stringify(data));
          return res.download(filePath);
        }

        default:
          // return csv file to be downloaded
          let filePath = createTempFile("/konectin.interns.csv");
          const docs_in_json = JSON.parse(JSON.stringify(data));
          const result = converter.json2csv(docs_in_json);
          fs.writeFileSync(filePath, result);
          return res.download(filePath);
      }
    }
    return res
      .status(200)
      .json({ message: "Intern records retrieved successfully", data });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error, try again later" });
  }
};

exports.getIntern = async (req, res) => {
  try {
    const data = await InternSubscription.findById(req.params.internId);
    if (!data) {
      return res.status(404).json({ message: "Intern record not found" });
    }
    return res
      .status(200)
      .json({ message: "Intern record retrieved successfully", data });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error, try again later" });
  }
};

const converter = require('json-2-csv')
const fs = require("fs");
const { createTempFile } = require("../utils/functions")

const createJSONFile = (file_name, data) => {
    let filePath = createTempFile(`/${file_name}.json`);
    // return json file to be downloaded
    fs.writeFileSync(filePath, JSON.stringify(data))
    return filePath;
}

const createCSVFile = (file_name, data) => {
    let filePath = createTempFile(`/${file_name}.csv`);
    const docs_in_json = JSON.parse(JSON.stringify(data))
    const result = converter.json2csv(docs_in_json)
    fs.writeFileSync(filePath, result)
    return filePath;
}

module.exports = {
    createJSONFile,
    createCSVFile
}
function formatCoverLetter(content) {
    console.log("inside the format cover letter function")
    let result = content.replaceAll("<p>", "")
    result = content.replaceAll("</p>", "")
    result = content.replaceAll("<br>", "\n")
    return result
}

module.exports = formatCoverLetter
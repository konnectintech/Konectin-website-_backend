function formatCoverLetter(content) {

    content = content.replaceAll("<p>", "")
    content = content.replaceAll("</p>", "")
    content = content.replaceAll("<br>", "\n")
    return content
}

module.exports = formatCoverLetter
const puppeteer = require("puppeteer");

exports.createPdf = async (url, outputPath, html = undefined) => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Navigate to the specified URL
    url
        ? await page.goto(url, { waitUntil: "domcontentloaded" })
        : await page.setContent(html, {
              waitUntil: "domcontentloaded",
          });

    // Generate a PDF from the page content
    await page.pdf({
        path: outputPath,
        margin: { top: "50px", right: "50px", bottom: "50px", left: "50px" },
        format: "A4",
    });

    await browser.close();
};

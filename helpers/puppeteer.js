const puppeteer = require("puppeteer");

exports.createPdf = async (url, outputPath) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the specified URL
  await page.goto(url, { waitUntil: "domcontentloaded" });

  // Generate a PDF from the page content
  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();

  return pdfBuffer;
};

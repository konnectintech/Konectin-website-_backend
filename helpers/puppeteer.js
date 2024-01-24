const puppeteer = require("puppeteer");

exports.createPdf = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the specified URL
  await page.goto(process.env.GET_CV_BY_ID_FRONT_END_URL, {
    //GET_CV_BY_ID_FRONT_END_URL should equal to the endpoint to display the resume by id
    waitUntil: "domcontentloaded",
  });

  // Generate a PDF from the page content
  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();

  return pdfBuffer;
};

const puppeteer = require("puppeteer");

// exports.convertResumeIntoPdf = async (resumeHtml) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const browser = await puppeteer.launch({ headless: true });
//       const page = await browser.newPage();

//       await page.setContent(resumeHtml, {
//         waitUntil: "domcontentloaded",
//       });

//       // Generate a PDF from the page content
//       const pdfBuffer = await page.pdf({ format: "A4" });

//       await browser.close();

//       resolve(pdfBuffer);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

exports.convertResumeIntoPdf = async (resumeHtml) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.setContent(resumeHtml, {
      waitUntil: "domcontentloaded",
    });

    // Generate a PDF from the page content
    const pdfBuffer = await page.pdf({ margin: 0, format: "letter", printBackground: true, preferCSSPageSize: true });

    await browser.close();

    return pdfBuffer;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const puppeteer = require("puppeteer");


exports.createPdf = async (html = undefined) => {
    //create browser instance
    const browser = await puppeteer.launch({ headless: "new" });

    // create new page
    const page = await browser.newPage();

    // set page content
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    await page.emulateMediaType('screen');

    const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        // margin: {
        //     top: '100px',
        //     right: '50px',
        //     bottom: '100px',
        //     left: '50px'
        // },
    })
    browser.close();
    return pdf;

}
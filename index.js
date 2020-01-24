const puppeteer = require('puppeteer')
const dotenv = require('dotenv');
dotenv.config();

async function pickClass() {
    const browser = await puppeteer.launch({
		headless: false
    })

    const page = await browser.newPage();
    await page.goto('https://integra.its.ac.id/', {
        waitUntil: 'networkidle2'
    });

    //username
    await page.click('#userid')
    await page.type('#userid', process.env.NRP)

    //password
    await page.keyboard.down("Tab")
    await page.keyboard.type(process.env.PASSWORD)

    await page.screenshot({ path: './log/01-form-filled.png' })

    await page.click('#login_form > div:nth-child(3) > button')
    await page.waitForNavigation({waitUntil: 'domcontentloaded'})
    await page.screenshot({ path: './log/02-after-login.png'})

    //Go to FRS
    await page.click('body > div.container-fluid > div > div:nth-child(1) > div')
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    await page.goto('https://akademik.its.ac.id/list_frs.php', {waitUntil: "networkidle2"})

    //Remove annoying modal (only for 2019/2020 Genap case)
    await page.click('body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-dialog-buttons > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button > span')
    await page.screenshot({ path: './log/03-frs.png'})

    //await browser.close();
}

pickClass()
const puppeteer = require('puppeteer')
const dotenv = require('dotenv');
dotenv.config();

const mk = {
  pcd : "KM4723|_|2018|12100|0|1|",
  dataMining : "KM4725|_|2018|12100|0|1|",
  ai : "KM4724|_|2018|12100|0|1|",
  sbd: "KM4722|_|2018|12100|0|1|"
}

const listToPick = [mk.dataMining, mk.pcd, mk.ai]

let count = 0

const delayDuration = 2000

async function pickClass() {
  try {

    const browser = await puppeteer.launch({
    headless: false
    })
  
    const page = await browser.newPage();
    await page.goto('https://integra.its.ac.id/', {
        waitUntil: 'networkidle2'
    });
    await page.setDefaultTimeout(10000)

    //username
    await page.click('#userid')
    await page.type('#userid', process.env.NRP)
  
    //password
    await page.keyboard.down("Tab")
    await page.keyboard.type(process.env.PASSWORD)
  
    //await page.screenshot({ path: './log/01-form-filled.png' })
  
    await page.click('#login_form > div:nth-child(3) > button')
    await page.waitForNavigation({waitUntil: 'domcontentloaded'})
    //await page.screenshot({ path: './log/02-after-login.png'})
  
    //Go to FRS
    await page.click('body > div.container-fluid > div > div:nth-child(1) > div')
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    await page.goto('https://akademik.its.ac.id/list_frs.php', {waitUntil: "networkidle2"})
    
    //Remove annoying modal (only for 2019/2020 Genap case)
    // await page.click('body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-dialog-buttons > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button > span')
    // await page.screenshot({ path: './log/03-frs.png'})
    while(true){
      count = count + 1
      console.log(`Iteration #${count}`)
      await page.select("select#kelasjur", mk.pcd)
      await page.click('select#kelasjur + input:first-of-type')
      await page.waitForSelector("select#kelasjur")
      await page.waitFor(delayDuration)
      await page.select("select#kelasjur", mk.dataMining)
      await page.click('select#kelasjur + input:first-of-type')
      await page.waitForSelector("select#kelasjur")
      await page.waitFor(delayDuration)
      await page.select("select#kelasjur", mk.ai)
      await page.click('select#kelasjur + input:first-of-type')
      await page.waitForSelector("select#kelasjur")
      await page.waitFor(delayDuration)

      //TESTING 
      // await page.select("select#kelasjur", "KM4701|A|2018|12100|0|1|")
      // await page.click('select#kelasjur + input:first-of-type')
      // await page.waitForSelector("select#kelasjur")
      // await page.waitFor(delayDuration)

      //GOT IT BOYS
      // await page.select("select#kelasjur", mk.sbd)
      // await page.click('select#kelasjur + input:first-of-type')
      // await page.waitForSelector("select#kelasjur")
      // await page.waitFor(delayDuration)
    }
  }
  catch(err){
    console.log(err);
    await browser.close();
  }
}

pickClass().catch((err) => {
  console.log(err)
  process.exit(1);
})
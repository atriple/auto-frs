const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();

/////////////////////////////////////////
/*
You can change this value
*/

// Use map to symbolize the code values
// You can find the value of course that you like in <option value=... />
const mk = {
  pcd: "KM4723|_|2018|12100|0|1|",
  dataMining: "KM4725|_|2018|12100|0|1|",
  ai: "KM4724|_|2018|12100|0|1|",
  sbd: "KM4722|_|2018|12100|0|1|",
};

const COURSE_LIST = [mk.ai];
const DELAY_DURATION = 2000;

/////////////////////////////////////////

let count = 0;

async function pickClass() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();
    await page.goto("https://integra.its.ac.id/", {
      waitUntil: "networkidle2",
    });
    await page.setDefaultTimeout(10000);

    //username
    await page.click("#userid");
    await page.type("#userid", process.env.NRP);

    //password
    await page.keyboard.down("Tab");
    await page.keyboard.type(process.env.PASSWORD);

    await page.click("#login_form > div:nth-child(3) > button");
    await page.waitForNavigation({ waitUntil: "domcontentloaded" });

    //Log cookies
    const cookies = await page.cookies();
    console.log(cookies);

    //Go to FRS
    await page.click(
      "body > div.container-fluid > div > div:nth-child(1) > div"
    );
    await page.waitForNavigation({ waitUntil: "domcontentloaded" });
    await page.goto("https://akademik.its.ac.id/list_frs.php", {
      waitUntil: "networkidle2",
    });

    //Remove annoying modal (happens at 2019/2020 Genap case)
    // await page.click('body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-front.ui-dialog-buttons > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button > span')

    while (true) {
      for (const courses of COURSE_LIST) {
        count = count + 1;
        console.log(`Iteration #${count}`);

        await page.waitFor(DELAY_DURATION);
        await page.select("select#kelasjur", courses);
        await page.click("select#kelasjur + input:first-of-type");

        //await page.reload({ waitUntil: "networkidle2" });
        await page.waitForSelector("select#kelasjur");
      }
    }
  } catch (err) {
    console.log(err);
    await browser.close();
  }
}

pickClass().catch((err) => {
  console.log(err);
  process.exit(1);
});

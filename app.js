const puppeteer = require("puppeteer")
const cheerio = require('cheerio')

const targets = [
  {
      name: 'PChome 購物中心 熱門關鍵字',
      url: 'https://mall.pchome.com.tw/',
      query: '#site_nav1 .body ul li a'
  },
  {
      name: 'Yahoo 購物中心 熱門關鍵字',
      url: 'https://tw.buy.yahoo.com/generic/ajax/adModule?moduleId=d_hotsearch',
      query: '.hotSearch a'
  }
]

const runBrowser = async ({url, query}) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  page.on('load', async () => {

    const aHandle = await page.evaluateHandle(() => document.body);
    const resultHandle = await page.evaluateHandle(body => body.innerHTML, aHandle);
    console.log(await resultHandle.jsonValue());
    await resultHandle.dispose()

    // await browser.close()
  })
  await page.goto(url)
}

runBrowser(targets[0])
// runBrowser(targets[1])

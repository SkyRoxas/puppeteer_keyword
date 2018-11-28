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
      url: 'https://tw.buy.yahoo.com',
      query: '.hotSearch a'
  }
]

const runBrowser = async ({url, query, name}) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36');
  await page.setExtraHTTPHeaders({
    'accept-language': 'en-US,en;q=0.8'
  })
  await page.goto(url) 
  await page.waitForSelector(query)
  const result = await page.evaluate((q) => {
    return document.querySelectorAll(q).length
  }, query)
  await browser.close()
  console.log('result :', result, name);
}

runBrowser(targets[0])
runBrowser(targets[1])

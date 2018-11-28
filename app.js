const puppeteer = require("puppeteer")

const targets = [
  {
      name: 'PChome 購物中心',
      url: 'https://mall.pchome.com.tw/',
      query: '#site_nav1 .body ul li a'
  },
  {
      name: 'Yahoo 購物中心',
      url: 'https://tw.buy.yahoo.com',
      query: '.hotSearch a'
  },
  {
    name: 'MOMO 百貨',
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

  const result = await page.evaluate((q, n) => {
    return Object.values(document.querySelectorAll(q)).map((el, index) => ({index, name:n, value: el.innerText}))
  }, query, name)

  await browser.close()
  return result
}

const getCrawlerGetData = () => {
  const allTargetPromises = targets.map(el => runBrowser(el))
  return Promise.all(allTargetPromises)
}

getCrawlerGetData().then(res => {
  const data = res.length ? res.reduce((acc,cur) => [...acc, ...cur], []) : []
  console.log('data :', data)
})
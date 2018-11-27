const HCCrawler = require('headless-chrome-crawler')

const targets = [
    {
        name: 'PChome 購物中心 熱門關鍵字',
        url: 'https://mall.pchome.com.tw/',
        query: '#site_nav1 .body ul li a'
    },
    {
        name: 'Yahoo 購物中心 熱門關鍵字',
        url: 'https://tw.buy.yahoo.com/',
        query: '.hotSearch a'
    }
]

const getKeyWordA = async ({url, query}) => {
    const crawler = await HCCrawler.launch({
        evaluatePage: () => Object.values($('.hotSearch a')).map((el, idx) => $('.hotSearch a').eq(idx).text()),
        onSuccess: result => {  
            console.log('result :', result.result);
        },
    });
    // Queue a request
    await crawler.queue(url)
    await crawler.onIdle()
    await crawler.close()
}

getKeyWordA(targets[1])
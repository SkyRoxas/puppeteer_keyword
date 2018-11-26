const cheerio = require('cheerio')
const requestPromise = require('request-promise-any')


const targets = [
    {
        name: 'PChome 購物中心 熱門關鍵字',
        url: 'https://mall.pchome.com.tw/',
        query: '#site_nav1 .body ul li'
    },
    {
        name: 'Yahoo 購物中心 熱門關鍵字',
        url: 'https://tw.buy.yahoo.com/generic/ajax/adModule?moduleId=d_hotsearch',
        query: ''
    }
]

const getKeyWordArr = ({url, query}) => {
    return requestPromise(url).then(body => {
        if(!body) throw new Error(`can not find ${name} data`)
        const $ = cheerio.load(body)
        const keyWordListQuery = $(query)
        const result = Object.values(keyWordListQuery)
                            .map((el, idx) => keyWordListQuery.eq(idx).find('a')
                                ? keyWordListQuery.eq(idx).find('a').text() 
                                : keyWordListQuery.eq(idx).text())
                            .filter(el => el)
        return result
    })
}

Promise.all([getKeyWordArr(targets[1])]).then(res => {
    console.log('res :', res);
})

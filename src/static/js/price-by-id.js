;(async () => {
  coinGecko()
  coinMarketCap()
})()

async function coinGecko() {
  const preId = 'price-of-'
  const matched = document.querySelectorAll(`[id^='${preId}']`)
  let requestStr =
    'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=' +
    Array.from(matched)
      .map(ele => ele.id.substr(preId.length))
      .join('%2C')

  let res = await (await fetch(requestStr)).json()
  matched.forEach(ele => {
    const price = res[ele.id.substr(preId.length)]?.usd
    ele.innerHTML = (price ? '$ ' + price : '~').padEnd(20, ' ')
  })
}

async function coinMarketCap() {
  const preId = 'cmc-price-of-'
  const matched = document.querySelectorAll(`[id^='${preId}']`)
  if (matched.length) {
    let requestStr =
      'http://staging.creditvine.com/api/proxy?url=' +
      encodeURI('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest') +
      '&slug=' +
      Array.from(matched)
        .map(ele => ele.id.substr(preId.length))
        .join('%2C')

    let res = await (
      await fetch(requestStr, {
        headers: {
          'X-CMC-PRO-API-KEY': '747e0b77-137f-4dc3-b896-f57338e97a31',
        },
      })
    ).json()

    const objBySlug = {}
    Object.keys(res.data).forEach(key => {
      objBySlug[res.data[key].slug] = res.data[key]
    })

    matched.forEach(ele => {
      const price = objBySlug[ele.id.substr(preId.length)]?.quote.USD.price
      ele.innerHTML = (price ? '$ ' + price : '~').padEnd(20, ' ')
    })
  }
}

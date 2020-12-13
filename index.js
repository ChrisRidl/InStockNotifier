const { firefox } = require('playwright');
const bestBuy = require('./stores/bestbuy.js');

(async () => {
    const browser = await firefox.launch({ headless: true });
    await bestBuy.searchBestBuyForPS5(browser, 'https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p?skuId=6426149');
    await process.exit();
})();


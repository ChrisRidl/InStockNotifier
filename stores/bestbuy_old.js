const {sleep} = require('../utils');

// search whether PS5 is in stock at Best Buy
exports.searchBestBuyForPS5 = async (browser) => {
    // try {
        // go to Best Buy's site
        const context = await browser.newContext();
        context.grantPermissions(['geolocation'], { orgin: `https://bestbuy.com`});
        const page = await context.newPage();
        await page.goto('https://www.bestbuy.com', { waitUntil: 'load'});
        
        try {
            // close stupid banner popup
            await page.click('button.c-close-icon.c-modal-close-icon');
        }catch {}
        
        // enter search term "playstation 5 console"
        await sleep(2000);
        await page.type('#gh-search-input', 'playstation 5 console', {delay: 50});
        await sleep(1500);
        await page.press('.header-search-button', 'Enter');
        await sleep(1000);
    
        // // wait for result products to render and put them in a results array
        await page.waitForSelector('li.sku-item', {timeout: 30000, state: 'visible'});
        const results = await page.$$('li.sku-item');
    
        // iterate through results array
        for (let i = 0; i < results.length; i++) {
        // get product's name
        await page.waitForSelector('h4.sku-header', {timeout: 30000, state: 'visible'});
        const skuHeader = await results[i].$('h4.sku-header');
        const html = await skuHeader.innerHTML();
    
        // check whether product's name contains "playstation 5" and "console"
        if (html.toLowerCase().includes('playstation 5') && html.toLowerCase().includes('console')) {
            // get Sold Out/Add to Cart button
            await page.waitForSelector('button.add-to-cart-button', {timeout: 30000, state: 'visible'});
            const button = await results[i].$('button.add-to-cart-button');
            const buttonText = await button.innerHTML();
    
            // if the product is not sold out, alert the user
            if (!buttonText.includes("Sold Out")) {
            console.log("Found PS5 and it's Available!");
            // alert the user!!!
            } else {
                console.log('Found PS5 and it is Sold out :(');
            }
        }
        }
        await page.close();
    // }catch {
    //     console.log('Exception was thrown trying to search BestBuy');
    // }
  };
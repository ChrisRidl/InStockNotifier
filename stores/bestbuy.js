// search whether PS5 is in stock at Best Buy
exports.searchBestBuyForPS5 = async (browser, itemUrl) => {
    // try {
    // go to Best Buy's site
    const context = await browser.newContext();
    context.grantPermissions(['geolocation'], { orgin: `https://bestbuy.com` });
    const page = await context.newPage();
    console.log(`Loading page: ${itemUrl}`);
    await page.goto(itemUrl);

    // get Sold Out/Add to Cart button
    console.log('Checking for PS5...');
    await page.waitForSelector('button.add-to-cart-button', { timeout: 30000, state: 'visible' });
    const button = await page.$('button.add-to-cart-button');
    const buttonText = await button.innerHTML();

    // if the product is not sold out, alert the user
    if (!buttonText.includes("Sold Out")) {
        console.log("Found PS5 and it's Available!");
        // alert the user!!!
    } else {
        console.log('Found PS5 and it is Sold out :(');
    }
};
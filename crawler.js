const fetch = require('node-fetch');
const cheerio = require('cheerio');

const parseItem = async (url, isNewItem = false) => {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    const createdAt = new Date();

    let item = {
        name: $('.page-title').text(),
        imgUrl: 'https:' + $('.sku-image').attr('href'),
        ratingStars: parseFloat($('a.rating.big_stars').first().attr('title').split()[0].replace(',', '.')),
        usersRated: parseInt($('div.reviews-count').first().children('a').text()),
        price: parseFloat($('strong.dominant-price').first().text().split()[0].replace(',', '.')),
        shopUrl: 'https://www.skroutz.gr' + $('a.js-product-link').first().attr('href'),
        url: url,
        updatedAt: createdAt,
    }
    if (isNewItem === true) item.createdAt = createdAt;
    return item;
}

module.exports = {
    parseItem: parseItem
}
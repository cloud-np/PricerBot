const fetch = require('node-fetch');
const cheerio = require('cheerio');

const parseItem = async (url) => {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);
    const createdAt = new Date();

    return {
        name: $('.page-title').text(),
        imgUrl: 'https:' + $('.sku-image').attr('href'),
        ratingStars: parseFloat($('div.rating-average.cf').children('b').text().replace(',', '.')),
        usersRated: $('div.reviews-count').first().children('a').text(),
        price: parseFloat($('strong.dominant-price').first().text().split()[0].replace(',', '.')),
        shopUrl: 'https://www.skroutz.gr' + $('a.js-product-link').first().attr('href'),
        startedTrackingAt: createdAt,
        updatedAt: createdAt,
    }
}

module.exports = {
    parseItem: parseItem
}
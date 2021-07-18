class Item {
    constructor(id, imgUrl, name, price, productID, ratingStars, startedTrackingAt, url, usersRated) {
        this.id = id;
        this.imgUrl = imgUrl;
        this.name = name;
        this.price = price;
        this.productID = productID;
        this.ratingStars = ratingStars;
        this.startedTrackingAt = startedTrackingAt
        this.url = url
        this.usersRated = usersRated
    }
}

module.exports = Item;
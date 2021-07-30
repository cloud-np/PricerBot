class User {
    constructor(id, discordID, descriminator, itemRef, username) {
        this.id = id;
        this.discordID = discordID;
        this.descriminator = descriminator;
        this.itemRef = itemRef;
        this.username = username;
    }
}

module.exports = User;
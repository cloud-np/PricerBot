const Discord = require('discord.js');

const sendAddingItemErrorEm = (message) => {
    const em = new Discord.MessageEmbed()
        .setColor('#ed3434')
        .setAuthor('❌ Something went wrong!')
        .addFields(
            { name: 'While adding your item to the database.', value: '.' },
            { name: 'Please contact Cloud#2687', value: '.' },
        )
        .setTimestamp();
    message.channel.send(em);
}

const sendTrackCmdErrorEm = (message) => {
    const em = new Discord.MessageEmbed()
        .setColor('#ed3434')
        .setAuthor('❌ Wrong use of \\track command!')
        // .setTitle('Tried to use \\track command.')
        // .setURL('https://discord.js.org/')
        // .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
        // .setDescription('Please use the \\track command correctly!')
        // .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        .addFields(
            { name: 'Links ONLY from skroutz.gr', value: 'We only accept links from skroutz.gr at the momment!' },
            { name: 'Example of a working command', value: '\\track https://www.skroutz.gr/s/17718106/AOC-CQ32G1-Curved-Gaming-Monitor-31-5-QHD-144Hz.html' },
        )
        // .setImage('https://i.imgur.com/wSTFkRM.png')
        .setTimestamp()
        // .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
    message.channel.send(em);
}

const sendAddingItemSucsEm = (message) => {
    const em = new Discord.MessageEmbed()
        .setColor('#00d31c')
        .setAuthor('👌 Your item was added!')
        .addFields(
            { name: 'Your item is now being tracked!', value: 'Once a day we gonna keep checking the prices and notify you for any great deals.' },
            { name: 'Feel free to check the price yourself.', value: 'With **\\check [url]** command you can check and also update the price yourself.' },
        )
        .setTimestamp();
    message.channel.send(em);
}

const sendBetterItemPriceEm = (message, item, { newPrice, diffPerc, rawDiff }) => {
    const em = new Discord.MessageEmbed()
        .setColor('#00d31c')
        .setAuthor('<a:partyblob:866343043442671647> There is a new lower price!')
        .setURL(item.url)
        .setImage(item.imgUrl)
        .addFields(
            { name: 'Your tracked item: ' + item.name + ' has dropped in price today!', value: '.' },
            // { name: 'Feel free to check the price yourself.', value: 'With **\\check [url]** command you can check and also update the price yourself.' },
        )
        .setTimestamp();
    message.channel.send(em);
}

module.exports = {
    sendTrackCmdErrorEm: sendTrackCmdErrorEm,
    sendAddingItemErrorEm: sendAddingItemErrorEm,
    sendAddingItemSucsEm: sendAddingItemSucsEm,
    // sendBetterItemPriceEm: 
}
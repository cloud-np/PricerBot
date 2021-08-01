const Discord = require('discord.js');
const config = require('../config');
const { roundTo } = require('../helpers/calc');

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
        .setAuthor('❌ Wrong use of ' + config.prefix + 'track command!')
        // .setTitle('Tried to use \\track command.')
        // .setURL('https://discord.js.org/')
        // .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
        // .setDescription('Please use the \\track command correctly!')
        // .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        .addFields(
            { name: 'Links ONLY from skroutz.gr', value: 'We only accept links from skroutz.gr at the momment!' },
            { name: 'Example of a working command', value: config.prefix + 'track https://www.skroutz.gr/s/17718106/AOC-CQ32G1-Curved-Gaming-Monitor-31-5-QHD-144Hz.html' },
        )
        // .setImage('https://i.imgur.com/wSTFkRM.png')
        .setTimestamp()
        // .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
    message.channel.send(em);
}

const sendHelpEm = (message) => {
    const em = new Discord.MessageEmbed()
        .setColor('#00d31c')
        .setAuthor('❔ Bot usage.')
        .addFields(
            { name: config.prefix + ' track [url]', value: 'This command will try adding to a database the item you specified and keep checking its price reguraly.' },
            // { name: 'Feel free to check the price yourself.', value: 'With **\\check [url]** command you can check and also update the price yourself.' },
        )
        .setTimestamp();
    message.channel.send(em);
}

const sendItemExistAlreadyEm = (message) => {
    const em = new Discord.MessageEmbed()
        .setColor('#00d31c')
        .setAuthor('✨ You already are tracking this item!')
        .addFields(
            { name: 'Item is already being tracked by you!', value: 'The item you try to add has already been added in the database.' },
            // { name: 'Feel free to check the price yourself.', value: 'With **\\check [url]** command you can check and also update the price yourself.' },
        )
        .setTimestamp();
    message.channel.send(em);
}

const sendAddedItemSucsEm = (message) => {
    const em = new Discord.MessageEmbed()
        .setColor('#00d31c')
        .setAuthor('👌 Item was added to your list!')
        .addFields(
            { name: 'The item is now being tracked for you!', value: 'Once a day we gonna keep checking the prices and notify you for any great deals.' },
            // { name: 'Feel free to check the price yourself.', value: 'With **'+ config.prefix +'check [url]** command you can check and also update the price yourself.' },
        )
        .setTimestamp();
    message.channel.send(em);
}

const test = (message) => {
    const partyblob = '<a:partyblob:866343043442671647>'
    const em = new Discord.MessageEmbed()
        .setColor('#00d31c')
        .setAuthor(' Test!')
        .addFields(
            { name: partyblob, value: ''},
        )
        .setTimestamp();
    message.channel.send(em);
}

const sendBetterItemPriceEm = (channel, item, { newPrice, diffPerc, rawDiff }) => {
    // const partyblob = '<a:partyblob:866343043442671647>'
    const em = new Discord.MessageEmbed()
        .setColor('#2dfcf2')
        .setAuthor('🎉 There is a new lower price!')
        .setURL(item.url)
        .setTitle(item.name)
        .setImage(item.imgUrl)
        .addFields(
            { name: 'Dropped in price', value: 'This item has dropped in price today from **'+ item.price +'** to **'+ newPrice +'**' },
            { name: 'Raw Price Differecne', value: roundTo(rawDiff, 2) , inline: true },
            { name: 'Percentage Difference', value: roundTo(diffPerc, 1) + '%' , inline: true },
        )
        .setTimestamp();
    channel.send(em);
}

module.exports = {
    sendTrackCmdErrorEm,
    sendAddingItemErrorEm,
    sendAddedItemSucsEm,
    sendItemExistAlreadyEm,
    sendBetterItemPriceEm,
    sendHelpEm,
    test
}
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

const sendItemExistAlreadyEm = (message) => {
    const em = new Discord.MessageEmbed()
        .setColor('#00d31c')
        .setAuthor('✨ Item exists already!')
        .addFields(
            { name: 'Item is already being tracked!', value: 'The item you try to add has already been added in the database.' },
            // { name: 'Feel free to check the price yourself.', value: 'With **\\check [url]** command you can check and also update the price yourself.' },
        )
        .setTimestamp();
    message.channel.send(em);
}

const sendAddedItemSucsEm = (message) => {
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

const test = (message) => {
    const partyblob = '<a:partyblob:866343043442671647>'
    const em = new Discord.MessageEmbed()
        .setColor('#00d31c')
        .setAuthor(partyblob + ' There is a new lower price!')
        .addFields(
            { name: partyblob, value: partyblob},
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
        .setImage(item.imgUrl)
        .addFields(
            { name: item.name, value: 'Has dropped in price today from **'+ item.price +'** to **'+ newPrice +'**' },
            { name: 'Raw Price Differecne', value: rawDiff , inline: true },
            { name: 'Percentage Difference', value: diffPerc + '%' , inline: true },
        )
        .setTimestamp();
    channel.send(em);
}

module.exports = {
    sendTrackCmdErrorEm: sendTrackCmdErrorEm,
    sendAddingItemErrorEm: sendAddingItemErrorEm,
    sendAddedItemSucsEm: sendAddedItemSucsEm,
    sendItemExistAlreadyEm: sendItemExistAlreadyEm,
    sendBetterItemPriceEm: sendBetterItemPriceEm,
    test: test
}
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('../config');

const command = require('./commands');
const itemController = require('../controllers/itemController');
const embeds = require('./embeds');
const helpers = require('../helpers/calc');
const schedule = require('node-schedule');
const firebase = require('../db');
const firestore = firebase.firestore();
const crawler = require('../crawler');
const userController = require('../controllers/userController');

const getDefaultChannel = (guild) => {
    // get "original" default channel
    if(guild.channels.cache.has(guild.id))
      return guild.channels.cache.get(guild.id)
  
    // Check for a "general" channel, which is often default chat
    const generalChannel = guild.channels.cache.find(channel => channel.name === "general");
    if (generalChannel)
      return generalChannel;
    // Now we get into the heavy stuff: first channel in order where the bot can speak
    // hold on to your hats!
    return guild.channels.cache
     .filter(c => c.type === "text" &&
       c.permissionsFor(guild.client.user).has("SEND_MESSAGES"))
     .sort((a, b) => a.position - b.position ||
       Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber())
     .first();
}
  
client.on('ready', () => {
    console.log('The client is ready!');

    command(client, 'ping', message => {
        message.channel.send("Pong!");
    });

    command(client, 'help', message => {
        embeds.sendHelp(message);
    });

    command(client, 'show-tracked', message => {

    });

    const job = schedule.scheduleJob('0 0 * * *', async function(){
        console.log('Updating items...');
        const items = await firestore.collection('items').get();

        if (items.empty)
            return;

        const guild_id = config.testServerID;
        const guild = client.guilds.cache.find(guild => guild.id === guild_id);
        let channel;
        if(guild)
            channel = getDefaultChannel(guild);

        items.forEach(async doc => {
            const itemData = doc.data();
            const updatedItem = await crawler.parseItem(itemData.url);
            const oldPrice = itemData.price;
            if (oldPrice > updatedItem.price){
                const prices = helpers.calcPercDiff(oldPrice, updatedItem.price);
                // Update every subscribed user.
                const users = await firestore.collection('items').doc(doc.id).collection('users').get();
                users.forEach(async doc => {
                    const channel = client.users.cache.get(doc.data().discordID);
                    embeds.sendBetterItemPrice(channel, itemData, prices);
                });
            }
            await doc.ref.update(updatedItem);
        });
        console.log('Updated all successfully items!!');
    });

    command(client, 'tt', async message => {
        // console.log('Updating items...');
        // const items = await firestore.collection('items');
        // const itemsData = await items.get();

        // if (itemsData.empty)
        //     return;

        // const guild_id = config.mainServerID;
        // const guild = client.guilds.cache.find(guild => guild.id === guild_id);
        // let channel;
        // if(guild.channels.cache.has(config.mainChannelID))
        //     channel = guild.channels.cache.get(config.mainChannelID)

        // itemsData.forEach(async doc => {
        //     const itemData = doc.data();
        //     const updatedItem = await crawler.parseItem(itemData.url);
        //     const oldPrice = itemData.price;
        //     if (oldPrice === updatedItem.price){
        //         const prices = helpers.calcPercDiff(oldPrice, updatedItem.price);
        //         embeds.sendBetterItemPrice(channel, itemData, prices);
        //     }
            
        //     await doc.ref.update(updatedItem);
        // });
        // console.log('Updated all successfully items!!');
    })

    // THIS IS WORKING  
    command(client, 'test-job', async message => {
        // console.log('Updating items...');
        // const items = await firestore.collection('items').get();

        // if (items.empty)
        //     return;

        // const guild_id = config.testServerID;
        // const guild = client.guilds.cache.find(guild => guild.id === guild_id);
        // let channel;
        // if(guild)
        //     channel = getDefaultChannel(guild);

        // items.forEach(async doc => {
        //     const itemData = doc.data();
        //     const updatedItem = await crawler.parseItem(itemData.url);
        //     const oldPrice = itemData.price;
        //     if (oldPrice === updatedItem.price){
        //         const prices = helpers.calcPercDiff(oldPrice, updatedItem.price);
        //         // Update every subscribed user.
        //         const users = await firestore.collection('items').doc(doc.id).collection('users').get();
        //         users.forEach(async doc => {
        //             // console.log(doc.data());
        //             const channel = client.users.cache.get(doc.data().discordID);
        //             embeds.sendBetterItemPrice(channel, itemData, prices);
        //         });
        //     }
            
        //     await doc.ref.update(updatedItem);
        // });
        // console.log('Updated all successfully items!!');
    })
    
    command(client, 'track', async message => {
        // Remove spaces and keep the message from the user.
        const url = message.content.split(' ').join('').split(config.prefix + 'track')[1];

        if (url.startsWith('https://www.skroutz.gr/')){

            ////////////////////////////////////
            // CHECK ITEM
            // Scrape the item from online.
            const item = await crawler.parseItem(url, true);
            if (item === false){
                embeds.sendParseError(message);
                return ;
            }
            // Check if the item exists on the db.

            const itemAddedInfo = await itemController.tryAddingItem(item);
            ////////////////////////////////////

            ////////////////////////////////////
            // CHECK USER
            // Get user that send the cmd.
            const user = client.users.cache.get(message.author.id);

            // // Check if the item exists on the db.
            const userAdded = await itemController.tryAddingUser(user, itemAddedInfo.item.id);
            ////////////////////////////////////

            if (userAdded.isTracked === false || itemAddedInfo.isTracked === false){
                embeds.sendAddedItemSucs(message);
            }else if (itemAddedInfo.isTracked && userAdded.isTracked){
                embeds.sendItemExistAlready(message);
                return;
            } else embeds.sendAddingItemError(message);

        }else embeds.sendTrackCmdError(message);
    });
})

// Login the Bot
client.login(config.botToken);
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
        const userID = message.author.id;
        const user = client.users.cache.get(userID);
        user.send(userID);
    });

    command(client, 'help', message => {
        embeds.sendHelpEm(message);
    });

    command(client, 'show-tracked', message => {

    });

    const job = schedule.scheduleJob('0 0 * * *', async function(){
        console.log('Updating items...');
        const items = await firestore.collection('items');
        const itemsData = await items.get();

        if (itemsData.empty)
            return;

        const guild_id = config.testServerID;
        const guild = client.guilds.cache.find(guild => guild.id === guild_id);
        let channel;
        if(guild)
            channel = getDefaultChannel(guild);

        itemsData.forEach(async doc => {
            const itemData = doc.data();
            const updatedItem = await crawler.parseItem(itemData.url);
            const oldPrice = itemData.price;
            if (oldPrice > updatedItem.price){
                const prices = helpers.calcPercDiff(oldPrice, updatedItem.price);
                embeds.sendBetterItemPriceEm(channel, itemData, prices);
            }
            
            await doc.ref.update(updatedItem);
        });
        console.log('Updated all successfully items!!');
    });
    
    command(client, 'track', async message => {
        // Remove spaces and keep the message from the user.
        const url = message.content.split(' ').join('').split(config.prefix + 'track')[1];

        if (url.startsWith('https://www.skroutz.gr/')){

            // Scrape the item from online.
            const item = await crawler.parseItem(url, true);

            // Check if the item exists on the db.
            const itemExistAlready = await itemController.doesItemExist(item.name);

            if (itemExistAlready){
                embeds.sendItemExistAlreadyEm(message);
                return;
            }

            // Try adding Item to DB.
            const wasItemAdded = await itemController.addItem(item);

            if(wasItemAdded === true) embeds.sendAddedItemSucsEm(message);
            else embeds.sendAddingItemErrorEm(message);

            // Get user that send the cmd.
            const user = client.users.cache.get(message.author.id);
            const wasUserAdded = await userController.addUser(user);
            // embeds.send


            // Check if the item exists on the db.
            const userExistAlready = await userController.doesUserExist(user.id);

            if (userExistAlready){
                embeds.sendItemExistAlreadyEm(message);
                return;
            }


        }else embeds.sendTrackCmdErrorEm(message);
    });
})

// Login the Bot
client.login(config.botToken);
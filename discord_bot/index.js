const Discord = require('discord.js');
const client = new Discord.Client();

// const config = require('../config');
const botConfig = require('./bot_config.json');

const command = require('./commands');
const db = require('../db');
const itemController = require('../controllers/itemController');
const embeds = require('./embeds');
const crawler = require('../crawler');

client.on('ready', () => {
    console.log('The client is ready!');

    command(client, 'ping', message => {
        message.channel.send("Pong!");
    });
    

    command(client, 'track', async message => {
        // Remove spaces and keep the message from the user.
        const url = message.content.split(' ').join('').split('\\track')[1];

        if (url.startsWith('https://www.skroutz.gr/')){
            // Scrape the item from online.
            const item = await crawler.parseItem(url, true);

            const wasItemAdded = await itemController.addItem(item);
            // Add the item to db.
            if(wasItemAdded === true) embeds.sendTrackCmdErrorEm(message);
            else embeds.sendAddingItemErrorEm(message);

        }else embeds.sendTrackCmdErrorEm(message);
    });
})

// Login the Bot
client.login(botConfig.token);
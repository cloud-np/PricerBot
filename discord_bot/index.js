const Discord = require('discord.js');
const client = new Discord.Client();

// const config = require('../config');
const botConfig = require('./bot_config.json');

const command = require('./commands');
const db = require('../db');
const itemController = require('../controllers/itemController');
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
            const item = await crawler.parseItem(url);
            let em;

            // Add the item to db.
            if(await itemController.addItem(item) === true){
                em = new Discord.MessageEmbed()
                    .setColor('#00d31c')
                    .setAuthor('👌 Your item was added!')
                    .addFields(
                        { name: 'Your item is now being tracked!', value: 'Once a day we gonna keep checking the prices and notify you for any great deal!' },
                    )
                    .setTimestamp()
            }else{
                em = new Discord.MessageEmbed()
                    .setColor('#ed3434')
                    .setAuthor('❌ Something went wrong!')
                    .addFields(
                        { name: 'While adding your item to the database.', value: '.' },
                        { name: 'Please contact Cloud#2687', value: '.' },
                    )
                    .setTimestamp()
            }

            message.channel.send(em);
        }else{
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#ed3434')
                .setAuthor('❌ Wrong use of Command!')
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
            message.channel.send(errorEmbed);
        }
    });
})

// Login the Bot
client.login(botConfig.token);
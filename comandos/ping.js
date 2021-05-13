const Discord = require('discord.js');

module.exports = {
    name: "ping",
    description: "responde com pong",

    async run (client, message, args) {
        message.reply("pong");
    }
}
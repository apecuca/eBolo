const Discord = require('discord.js');
const eco = require("discord-economy");

module.exports = {
    name: "bal",
    description: "mostra a balança",

    async run (client, message, args) {
        let output = await eco.FetchBalance(message.author.id);
        if (output.balance == 0) {
            message.reply("sua carteira est\u00e1 vazia :c");
        } else {
            message.reply("voc\u00ea tem "+output.balance+" bolos! :tada:\nUse '!nu bolo' para ganhar +1 bolim");
        }
    }
}
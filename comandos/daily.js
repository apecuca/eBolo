const Discord = require('discord.js');
const eco = require("discord-economy");

module.exports = {
    name: "daily", //o que será chamado pelo usuario dps do prefix
    description: "Claim daily se o usuário não tiver pego ainda", //descrição do comando

    async run (client, message, args) {
        var output = await eco.Daily(message.author.id)
        //output.updated will tell you if the user already claimed his/her daily yes or no.
        if (output.updated) {
            function dailyBetween(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            }
            let random = dailyBetween(1, 100);
            let target = message.author.id;
            var profile = await eco.AddToBalance(target, random);
            message.reply("voce dropou " + random + " bolos, e agora est\u00e1 com " + profile.newbalance + " na conta. :birthday:");
        } else {
            message.reply("daily pega :( resetar\u00e1 em " + output.timetowait + "!");
        }
    }
}
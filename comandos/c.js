const Discord = require('discord.js');
const eco = require("discord-economy");

module.exports = {
    name: "c",
    description: "come 1 bolo e manda pra bal",

    async run (client, message, args) {
        message.channel.send("Comando desabilitado por enquanto");
        /*
        let outputID = message.author.id;
        let output = await eco.FetchBalance(message.author.id);
        try {
            if (output.balance === 0) {
                eco.AddToBalance(outputID, 1);
                message.reply("comeu seu primeiro bolo :birthday: :tada:");
                console.log(message.author.username + "#" + message.author.discriminator + " comeu um bolo");
            } else {
                eco.AddToBalance(outputID, 1);
                message.reply("comeu um bolo! +1 bolo na balança :birthday:");
                console.log(message.author.username + "#" + message.author.discriminator + " comeu um bolo");
            }
        } catch {
            message.channel.send("ih, deu ruim");
        }
        */
    }
}
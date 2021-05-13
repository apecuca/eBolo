const Discord = require('discord.js');
const settings = require('../config.json');

module.exports = {
    name: "purge", //o que será chamado pelo usuario dps do prefix
    description: "deleta as últimas x mensagens", //descrição do comando

    async run (client, message, args) {
        async function purge() {
            if (message.author.id == settings.devID) {
                try {

                    if (isNaN(args[0])) {
                        message.channel.send('Escolha um número de mensagens');
                        return;
                    }

                    const fetched = await message.channel.messages.fetch({limit: args[0]});
                    console.log(fetched.size + " mensagens achadas, deletando...");

                    message.channel.bulkDelete(fetched)
                        .catch(error => message.channel.send(`Error: ${error}`));

                } catch {
                    console.log("Muitas mensagens selecionadas ://");
                }
            } else {
                message.reply("n\u00e3o \u00e9 o dev >:[");
            }
        
        }

        purge();
        
    }
}
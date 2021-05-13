const Discord = require('discord.js');
const eco = require("discord-economy");
const sqlite3 = require('sqlite3').verbose();
const settings = require('../config.json');

module.exports = {
    name: "resetdaily", //o que será chamado pelo usuario dps do prefix
    description: "reseta as dailys gerais ou de alguém específico se mencionado", //descrição do comando

    async run (client, message, args) {
        if (message.author.id == settings.devID) {
            if(message.mentions.members.first()) {
                try {
                    let user = message.mentions.users.first().id;
                    let username = message.mentions.users.first().username;
                    var output = await eco.ResetDaily(user);
                    message.channel.send("Daily de " + username + "#" + message.author.discriminator + " resetada.");
                    //console.log(user);
                } catch {
                    message.reply("Usuário n\u00e3o foi achado.");
                }
                return
            }
            let filter = m => m.author.id === message.author.id
            message.channel.send("Tem certeza que quer resetar o timer de todas as daily? ( YES / NO )").then(() => {
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 5000,
                    errors: ['time']
                })
                .then(message => {
                    message = message.first()
                    if (message.content.toUpperCase() == "YES" || message.content.toUpperCase() == "Y") {
                        let db = new sqlite3.Database('database.sqlite');
                        db.run("UPDATE Economies SET daily = ? WHERE daily != 0", 0, function(err) {
                        if (err) {
                            return console.error(err.message);
                        }
                        console.log("Row(s) updated: "+ this.changes +"\nDailys resetadas.");
                        });
                        message.channel.send("Daily resetada com sucesso.");
                    } else if (message.content.toUpperCase() == "NO" || message.content.toUpperCase() == "N") {
                        message.channel.send("Operacao cancelada");
                    } else {
                        message.channel.send("Resposta invalida");
                    }
                })
                .catch(collected => {
                    message.channel.send("Timeout");
                });
            });
        } else {
            message.reply("n\u00e3o \u00e9 o dev >:[");
        }
    }
}
const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const settings = require('../config.json');

module.exports = {
    name: "nukebal",
    description: "nuka somente as balanças",

    async run (client, message, args) {
        if (message.author.id == settings.devID) {
            let filter = m => m.author.id === message.author.id
            message.channel.send("Tem certeza que quer zerar todas as balanças? ( YES / NO )").then(() => {
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 5000,
                    errors: ['time']
                })
                .then(message => {
                    message = message.first()
                    if (message.content.toUpperCase() == "YES" || message.content.toUpperCase() == "Y") {
                        let db = new sqlite3.Database('database.sqlite');
                        db.run("UPDATE Economies SET balance = ? WHERE balance != 0", 0, function(err) {
                        if (err) {
                            return console.error(err.message);
                        }
                        });
                        message.channel.send("Deletado com sucesso.");
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
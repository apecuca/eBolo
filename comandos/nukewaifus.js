const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const settings = require('../config.json');

module.exports = {
    name: "nukewaifus",
    description: "nuka somente as Waifus",

    async run (client, message, args) {
        if (message.author.id == settings.devID) {
            let filter = m => m.author.id === message.author.id
            message.channel.send("Tem certeza que quer zerar todas as Waifus? ( YES / NO )").then(() => {
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 5000,
                    errors: ['time']
                })
                .then(message => {
                    message = message.first()
                    if (message.content.toUpperCase() == "YES" || message.content.toUpperCase() == "Y") {
                        let data = [
                            'ninguém',
                            0,
                            null
                        ];
                        let sql = `UPDATE Waifus
                                    SET ownerName = ?,
                                    belongState = ?,
                                    ownerId = ?
                        `;
                        let db = new sqlite3.Database('waifus.sqlite');
                        db.each(sql, data, function(err) {
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
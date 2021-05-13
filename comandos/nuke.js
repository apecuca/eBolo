const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const settings = require('../config.json');

module.exports = {
    name: "nuke",
    description: "nuka tudo menozada",

    async run (client, message, args) {
        if (message.author.id == settings.devID) {
            let filter = m => m.author.id === message.author.id
            message.channel.send("Tem certeza que quer zerar todas as contas? ( YES / NO )").then(() => {
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 5000,
                    errors: ['time']
                })
                .then(message => {
                    message = message.first()
                    if (message.content.toUpperCase() == "YES" || message.content.toUpperCase() == "Y") {
                        let db1 = new sqlite3.Database('database.sqlite');
                        db1.run("UPDATE Economies SET balance = ? WHERE balance != 0", 0, function(err) {
                        if (err) {
                            return console.error(err.message);
                        }
                        });
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
                        let db2 = new sqlite3.Database('waifus.sqlite');
                        db2.each(sql, data, function(err) {
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
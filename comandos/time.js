const Discord = require('discord.js');
const eco = require("discord-economy");
const sqlite3 = require('sqlite3').verbose();

module.exports = {
    name: "time", //o que será chamado pelo usuario dps do prefix
    description: "é de teste", //descrição do comando

    async run (client, message, args) {
        let db = new sqlite3.Database('database.sqlite');
        let dailycooldown = 60000; // 60 segundos
        let autor = message.author;

        db.each("SELECT * FROM Cooldowns WHERE userID = ?", autor.id, function(err, row) {
            if (err) {
                return console.error(err.message);
            }

            let obj = {
                "userID": row.userID,
                "wcd": row.wcd,
                "rollsleft": row.rollsleft
            }
        });  

    }
}
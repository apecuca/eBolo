const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const pagination = require('discord.js-pagination');

module.exports = {
    name: "waifus", //o que será chamado pelo usuario dps do prefix
    description: "mostra todas as waifus", //descrição do comando

    async run (client, message, args) {
        let db = new sqlite3.Database('waifus.sqlite');

        let query = `SELECT name, worth, id, ownerName FROM Waifus ORDER BY worth DESC`;
        
        db.all(query, function (err, rows) {
            if(err){
                console.log(err);
            }
            const arrayzada = [...rows];

            let page0 = new Discord.MessageEmbed()
                .setTitle("Top waifus")
                .setThumbnail(message.author.displayAvatarURL())
                .setColor('0xfcba03')
                .setDescription(`A pedido de ${message.author.username}#${message.author.discriminator}`)
                .setTimestamp()
            let page1 = new Discord.MessageEmbed()
                .setTitle("Top waifus")
                .setThumbnail(message.author.displayAvatarURL())
                .setColor('0xfcba03')
                .setDescription(`A pedido de ${message.author.username}#${message.author.discriminator}`)
                .setTimestamp()
            
            let doninho = '';

            for (i = 0;i < arrayzada.length; i++) {
                if (arrayzada[i].ownerName === 'ninguém') {
                    doninho = '';
                } else {
                    doninho = arrayzada[i].ownerName;
                }

                if(i>=0 && i<10) {
                    page0.addField(`${i+1} - ${arrayzada[i].name} : ${doninho}`, `${arrayzada[i].worth} 🎂`);
                } else {
                if(i>=10 && i<20) {
                    page1.addField(`${i+1} - ${arrayzada[i].name} : ${doninho}`, `${arrayzada[i].worth} 🎂`);
                }
                }
            }

            const pages = [
                page0,
                page1
            ]

            const emoji = ["⏪", "⏩"];

            const timeout = '60000' //Milliseconds, só dividir por 1000 que tá em segundos

            pagination(message, pages, emoji, timeout)

        });
    }
}
const Discord = require('discord.js');
const eco = require("discord-economy");
const sqlite3 = require('sqlite3').verbose();

module.exports = {
    name: "mk", //o que será chamado pelo usuario dps do prefix
    description: "mostra a profile do usuário", //descrição do comando

    async run (client, message, args) {
        
        let db = new sqlite3.Database('waifus.sqlite');
        let username;
        let userAvatar;
        let userId;
        let balanca = 0;
        

        const mmkEmbed = new Discord.MessageEmbed()
            .setColor('0xfcba03')
            .setAuthor(`Cabaré de nhaAAAAA`, 'https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
        
        if (message.mentions.members.first()) {
            const userFull = message.mentions.users.first();
            if(userFull.bot) {
                message.reply("usuário é um bot");
                return;
            }
            username = userFull.username;
            userAvatar = userFull.displayAvatarURL();
            userId = userFull.id;
           
        } else {
            const userFull = message.author;
            username = userFull.username;
            userAvatar = userFull.displayAvatarURL();
            userId = userFull.id;
        }   

        balanca = await eco.FetchBalance(userId);

        let sql = `SELECT 
                    name,
                    worth,
                    imgUrl1
                    FROM Waifus
                    WHERE ownerId = ?
                    ORDER BY worth DESC
        `;
        let data = [userId];
        
        db.all(sql, data, function(err, rows) {
            if(err){
                console.log(err);
            }

            const arrayzada = [...rows];

            let cabareWorth = 0;
            
            for(i=0; i<arrayzada.length; i++) {
                cabareWorth += arrayzada[i].worth;
                mmkEmbed.addFields(
                    { name: `${i+1} - ${arrayzada[i].name}`, value: `${arrayzada[i].worth} 🎂` }
                )
            }

            let thumbfoda = '';
            try {
                if (arrayzada[0].imgUrl1 === null) {
                    thumbfoda = arrayzada[1].imgUrl1;
                } else {
                    thumbfoda = arrayzada[0].imgUrl1;
                }
            } catch {
                thumbfoda = '';
            }

            //mmkEmbed.setThumbnail(userAvatar);
            mmkEmbed.setDescription(`Cabaré worth: ${cabareWorth} 🎂\nBalança de bolos disponível: ${balanca.balance} 🎂`);
            mmkEmbed.setAuthor(`Cabaré de ${username}`, userAvatar);
            mmkEmbed.setThumbnail(thumbfoda);

            message.channel.send(mmkEmbed);
        });

    }
}
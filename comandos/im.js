const Discord = require('discord.js');
const eco = require("discord-economy");
const sqlite3 = require('sqlite3').verbose();

module.exports = {
    name: "im", //o que será chamado pelo usuario dps do prefix
    description: "mostra a waifu", //descrição do comando

    async run (client, message, args) {
        //nesse caso ARGS é o nome da Waifu
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        var nameInput = capitalizeFirstLetter(new String(args));

        let db = new sqlite3.Database('waifus.sqlite');
        let sql = `SELECT * FROM Waifus
                    WHERE name = ?
        `;
        db.each(sql, nameInput, function(err, row) {
            if (err) {
                return console.error(err.message);
            }
            var obj= {
                "id": row.id,
                "name": row.name,
                "ownerName": row.ownerName,
                "belongState": row.belongState,
                "worth": row.worth,
                "ownerId": row.ownerId,
                "description": row.description,
                "imgUrl1": row.imgUrl1
            };
            const embeddedWaifu = new Discord.MessageEmbed()
                .setTitle(obj.name)
                .setColor('0xfcba03')
                .setImage(obj.imgUrl1)
                .setDescription(obj.description)
                .setFooter(`${obj.worth}🎂\nPertence a ${obj.ownerName}\n`)
            message.channel.send(embeddedWaifu);
            //message.channel.send(`Waifu ${obj.name} pertence a ${obj.ownerName}`);
            
        });
    }
}
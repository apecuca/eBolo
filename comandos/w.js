const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const eco = require("discord-economy");

module.exports = {
    name: "w", //o que será chamado pelo usuario dps do prefix
    description: "roleta por uma waifu ou husbando da database e apresenta para o usuário", //descrição do comando

    async run (client, message, args) {

        const DevState = 0;

        let db = new sqlite3.Database('waifus.sqlite');

        const output = await eco.FetchBalance(message.author.id);
        const userbalance = output.balance;

        db.each("SELECT COUNT(*) AS total FROM Waifus", function(err, row) {
            if (err) {
                return console.error(err.message);
            }
            let waifuTableLength = row.total;
            function waifuRoll(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            }
            let waifuRolled = waifuRoll(1, waifuTableLength+1);
            db.each('SELECT * FROM Waifus WHERE id = ?',waifuRolled, function(err, row) {
                if (err) {
                    return console.error(err.message);
                }
                var obj = {
                    "id": row.id,
                    "name": row.name,
                    "ownerName": row.ownerName,
                    "desc": row.description,
                    "belongState": row.belongState,
                    "ownerId": row.ownerId,
                    "worth": row.worth,
                    "imgUrl1": row.imgUrl1
                };

                const embeddedWaifu = new Discord.MessageEmbed()
                        .setTitle(obj.name)
                        .setColor('0xfcba03')
                        .addFields(
                            { name: `${obj.desc}`,
                            value: `${obj.worth} 🎂`}
                        )
                        .setImage(obj.imgUrl1)
                        .setFooter("Roletado por "+ message.author.username + "#" + message.author.discriminator + ".\nPertence a " + obj.ownerName + "\n")
                    
                //console.log(message.author.username + "#" + message.author.discriminator + " roletou " + obj.name + ", id " + waifuRolled);
                async function sendAndClaimWaifu() {
                    console.log(message.author.username + "#" + message.author.discriminator + " roletou " + obj.name + ", id " + waifuRolled);
                    let msg = await message.channel.send(embeddedWaifu);

                    await msg.react('💓');

                    const emojiFilter = (reaction) => {
                        return reaction.emoji.name === "💓";
                    } 

                    const collector = msg.createReactionCollector(emojiFilter, {time: 5000, dispose: true});

                    var userComplete;
                    var userId;
                    
                    collector.on('collect', (r, user) => {
                        userComplete = `${user.username}#${user.discriminator}`;
                        userId = user.id;

                        if (DevState === 0) {
                            if (userbalance >= obj.worth) {
                                if(obj.belongState === 0) {
                                    eco.SubtractFromBalance(userId, obj.worth);
                                    let data = [userComplete, 1, userId, obj.id];
                                    let sql = `UPDATE Waifus
                                                SET ownerName = ?,
                                                belongState = ?,
                                                ownerId = ?
                                                WHERE id = ?
                                    `;
                                    db.run(sql, data, function(err) {
                                        if (err) {
                                            return console.error(err.message);
                                        }
                                    });
                                    console.log(`${userComplete} deu claim em ${obj.name} id ${obj.id}`);
                                    message.channel.send(`<@${userId}> adicionou ${obj.name} ao seu cabaré por ${obj.worth} 🎂!\nNova balança: ${userbalance-obj.worth}`);
                                } else {
                                    message.reply(`${obj.name} já pertence a ${obj.ownerName} >:[`);
                                }
                            } else {
                            message.channel.send(`<@${userId}> sem bolos o bastante ://`);
                            }
                        } else {
                            message.reply('Claims desabilitados até todas as funções do bot estarem prontas :(\nme siga no instagram @pac_marco é nois tamo junto');
                        
                        }
                        collector.stop();
                    });
                }

                sendAndClaimWaifu();
            });
        });
    
    }
}

/*
db.each('SELECT * FROM Waifus', function(err, row) {
    if (err) {
        return console.error(err.message);
    }
    var obj= {
       "id": row.id,
       "name": row.name,
       "ownerName": row.ownerName,
       "belongState": row.belongState
    };

    //console.log(obj);
});


message.channel.send({
    embed: {
        title: obj.name,
        footer: {
            text: "Roletado por "+ message.author.username + "#" + message.author.discriminator + ".\nPertence a " + obj.ownerName + "\n",
        },
        //color: Math.floor(Math.random() * 99999),
        color: 0xfcba03,
        description: 'Essa pessoa é muito foda'
    }
});

console.log(message.author.username + "#" + message.author.discriminator + " roletou " + obj.name + ", id " + waifuRolled);
                    //message.reply("Você roletou a wild "+obj.name+" que pertence a **"+obj.ownerName+"**.");
                    
                    const embeddedWaifu = new Discord.MessageEmbed()
                        .setTitle(obj.name)
                        .setColor('0xfcba03')
                        .setDescription('Essa pessoa é muito foda')
                        .setFooter("Roletado por "+ message.author.username + "#" + message.author.discriminator + ".\nPertence a " + obj.ownerName + "\n")
                    
                    let msg = message.channel.send(embeddedWaifu).then(embedMessage => {
                        embedMessage.react("👍");
                    });

                    const emojiFilter = (reaction, user) => reaction.emoji.name === "👌" && user.id === message.author.id;

                    const collector = msg.createReactionCollector(emojiFilter, {time: 5000, dispose: true});
*/
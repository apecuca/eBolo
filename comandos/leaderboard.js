const Discord = require('discord.js');
const eco = require("discord-economy");

module.exports = {
    name: "leaderboard", //o que será chamado pelo usuario dps do prefix
    description: "mostra os lideres de bolim", //descrição do comando

    async run (client, message, args) {
        if (message.mentions.users.first()) {

            var output = await eco.Leaderboard({
                filter: x => x.balance > 0,
                search: message.mentions.users.first().id
            })
            output2 = await eco.FetchBalance(message.mentions.users.first().id);
            message.channel.send(`${message.mentions.users.first().tag} est\u00e1 em ${output}o lugar com ${output2.balance} bolos!`);

        } else {

            eco.Leaderboard({
                limit: 5, // top x pode mudar
                filter: x => x.balance > 0 //minimo de bolos para aparecer no leaderboard
            }).then(async users => {

                if (users[0]) var firstplace = await client.users.fetch(users[0].userid) //Searches for the user object in discord for first place
                if (users[1]) var secondplace = await client.users.fetch(users[1].userid) //Searches for the user object in discord for second place
                if (users[2]) var thirdplace = await client.users.fetch(users[2].userid) //Searches for the user object in discord for third place
                if (users[3]) var fourthplace = await client.users.fetch(users[3].userid)
                if (users[4]) var fifthplace = await client.users.fetch(users[4].userid)

                const leaderboard = new Discord.MessageEmbed()
                    .setTitle('Leaderboard')
                    .setDescription(`As pessoas com mais bolos da existência\n\u200B`)
                    .addFields(
                        { name: `🥇 - ${firstplace && firstplace.tag || 'Ningu\u00e9m, ainda'} : `,
                            value: `${users[0] && users[0].balance} bolos` || '--' },
                        { name: `🥈 - ${secondplace && secondplace.tag || 'Ningu\u00e9m, ainda'} : `,
                            value: `${users[1] && users[1].balance} bolos` || '--' },
                        { name: `🥉 - ${thirdplace && thirdplace.tag || 'Ningu\u00e9m, ainda'} : `,
                            value: `${users[2] && users[2].balance} bolos` || "--" },
                        { name: `4 - ${fourthplace && fourthplace.tag || 'Ningu\u00e9m, ainda'} : `,
                            value: `${users[3] && users[3].balance} bolos` || "--" },
                        { name: `5 - ${fifthplace && fifthplace.tag || 'Ningu\u00e9m, ainda'} : `,
                            value: `${users[4] && users[4].balance} bolos` || "--" }
                    )
                    .setThumbnail(message.author.displayAvatarURL())
                    .setColor('0xfcba03')
                    .setFooter(`\u200B\nParabéns a todos :3\nA pedido de ${message.author.username}#${message.author.discriminator}`)
                    .setTimestamp()
                
                message.channel.send(leaderboard)
            });
        }
    }
}
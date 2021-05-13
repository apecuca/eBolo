const Discord = require('discord.js');
const pagination = require('discord.js-pagination');

module.exports = {
    name: "help", //o que será chamado pelo usuario dps do prefix
    description: "mostra todos os comandos", //descrição do comando

    async run (client, message, args) {
        const page0 = new Discord.MessageEmbed()
            .setTitle('Todos os comandos disponíveis')
            .setDescription(`Esse é um bot de economia e waifus do Senai, onde eu adicionei meus amigos e algumas outras waifus para database, que você pode adicionar ao seu harém (por um preço, claro)\n\u200B`)
            .addFields(
                { name: `A pedido de ${message.author.username}#${message.author.discriminator}`, value: 'Criado por Pendejo#8650' },
            )
            .setThumbnail(message.author.displayAvatarURL())
            .setColor('0xfcba03')
            .setTimestamp()
            //.setFooter(`A pedido de ${message.author.username}#${message.author.discriminator}\nCriado por Pendejo#8650`)
        
        const page1 = new Discord.MessageEmbed()
            .setThumbnail(message.author.displayAvatarURL())
            .setColor('0xfcba03')
            .addFields(
                { name: '!nhelp', value: 'Mostra todos os comandos (aqui kk).\n\u200B' },
                { name: '!nc', value: 'Você come um bolo.\n\u200B' },
                { name: '!nbal', value: 'Mostra quantos bolos você tem.\n\u200B' },
                { name: '!nmacacos', value: 'Áudio macacos.\n\u200B' },
            )
            .setTimestamp()
        
        const page2 = new Discord.MessageEmbed()
            .setThumbnail(message.author.displayAvatarURL())
            .setColor('0xfcba03')
            .addFields(
                { name: '!ndaily', value: 'Pega a recompensa diária de bolos.\n\u200B' },
                { name: '!nleaderboard', value: 'Mostra o leaderboard mundial existencial.\n\u200B' },
                { name: '!nw', value: 'Roleta por uma waifu aleatória\n\u200B' },
                { name: '!nim **nome do personagem**', value: 'Mostra a página do personagem\n\u200B' },
            )
            .setTimestamp()
        
        const page3 = new Discord.MessageEmbed()
            .setThumbnail(message.author.displayAvatarURL())
            .setColor('0xfcba03')
            .addFields(
                { name: '!nwaifus', value: 'Mostra todas as waifus por ordem de valor\n\u200B' },
                { name: '!nmk', value: 'Mostra a profile de quem mandou a mensagem, ou do usuário marcado.\n\u200B' },
                { name: 'Em breve', value: 'Talvez\n\u200B' },
            )
            .setTimestamp()
        
        const pages = [
            page0,
            page1,
            page2,
            page3
        ];

        const emoji = ["⏪", "⏩"];

        const timeout = '60000' //Milliseconds, só dividir por 1000 que tá em segundos

        pagination(message, pages, emoji, timeout)
        
        /*
        message.channel.send({
            embed: {
                thumbnail: { url: message.guild.iconURL() },
                title: 'Todos os comandos disponíveis\n',
                footer: {
                    text:
                        "A pedido de " + message.author.username + "#" + message.author.discriminator + "\nCriado por Pendejo#8650",
                    icon_url: message.author.avatarURL
                },
                //color: Math.floor(Math.random() * 99999),
                color: 0xfcba03,
                fields: [
                    {
                        name: "!nhelp",
                        value: "Mostra todos os comandos\n\u200B"
                    },
                    {
                        name: "!nc",
                        value: "Você come um bolo\n\u200B"
                    },
                    {
                        name: "!nbal",
                        value: "Mostra quantos bolos você tem\n\u200B"
                    },
                    {
                        name: "!nmacacos",
                        value: "Áudio macacos.\n\u200B"
                    },
                    {
                        name: "!nleaderboard",
                        value: "Mostra o leaderboard mundial existencial\n\u200B"
                    },
                    {
                        name: "!ndaily",
                        value: "Pega a recompensa de bolos diarios\n\u200B"
                    },
                    {
                        name: "!nw",
                        value: "Roleta por uma waifu aleatória\n\u200B"
                    },
                    {
                        name: "!nim **nome do personagem**",
                        value: "Mostra a página do personagem\n\u200B"
                    },
                    {
                        name: "n sei",
                        value: "em breve\n\u200B"
                    }
                ]
            }
        });
        */
    }
}
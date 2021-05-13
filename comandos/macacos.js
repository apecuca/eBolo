const Discord = require('discord.js');

module.exports = {
    name: "macacos",
    description: "Toca som mamacos",

    async run (client, message, args) {
        const { voice } = message.member;
        if (!voice.channelID) {
            message.reply("entra num canal de voice pora");
            return
        }

        if (message.member.voice.channel) {
            var connection = await message.member.voice.channel.join();
        }

        // Create a dispatcher
        const dispatcher = connection.play('./midias/macacos.mp3');

        dispatcher.on('start', () => {
            console.log('dispatcher is now playing!');
        });

        dispatcher.on('finish', () => {
            console.log('dispatcher has finished playing!');
            connection.disconnect();
        });
    }

}
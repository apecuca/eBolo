const Discord = require('discord.js');
const settings = require('./config.json');

const client = new Discord.Client();

/*
const settings = {
    prefix: "!n",
    devID: "160922789321244672",
    token: 'ODAxNjU1Mzg2NDg1ODE3Mzc0.YAj1wg.eMyceW1FXQMzyNkSDupAetLXPsg'
}
*/

const { readdirSync } = require('fs');

const { join } = require('path');

client.commands = new Discord.Collection();

const commandFiles = readdirSync(join(__dirname, "comandos")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "comandos", `${file}`));
    client.commands.set(command.name, command);
}

client.on("error", console.error);

client.once("ready", () => {
    console.log("eai gay");
});

client.on('message', async message => {

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    if (message.content.startsWith(settings.prefix)) {
        const args = message.content.split(' ').slice(1);
        const command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];

        if(!client.commands.has(command)) return;

        try {
            client.commands.get(command).run(client, message, args);
        } catch (error) {
            console.error(error);
        }
    }
});

client.login(settings.token);

/* base stuff

const Discord = require('discord.js');
const eco = require("discord-economy");
const sqlite3 = require('sqlite3').verbose();

module.exports = {
    name: "", //o que será chamado pelo usuario dps do prefix
    description: "", //descrição do comando

    async run (client, message, args) {
        //codigo aqui
    }
}

*/
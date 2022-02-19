const Discord = require("discord.js");
const fs = require("fs");
require('dotenv').config();

global.client = new Discord.Client(
    // information fields where the bot can access
    { intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"] }
);

client.login(process.env.BOT_TOKEN);

client.commands = new Discord.Collection();
const commandsFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const eventsFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

for (const file of commandsFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

for (const file of eventsFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args));
}

client.on("messageCreate", message => {
    const prefix = "-";

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    client.commands.get(command).execute(message, args);
});

global.writeLogs = function (text) {
    client.channels.cache.get(process.env.LOGS_CHANNEL).send(text);
    return;
}
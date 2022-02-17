const Discord = require("discord.js");
require('dotenv').config();

const client = new Discord.Client(
    // information fields where the bot can access
    { intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"] }
);

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
    client.channels.cache.get("943496409536151572").send("I'm online 👾");
    //console.log("I'm online 👾");
});

client.on("messageCreate", (message) => {
    if (message.content == "-help") {
        message.channel.send("I'm not ready, my creator is still programming me...");
    }
});

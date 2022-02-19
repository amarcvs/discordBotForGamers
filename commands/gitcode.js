const Discord = require('discord.js');

module.exports = {
    name: "gitcode",
    description: "This command shows the git repository of the bot.",
    execute(message, args) {
        message.channel.send("Code of the open source project: https://www.github.com/amarcvs/discordBotForGamers");
        
        let text = `**${message.author.username}#${message.author.discriminator}** sent the -gitcode command`;
        writeLogs(text);
    }
}

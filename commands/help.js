const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "This command shows all the available bot commands.",
    execute(message, args) {
        message.channel.send("I'm not ready, my creator is still programming me...");
        
        let text = `**${message.author.username}#${message.author.discriminator}** sent the -help command`;
        writeLogs(text);
    }
}
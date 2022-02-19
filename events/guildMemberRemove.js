const Discord = require('discord.js');

module.exports = {
    name: "guildMemberRemove",
    execute(member) {
        client.channels.cache.get(process.env.GENERAL_CHANNEL).send("Goodbye " + member.toString() + ", come back soon 👾!");
    
        let text = `**${member.user.username}#${member.user.discriminator}** exited the server`;
        writeLogs(text);
    }
}
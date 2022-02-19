const Discord = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    execute(member) {
        client.channels.cache.get(process.env.GENERAL_CHANNEL).send("Welcome " + member.toString() + " to our **" + member.guild.name + "** community 👾. You are the " + member.guild.memberCount + "° member!");
        
        let text = `**${member.user.username}#${member.user.discriminator}** joined into the server`;
        writeLogs(text);
    }
}
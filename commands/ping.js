const Discord = require('discord.js');

module.exports = {
    name: "ping",
    description: "This command shows the API and bot latency.",
    execute(message, args) {
        let bot = client.users.cache.get(process.env.BOT_ID);
        
        let embed = new Discord.MessageEmbed()
            .setColor("#348066")
            .setAuthor({ name: bot.username, iconURL: bot.avatarURL() })
            .setTitle("Ping 🏓")
            .setDescription(`**Bot** latency: **${Date.now() - message.createdTimestamp}** ms.
            🎮 **API** latency: **${Math.round(client.ws.ping)}** ms.`); // msg.createdTimestamp - message.createdTimestamp
            
        message.channel.send({ embeds: [embed] });
        
        let text = `**${message.author.username}#${message.author.discriminator}** sent the -ping command`;
        writeLogs(text);
    }
}
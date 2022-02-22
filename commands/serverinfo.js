const Discord = require('discord.js');

module.exports = {
    name: "serverinfo",
    description: "This command shows some info about the server where the bot is located.",
    execute(message, args) {
        let server = message.member.guild;
        let bot = client.users.cache.get(process.env.BOT_ID);
        let owner = client.users.cache.get(message.guild.ownerId);
        
        let botsCount = server.members.cache.filter(member => member.user.bot).size;
        let usersCount = server.memberCount - botsCount;

        let embed = new Discord.MessageEmbed()
            .setColor("#348066")
            .setAuthor({ name: bot.username, iconURL: bot.avatarURL() })
            .setTitle(server.name)
            .setDescription("Some info about this server.")
            .setThumbnail(server.iconURL())
            .addField("Server id:", "```" + server.id + "```", true)
            .addField("Owner id:", "```" + owner + "```", true)
            .addField("Server created on:", "```" + server.createdAt.toDateString() + "```", false)
            .addField("Server preferred region:", "```" + server.preferredLocale  + "```", true)
            .addField("Members:", "```Users: " + usersCount + " - Bots: " + botsCount + "```", true)
            
        message.channel.send({ embeds: [embed] });

        let text = `**${message.author.username}#${message.author.discriminator}** sent the -serverinfo command`;
        writeLogs(text);
    }
}
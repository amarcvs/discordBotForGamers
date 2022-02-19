const Discord = require('discord.js');

module.exports = {
    name: "serverinfo",
    description: "This command shows the info about the server where the bot is located.",
    execute(message, args) {
        let server = message.member.guild;
        
        let botsCount = server.members.cache.filter(member => member.user.bot).size;
        let usersCount = server.memberCount - botsCount;

        let embed = new Discord.MessageEmbed()
            .setColor("#348066")
            .setTitle(server.name)
            .setDescription("Info of this server.")
            .setThumbnail(server.iconURL())
            .addField("Server id:", "```" + server.id + "```", true)
            .addField("Owner:", "```" + client.users.cache.get(server.ownerId).username + "```", true)
            .addField("Server created on:", "```" + server.createdAt.toDateString() + "```", false)
            .addField("Server region:", "```" + server.region + "```", true)
            .addField("Members:", "```Users: " + usersCount + " - Bots: " + botsCount + "```", true)
            .addField("Description:", "```" + server.description + "```", false);

        message.channel.send({ embeds: [embed] });

        let text = `**${message.author.username}#${message.author.discriminator}** sent the -serverinfo command`;
        writeLogs(text);
    }
}
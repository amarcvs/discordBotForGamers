const Discord = require('discord.js');

module.exports = {
    name: "botinfo",
    description: "This command shows some info about the bot.",
    execute(message, args) {
        let bot = client.users.cache.get(process.env.BOT_ID);
        let dev = client.users.cache.get(process.env.DEVELOPER_ID);

        let embed = new Discord.MessageEmbed()
            .setColor("#348066")
            .setAuthor({ name: bot.username, iconURL: bot.avatarURL() })
            .setDescription(`Multipurpose bot and brain of the **${message.member.guild.name} community**.
                            Type **-help** to view all commands!`)
            .setThumbnail(bot.avatarURL())
            .addField("Bot id:", "```" + bot.id + "```", true)
            .addField("Bot created on:", "```" + bot.createdAt.toDateString() + "```", true)
            .addField("Written by:", "```" + dev.username + "#" + dev.discriminator + "```", false);

        message.channel.send({ embeds: [embed] })
            .then(function(message) {
                message.react("🎮");
                message.react("🎲");
            });

        let text = `**${message.author.username}#${message.author.discriminator}** sent the -botinfo command`;
        writeLogs(text);
    }
}
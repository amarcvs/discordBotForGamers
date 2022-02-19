const Discord = require('discord.js');

module.exports = {
    name: "botinfo",
    description: "This command shows the info about the bot.",
    execute(message, args) {
        let bot = client.users.cache.get(process.env.BOT_ID);
        
        let embed = new Discord.MessageEmbed()
            .setColor("#348066")
            .setTitle(bot.username)
            .setDescription(`Brain of the gaymerServer.
                            Type -help to view all commands!

                            Bot available soon...`)
            .setThumbnail(bot.avatarURL())
            .addField("Bot id:", "```" + bot.id + "```", true)
            .addField("Bot created on:", "```" + bot.createdAt.toDateString() + "```", true)
            .addField("Programmed by:", "```" + client.users.cache.get("716684672628686899").username + "```", false);

        message.channel.send({ embeds: [embed] })
            .then(function(message){
                message.react("🎮");
                message.react("🎲");
            });

        let text = `**${message.author.username}#${message.author.discriminator}** sent the -botinfo command`;
        writeLogs(text);
    }
}
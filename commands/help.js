const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "This command shows all available bot commands.",
    execute(message, args) {
        let bot = client.users.cache.get(process.env.BOT_ID);
        
        let embed = new Discord.MessageEmbed()
            .setColor("#348066")
            .setAuthor({ name: bot.username, iconURL: bot.avatarURL() })
            .setTitle("All available commands:")
            .setDescription(`--------------------------
            **Info** commands
            --------------------------
            › **help**: help command,
            › **gitcode**: shows the git repository of the bot,
            › **botinfo**: shows some info about the bot,
            › **serverinfo**: shows some info about the server where the bot is located,
            › **userinfo**: shows some info about a user.
            
            --------------------------
            **Game** commands 
            --------------------------
            › **stats**: shows the stats about a gamer,
            › **leaderboard**: shows a ranking of the 10 best gamers of the moment.`)
        
        message.channel.send({ embeds: [embed] });

        let text = `**${message.author.username}#${message.author.discriminator}** sent the -help command`;
        writeLogs(text);
    }
}
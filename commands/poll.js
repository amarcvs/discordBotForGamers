const Discord = require('discord.js');

module.exports = {
    name: "poll",
    description: "This command sends a poll.",
    execute(message, args) {
        let bot = client.users.cache.get(process.env.BOT_ID);
        
        let msgText = message.content.split("+");
        let question = msgText[0].split(" ");
        question.shift();
        question = question.join(" ");

        if (question.trim() == "" || !(msgText.length > 2)) {
            message.channel.send('You should enter the **poll question** and the **options** `[usage: -poll <question> + <opt1> + <opt2> + < ... >]`');
            return;
        }

        if (!(msgText.length < 22)) {
            message.channel.send('The poll cannot have more than 20 options (maximum number reached)!');
            return;
        }

        message.delete();

        const optEmoji = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹'/*, '🇺', '🇻', '🇼', '🇽', '🇾', '🇿'*/];

        /*for(let i = 97; i <= 122; ++i) {
            optEmoji[i] = `${String.fromCharCode(92)}:regional_indicator_${String.fromCharCode(i)}:`;
        }*/

        let options = "";
        for (let i = 1; i < msgText.length; ++i) {
            if (i == msgText.length - 1) options += `${optEmoji[i-1]} - ${msgText[i].trim()}`;
            else options += `${optEmoji[i-1]} - ${msgText[i].trim()}\r`
        }
        
        let embed = new Discord.MessageEmbed()
            .setColor("#348066")
            .setAuthor({ name: bot.username, iconURL: bot.avatarURL() })
            .setTitle(`Poll started by ${message.member.displayName}\r📊 ${question}`)
            .setDescription(options);

        message.channel.send({ embeds: [embed] })
            .then(function(message) {
                for (let i = 1; i < msgText.length; ++i) {
                    message.react(`${optEmoji[i-1]}`);   
                }
            });
        
        let text = `**${message.author.username}#${message.author.discriminator}** sent the -poll command`;
        writeLogs(text);
    }
}
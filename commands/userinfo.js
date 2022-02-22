const Discord = require('discord.js');

module.exports = {
    name: "userinfo",
    description: "This command shows some info about a user.",
    execute(message, args) {
        let bot = client.users.cache.get(process.env.BOT_ID);
        let user = undefined;
        
        if (message.content == "-userinfo") {
            user = message.member;
        }
        
        else {
            user = message.mentions.members.first();
        }

        if (!user) {
            message.channel.send("I haven't found this user.");
            return;
        }
        
        let permissionsList = "";

        if (user.permissions.has("ADMINISTRATOR")) {
            permissionsList = "💻 ADMINISTRATOR";
        }

        else {
            let permissions = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS_AND_STICKERS"/*"MANAGE_EMOJIS"*/]

            for (let i = 0; i < permissions.length; ++i) {
                if (user.permissions.has(permissions[i])) {
                    permissionsList += "- " + permissions[i] + "\r";
                }
            }
        }

        let embed = new Discord.MessageEmbed()
            .setColor("#348066")
            .setAuthor({ name: bot.username, iconURL: bot.avatarURL() })
            .setTitle("TAG: " + user.user.tag)
            .setDescription("Some info about this user.")
            .setThumbnail(user.user.avatarURL())
            .addField("User id:", "```" + user.user.id + "```", true)
            .addField("Account created on:", "```" + user.user.createdAt.toDateString() + "```", true)
            .addField("isABot:", user.user.bot ? "```Yes```" : "```No```", true)
            .addField("Joined this server on:", "```" + user.joinedAt.toDateString() + "```", true)
            .addField("Permissions:", "```" + permissionsList + "```", false)
            .addField("Roles:", "```" + user.roles.cache.map(ruolo => ruolo.name).join("\r") + "```", false);

        message.channel.send({ embeds: [embed] });

        let text = `**${message.author.username}#${message.author.discriminator}** sent the -userinfo command`;
        writeLogs(text);
    }
}
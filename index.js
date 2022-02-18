const Discord = require("discord.js");
require('dotenv').config();

const client = new Discord.Client(
    // information fields where the bot can access
    { intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"] }
);

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
    client.channels.cache.get(process.env.LOGS_CHANNEL).send("I'm online 👾");
});

client.on("guildMemberAdd", (member) => {
    client.channels.cache.get(process.env.GENERAL_CHANNEL).send("Welcome " + member.toString() + " to our **" + member.guild.name + "** community 👾. You are the " + member.guild.memberCount + "° member!");
});

client.on("guildMemberRemove", (member) => {
    client.channels.cache.get(process.env.GENERAL_CHANNEL).send("Goodbye " + member.toString() + ", come back soon 😏!");
});

client.on("messageCreate", (message) => {
    if (message.content == "-help") {
        message.channel.send("I'm not ready, my creator is still programming me...");
    }

    if (message.content == "-gitcode") {
        message.channel.send("Code of the open source project: https://www.github.com/amarcvs/discordBotForGamers");
    }

    if (message.content == "-botinfo") {
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
    }

    if (message.content == "-serverinfo") {
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
    }

    if (message.content.startsWith("-userinfo")) {
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
            .setTitle(user.user.tag)
            .setDescription("Info of this user.")
            .setThumbnail(user.user.avatarURL())
            .addField("User id:", "```" + user.user.id + "```", true)
            .addField("Account created on:", "```" + user.user.createdAt.toDateString() + "```", true)
            .addField("isABot:", user.user.bot ? "```Yes```" : "```No```", true)
            .addField("Joined this server on:", "```" + user.joinedAt.toDateString() + "```", true)
            .addField("Permissions:", "```" + permissionsList + "```", false)
            .addField("Roles:", "```" + user.roles.cache.map(ruolo => ruolo.name).join("\r") + "```", false);

        message.channel.send({ embeds: [embed] });
    }
});

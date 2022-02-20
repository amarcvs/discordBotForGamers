const Discord = require("discord.js");
const fs = require("fs");
const mysql = require("mysql");

require('dotenv').config();

global.client = new Discord.Client(
    // information fields where the bot can access
    { intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"] }
);

client.login(process.env.BOT_TOKEN);

global.dbconnection = mysql.createPool({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4'
});

client.commands = new Discord.Collection();
const commandsFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
const eventsFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

for (const file of commandsFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

for (const file of eventsFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args));
}

client.on("messageCreate", message => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;

    dbconnection.query("SELECT * FROM userstats", (err, result) => {
        if(err) { console.log(err); return; }

        let userstatsList = result;

        if (message.content.startsWith("-stats")) {
            let userdata = undefined;

            if (message.content == "-stats") {
                userdata = message.member;
            }

            else {
                userdata = message.mentions.members.first();
            }

            if (!userdata) {
                message.channel.send("Invalid user!");
                return;
            }

            let index = userstatsList.findIndex(x => x.id == userdata.id);
            if (index < 0) {
                message.channel.send("This user has no experience!");
                return;
            }
            
            let userstats = userstatsList[index];
            let progress = "";
            let tilesProgress = parseInt(10 * (userstats.xp - xpNeeded(userstats.level)) / (xpNeeded(userstats.level + 1) - xpNeeded(userstats.level)));
            
            for (let i = 0; i < tilesProgress; ++i) {
                progress += "🟩";
            }
            
            for (let i = 0; i < 10 - tilesProgress; ++i) {
                progress += "⬜";
            }

            let embed = new Discord.MessageEmbed()
                .setColor("#348066")
                .setTitle(message.member.displayName.split(" ")[0])
                .setDescription("progress:")
                .setThumbnail(userdata.user.avatarURL())
                .addField("Level " + userstats.level, progress);

            message.channel.send({ embeds: [embed] });

            let text = `**${message.author.username}#${message.author.discriminator}** sent the -stats command`;
            writeLogs(text);
        }

        if (message.content == "-leaderboard") {
            let leaderboardList = userstatsList.sort((a, b) => (a.xp < b.xp) ? 1 : ((b.xp < a.xp) ? -1 : 0));
            let leaderboard = "";

            for (let i = 0; i < 10; ++i) {
                if (leaderboardList.length - 1 < i) break;

                leaderboard += `#${i + 1} **${leaderboardList[i].nickname.split(" ")[0]}** - Level ${leaderboardList[i].level} - Xp ${leaderboardList[i].xp}\r`;
            }

            let embed = new Discord.MessageEmbed()
                .setColor("#348066")
                .setTitle("Leaderboard")
                .addField("Rank levels:", leaderboard);

            message.channel.send({ embeds: [embed] });

            let text = `**${message.author.username}#${message.author.discriminator}** sent the -leaderboard command`;
            writeLogs(text);
        }
        
        let index = userstatsList.findIndex(x => x.id == message.author.id);
        if (index < 0) {
            index = userstatsList.lenght;

            userstatsList[index] = {
                id: message.author.id,
                username: message.member.user.tag,
                nickname: message.member.displayName,
                xp: 0,
                level: 0,
                cooldownOp: 0
            };

            dbconnection.query(`INSERT INTO userstats VALUES ('${message.author.id}', '${message.member.user.tag}', '${message.member.displayName}', 0, 0, 0)`, function (err, result) { if(err) { console.log(err); return; } });

            const member = message.member;
            member.setNickname(`${message.member.displayName.split(" ")[0]} [${userstatsList[index].level}]`);
        }

        let userstats = userstatsList[index];

        if (userstats.cooldownOp <= 0) {
            userstats.cooldownOp = 5;
                
            let xp = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
            userstats.xp += xp;

            if (userstats.xp >= xpNeeded(userstats.level + 1)) {
                userstats.level++;

                const member = message.member;
                member.setNickname(`${message.member.displayName.split(" ")[0]} [${userstatsList[index].level}]`);

                let channel = client.channels.cache.get(process.env.GENERAL_CHANNEL);
                channel.send(`${message.author.toString()} you have reached new level!`);
                
                let text = `**${message.author.username}#${message.author.discriminator}** have reached new level`;
                writeLogs(text);
            }

            dbconnection.query(`UPDATE userstats SET level = ${userstats.level}, xp = ${userstats.xp}, cooldownOp = ${userstats.cooldownOp} WHERE id = ${userstats.id}`, function (err, result) { if(err) { console.log(err); return; } });
        }
    });

    const prefix = "-";

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    client.commands.get(command).execute(message, args);
});

global.xpNeeded = function (level) {
    return level * level * 50;
}

setInterval(function () {
    dbconnection.query("SELECT * FROM userstats", (err, result) => {
        if(err) { console.log(err); return; }
        
        let userstatsList = result;
        userstatsList.forEach(userstats => {
                if (userstats.cooldownOp > 0) {
                        userstats.cooldownOp -= 5;

                        dbconnection.query(`UPDATE userstats SET cooldownOp = ${userstats.cooldownOp} WHERE id = ${userstats.id}`, function (err, result) { if(err) { console.log(err); return; } });
                }
        });
    });
}, 5000);

global.writeLogs = function (text) {
    client.channels.cache.get(process.env.LOGS_CHANNEL).send(text);
    return;
}
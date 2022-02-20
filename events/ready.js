const Discord = require('discord.js');

module.exports = {
    name: "ready",
    execute() {
        console.log("ONLINE");
        
        client.user.setActivity('Call of Duty 4', {type: 'PLAYING'});
        
        let text = `**${client.users.cache.get(process.env.BOT_ID).tag}** is online`;
        writeLogs(text);
    }
}
const Discord = require("discord.js")
const db = require("quick.db")
const prefix = require("../config.json")
const client = new Discord.Client()

module.exports.run = async (client, message, args) => {
    const user = message.mentions.users.first() || message.author
    let warnings = await db.get(`warnings_${message.guild.id}_${user.id}`);
        


        let reason = db.get(`reason_${message.guild.id}_${user.id}`) || "Unspecified"
        if(warnings === null) warnings = 0;
        const nowarns = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`${user.username} n'a aucun warn !`)

        const somewarns = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(`${user.username} a ${warnings} warns !`)
        .setDescription(`Raison du dernier warn  : ${reason}`)

        if(warnings === 0 || warnings === null) {
            message.channel.send(nowarns)
        } else {
            message.channel.send(somewarns)
        }

}

module.exports.help = {
    name: "warnings"
}
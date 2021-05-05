const {warnColor} = require("../config.json")
const Discord = require("discord.js")
const db = require("quick.db")
const client = new Discord.Client()

module.exports.run = async (client, message, args) => {

    const user = message.mentions.users.first()
    var reason = args.slice(1).join(" ");
    if(!reason) reason = 'Unspecified';
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Vous n'avez pas les permissions requise !`)
    if(user === client.user) return message.channel.send(`Je ne peut pas me warn !`)
    if(user === message.author) {
        return message.channel.send(`Tu ne peut pas te warn`)
    }
    if(user) {
        var warnings = db.get(`warnings_${message.guild.id}_${user.id}`);
        

        const warnEmbed = new Discord.MessageEmbed()
            .setColor("#B2E6EF")
            .setDescription(`${user.username} a été warn avec succés !`)
            message.channel.send(warnEmbed)
            

        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
        }

        if(warnings !== null){
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            db.set(`reason_${message.guild.id}_${user.id}`, reason);
        }
    } else {
        return message.channel.send(`Mentionne quelqu'un à warn !`)
    }
}

module.exports.help = {
    name: "warn"
}
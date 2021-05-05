const Discord = require("discord.js")
const {banColor} = require("../config.json")
const db = require("quick.db")
const client = new Discord.Client()

module.exports.run = (client, message, args) => {
    
    const user = message.mentions.users.first()
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Vous n'avez pas les permissions requise !`)
    if(user === client.user) return message.channel.send(`Je ne peut pas me unwarn !`)
    
    if(user) {
        var warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === null) {
            message.channel.send(`${user.username} n'a pas de warns !`)
        }

        if(warnings !== null){
            db.delete(`warnings_${message.guild.id}_${user.id}`)
            message.channel.send(`${truth} ${user.username} ses warns ont été reset !`)
        }
    } else {
        return message.channel.send(`Mentionne quelqu'un à unwarn !`)
    }
}

module.exports.help = {
    name: "unwarn"
}
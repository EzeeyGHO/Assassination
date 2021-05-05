const Discord = require("discord.js")
const {banColor} = require("../config.json")
const db = require("quick.db")
const client = new Discord.Client()

module.exports.run = (client, message, args) => {
    const user = message.mentions.users.first()
    if(!message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) return message.channel.send(`Vous n'avez pas les permissions requise !`)
    if(user === client.user) return message.channel.send(`Je ne peut pas me kick !`)
    if(user === message.author) {
        return message.channel.send(`Tu ne peut pas te kick !`)
    }
    if(!user) return message.channel.send(`Mentionne quelqu'un à kick !`)
    if(user) {
        const members = message.guild.members.resolve(user)
        if(members) {
            members.kick()
            const banEmbed = new Discord.MessageEmbed()
            .setColor("#B2E6EF")
            .setDescription(`${user.username} a été kick avec succés !`)
            message.channel.send(banEmbed)
        } else {
            return message.channel.send(`Je n'arrive pas a trouver l'utilisateur !`)
        }
    }
}

module.exports.help = {
    name: "kick"
}
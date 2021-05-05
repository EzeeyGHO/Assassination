const Discord = require("discord.js")
const prefix = require("../config.json")
const client = new Discord.Client()

module.exports.run = (client, message, args) => {
    let messageDelete = parseInt(args[0])
    if(isNaN(messageDelete)) return message.channel.send(`Veuillez mettre un nombre !`)
    if(messageDelete > 100) {
        return message.channel.send(`Mettez un nombre comprit entre 2 et 100`)
    }
    if(messageDelete < 2) {
        return message.channel.send(`Mettez un nombre comprit entre 2 et 100`)
    }
    message.channel.bulkDelete(messageDelete, true)
    const cleared = new Discord.MessageEmbed()
    .setColor("#B2E6EF")
    .setDescription(`${messageDelete} messages éffacées !`)
    message.channel.send(cleared).then(msg => msg.delete({timeout: 5000}));
}

module.exports.help = {
    name: "clear"
}
const Discord = require("discord.js")
const fs = require("fs")
const db = require("quick.db")
const config = require("./config.json")

const client = new Discord.Client()

client.on("ready", () => {
    const guild = client.guilds.cache.get("832694752465649745")
    client.user.setActivity(`🌙 Assassination | 暗殺 | prefix : ${config.prefix}`)
})

client.commands = new Discord.Collection();
fs.readdir("./Commandes/", (error, f) => {
  if(error) console.log(error);

  let commandes = f.filter(f => f.split(".").pop() === "js");
  if(commandes.length <= 0) return console.log("aucune commande trouvé dans le dossier");

  commandes.forEach((f) => {
    let commande = require(`./Commandes/${f}`);
    console.log(`${f} commande chargée !`);
    client.commands.set(commande.help.name, commande);
  });
});

fs.readdir("./Events/", (error, f) => {
  if(error) console.log(error);
  console.log(`${f.length} events en chargement`);

  f.forEach((f) => {
      const events = require(`./Events/${f}`);
      const event = f.split(".")[0];

    client.on(event, events.bind(null, client));
  });

});

client.login(config.token)
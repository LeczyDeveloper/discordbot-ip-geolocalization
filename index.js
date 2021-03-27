const Discord = require("discord.js");
const { MessageEmbed, RichPresenceAssets, DiscordAPIError, Message, GuildMember} = require('discord.js');
const client = new Discord.Client({ ws: { intents: 32767 } });
const config = require("./privados.json");
var prefix = config.prefix;
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));
client.on("ready", () => {
  console.log(`connected`);

setInterval(() => {        
  let presences = [
    `Geolocating...`,
    `Searching...`,
   `Indexing...`,
];
client.user.setActivity(presences[~~(Math.random() * presences.length)],{
          type: "PLAYING"
      })
    }, 60000);
    })

client.on("message", async message => {
    console.log(message.content);
    if(!message.content.startsWith(prefix))return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g );
    const command = args.shift().toLowerCase();

const snekfetch = require("snekfetch")
if(command === "geoip"){
	if(!args[0]) return message.channel.send("Please enter a valid IP address.")
snekfetch.get(`http://ip-api.com/json/${args}?fields=63700991`).then(r => {
  let Geo = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("2C2F33")
    .setThumbnail(`https://cdn.discordapp.com/attachments/608711490223996995/824990413852639302/6a46de3a4212e07b57da651ac5da8f62.png`)
    .setTitle(`Geo IP Lookup`)
    .setDescription(`
Receiving data from the IP: ${args}
Proxy: ${r.body.proxy}
Mobile: ${r.body.mobile}
Hosting: ${r.body.hosting}
Zip: ${r.body.zip}
Organization: ${r.body.org}
ASN: ${r.body.as}
Region: ${r.body.region}, ${r.body.regionName}
Country: ${r.body.country}
Ubicación: ${r.body.city}`)
    .setFooter(`Requested by: ${message.author.tag}`);

  message.channel.send({ embed: Geo });
});
}

}) 
client.login(config.token);   
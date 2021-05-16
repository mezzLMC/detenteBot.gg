const Discord = require("discord.js")
const bot = new Discord.Client()
var file = require('file-system');
var fs = require('fs');



const config = require("./token.json")
let data = require("./data.json")
const prefix = config.prefix


bot.on("ready",async ()=>{
    bot.user.setStatus("dnd")
    bot.user.setActivity("%help | sinj>femmes")
    console.log("bot on")
})

bot.on("message", message => {
    let channel = message.channel

    if(message.content.startsWith(prefix + "test")){
        channel.send("test passed!")
    }

    if(message.content.startsWith(prefix + "help")){
        channel.send("demande a maz moi j'ai pas ton temps")
    }

    if(message.content.startsWith(prefix + "newlife")){
        const user = message.author
        const id = message.author.id
        if(!data[id]){
            const embed = new Discord.MessageEmbed()
            .setTitle(':airplane: Aeroport de Lanteglos' )
            .setColor(0xff0000)
            .addField('nouvelle arrivée', "bienvenue en ville, " + user.toString() + "!\n" +
            "La Mairie t'offre **500€** et un petit logement pour t'installer \n" +
            "trouve toi vite un travail *%paule-emploi* pour gagner plus d'argent.")
            message.channel.send(embed);
            data[id] = {
                wallet: 500,
                bank: 0,
                home: "HLM",
                rent: "50",
                work: "chômeur"
            }
            fs.writeFileSync("./data.json", JSON.stringify(data))
        }
        else{
            const embed = new Discord.MessageEmbed()
            .setTitle(':no_entry: action impossible' )
            .setColor(0xff0000)
            .setDescription(user.toString() + " tu as deja une partie en cours!")
            message.channel.send(embed);
        }
    }

    if(message.content.startsWith(prefix + "status")){
        const user = message.author
        const id = message.author.id
        const userdata = data[id]
        const embed = new Discord.MessageEmbed()
        .setTitle(':card_index: bureau du notaire')
        .setDescription("status de "+ user.toString())
        .addFields(
		{ name: ':purse: portefeuille', value: userdata.wallet, inline: true },
		{ name: ':bank: banque', value: userdata.bank, inline: true },
        { name: ':house: logement', value: userdata.home, inline: true },
	)
    message.channel.send(embed)
    }
    
} )









bot.login(config.token)


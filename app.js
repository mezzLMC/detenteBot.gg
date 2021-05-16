var Discord = require("discord.js")
const bot = new Discord.Client()
var file = require('file-system');
var fs = require('fs');
const help = require("./class/Help.js")
const emploi = require("./class/Emploi.js")


var blank = "\u200B"
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
        help(message)

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
                work: "chômeur",
                organisation: "citoyen",
                grade: null

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
        .addFields(
            {name: ':money_with_wings: loyer', value:userdata.rent, inline: true},
            {name: ":necktie: emploi", value: userdata.work, inline: true},
            {name: ":detective: organisation", value: userdata.organisation, inline: true}
        )

        message.channel.send(embed)
    }

    if(message.content.startsWith(prefix + "shop")){
        const user = message.author
        const id = message.author.id
        emploi.pauleEmploi(message,id.toString())
    }

    if(message.content.startsWith(prefix + "careers")){
        const user = message.author
        const id = message.author.id
        emploi.careers(message,id.toString())
    }

    
} )









bot.login(config.token)


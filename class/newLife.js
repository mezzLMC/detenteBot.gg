var Discord = require("discord.js")
const bot = new Discord.Client()
var file = require('file-system');
var fs = require('fs');




module.exports = function(message){
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
                grade: ["none"]

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
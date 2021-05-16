var file = require('file-system');
var fs = require('fs');
const Canvas = require('canvas');
var blank = "\u200B"
const config = require("../token.json")



module.exports = function(message){
    const embed = new Discord.MessageEmbed()
    .setTitle("Menu DétenteBot")
    .addField("in game",
    "`" + prefix + "newlife` | rejoindre la partie et attérir en ville \n" +
    "`" + prefix + "status`  | des infos sur son personnage (salaire,emploi,argent) \n" +
    "`" + prefix + "shop` | ouvrir le shop pour acheter des items \n" +
    "`" + prefix + "paule-emploi` | chercher du travail"
    )
    .addField("modération",
    "`" + prefix + "add [somme] [@user]` | ajouter une somme d'argent sur un compte bancaire " +
    "`" + prefix + "remove [somme] [@user]` | retirer une somme d'argent sur un compte bancaire "
    )
    message.channel.send(embed)
};

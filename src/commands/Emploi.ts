import {Player} from '../class/Player'
import {CommandMessage} from "@typeit/discord"
var Discord = require("discord.js")
var file = require('file-system');
var fs = require('fs');

const config = require("../config.json")
var blank = "\u200B"
let data = require("../data.json")

function getWork(work){
    let result = undefined
    config.works.forEach(element =>{
        if(element.cmd == work){
            result = element
        }
    })
    return result
}


function pauleEmploi(message: CommandMessage){
    var sender = new Player(message.author.id)
    var dispoworks = sender.getAvailableWorks().map(value=>{
        return {
            name: value.name, value: "`" + config.prefix + "careers " + value.cmd +"` | **salaire:** `"+ value.income + "` :coin: " 
        }
    })
    const embed = new Discord.MessageEmbed()
    .setTitle(":necktie: Paule-emploi")
    .addField("diplômes", "*Vous n'avez aucun dipôme pour l'instant*")
    .addField("listes des métiers disponibles:", blank)
    .addFields(dispoworks)
    message.channel.send(embed)
};

function careers(message: CommandMessage){
    var sender = new Player(message.author.id)
    var trigger = message.args.work
    console.log("cc")
    if(getWork(trigger)){
        if(sender.getAttribute("grade").includes(getWork(trigger).grade)){
            sender.setWork(getWork(trigger).name)
            const embed = new Discord.MessageEmbed()
            .setTitle(':necktie: Paule-emploi' )
            .setDescription(message.author.toString() + " tu es désormais "+ getWork(trigger).name +"!")
            message.channel.send(embed)
        }
        else{
            const embed = new Discord.MessageEmbed()
            .setTitle(':no_entry: action impossible' )
            .setColor(0xff0000)
            .setDescription(message.author.toString() + "il te faut le diplôme " + getWork(trigger).grade + "pour cet emploi")
            message.channel.send(embed)
        }
    }
    else{
        const embed = new Discord.MessageEmbed()
        .setTitle(':no_entry: action impossible' )
        .setColor(0xff0000)
        .setDescription(message.author.toString() + " Ce métier n'existe pas!")
        message.channel.send(embed)

    }
}

export{
    pauleEmploi,
    careers
}
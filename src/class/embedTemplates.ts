import {MessageEmbed} from "discord.js"
var blank = "\u200B"

export function errorEmbed(){
    let embed = new MessageEmbed()
    .setTitle(':no_entry: action impossible' )
    .setColor(0xff0000)
    return embed
}

export function adminEmbed(){
    let embed = new MessageEmbed()
    .setTitle(':crossed_swords: Action admin' )
    .setColor(0x008238)
    .setDescription(":white_check_mark: La tâche a été réalisé")
    return embed
}
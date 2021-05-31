import { CommandMessage } from "@typeit/discord";
import {MessageEmbed} from "discord.js"
var file = require('file-system');
var fs = require('fs');


var blank = "\u200B"
const config = require("../config.json")
let data = require("../data.json")
const prefix = config.prefix


export function Status(message: CommandMessage){
        const user = message.author
        const id = message.author.id
        const userdata = data[id]
        if(userdata){
            const embed = new MessageEmbed()
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
        else{
            const embed = new MessageEmbed()
            .setTitle(':no_entry: action impossible' )
            .setColor(0xff0000)
            .setDescription(user.toString()+ " t'es qui? | `"+ prefix+ "newlife` pour rejoindre la game")
            message.channel.send(embed)
        }
}
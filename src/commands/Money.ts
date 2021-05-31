import { CommandMessage } from "@typeit/discord";
import {Config} from "../types"
import { MessageEmbed } from "discord.js";
import { Player } from "../class/Player";

let structName = ":bank: Banque de Lanteglos"
var config:Config = require("../config.json")

export function claimSalary(message: CommandMessage){
    var sender = new Player(message.author.id)
    const embed = new MessageEmbed()
    const salary = config.works.find(element => {return (element.name == sender.getAttribute("work"))}).income
    console.log(sender.getAttribute("work"))
      if(sender.getClaimCount() == 0){
        sender.setClaimCounter()
        embed.setTitle(structName)
        embed.setDescription(":white_check_mark: Vous avez reçu votre salaire de **" + salary + "€**")
      }
      else{
        embed.setTitle(':no_entry: action impossible' )
        embed.setColor(0xff0000)
        embed.setDescription(message.author.toString() + ", il reste: **" + sender.getClaimCount() + " secondes **")

      }
      message.channel.send(embed)
}
import {Command, CommandMessage, Discord, Infos, On} from "@typeit/discord";
import { Message, MessageEmbed } from "discord.js";
import { Bet } from "../class/BetManager";
import { errorEmbed, adminEmbed } from "../class/embedTemplates";
import { Player } from "../class/Player";
import {Config} from '../types'
var config:Config = require("../config.json")
var blank = "\u200B"


export function addBetter(){
  
}
  

export async function counter(bet: Bet){
    /*let send = await message.channel.send(count.toString())
    setInterval(()=>{
      count = count-1
      send.edit(count.toString())
    },1000) */
}
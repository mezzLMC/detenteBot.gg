import {Command, CommandMessage, Discord, Infos, On} from "@typeit/discord";
import { errorEmbed, adminEmbed } from "../class/embedTemplates";
import { Player } from "../class/Player";
import {counter} from "../commands/beting"
import { Message, MessageEmbed } from "discord.js"
import { client } from "../app";
import { Bet } from "../class/BetManager";
var file = require('file-system');
var fs = require('fs');
var config = require("../config.json")
var blank = "\u200B"


@Discord(config.prefix) // Decorate the class
@Infos({ forAdmins: true })
abstract class AppDiscord {

  @Command("give :player :amount")
  private giveMoney(message: CommandMessage){
      let id = message.args["player"].split("!")[1].split(">")[0]
      let trigger = new Player(id)
      trigger.setCurrency("wallet","add",message.args["amount"])
      message.channel.send(adminEmbed())
  }

  @Command("remove :player :amount :account")
  private removeMoney(message: CommandMessage){
    let id = message.args["player"].split("!")[1].split(">")[0]
    let trigger = new Player(id)
    trigger.setCurrency(message.args["account"],"remove",200)
    message.channel.send(adminEmbed())
  }

  @Command("bet")
  private async tryCounter(message: CommandMessage){
    let bet = new Bet().createFromMsg(message)
  }
}
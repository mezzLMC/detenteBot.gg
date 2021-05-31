import {Command, CommandMessage, Discord, On} from "@typeit/discord";
import {client} from "../app"
import {Help} from "../commands/Help"
import {NewLife} from "../commands/Life"
import {Status} from "../commands/Status"
import {pauleEmploi,careers} from '../commands/Emploi'
import { claimSalary } from "../commands/Money";
import { Bet } from "../class/BetManager";
var blank = "\u200B"
var file = require('file-system');
var fs = require('fs');
var config = require("../config.json")

@Discord(config.prefix) // Decorate the class
abstract class AppDiscord {
  
  @Command("help")
  private help(message: CommandMessage){Help(message)}

  @On("ready")
  private ready(){
      client.user.setActivity("%help | sinj>femmes")
      console.log("bot on!")
  }

  @Command("newlife")
  private newlife(message: CommandMessage){NewLife(message)}

  @Command("status")
  private getStatus(message: CommandMessage){Status(message)}
  
  @Command("paul-emploi")
  private getPauleEmploi(message: CommandMessage){pauleEmploi(message)}

  @Command("careers :work")
  private postule(message: CommandMessage){careers(message)}

  @Command("claim")
  private claimSalaire(message: CommandMessage){claimSalary(message)}

  @Command ("setbet :id :target :amount")
  private addBetter(message: CommandMessage){
    var betId = message.args.id
    var betterId = message.author.id 
    var betAmount = message.args.amount
    var target = message.args.target
    let bet = new Bet(betId)
    bet.addBetter(betterId,betAmount,target)
    console.log(bet.getOdds())
  }
}
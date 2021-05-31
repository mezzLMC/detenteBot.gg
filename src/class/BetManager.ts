import { CommandMessage } from "@typeit/discord";
import { Channel, Message, MessageEmbed } from "discord.js";
import { BetData } from "../types";
import { client } from "../app"
var fs = require("fs")
const disbut = require('discord-buttons')(client);
var blank = "\u200B"

var doubleQuoteSentence = /\"([^"])*\"/
var solution1 = /\"\s([^"])*((\s\|)|(\|))/
var solution2 = /(\|\s[^"]+)|(\|[^"]+)/
var config = require("../config.json")


client.on('clickButton', async (button) => {
  if (button.id === 'click_to_function') {
    button.channel.send(`${button.clicker.user.tag} clicked button!`);
  }
});


export function createBet(message: CommandMessage){

}

export class Bet{
  timer: number;
  name: string;
  s1: string;
  s2: string;
  id: string;
  sender: Message["author"];
  source: Message["channel"];
  numid: number;

  getDatas(){
    var betData:BetData = require("../bet.json");
    return betData
  }


  constructor(id: string = ""){
    if(id!= ""){
      this.id = id
      this.numid = Number(id.replace("bet",""))
      var obj = this.getDatas().betData[this.numid]
    }
  }

  createButton(amount){
    return new disbut.MessageButton()
    .setStyle('blurple') //default: blurple
    .setLabel(amount) //default: NO_LABEL_PROVIDED
    .setID(this.id + ":" + amount) 
  }
  

  createFromMsg(message: CommandMessage){
    this.timer = 30
    this.name = message.content.match(doubleQuoteSentence)[0].replace("\"","").replace("\"","")
    this.s1 = message.content.match(solution1)[0].replace("\"","").replace("|","")
    this.s2 = message.content.match(solution2)[0].replace("|","")
    this.sender = message.author;
    this.source = message.channel;
    this.id = "bet" + this.getDatas().betData.length;
    var newDatas = this.getDatas()
    newDatas.betData.push({
      name : this.name,
      s1: this.s1,
      s2: this.s2,
      bettors: {
        s1: [],
        s2: [],
      }
    })

    fs.writeFileSync("./src/bet.json", JSON.stringify(newDatas,null,1))
    this.sendMessage()
    return(new Bet(this.id))
  }

    sendMessage(){
        console.log("cc")
        let embed = new MessageEmbed()
        .setTitle(":game_die: paris: " + this.name + "?")
        .setDescription(
          this.sender.toString() + " a lancé un paris! \n"
          + "**" + this.name + "? paris une somme d'argent sur la solution!**")
        .addField("solutions",
        "**"+ this.s1 +  " :** *cote: 1,03* \n"+
        "**"+this.s2 +  ":** *cote: 1,05*"
        )
      let betS1 = new disbut.MessageButton()
      .setStyle('red') //default: blurple
      .setLabel(this.s1) //default: NO_LABEL_PROVIDED
      .setID(this.id + ":" + this.s1) //note: if you use the style "url" you must provide url using .setURL('https://example.com')
       
      let betS2 = new disbut.MessageButton()
      .setStyle('green') //default: blurple
      .setLabel(this.s2) //default: NO_LABEL_PROVIDED
      .setID(this.id + ":" + this.s2) //note: if you use the style "url" you must provide url using .setURL('https://example.com')

      client.on('clickButton', async (button) => {
          console.log(button.id)
          await button.reply.send(`${button.clicker.user.toString()} à choisi ${button.id.split(":")[1]}` ).then(() => {
            setTimeout(() => button.reply.delete(), 900)
          })


      });

        this.source.send(embed)
        this.source.send(<any>({
          content: "**choisis une solution:**",
          buttons: [
            betS1, betS2
          ]
        }))
        this.source.send(<any>({
          content: "**choisis une somme:** ",
          buttons: [
            this.createButton(10),
            this.createButton(100),
            this.createButton(1000),
            this.createButton(10000)
          ]
        }))
      }

    getOdds(){
      var lenght1 = this.getDatas().betData[this.numid].bettors.s1.length
      var lenght2 = this.getDatas().betData[this.numid].bettors.s2.length
      var proba1 = lenght1/(lenght1+lenght2)
      var proba2 = lenght2/(lenght1+lenght2)
      var odd1 = 1/proba1
      var odd2 = 1/proba2
      return {
        s1: odd1,
        s2: odd2,
      }
    }

    addBetter(id: string,amount: string,target: "s1" | "s2"){
      var newData = this.getDatas()
      newData.betData[this.numid].bettors[target].push({
        user: id,
        amount: Number(amount)
      })
      fs.writeFileSync("./src/bet.json", JSON.stringify(newData,null,1))
    }

}

//Vous pouvez d'ailleurs facilement convertir la cote en pourcentage en effectuant l'opération (1/cote) x 100


/*
timeOut(timer*1000)
add state open/close
if(open) => addBetter.
modifymessage => initialMessage state?

??admin closing?

*/

/**
 * onclick:
 *  -already user betting? 
 *    no? : create + add id
 * 
 *  -
 * 
 * onvalidation:
 *  -amount + solution? give : undefined
 */
import {Command, CommandMessage, Discord, Infos, On} from "@typeit/discord";
import { errorEmbed, adminEmbed } from "../class/embedTemplates";
import { Player } from "../class/Player";
import { CategoryChannel, Client, Collection, Guild, GuildMember, Message, MessageEmbed } from "discord.js"
import { client } from "../app"
var file = require('file-system');
var fs = require('fs');
var config = require("../config.json")
var blank = "\u200B"


@Discord(config.prefix) // Decorate the class
@Infos({ forAdmins: true })
abstract class AppDiscord {




  @Command("music")
  private async MusicInfo(message: CommandMessage){
    let botArray = ["234395307759108106","547905866255433758","614109280508968980","235088799074484224"]

    let responses = {
        "Groovy": "**Groovy:** `-p [lien youtube ou nom du son]`|`-pause`|`-skip`|`-help` \n",
        "Hydra": "**hydra:** `.play [lien youtube ou nom du son]`|`.pause`|`.skip`|`.help`\n",
        "Chip": "**chip:** `ch!play [lien youtube ou nom du son]` pour lancer puis utiliser les boutons | `.help`\n",
        "Rythm": "**rythm:** `!p [lien youtube ou nom du son]`|`!pause`|`!fs`|`.help`\n"
    }

    let botUser:any = await message.guild.members.fetch({ user: botArray})
    let bots:Array<any> = botUser.map(function(m) {
        return {
            id : m.user.id,
            name: m.user.username,
            voice: m.voice.channel,
        }
    })
    let s = ""
    bots.forEach(e=>{
        if(!e.voice){
            s = s+responses[e.name]+"\n"
        }
    })
    const embed = new MessageEmbed()
    .setTitle("Bots musique")
    .addField("**Bots de musique disponibles:**",s)
    .setColor("DARK_AQUA")
    message.channel.send(embed)
  }

}

//groovy 234395307759108106
//hydra 547905866255433758
//chip 614109280508968980
//rythm 235088799074484224


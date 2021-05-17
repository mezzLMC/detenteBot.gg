var Discord = require("discord.js")
const bot = new Discord.Client()
var file = require('file-system');
var fs = require('fs');
const help = require("./class/Help.js")
const emploi = require("./class/Emploi.js")
const newLife = require("./class/newLife.js")
const status = require("./class/Status.js")


var blank = "\u200B"
const config = require("./token.json")
let data = require("./data.json")
const prefix = config.prefix


bot.on("ready",async ()=>{
    bot.user.setStatus("dnd")
    bot.user.setActivity("%help | sinj>femmes")
    console.log("bot on")
})

bot.on("message", message => {
    let channel = message.channel

    if(message.content.startsWith(prefix + "test")){
        channel.send("test passed!")
    }

    if(message.content.startsWith(prefix + "help")){
        help(message)

    }

    if(message.content.startsWith(prefix + "newlife")){
        newLife(message)
    }

    if(message.content.startsWith(prefix + "status")){
        status(message)
    }

    if(message.content.startsWith(prefix + "shop")){
        const user = message.author
        const id = message.author.id
        emploi.pauleEmploi(message,id.toString())
    }

    if(message.content.startsWith(prefix + "careers")){
        const user = message.author
        const id = message.author.id
        emploi.careers(message,id.toString())
    }

    
} )









bot.login(config.token)


const Discord = require("discord.js")
const bot = new Discord.Client()
const config = require("./token.json")
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
        channel.send("demande a maz moi j'ai pas ton temps")
    }

} )









bot.login(config.token)


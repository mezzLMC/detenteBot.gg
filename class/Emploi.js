var Discord = require("discord.js")
var file = require('file-system');
var fs = require('fs');

const config = require("../token.json")
var blank = "\u200B"
let data = require("../data.json")

function getAvailableWorks(id){
    let availableWorks = [];
    userGrade = data[id].grade
    userGrade.forEach(grade => {
        config.works.forEach(work=>{
            if(work.grade == grade){
                availableWorks.push(work)
            }
        })
    });
    return availableWorks;
}

function getWork(work){
    let result = undefined
    config.works.forEach(element =>{
        if(element.cmd == work){
            result = element
        }
    })
    return result
}

function pauleEmploi(message,id){
    dispoworks = getAvailableWorks(id).map(value=>{
        return {
            name: value.name, value: "`" + config.prefix + "careers " + value.cmd +"` | **salaire:** `"+ value.income + "` :coin: " 
        }
    })
    const embed = new Discord.MessageEmbed()
    .setTitle(":necktie: Paule-emploi")
    .addField("diplômes", "*Vous n'avez aucun dipôme pour l'instant*")
    .addField("listes des métiers disponibles:", blank)
    .addFields(dispoworks)
    message.channel.send(embed)
};

function careers(message,id){
    userGrade = data[id].grade
    trigger = message.content.split(" ")[1]
    if(getWork(trigger)){
        if(userGrade.includes(getWork(trigger).grade)){
            data[id].work = getWork(trigger).name
            fs.writeFileSync("./data.json", JSON.stringify(data))
            const embed = new Discord.MessageEmbed()
            .setTitle(':necktie: Paule-emploi' )
            .setDescription(message.author.toString() + " tu es désormais "+ getWork(trigger).name +"!")
        }
        else{
            const embed = new Discord.MessageEmbed()
            .setTitle(':no_entry: action impossible' )
            .setColor(0xff0000)
            .setDescription(message.author.toString() + "il te faut le diplôme " + getWork(trigger).grade + "pour cet emploi")
            message.channel.send(embed)
        }
    }
    else{
        const embed = new Discord.MessageEmbed()
        .setTitle(':no_entry: action impossible' )
        .setColor(0xff0000)
        .setDescription(message.author.toString() + " Ce métier n'existe pas!")
        message.channel.send(embed)

    }
}


module.exports = {
    pauleEmploi: pauleEmploi,
    careers: careers
}


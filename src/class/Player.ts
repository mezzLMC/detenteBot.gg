import {User} from '../types'

var file = require('file-system');
var fs = require('fs');
var config = require("../config.json")

export class Player {

    id: string;

    constructor(id: string){
        this.id = id
    }

    updateData(data){
        let futurData = require("../data.json")
        futurData[this.id] = data
        fs.writeFileSync("./src/data.json",JSON.stringify(futurData, null, 1))
    }

    getData(){
        let data:User = require("../data.json")[this.id]
        return data
    }

    getAttribute(attrib: string){
        return this.getData()[attrib]
    }

    addMoney(amount: number){
        let data = this.getData()
        data.wallet += amount
        this.updateData(data)
    }

    deposit(amount = this.getData().wallet){
        let data = this.getData()
        data.wallet = data.wallet - amount
        data.bank = data.bank + amount
        this.updateData(data)
    }

    withdraw(amount = this.getData().bank){
        let data  = this.getData()
        data.bank = data.bank - amount
        data.wallet = data.wallet + amount
        this.updateData(data)
    }

    getAvailableWorks(){
        let data = this.getData()
        let availableWorks = [];
        var userGrade = data.grade
        userGrade.forEach(grade => {
            config.works.forEach(work=>{
                if(work.grade == grade){
                    availableWorks.push(work)
                }
            })
        });
        return availableWorks;
    }

    setWork(work: string){
        let data = this.getData()
        data.work = work
        this.updateData(data)
    }

    setClaimCounter(){
        let data = this.getData()
        const futurData = require("../data.json")
        data.claimCount = 120
        let intv = setInterval(()=>{
            data.claimCount = data.claimCount-1
            if(data.claimCount>=0){
                this.updateData(data)
            }
            else{
                clearInterval(intv);
            }
        },1000)
    }

    getClaimCount(): number {
        return this.getData().claimCount
    }


    setCurrency(account:"bank" | "wallet", action: "remove" | "add", amount: number){
        let data = this.getData()
        const futurData = require("../data.json")
        let obj = {
            "remove" : function(account,amount){ data[account] = data[account] - amount},
            "add" : function(account,amount){ data[account] = data[account] + amount}
        }
        obj[action](account,amount)
        this.updateData(data)
    }


}

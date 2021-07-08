import { BetData } from "./types";
let data:BetData = require("./bet.json").betData

let s1 = data[27].s1
let s2 = data[27].s2


let lenght1 = Object.keys(data[27].bettors).filter((element) =>{data[27].bettors[element].solution == s1})
console.log(lenght1)
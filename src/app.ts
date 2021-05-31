import {Client, Discord } from "@typeit/discord";
var blank = "\u200B"
var file = require('file-system');
var fs = require('fs');
var config = require("./config.json")

export const client = new Client({
    classes: [`${__dirname}/discord/*.ts`],
    silent: false,
    variablesChar: ":"
  });


async function start() {
  await client.login("ODMyMDUyODY3NjIzMjg4ODUy.YHeLng.Z0Uw5MWdN8llPHyC0zcr9yJ1W9c");
}

start();
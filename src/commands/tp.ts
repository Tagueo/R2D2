import fs from "fs";
import { Message } from "discord.js";
import { R2D2 } from "../bot";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
  const config = JSON.parse(fs.readFileSync("./config.json").toString());

  config.tp++;

  message.channel.send(`Nombre de TPs waste : ${config.tp} <:sardNrv:727078428171436084>`)

  fs.writeFileSync("./config.json", JSON.stringify(config));
}
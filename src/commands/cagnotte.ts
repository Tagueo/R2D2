import { Message, TextChannel } from "discord.js";
import { R2D2 } from "../bot";
import fs from "fs";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
  const data = await fs.readFileSync("./config.json", 'utf8')

  const config = JSON.parse(data);
  
  message.channel.send(`Le montant de la cagnotte s'élève à ${config.cagnotte}€`)
}
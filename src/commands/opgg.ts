import { Message } from "discord.js";
import { R2D2 } from "../bot";
import config from "../config.json";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
  if (!config.commandsChannels.includes(message.channel.id)) {
    return message.reply("Fait ça dans <#720694689707327490> sale fou <:aya:727078428091613184>")
  }

  message.channel.send("Compte Main : https://euw.op.gg/summoner/userName=So%CE%99o%20Q%20Only\nCompte Zyra Jungle : https://euw.op.gg/summoner/userName=Herbo+Jungler\n**DuoQ :**\nSardoche : https://euw.op.gg/summoner/userName=Le%CE%99ouch \nMyw : https://euw.op.gg/summoner/userName=Suzak%CF%85")
}
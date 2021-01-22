import { Message } from "discord.js";
import { R2D2 } from "../bot";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
  message.channel.send(`Timing nash optimal : ${Math.floor(Math.random() * Math.floor(35)) + 15} minutes`)
}
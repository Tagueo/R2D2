import { Message } from "discord.js";
import { R2D2 } from "../bot";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
  let user = message.mentions.members?.first() || message.author

  if (user.id === '239057417311092736') {
    user = message.author;
  }

  message.channel.send({ content: `${user} Maeiv a dit`, files: ['https://tenor.com/view/jean-pierre-coffe-coffe-mais-c-est-d-la-merde-merde-gif-18894892.gif']});
}
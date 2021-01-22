import { Message } from "discord.js";
import { R2D2 } from "../bot";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
  let user = message.mentions.members?.first() || message.author

  if (user.id === '239057417311092736') {
    user = message.author;
  }

  message.channel.send({ content: `LA PLACE DE ${user} C'EST A LA KOUISINE <:kouizine:753310092287541249>`, files: ['https://i.imgur.com/oRkZtR8.png']});
}


import { Message, TextChannel } from "discord.js";
import { R2D2 } from "../bot";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
  let user = message.mentions.members?.first() || message.author

  if (user.id === '239057417311092736') {
    user = message.author;
  }

  message.channel.send({ content: `je t'en conjure ${user} ferme ta putain de gueule`, files: ['https://i.imgur.com/z2zGhhC.png']});
}


import { Message, MessageAttachment } from "discord.js";
import { R2D2 } from "../bot";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
  message.channel.send("Bip Boup")
  const attachment = new MessageAttachment('https://i.imgur.com/Vg9hQSd.gif');
  // Send the attachment in the message channel
  message.channel.send(attachment);

  message.delete();
}


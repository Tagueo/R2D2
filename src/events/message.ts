import { R2D2 } from "../bot";
import chalk from "chalk";
import { Message, MessageAttachment } from 'discord.js';
import { logger } from "../modules/logger";
import Levels from "../modules/levels";

module.exports = async (client: R2D2, message: Message) => {
  if (!message.guild) return;

  if (message.author.bot) return;

  var botPrefix = "r2d2 ";

  if (message.content.toLowerCase().indexOf("bretagne") > -1) {
    const attachment = new MessageAttachment('https://i.imgur.com/ParX3Tr.png');
    // Send the attachment in the message channel
    message.reply(attachment);
  }

  if (message.content.length > 4) {
    const userId = message.author.id;

    const next = await Levels.addUserIfNotExists(userId);

    if (next)
      Levels.addXpToUser(userId, message);
  }
  
  if (message.content.toLowerCase().startsWith(botPrefix)) {
    const args = message.content.slice(botPrefix.length).trim().split(/ +/g);

    var command = args.shift()?.toLowerCase();
  
    if (command) {
      const cmd = client.commands.get(command);

      if (!cmd) {
        return;
      }
    
      cmd.run(client, message, args);
      
      logger("Command", `[${chalk.yellow(message.author.tag)}] used ${chalk.green(command)} ${chalk.cyan(args.join(" "))}`)
    }
  }
};

import { Message, MessageEmbed } from "discord.js";
import { R2D2 } from "../bot";

import config from "../config.json";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
  if (config.commandsChannels.includes(message.channel.id)) {
    const embed = new MessageEmbed()
      .setTitle('R2D2')
      .setColor(0xff0000)
      .setDescription('Elo : D2 53LP')
      .addField('r2d2 don', 'Faire un don a la <#751058196961165455>')
      .addField('r2d2 lien', 'Avoir le lien du serveur')
      .addField('r2d2 nash', 'Avoir le timing nash optimal')
      .addField('r2d2 opgg', 'Avoir l\'opgg de r2d2 et ses mates')
      .addField('r2d2 bet rules', 'Parier sur la game en cours de r2d2')
      .addField('r2d2 tp', 'Compter les TPs foirées de notre Sardoche')
      .addField('r2d2 ping', 'Bip Boup');

    return message.channel.send(embed);
  }

  return message.reply("Fait ça dans le channel commandes sale fou <:aya:727078428091613184>")
}
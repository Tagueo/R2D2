import { Message, MessageEmbed } from "discord.js";
import { R2D2 } from "../bot";

import config from "../config.json";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
  if (config.commandsChannels.includes(message.channel.id)) {
    const embed = new MessageEmbed()
      .setTitle('R2D2')
      .setColor(0xff0000)
      .setDescription('Elo : D2 53LP')
      .addField('Exp :', '- **r2d2 rank** : voir votre rank\n- **r2d2 levels** : voir le leaderboard')
      .addField('Mentions :', '- **r2d2 ashura <mention>** : ferme ta gueule\n- **r2d2 maeiv <mention>** : c\'est de la merde\n- **r2d2 comedy <mention>** : Earned the achievement comedy\n- **r2d2 cuisine <mention>** : c cu cui cuisine 😳')
      .addField('r2d2 don', 'Faire un don a la cagnotte <:ronaldoRiche:749321625702367352>')
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
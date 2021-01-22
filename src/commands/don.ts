import { Message, TextChannel } from "discord.js";
import { R2D2 } from "../bot";
import { Config } from "../types";
import fs from "fs";

import config from "../config.json";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
  if (message.guild) {
    const cagnotteChannel = await client.channels.fetch((config as any as Config).cagnotteChannels[message.guild.id]);

    const data = await fs.readFileSync("./config.json", 'utf8')
    const configdat = JSON.parse(data);

    const amount = generateAmount();

    (cagnotteChannel as TextChannel).send(`Bip Boup, merci <@!${message.author.id}> pour le don de ${amount}€`)

    configdat.cagnotte += amount;

    await fs.writeFileSync("./config.json", JSON.stringify(configdat));

    message.channel.send(`Merci pour le don <@!${message.author.id}>!`);
  }
}

function generateAmount() {
  let amount1 = Math.floor(Math.random() * Math.floor(40)) + 1;
  let amount2 = Math.floor(Math.random() * Math.floor(40)) + 1;

  return amount2 > amount1 ? amount1 : amount2;
}
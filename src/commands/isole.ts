import { Message } from "discord.js";
import { Config, IsoleConfig } from "../types";
import { R2D2 } from "../bot";

import config from "../config.json";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
  for (const serverId in config.isoleServers) {
    if (message.guild?.id === serverId) {
      const isoleConfig: IsoleConfig = (config as any as Config).isoleServers[serverId];
      
      for (const id of isoleConfig.authorizedRoles) {
        if (message.member?.roles.cache.has(id)) {
          return isole(message, args, isoleConfig.addRole, isoleConfig.removeRole)
        }
      }
    }
  }
};

async function isole(message: Message, args: Array<string>, addRoleId: string, removeRoleId: string) {
  try {
    let user = message.mentions.users.first();

    if (!args[0] || !user) {
      return message.channel.send("Usage : r2d2 isole @user (temps en minutes)");
    }

    const member = await message.guild?.members.fetch(user.id);

    if (member) {
      const addRole = await message.guild?.roles.fetch(addRoleId);
      const removeRole = await message.guild?.roles.fetch(removeRoleId);
    

      if (args[1] && addRole && removeRole) {
        member.roles.add(addRole);
        member.roles.remove(removeRole);
        
        message.channel.send(`${user} à été ISOLED pour ${args[1]} minute(s) <:rire2:727078428184150077>`);

        const time = parseInt(args[1]) * 60 * 1000;

        setTimeout(function () {
          member.roles.add(removeRole);
          member.roles.remove(addRole);

          message.channel.send(`${user} n'est plus isolé <:sardSad:727078428121104407>`);
        }, time);
      } else if (addRole && removeRole) {
        member.roles.add(addRole);
        member.roles.remove(removeRole);

        message.channel.send(`${user} à été ISOLED <:rire2:727078428184150077>`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

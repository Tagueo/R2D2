import { Level } from "chalk";
import { Message } from "discord.js";
import { R2D2 } from "../bot";
import Leveling from "../modules/leveling";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
    const user = await Leveling.getUserXp(message.guild.id, message.author.id);
    let maxXp = Leveling.getMaxXp(user.userLevel);

    let progress = (user.userXp / maxXp) * 20;
    let progressBar = "";

    for (let i = 0; i < progress; i++)
        progressBar += "⬤"

    for (let i = progressBar.length; i <= 20; i++)
        progressBar += "○"

    let desc =
        `**Position**: #${user.userRank}\n
        **Level**: ${user.userLevel}\n
        **XP**: ${user.userXp}/${maxXp}
        ${progressBar}`;

    const embed = {
        title: `Rank - ${message.member.displayName}`,
        description: desc,
        color: message.member.roles.highest.hexColor,
        timestamp: Date.now(),
        thumbnail: {
            url: message.author.avatarURL().toString()
        }
    }

    message.channel.send({ embed })
}
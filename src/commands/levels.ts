import { Message } from "discord.js";
import { parse } from "path";
import { R2D2 } from "../bot";
import Leveling from "../modules/leveling";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
    const leaderboard = await Leveling.getLeaderboard(message.guild.id);
    let page = parseInt(args[0]) || 1;

    let leaderboardText = "";

    if ((page - 1) * 10 > leaderboard.length) {
        page = 1;
    }

    let start = (page - 1) * 10;
    let end = (page * 10) - 1 >= leaderboard.length ? leaderboard.length - 1 : (page * 10) - 1;

    for (let i = start; i <= end; i++) {
        const user = leaderboard[i];

        let maxXp = Leveling.getMaxXp(user.userLevel);
        switch (i) {
            case 0:
                leaderboardText += `**🥇 `
                break;
            case 1:
                leaderboardText += `**🥈 `
                break;
            case 2:
                leaderboardText += `**🥉 `
                break;
            default:
                leaderboardText += `**${i + 1} `
                break;
        }

        leaderboardText += `- <@!${user.userId}>**: Level ${user.userLevel} - XP: ${user.userXp}/${maxXp}\n\n`
    }

    const embed = {
        title: "Leaderboard",
        description: leaderboardText,
        color: 48127,
        timestamp: Date.now(),
        footer: {
            text: `Page ${page}/${Math.round((leaderboard.length / 10 < 1 ? 1 : leaderboard.length / 10))}`
        }
    };

    message.channel.send({ embed });
}
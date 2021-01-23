import { Message } from "discord.js";
import { makeQuery } from "../database/handler";
import { logger } from "../logger";
import { getMaxXp } from "./getMaxXp";
import { DbUser } from "./index";


export async function addXpToUser(userId: string, message: Message): Promise<boolean> {
    try {
        let guildId = message.guild.id;
        
        const res: Array<DbUser> = await makeQuery(`SELECT * FROM r2d2Levels.${guildId} WHERE userId = '${userId}';`);

        if (res.length == 1) {
            const user = res[0];

            let level: number = user.userLevel;
            let xp: number = user.userXp;

            let add = ((Math.random() + 1) * 25);

            xp += add;

            if (xp >= getMaxXp(user.userLevel)) {
                level++;
                xp = 0;
                message.channel.send(`<:pepeOmega:727078428259385416> <@!${userId}> est passé au niveau ${level}.`);
            }

            await makeQuery(`UPDATE r2d2Levels.${guildId} SET userLevel = ${level}, userXp = ${xp} WHERE userId = '${userId}';`);
            return true;

        } else {
            logger("Levels > addXpToUser:", "User does not exists/is duplicate: " + userId, "error");
            console.log(res);
            return false;
        }
    } catch (error) {
        logger("Levels > addXpToUser:", "Error when adding xp: " + error, "error");
        return false;
    }
}

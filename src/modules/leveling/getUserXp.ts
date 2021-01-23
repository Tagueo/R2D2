import { makeQuery } from "../database/handler";
import { logger } from "../logger";
import { addUserIfNotExists } from "./addUserIfNotExists";
import { LevelProfile, DbUser } from ".";


export async function getUserXp(guildId: string, userId: string): Promise<LevelProfile | null> {
    try {
        const selRes: Array<DbUser> = await makeQuery(`SELECT * FROM r2d2Levels.${guildId} WHERE userId = '${userId}';`);

        if (selRes.length != 1) {
            await addUserIfNotExists(guildId, userId);
            return null;
        }

        const user = selRes[0];

        const rankRes: Array<DbUser> = await makeQuery(`select * from r2d2Levels.${guildId} order by userLevel DESC, userXp DESC;`);

        let rank = 0;
        for (; rank < rankRes.length; rank++) {
            const user = rankRes[rank];
            if (user.userId === userId) {
                rank++;
                break;
            }
        }

        const levelProfile: LevelProfile = {
            ...user,
            userRank: rank
        };

        return levelProfile;
    } catch (error) {
        logger("Levels > getUserXp:", "Error when adding a new user: " + error, "error");
        return null;
    }
}

import { makeQuery } from "../database/handler";
import { logger } from "../logger";
import { DbUser } from "./index";

export async function addUserIfNotExists(guildId: string, userId: string): Promise<boolean> {
    try {
        const res: Array<DbUser> = await makeQuery(`SELECT * FROM r2d2Levels.${guildId} WHERE userId = ${userId};`);

        if (res.length == 0) {

            await makeQuery(`INSERT INTO r2d2Levels.${guildId} (userId, userLevel, userXp) VALUES (${userId}, 1, 0);`);
            return true;

        } else if (res.length < 0) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        logger("Levels > addUserIfNotExists:", "Error when adding a new user: " + error, "error");
        return false;
    }
}

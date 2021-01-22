import { makeQuery } from "./database/handler";
import { logger } from "./logger";

function init() {
    try {
        makeQuery("CREATE DATABASE 'r2d2';")
        makeQuery("CREATE TABLE levels (userId VARCHAR(255), userLevel BIGINT, userXp BIGINT);")
    } catch (error) {
        logger("Levels", "Database already existed", "info")
    }
}

async function addUserIfNotExists(userId: string): Promise<boolean> {
    const res = await makeQuery(`SELECT * FROM levels WHERE userId = ${userId};`);

    if (res.length == 0) {
        try {
            makeQuery(`INSERT INTO levels (userId, userLevel, userXp) VALUES (${userId}, 1, 0);`)
            return true;
        } catch (error) {
            logger("Levels", "Error when adding a new user: " + error, "error")
            return false;
        }
    }

    return false;
}

async function addXpToUser(userId: string): Promise<boolean> {
    const res = await makeQuery(`SELECT * FROM levels WHERE userId = ${userId};`);

    if (res.length == 1) {
        const user = res[0];

        let level: number = user[1];
        let xp: number = user[2];

        xp += (1 / level) * ((Math.random() + 1) * 25);

        xp >= 100 + level * 10 ? (level++, xp = 0) : null;

        try {
            logger(`UPDATE levels SET userLevel = ${level}, userXp = ${xp} WHERE userId = ${userId};`)
        } catch (error) {
            logger("Levels", "Error when adding xp: " + error, "error")
        }
    }
    logger("Levels", "User does not exists/is duplicate: " + userId, "error")
    return false;
}

const Levels = {
    init,
    addUserIfNotExists,
    addXpToUser
}

export default Levels;
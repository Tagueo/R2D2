import { Console } from "console";
import { Message } from "discord.js";
import { makeQuery } from "./database/handler";
import { logger } from "./logger";

function init() {
    try {
        makeQuery("CREATE DATABASE IF NOT EXISTS r2d2")
        makeQuery("CREATE TABLE IF NOT EXISTS r2d2.levels (userId VARCHAR(255), userLevel BIGINT, userXp BIGINT);")
    } catch (error) {
        logger("Levels > init", error, "info")
    }
}

async function addUserIfNotExists(userId: string): Promise<boolean> {
    const res = await makeQuery(`SELECT * FROM levels WHERE userId = ${userId};`);

    if (res.length == 0) {
        try {
            makeQuery(`INSERT INTO levels (userId, userLevel, userXp) VALUES (${userId}, 1, 0);`)
            return true;
        } catch (error) {
            logger("Levels > addUserIfNotExists:", "Error when adding a new user: " + error, "error")
            return false;
        }
    } else if (res.length < 0) {
        return false;
    } else {
        return true;
    }
}

async function addXpToUser(userId: string, message: Message): Promise<boolean> {
    const res = await makeQuery(`SELECT * FROM r2d2.levels WHERE userId = '${userId}';`);

    if (res.length == 1) {
        const user = res[0];

        let level: number = user.userLevel;
        let xp: number = user.userXp;

        let add = (1 / level) * ((Math.random() + 1) * 10);

        xp += add;

        if (xp >= 100 + ((level * level) * 10)) {
            level++;
            xp = 0;
            message.channel.send(`<:POGGERS:688420616654684229> <@!${userId}> est passé au niveau ${level}.`)
        }

        try {
            makeQuery(`UPDATE levels SET userLevel = ${level}, userXp = ${xp} WHERE userId = '${userId}';`)
            return true;
        } catch (error) {
            logger("Levels", "Error when adding xp: " + error, "error")
            return false;
        }
    } else {
        logger("Levels > addXpToUser:", "User does not exists/is duplicate: " + userId, "error")
        console.log(res)
        return false;
    }
    
}

const Levels = {
    init,
    addUserIfNotExists,
    addXpToUser
}

export default Levels;
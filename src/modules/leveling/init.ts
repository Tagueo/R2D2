import { R2D2 } from "../../bot";
import { makeQuery } from "../database/handler";
import { logger } from "../logger";

export function init(client: R2D2) {
    try {
        makeQuery("CREATE DATABASE IF NOT EXISTS r2d2Levels");

        client.guilds.cache.array().forEach(guild => {
            makeQuery(`CREATE TABLE IF NOT EXISTS r2d2Levels.${guild.id} (userId VARCHAR(255), userLevel BIGINT, userXp BIGINT);`);
        });
    } catch (error) {
        logger("Levels > init", error, "info");
    }
}

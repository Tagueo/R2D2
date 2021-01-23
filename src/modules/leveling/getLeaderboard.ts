import { makeQuery } from "../database/handler";
import { LevelProfile, DbUser } from "./index";


export async function getLeaderboard(guildId: string): Promise<Array<LevelProfile>> {
    const rankRes: Array<DbUser> = await makeQuery(`select * from r2d2Levels.${guildId} order by userLevel DESC, userXp DESC;`);

    const leaderboard = [];

    for (let i = 0; i < rankRes.length; i++) {
        const user = rankRes[i];

        const levelProfile: LevelProfile = {
            ...user,
            userRank: i + 1
        };

        leaderboard.push(levelProfile);
    }

    return leaderboard;
}

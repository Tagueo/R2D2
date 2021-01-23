import { addUserIfNotExists } from "./addUserIfNotExists";
import { init } from "./init";
import { addXpToUser } from "./addXpToUser";
import { getUserXp } from "./getUserXp";
import { getMaxXp } from "./getMaxXp";
import { getLeaderboard } from "./getLeaderboard";

export interface DbUser {
    userId: string;
    userLevel: number;
    userXp: number;
}

export interface LevelProfile extends DbUser {
    userRank: number;
}

const Leveling = {
    init,
    addUserIfNotExists,
    addXpToUser,
    getUserXp,
    getMaxXp,
    getLeaderboard
}

export default Leveling;
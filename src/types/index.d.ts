import { Collection } from "discord.js";

interface IsoleConfig {
    authorizedRoles: Array<string>;
    addRole: string;
    removeRole: string;
}

interface Config {
    cagnotte: number,
    tp: number,
    commandsChannel: Array<string>
    cagnotteChannels: any
    isoleServers: any
}
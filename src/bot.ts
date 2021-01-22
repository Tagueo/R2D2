import * as Discord from "discord.js";
import Enmap = require("enmap");
import * as fs from "fs";
import * as chalk from "chalk";
import moment = require("moment");

import token from "./token.json";

export class R2D2 extends Discord.Client {
	public commands = new Enmap();
}

const r2d2 = new R2D2({
	fetchAllMembers: true,
});

fs.readdir("./events/", (err, files) => {
	console.log(`[${chalk.cyan(moment(Date.now()).format("h:mm:ss"))}] ${chalk.cyan("Loading events ...")}`)
	if (err) return console.error(err);
	files.forEach((file) => {
		if (!file.endsWith(".js")) return;
		const event = require(`./events/${file}`);
		const eventName = file.split(".")[0];
		r2d2.on(<any>eventName, event.bind(null, r2d2));
		delete require.cache[require.resolve(`./events/${file}`)];
	});
});


r2d2.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
	console.log(`[${chalk.cyan(moment(Date.now()).format("h:mm:ss"))}] ${chalk.cyan("Loading commands ...")}`)
	if (err) {
		return console.error(err);
	}
	files.forEach((file) => {
		if (!file.endsWith(".js")) return;
		const props = require(`./commands/${file}`);
		const commandName = file.split(".")[0];
		r2d2.commands.set(commandName, props);
	});
});

r2d2.login(token.token);

r2d2.on("error", console.error);
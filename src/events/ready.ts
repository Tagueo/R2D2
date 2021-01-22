import chalk from "chalk";
import moment from "moment";
import fs from "fs";
import { R2D2 } from "../bot";
import { TextChannel } from "discord.js";

import config from "../config.json";
import { Config } from "..";

module.exports = async (r2d2: R2D2) => {
	console.log(`[${chalk.cyan(moment(Date.now()).format("h:mm:ss"))}] [${chalk.yellow(r2d2.user?.tag)}] Bip boup`);

	r2d2.user?.setActivity('r2d2 help | Elo : D2 53LP', {
		type: 'WATCHING'
	})

	if(!r2d2.user?.bot) {
		return process.exit(0);
	}

	fakeDon()

	async function fakeDon() {
		const timeout = generateDelay();

		const amount = generateAmount();
	
		for (const id in config.cagnotteChannels) {
			const chann = await r2d2.channels.fetch((config as any as Config).cagnotteChannels[id]);
			(chann as TextChannel).send(`Bip Boup, merci pour le don de ${amount}€`);
		}

		const data = await fs.readFileSync("./config.json", 'utf8')

		const configjs = JSON.parse(data);
			
		configjs.cagnotte += amount;

		await fs.writeFileSync("./config.json", JSON.stringify(configjs));

		console.log(`[${chalk.cyan(moment(Date.now()).format("h:mm:ss"))}] [${chalk.yellow(r2d2.user?.tag)}] Fake donation generated : ${amount}€ -> next fake donation in ${timeout/60/60/1000} hours`);

		setTimeout(() => {
			fakeDon()
		}, timeout);
	}

	function generateDelay() {
		return (Math.random() * Math.floor(8)) * 60 * 60 * 1000;
	}

	function generateAmount() {
		let amount1 = Math.floor(Math.random() * Math.floor(30)) + 1;
		let amount2 = Math.floor(Math.random() * Math.floor(30)) + 1;

		return amount2 > amount1 ? amount1 : amount2;
	}
}
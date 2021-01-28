import fs from "fs";
import { R2D2 } from "../bot";
import { TextChannel } from "discord.js";
import { logger } from "../modules/logger";
import Leveling from "../modules/leveling";

import config from "../config.json";
import { Config } from "../types";


module.exports = async (r2d2: R2D2) => {
	logger("Event", "Bip boup", "success")

	r2d2.user?.setActivity('r2d2 help | Elo : D2 53LP', {
		type: 'WATCHING'
	})

	if(!r2d2.user?.bot) {
		return process.exit(0);
	}

	Leveling.init(r2d2);

	// fakeDon()

	async function fakeDon() {
		const timeout = generateDelay();

		const amount = generateAmount();
	
		for (const id in config.cagnotteChannels) {
			const chann = await r2d2.channels.fetch((config as any as Config).cagnotteChannels[id]);
			(chann as TextChannel).send(`Bip Boup, merci pour le don de ${amount}€`);
		}

		const data = fs.readFileSync("./config.json", 'utf8')

		const configjs = JSON.parse(data);
			
		configjs.cagnotte += amount;

		fs.writeFileSync("./config.json", JSON.stringify(configjs));

		logger("Donation", `Fake donation generated : ${amount}€ -> next fake donation in ${timeout/60/60/1000} hours`, "info")

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
import { Message } from "discord.js";
import { R2D2 } from "../bot";
import * as Canvas from "canvas";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
    let member = message.mentions.members?.first() || message.member
    
    const canvas = Canvas.createCanvas(562, 372)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage('./assets/uwu.png');

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Pick up the pen
	ctx.beginPath();
	// Start the arc to form a circle
	ctx.arc(312, 182, 56, 0, Math.PI * 2, true);
	// Put the pen down
	ctx.closePath();
	// Clip off the region you drew on
	ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 255, 125, 112, 112);

    message.channel.send({ content: `${member}`, files:[ canvas.toBuffer() ] });
}
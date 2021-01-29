import { Message } from "discord.js";
import { R2D2 } from "../bot";
import * as Canvas from "canvas";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
    let member = message.mentions.members?.first() || message.member
    
    const canvas = Canvas.createCanvas(424, 422)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage('./assets/bully.png');

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const authorAvatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(authorAvatar, 185, 60, 50, 50);

    const targetAvatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(targetAvatar, 75, 350, 50, 50);

    message.channel.send({ content: `${member}, you're being overwhelmed by ${message.author}'s power.`, files:[ canvas.toBuffer() ] });
}
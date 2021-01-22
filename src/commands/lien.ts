import { Message } from "discord.js";
import { R2D2 } from "../bot";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
  message.reply("Tu aura la perm d'invitation lorsque tu atteindra le niveau 5")

  // SERVEUR PRIVÉ :
  /*if (
    message.member.roles.cache.has("720694685605298221") ||
    message.member.roles.cache.has("720694685605298220") ||
    message.member.roles.cache.has("720694685605298219") ||
    message.member.roles.cache.has("720694685605298218")
  ) {
    message.member.createDM()
    .then((dm) => {
      message.channel.createInvite({temporary: true, maxAge: 0, maxUses: 1, unique: true, reason: `Invite created by ${message.author.tag}`})
      .then((invite) => {
        dm.send(`Lien d'invitation unique : ${invite.url}`)
        message.reply("ton lien d'invitation à été envoyé en DM")
      })
      .catch(e => console.error(e))
    })
    .catch(e => console.error(e))
  } else {
    message.channel.send("Tu te prends pour qui ? <:maitreyoda:727078427995144234>")
  }*/
}
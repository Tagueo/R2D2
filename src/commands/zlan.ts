import fs from "fs";
import { Message } from "discord.js";
import { R2D2 } from "../bot";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
  message.reply(":sardSad:")
  /*try {
    switch (args[0]) {
      case "confirm":
        confirm();
        break;
      case "ranking":
        ranking();
        break;
      case "rules":
        rules();
        break;
      default:
        bet();
        break;
    }

    function bet() {
      const data = JSON.parse(fs.readFileSync("./data.json"));
      let tier;

      switch (args[0]) {
        case "quarts":
          if (data.zlan.opened.quarts) {
            tier = "quarts";
          } else {
            return message.channel.send("Tu ne peux plus parier sur les quarts <:sardSad:727078428121104407>");
          }
          break;
        case "demis":
          if (data.zlan.opened.demis) {
            tier = "demis";
          } else {
            return message.channel.send("Tu ne peux plus parier sur les demis <:sardSad:727078428121104407>");
          }
          break;
        case "finale":
          if (data.zlan.opened.finale) {
            tier = "finale";
          } else {
            return message.channel.send("Tu ne peux plus parier sur la finale <:sardSad:727078428121104407>");
          }
          break;
        default:
          return message.channel.send("Usage : `r2d2 zlan (quarts/demis/finale) (premier pseudo de l'equipe)`");
      }

      args.splice(0, 1);

      let teamname = args.join(" ").toLowerCase();

      if (!teamname) {
        return message.channel.send("Usage : `r2d2 zlan (quarts/demis/finale) (premier pseudo de l'equipe)`");
      }

      let bets = data.zlan.bets;
      let qcount = 0,
        dcount = 0,
        fcount = 0;
      let qteams = [],
        dteams = [],
        fteams = [];

      bets.forEach((e) => {
        if (e.id == message.author.id) {
          switch (e.tier) {
            case "quarts":
              qcount++;
              qteams.push(e.teamname);
              break;
            case "demis":
              dcount++;
              dteams.push(e.teamname);
              break;
            case "finale":
              fcount++;
              fteams.push(e.teamname);
              break;
          }
        }
      });

      switch (tier) {
        case "quarts":
          if (qcount >= 4) {
            return message.channel.send(`Tu a deja parié sur 4 équipes passant en quart : ${qteams.join(", ")} <:pepeAya:727078428012052532>`);
          } else {
            if (qteams.includes(teamname)) {
              return message.channel.send(`Tu a deja parié sur cette équipe en quart <:pepeAya:727078428012052532>`);
            }
          }
          break;
        case "demis":
          if (dcount >= 2) {
            return message.channel.send(`Tu a deja parié sur 2 équipes passant en demi : ${dteams.join(", ")} <:pepeAya:727078428012052532>`);
          } else {
            if (dteams.includes(teamname)) {
              return message.channel.send(`Tu a deja parié sur cette équipe en demis <:pepeAya:727078428012052532>`);
            }
          }
          break;
        case "finale":
          if (fcount >= 1) {
            return message.channel.send(`Tu a deja parié sur le gagnant de la finale : ${fteams.join(", ")} <:pepeAya:727078428012052532>`);
          } else {
            if (fteams.includes(teamname)) {
              return message.channel.send(`Tu a deja parié sur cette équipe en finale <:pepeAya:727078428012052532>`);
            }
          }
          break;
      }

      data.zlan.bets.push({
        id: message.author.id,
        teamname: teamname,
        tier: tier,
      });

      fs.writeFileSync("./data.json", JSON.stringify(data));

      return message.channel.send(`Paris effectué : l'equipe ${teamname} en ${tier} <:pepeAya:727078428012052532>`);
    }

    function confirm() {
      if (message.member.roles.cache.has("720694685605298221") || message.member.roles.cache.has("720694685605298220") || message.member.roles.cache.has("720694685605298219") || message.member.roles.cache.has("720694685605298218")) {
        let tier;

        switch (args[1]) {
          case "quarts":
            tier = "quarts";
            break;
          case "demis":
            tier = "demis";
            break;
          case "finale":
            tier = "finale";
            break;
          default:
            return message.channel.send("Usage : `r2d2 zlan confirm (quarts/demis/finale) (premier pseudo de l'equipe)`");
        }

        args.splice(0, 2);

        let teamname = args.join(" ").toLowerCase();

        if (!teamname) {
          return message.channel.send("Usage : `r2d2 zlan confirm (quarts/demis/finale) (premier pseudo de l'equipe)`");
        }

        const data = JSON.parse(fs.readFileSync("./data.json"));

        let users = [];
        
        data.zlan.bets.forEach((e) => {
          if (e.tier != tier) {
            return;
          }
          if (e.teamname != teamname) {
            return;
          }
          
          if (!data.zlan.leaderboard[e.id]) {
            data.zlan.leaderboard[e.id] = {points: 0};
          }

          switch (e.tier) {
            case "quarts":
              data.zlan.leaderboard[e.id].points += 3;
              break;
            case "demis":
              data.zlan.leaderboard[e.id].points += 6;
              break;
            case "finale":
              data.zlan.leaderboard[e.id].points += 12;
              break;
          }

          users.push(e.id)
        })

        fs.writeFileSync("./data.json", JSON.stringify(data));

        if (users.length > 0) {
          message.channel.send(`Bravo à <@!${users.join('>, <@!')}> pour avoir prédis le passage de l'equipe ${teamname} en ${tier} <:pepeAya:727078428012052532>`)
        } else {
          message.channel.send("personne a trouvé les nuls <:pepeAya:727078428012052532>")
        }
      }
    }

    function rules() {
      message.channel.send("**Participants :**\nUtiliser le premier pseudo de l'equipe pour la selectionner lors du paris\n*Exemple : equipe Sardoche & Titatitutu en quart* -> `r2d2 zlan quart sardoche`");
      const participants = new MessageAttachment("http://z-lan.fr/wp-content/uploads/2020/08/liste_participants.png");
      message.channel.send(participants).then(() => {
        message.channel.send("Vous pouvez parier sur 4 équipes passant en quarts, 2 équipes passant en demis, et le gagnant de la finale.");
      });
    }

    async function ranking() {
      await message.channel.send("Bracket final:");
      let att = new MessageAttachment("http://z-lan.fr/wp-content/uploads/2020/08/bracket_30082020-000633-1.jpg");

      await message.channel.send(att);
    }
  } catch (error) {
    message.channel.send("erreur <:sardSad:727078428121104407>");
    console.error(error);
  }*/
};

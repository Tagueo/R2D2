import { Message, MessageEmbed } from "discord.js";
import { R2D2 } from "../bot";
import fs from "fs";

module.exports.run = async (client: R2D2, message: Message, args: Array<string>) => {
  try {
    switch (args[0]) {
      case "start":
        start(message, args);
        break;
      case "end":
        end(message, args);
        break;
      case "help":
      case "rules":
        rules(message);
        break;
      case "top":
      case "leaderboard":
        leaderboard(message);
        break;
      case "notifs":
        notifs(message);
        break;
      case "points":
        points(message);
        break;
      default:
        bet(message, args);
        break;
    }
  } catch (error) {
    message.channel.send("erreur :sardSad:");
    console.error(error);
  }
};

function points(message) {
  if (message.channel.id === '727069862186450975') {
    return message.reply("Fait ça dans <#720694689707327490> sale fou <:aya:727078428091613184>")
  }

  const data = JSON.parse(fs.readFileSync("./data.json").toString());

  const userId = message.author.id;

  

  if (data.leaderboard.data[userId]) {
    const userData = data.leaderboard.data[userId];

    message.reply(
      `tu as gagné ${userData.points} points pour ${userData.won} paris gagnés, soit ${Math.round(((userData.points / userData.won) + Number.EPSILON) * 100) / 100} points par paris remportés.`
    );
  } else {
    message.reply(
      `tu n'as pas encore fait de paris <:sardSad:727078428121104407>.`
    );
  }
}

function start(message, args) {
  const data = JSON.parse(fs.readFileSync("./data.json").toString());
  if (
    message.member?.roles.cache.has("720694685605298221") ||
    message.member?.roles.cache.has("720694685605298220") ||
    message.member?.roles.cache.has("720694685605298219") ||
    message.member?.roles.cache.has("720694685605298218")
  ) {
    if (data.bet.ingame) {
      return message.channel.send(
        "Une partie est déjà en cours. Utilise `r2d2 bet end (win/lose) (kills/death/assists)` pour l'arrêter"
      );
    }

    let time;
    args[1] ? (time = parseInt(args[1])) : (time = 10);

    data.bet.opened = true;

    setTimeout(endBets, time * 60 * 1000, message);

    data.bet.ingame = true;

    message.channel.send(
      `Les paris sur la game en cours ont été lancés <@&727073372328034374> !\nUtilise \`r2d2 bet (win/lose) (kills/death/assists)\` pour faire ta prédiction !\nVous avez ${time} minutes !`
    );
  } else {
    return message.channel.send(
      "Demande à un Ancien ou plus haut placé de commencer les paris."
    );
  }
  fs.writeFileSync("./data.json", JSON.stringify(data));
}

function endBets(message: Message) {
  const data = JSON.parse(fs.readFileSync("./data.json").toString());
  if (message) {
    message.channel.send(
      `Les paris sur la game en cours sont terminés !`
    );
    data.bet.opened = false;
  }
  fs.writeFileSync("./data.json", JSON.stringify(data));
}

function end(message, args) {
  const data = JSON.parse(fs.readFileSync("./data.json").toString());
  if (
    message.member?.roles.cache.has("720694685605298221") ||
    message.member?.roles.cache.has("720694685605298220") ||
    message.member?.roles.cache.has("720694685605298219") ||
    message.member?.roles.cache.has("720694685605298218")
  ) {
    if (!data.bet.ingame) {
      return message.channel.send(
        "Aucune partie n'est en cours. Utilise `r2d2 bet start` pour en commencer une."
      );
    }

    if (!args[1] || (args[1] != "win" && args[1] != "lose")) {
      return message.channel.send(
        "Mauvaise utilisation : fait `r2d2 bet end (win/lose) (kills/death/assists)`"
      );
    }

    const regex = new RegExp(/[0-9]+(\/[0-9]+)+((?![a-z]).)*$/gi);

    if (!args[2] || !regex.test(args[2])) {
      return message.channel.send(
        "Mauvaise utilisation : fait `r2d2 bet end (win/lose) (kills/death/assists)`"
      );
    }

    let goodResult = args[1];
    let goodKDA = args[2].split("/");

    let usersWonResult = [],
      usersWonKills = [],
      usersWonDeath = [],
      usersWonAssists = [],
      usersWonKDA = [];

    let usersWonResultString = "Joueurs ayant deviné le résultat (+1 pt) : ";
    let usersWonKillsString = "Joueurs ayant deviné les kills (+2 pts) : ";
    let usersWonDeathString = "Joueurs ayant deviné les morts (+2 pts) : ";
    let usersWonAssistsString = "Joueurs ayant deviné les assists (+2 pts) : ";
    let usersWonKDAString = "Joueurs ayant deviné le KDA complet (+10 pts) : ";

    for (let i = 0; i < data.bet.users.length; i++) {
      const user = data.bet.users[i];

      if (goodResult === user.result) {
        usersWonResult.push(user.id);
        usersWonResultString += `<@!${user.id}> `;
        data.leaderboard.data[user.id].points++;
        data.leaderboard.data[user.id].won++;
      }

      if (goodKDA[0] === user.kda[0]) {
        usersWonKills.push(user.id);
        usersWonKillsString += `<@!${user.id}> `;
        data.leaderboard.data[user.id].points += 2;
        data.leaderboard.data[user.id].won++;
      }

      if (goodKDA[1] === user.kda[1]) {
        usersWonDeath.push(user.id);
        usersWonDeathString += `<@!${user.id}> `;
        data.leaderboard.data[user.id].points += 2;
        data.leaderboard.data[user.id].won++;
      }

      if (goodKDA[2] === user.kda[2]) {
        usersWonAssists.push(user.id);
        usersWonAssistsString += `<@!${user.id}> `;
        data.leaderboard.data[user.id].points += 2;
        data.leaderboard.data[user.id].won++;
      }

      if (arraysMatch(goodKDA, user.kda)) {
        usersWonKDA.push(user.id);
        usersWonKDAString += `<@!${user.id}> `;
        data.leaderboard.data[user.id].points += 10;
        data.leaderboard.data[user.id].won++;
      }
    }

    usersWonResultString += `\nTotal : ${usersWonResult.length}/${data.bet.users.length}\n`;
    usersWonKillsString += `\nTotal : ${usersWonKills.length}/${data.bet.users.length}\n`;
    usersWonDeathString += `\nTotal : ${usersWonDeath.length}/${data.bet.users.length}\n`;
    usersWonAssistsString += `\nTotal : ${usersWonAssists.length}/${data.bet.users.length}\n`;
    usersWonKDAString += `\nTotal : ${usersWonKDA.length}/${data.bet.users.length}\n`;

    message.channel.send(
      "Les paris sur la game sont terminés !\n**Voici les resultats :**\n"
    );
    message.channel.send(usersWonResultString);
    message.channel.send(usersWonKillsString);
    message.channel.send(usersWonDeathString);
    message.channel.send(usersWonAssistsString);
    message.channel.send(usersWonKDAString);

    data.bet.ingame = false;
    data.bet.opened = false;
    data.bet.users = [];
  } else {
    return message.channel.send(
      "Demande à un Ancien ou plus haut placé de terminer les paris."
    );
  }
  fs.writeFileSync("./data.json", JSON.stringify(data));
}

function bet(message, args) {
  const data = JSON.parse(fs.readFileSync("./data.json").toString());

  message.guild?.roles
    .fetch("727073372328034374")
    .then((role) => role ? message.member?.roles.add(role) : null)
    .catch(console.error);
    
  if (!data.bet.ingame) {
    return message.channel.send(
      "Aucune partie n'est en cours. Demande à un Ancien d'utiliser `r2d2 bet start` pour en commencer une."
    );
  }

  if (!data.bet.opened) {
    return message.channel.send(
      "Tu ne peux plus faire de paris pour le moment, attends la prochaine partie!"
    );
  }

  if (!args[0] || (args[0] != "win" && args[0] != "lose")) {
    return message.channel.send(
      "Mauvaise utilisation : fait `r2d2 bet (win/lose) (kills/death/assists)`"
    );
  }

  const regex = new RegExp(/[0-9]+(\/[0-9]+)+((?![a-z]).)*$/gi);

  if (!args[1] || !regex.test(args[1])) {
    return message.channel.send(
      "Mauvaise utilisation : fait `r2d2 bet (win/lose) (kills/death/assists)`"
    );
  }

  for (let i = 0; i < data.bet.users.length; i++) {
    if (data.bet.users[i].id === message.author.id) {
      return message.channel.send(
        "Tu as déjà fait un pari lors de cette partie."
      );
    }
  }

  if (!data.leaderboard.data[message.author.id]) {
    data.leaderboard.users.push(message.author.id);
    data.leaderboard.data[message.author.id] = { points: 0, won: 0 };
  }

  let bettedResult = args[0];
  let bettedKDA = args[1].split("/");

  data.bet.users.push({
    id: message.author.id,
    result: bettedResult,
    kda: bettedKDA,
  });

  message.channel.send(
    `${message.author}, ton pronostic a bien été enregistré - résultat: ${bettedResult}, kills: ${bettedKDA[0]}, morts: ${bettedKDA[1]}, assists: ${bettedKDA[2]}`
  );
  fs.writeFileSync("./data.json", JSON.stringify(data));
}

async function leaderboard(message) {
  const data = JSON.parse(fs.readFileSync("./data.json").toString());
  const leaderboard = data.leaderboard;
  const formattedLeaderboard = [];

  for (let i = 0; i < leaderboard.users.length; i++) {
    const userId = leaderboard.users[i];

    formattedLeaderboard.push({
      id: userId,
      points: leaderboard.data[userId].points,
      won: leaderboard.data[userId].won,
    });
  }

  formattedLeaderboard.sort((a, b) => a.points - b.points);
  formattedLeaderboard.reverse();
  formattedLeaderboard.splice(10, formattedLeaderboard.length - 10);

  const leaderboardEmbed = new MessageEmbed()
    .setTitle("Leaderboard")
    .setTimestamp()
    .setColor(0xff0000)
    .setDescription("Top 10 des joueurs");

  for (let i = 0; i < formattedLeaderboard.length; i++) {
    const entry = formattedLeaderboard[i];
    
    const member = await message.guild?.members.fetch(entry.id);

    leaderboardEmbed.addField(
      `**${i + 1} - ${member?.user.tag}**`,
      `**Points : ${entry.points}** - Paris remportés : ${entry.won}`
    );
  }

  message.channel.send(leaderboardEmbed);
}

function arraysMatch(arr1: Array<any>, arr2: Array<any>): boolean {
  // Check if the arrays are the same length
  if (arr1.length !== arr2.length) return false;

  // Check if all items exist and are in the same order
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  // Otherwise, return true
  return true;
}

function notifs(message) {
  if (message.channel.id === '727069862186450975') {
    return message.reply("Fait ça dans <#720694689707327490> sale fou <:aya:727078428091613184>")
  }

  message.guild?.roles
    .fetch("727073372328034374")
    .then((role) => role ? message.member?.roles.add(role) : null)
    .catch(console.error);

  message.channel.send("Tu as bien activé les notifications des paris.");
}

function rules(message) {
  if (message.channel.id === '727069862186450975') {
    return message.reply("Fait ça dans <#720694689707327490> sale fou <:aya:727078428091613184>")
  }

  const embed = new MessageEmbed()
    .setTitle("R2D2 - Règles des paris")
    .setColor(0xff0000)
    .setDescription(
      "Jeu permettant de parier sur la partie en cours de sardoche.\nLes paris remportés donnent des points au joueur lui permettant de progresser dans le classement.\nDeviner le résultat : +1 pt\nDeviner les kills : +2 pts\nDeviner les morts : +2 pts\nDeviner les assists : +2 pts\nDeviner le KDA entier : +10 pts\n"
    )
    .addField(
      "r2d2 bet (win/lose) kills/death/assists",
      "Faire un pari sur la partie en cours\nExemple: `r2d2 bet win 3/6/10`"
    )
    .addField("r2d2 bet leaderboard", "Avoir le top 10 des joueurs")
    .addField("r2d2 bet points", "Voir ses points")
    .addField("r2d2 bet notifs", "Activer les notifications");

  message.channel.send(embed);
}
import { ActivityType, Client, TextChannel, ThreadChannel } from 'discord.js';
import { Commands } from '../CommandList';
import prisma from '../prisma';
import * as schedule from 'node-schedule';
import 'dotenv/config';
export default (client: Client): void => {
  client.on('ready', async () => {
    if (!client.user || !client.application) return;
    await client.application.commands.set(Commands);
    client.user.setActivity({
      name: '𝙄𝙙𝙞𝙤𝙩 𝙊𝙡𝙮𝙢𝙥𝙞𝙘𝙨',
      type: ActivityType.Competing,
    });
    if (process.env.PROFILE_SRC) client.user.setAvatar(process.env.PROFILE_SRC);
    schedule.scheduleJob('IOTW', '0 12 * * 1', () => handleIOTW(client));
    schedule.scheduleJob('Clear Connections Threads', '0 * * * *', () =>
      clearConnectionThreads(client)
    );
    console.log(`${client.user.username} is online`);
  });
};

const handleIOTW = async (client: Client) => {
  const IdiotData = await prisma.iOTWR.findMany();
  for (let idiot of IdiotData) {
    let users = [];
    const guild = client.guilds.cache.get(idiot.guid);
    await guild?.members.fetch();
    const role = guild?.roles.cache.get(idiot.rid);
    const members = role?.members.clone();
    if (idiot.lastUid) {
      users = JSON.parse(idiot.lastUid);
      for (let user of users) members?.delete(user);
    }
    const member = members!.at(Math.floor(Math.random() * members!.size));
    const channel = guild?.channels.cache.get(idiot.cid) as TextChannel;
    while (users.length >= 3) {
      users.shift();
    }
    users.push(member?.id);
    await prisma.iOTWR.update({
      where: { guid: idiot.guid },
      data: { lastUid: JSON.stringify(users) },
    });
    channel.send(`${role} of the week is ${member}`);
  }
};

const clearConnectionThreads = async (client: Client) => {
  const today = new Date();
  const threeDays = 3 * 24 * 60 * 60 * 1000;
  for (let guild of client.guilds.cache.values()) {
    for (let channel of guild.channels.cache.values()) {
      if (
        channel.isTextBased() &&
        !channel.isThread() &&
        !channel.isVoiceBased()
      ) {
        await (channel as TextChannel).threads.fetchArchived();
        const threads = (channel as TextChannel).threads.cache.values();
        for (let thread of threads) {
          const connectionThread =
            thread.name.indexOf('Connections') ||
            thread.name.indexOf('Puzzle #');
          const olderthan =
            thread.archivedAt &&
            today.getTime() - thread.archivedAt.getTime() > threeDays;
          if (connectionThread && olderthan) {
            if (thread.manageable) await thread.delete();
          }
        }
      }
    }
  }
};

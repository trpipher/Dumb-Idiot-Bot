import {
  Client,
  Events,
  Message,
  TextChannel,
  ThreadAutoArchiveDuration,
} from 'discord.js';

export default (client: Client): void => {
  client.on(Events.MessageCreate, async (message) => {
    if (!client.user || !client.application) return;
    handleConnections(message);
  });
};

const handleConnections = async (message: Message) => {
  if (
    message.content.includes('Connections') &&
    message.content.includes('Puzzle #') &&
    message.channel?.isTextBased() &&
    !message.channel.isDMBased() &&
    !message.channel.isThread()
  ) {
    const pound = message.content.indexOf('#');
    const substr = message.content.substring(pound, pound + 3);
    const channel = message.channel as TextChannel;
    const name = `Connections ${substr}`;
    const thread = (await channel.threads.fetchActive()).threads.find(
      (thread) => thread.name == name
    );
    if (thread) {
      const messageSent = await message.reply({
        content: `A thread exists posting it there ${thread}`,
      });
      if (
        !thread.messages.cache.find((message) =>
          message.content.indexOf(`${message.member}'s\n`) ? message : false
        )
      )
        thread.send(`${message.member}'s\n${message.content}`);
      setTimeout(async () => {
        if (message.deletable) await message.delete();
        if (messageSent.deletable) await messageSent.delete();
      }, 5000);
    } else {
      await message
        .startThread({
          name: name,
          autoArchiveDuration: ThreadAutoArchiveDuration.OneDay,
          reason: 'Posting Daily Connections',
        })
        .catch(console.error);
    }
  }
};

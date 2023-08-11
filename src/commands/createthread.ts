import { SlashCommand } from 'src/types';
import {
  CommandInteraction,
  Client,
  TextBasedChannel,
  TextChannel,
  ThreadAutoArchiveDuration,
} from 'discord.js';
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const CreateThread: SlashCommand = {
  name: 'create-thread',
  description: 'Creates a thread',
  ephemeral: true,
  run: async (client: Client, interaction: CommandInteraction) => {
    if (
      interaction.channel?.isTextBased() &&
      !interaction.channel.isDMBased()
    ) {
      const channel = interaction.channel as TextChannel;
      const name = `Connections ${
        monthNames[new Date().getMonth()]
      } ${new Date().getDate()}`;
      if (
        (await channel.threads.fetchActive()).threads.find(
          (thread) => thread.name == name
        )
      )
        await interaction.followUp({
          ephemeral: true,
          content: 'Thread Already created',
        });
      else {
        await channel.threads
          .create({
            name: name,
            autoArchiveDuration: ThreadAutoArchiveDuration.OneDay,
            reason: 'Posting Daily Connections',
          })
          .then(async () => {
            const content = 'Created';
            await interaction.followUp({
              ephemeral: true,
              content,
            });
          })
          .catch(async () => {
            const content = 'Error Occured';
            await interaction.followUp({
              ephemeral: true,
              content,
            });
          });
      }
      return;
    }
    const content = 'Error Happened';
    await interaction.followUp({
      ephemeral: true,
      content,
    });
    return;
  },
};

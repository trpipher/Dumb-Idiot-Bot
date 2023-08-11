import { SlashCommand } from 'src/types';
import { CommandInteraction, Client } from 'discord.js';

export const Hello: SlashCommand = {
  name: 'hello',
  description: 'Returns a greeting',
  ephemeral: true,
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = 'Hello there';

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};

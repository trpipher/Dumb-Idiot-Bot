import { SlashCommand } from 'src/types';
import { CommandInteraction, Client } from 'discord.js';
import prisma from '../prisma';

export const GetMessage: SlashCommand = {
  name: 'get-message',
  description: 'gets the message to be sent',
  ephemeral: true,
  run: async (client: Client, interaction: CommandInteraction) => {
    const guid = interaction.guildId;
    if (guid == null) return;
    const response = await prisma.iOTWR.findFirst({ where: { guid } });

    await interaction.followUp({
      ephemeral: true,
      content: `${response?.guid} ${response?.cid} ${response?.rid}`,
    });
  },
};

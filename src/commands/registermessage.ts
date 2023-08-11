import { SlashCommand } from 'src/types';
import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
} from 'discord.js';
import prisma from '../prisma';
export const RegisterMessage: SlashCommand = {
  name: 'register-message',
  description: 'Registers a message to be sent',
  ephemeral: true,
  options: [
    {
      type: ApplicationCommandOptionType.Role,
      name: 'role',
      description: 'role or list of roles to search',
      required: false,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const guid = interaction.guildId;
    const rid = interaction.options.get('role')?.value as string;
    const cid = interaction.channelId;
    const role = interaction.guild?.roles.cache.get(rid);
    const members = role?.members.clone();
    const member = members!.at(Math.floor(Math.random() * members!.size));
    if (guid == null) return;
    const IOTWR = await prisma.iOTWR.upsert({
      where: { guid },
      update: { rid, cid },
      create: {
        guid,
        rid,
        cid,
        lastUid: JSON.stringify([member?.id]),
      },
    });
    await interaction.followUp({
      content: `Registered for ${role} of the week`,
    });

    await interaction.channel?.send(`${role} of the week is ${member}`);
  },
};

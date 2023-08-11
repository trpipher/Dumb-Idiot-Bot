import { SlashCommand } from 'src/types';
import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionType,
} from 'discord.js';

export const Detect: SlashCommand = {
  name: 'detect',
  description: 'Detects stuff',
  ephemeral: true,
  options: [
    {
      type: ApplicationCommandOptionType.Role,
      name: 'role',
      description: 'role or list of roles to search',
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const rid = interaction.options.get('role')?.value as string;
    const guild = client.guilds.cache.get(interaction.guildId!);
    const roles = guild?.roles.fetch();
    const members = (await roles)?.get(rid)?.members;
    console.log(members);
    await interaction.followUp({
      ephemeral: true,
      content: members!.size + '',
    });
  },
};

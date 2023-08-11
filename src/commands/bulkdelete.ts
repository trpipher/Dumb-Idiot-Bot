import { SlashCommand } from 'src/types';
import {
  CommandInteraction,
  Client,
  ApplicationCommandOptionBase,
  ApplicationCommandOptionType,
  TextChannel,
  PermissionFlagsBits,
} from 'discord.js';

export const BulkDelete: SlashCommand = {
  name: 'bulk-delete',
  description: 'Deletes a bunch of messages',
  options: [
    {
      type: ApplicationCommandOptionType.Integer,
      name: 'nummessages',
      description: 'Number of messages to deletes (default 5)',
      required: false,
    },
  ],
  ephemeral: true,
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = 'Hello there';
    const num = (interaction.options.get('nummessages')?.value as number) ?? 5;
    if (interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
      try {
        await (interaction.channel as TextChannel)
          .bulkDelete(num, true)
          .then(async () => await interaction.followUp('Deleted'))
          .catch(
            async (error) =>
              await interaction.followUp("Can't do that " + error)
          );
      } catch {
        await interaction.followUp("Can't do that ");
      }
    } else {
      await interaction.followUp('Only Admins can do that');
    }
  },
};

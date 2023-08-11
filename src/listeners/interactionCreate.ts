import { CommandInteraction, Client, Interaction } from 'discord.js';
import { Commands } from '../CommandList';
export default (client: Client): void => {
  client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction);
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  // handle slash command here
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    interaction.followUp({ content: 'An error has occured' });
    return;
  }

  await interaction.deferReply({ ephemeral: slashCommand.ephemeral });

  slashCommand.run(client, interaction);
};

import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  Client,
} from 'discord.js';

export interface SlashCommand extends ChatInputApplicationCommandData {
  run: (client: Client, interaction: CommandInteraction) => void;
  ephemeral?: boolean;
}

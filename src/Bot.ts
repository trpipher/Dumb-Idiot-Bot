import { Client, GatewayIntentBits } from 'discord.js';
import ready from './listeners/ready';
import interactionCreate from './listeners/interactionCreate';
import 'dotenv/config';
import messageSent from './listeners/messageSent';
const token = process.env.DISCORD_TOKEN;

console.log('Bot is starting...');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
  ],
});

ready(client);
interactionCreate(client);
messageSent(client);
client.login(token);

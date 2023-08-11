import { SlashCommand } from './types';
import {
  Hello,
  CreateThread,
  BulkDelete,
  RegisterMessage,
  GetMessage,
  Detect,
} from './commands';
export const Commands: SlashCommand[] = [Hello, BulkDelete, RegisterMessage];

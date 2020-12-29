import discord from 'discord.js';
import { StreamInfo } from './types.js';

export function sendMessage(wh: discord.WebhookClient, info: StreamInfo) {
  console.log(info);
  wh.send(`Striimi live! \n https://youtube.com/watch?v=${info.id.videoId}`)
}

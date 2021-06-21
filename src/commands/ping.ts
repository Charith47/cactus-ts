import { Command } from 'discord.js';
import { sendMessage } from '../message-handler';
import { bot } from '..';

const ping: Command = {
	name: 'ping',
	description: 'Ping!',
	execute(message): void {
		sendMessage(message, `Ping: ${bot.ws.ping}ms`);
	},
};

export = ping;

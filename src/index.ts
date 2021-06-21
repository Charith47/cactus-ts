import Discord from 'discord.js';
import * as config from './config.json';
import fs from 'fs';
import path from 'path';
import { replyToMessage } from './message-handler';

export const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const prefix = config.BOT_PREFIX;

const commandPath = path.resolve(__dirname, './commands');

const commandFiles = fs
	.readdirSync(commandPath)
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

bot.login(config.BOT_TOKEN);

bot.once('ready', () => {
	console.log('🌵 Cactus the bot is online!');
});

bot.on('message', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift()?.toLowerCase();

	if (!bot.commands.has(commandName)) return;
	const command = bot.commands.get(commandName);

	try {
		command?.execute(message, args);
	} catch (error) {
		console.log(error);
		replyToMessage(message, 'Something went wrong :(');
	}
});

// ping ✅
// play ✅
// pause ✅
// resume ✅
// stop ✅

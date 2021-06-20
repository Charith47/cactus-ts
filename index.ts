import Discord from 'discord.js';
import * as config from './config.json';
import MediaPlayer from './MediaPlayer';
import { sendMessage, replyToMessage, reactToMessage } from './MessageHandler';

const bot = new Discord.Client();
const prefix = config.BOT_PREFIX;
const serverList = new Map();

bot.login(config.BOT_TOKEN);

bot.once('ready', () => {
	console.log('🌵 Cactus the bot is online!');
});

bot.on('message', async (message) => {
	// if the message is from the bot, ignore it
	// if the message does not start with prefix, ignore it
	// else, check if the message matches existing patterns
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	else {
		// set the server id -> put it in the map
		const serverId = message.guild?.id;
		if (serverList.get(serverId) === undefined)
			serverList.set(serverId, new MediaPlayer(message));
		if(message.content.startsWith(`${prefix}play`))
			serverList.get(serverId).searchYt(message.content);
	}
});

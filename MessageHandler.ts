import Discord from 'discord.js';

export const sendMessage = async (
	textChannel: Discord.TextChannel | Discord.DMChannel | Discord.NewsChannel,
	messageText: string
): Promise<void> => {
	try {
		await textChannel.send(messageText);
	} catch (error) {
		console.log(`Failed to send the message to ${textChannel}`, error);
	}
};

export const reactToMessage = async (
	message: Discord.Message,
	emoji: string
): Promise<void> => {
	try {
		await message.react(emoji);
	} catch (error) {
		console.log('Failed to react to the message', error);
	}
};

export const replyToMessage = async (
	message: Discord.Message,
	messageText: string
): Promise<void> => {
	try {
		await message.reply(messageText);
	} catch (error) {
		console.log('Failed to reply to the message', error);
	}
};

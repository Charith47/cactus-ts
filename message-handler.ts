import Discord from 'discord.js';

export const sendMessage = async (
	message: Discord.Message,
	messageText: string
): Promise<void> => {
	try {
		await message.channel.send(messageText);
	} catch (error) {
		console.log(`Failed to send the message to ${message.channel}`, error);
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

export const sendDirectMessage = async (
	message: Discord.Message,
	messageText: string
): Promise<void> => {
	try {
		await message.author.send('Hello DM');
	} catch (error) {
		console.log('Cannot send DM to the user!');
		sendMessage(
			message,
			"It seems I can't DM you. \nDo you have DMs disabled?"
		);
	}
};

import { Command, VoiceConnection } from 'discord.js';
import ytdl from 'ytdl-core';
import { bot } from '..';
import {
	sendMessage,
	replyToMessage,
	reactToMessage,
} from '../message-handler';
import { search } from '../search-helper';

const play: Command = {
	name: 'play',
	description: 'Play Music',
	async execute(message, args) {
		// base permission check ? ❌
		// check if member is in a voice channel ✅
		if (!message.member?.voice.channel) {
			replyToMessage(message, 'please join a voice channel');
			return;
		}
		// check args ✅
		if (args.length === 0) {
			replyToMessage(message, 'please specify a song');
			return;
		}
		const searchResult = await search(args.join(' '));
		// check if search succeeded ❌
		if (!searchResult) {
			replyToMessage(message, 'search failed!');
			return;
		}

		// member is in voice channel ✅
		// args ✅
		// search ✅

		// join voice channel ✅
		let dispatcher: VoiceConnection | null | undefined;
		try {
			dispatcher = await message.member.voice.channel.join();
		} catch (error) {
			console.log(error);
			replyToMessage(message, 'failed to join the voice channel');
			return;
		}

		// play song ✅
		bot.stream = dispatcher
			.play(ytdl(searchResult.url!), { volume: 0.5 })
			.on('start', () => {
				reactToMessage(message, '▶️');
				sendMessage(message, `Now playing ${searchResult.title}`);
			})
			.on('finish', () =>
				sendMessage(message, `Finished playing ${searchResult.title}`)
			)
			.on('error', (error) => {
				console.log(error);
				sendMessage(message, 'Something went wrong!');
			});
	},
};

export = play;

import { Command } from 'discord.js';
import { bot } from '..';
import { replyToMessage, reactToMessage } from '../message-handler';

const pause: Command = {
	name: 'pause',
	description: 'Pause music',
	execute(message, args) {
        // check if something is already playing
        if(bot.stream) {
            reactToMessage(message,'⏸️');
            bot.stream.pause();
        }
        else{
            replyToMessage(message, 'nothing is playing right now');
        }
    },
};

export = pause;

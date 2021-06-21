import { Command } from 'discord.js';
import { bot } from '..';
import { replyToMessage, reactToMessage } from '../message-handler';

const stop: Command = {
	name: 'stop',
	description: 'Stop music',
	execute(message, args) {
        // check if something is already playing
        if(bot.stream) {
            reactToMessage(message,'⏹️');
            bot.stream.destroy();
            // clear stream variable
            bot.stream = undefined;
        }
        else{
            replyToMessage(message, 'nothing is playing right now');
        }
    },
};

export = stop;

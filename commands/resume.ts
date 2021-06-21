import { Command } from 'discord.js';
import { bot } from '..';
import { replyToMessage, reactToMessage } from '../message-handler';

const resume: Command = {
	name: 'resume',
	description: 'Resume music',
	execute(message, args) {
        // check if something is already playing
        if(bot.stream) {
            reactToMessage(message,'▶️');
            bot.stream.resume();
        }
        else{
            replyToMessage(message, 'nothing is playing right now');
        }
    },
};

export = resume;

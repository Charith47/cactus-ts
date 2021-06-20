import Discord from 'discord.js';
import ytdl from 'ytdl-core';
import ytsearch from 'yt-search';
import { sendMessage } from './MessageHandler';

const args: string[] = new Array();
interface Options {
	volume: number;
	quality: string;
}
const opts: Options = {
	volume: 1,
	quality: 'lowestVideo',
};
export default class MediaPlayer {
	message: Discord.Message;
	serverId: string | undefined;
	textChannel: Discord.TextChannel | Discord.DMChannel | Discord.NewsChannel;
	voiceChannel: Discord.VoiceChannel | null | undefined;
	connection: Discord.VoiceConnection | null | undefined;
	songs: string[][];
	volume: number;
	isPlaying: boolean;
	isJoined: boolean;

	constructor(message: Discord.Message) {
		this.message = message;
		this.serverId = message.guild?.id;
		this.textChannel = message.channel;
		this.voiceChannel = message.member?.voice.channel;
		this.connection = null;
		this.songs = new Array();
		this.volume = 1;
		this.isPlaying = false;
		this.isJoined = false;
	}

	private playMusic(): void {
		// parameters are *wrong*
		// if there is no songs in the queue, just play
		// else add the song into the queue
		// make it a class
		// constructor takes a connection?

			const dispatcher = this.createDispatcher();

				// play 0th element
				const [videoTitle,videoUrl] = this.songs[0];

				dispatcher
					?.play(ytdl('https://youtube.com/watch?v=UceaB4D0jpo'),{ volume: 1 })
					.on('start', () => {
						this.isPlaying = true;
						console.log('gonna play');
						sendMessage(this.textChannel, `Now playing ${videoTitle}`);
						this.songs.shift();
					})
					.on('finish', () => {
						sendMessage(this.textChannel, `Now playing ${videoTitle}`);
						// if queue is empty break
						// else itr
						if (this.songs.length === 0){
							this.isPlaying = false;
							return;
						}
					})
					.on('error',()=>{
						console.log('Error playing the song');
						sendMessage(this.textChannel, 'Something went wrong 😔')
					});


	}

	pauseMusic(): void {}

	stopMusic(): void {}

	addToQueue(): void {}

	private createDispatcher(): Discord.VoiceConnection | null | undefined {
		// join a voice channel if not
		// return a dispatcher
		if (!this.isJoined) {
			this.joinVoiceChannel();
		}
		return this.connection;
	}

	private async joinVoiceChannel(): Promise<void> {
		try {
			this.connection = await this.voiceChannel?.join();
			this.isJoined = true;
			console.log('Media player joined!');
		} catch (error) {
			console.log(error);
			this.isJoined = false;
		}
	}

	async searchYt(query: string) {
		const searchQuery = query.split(' ');
		searchQuery.shift();
		const ytQuery = searchQuery.join(' ');
		// if is playing add to queue
		// else
		try {
			const searchResult = await ytsearch(ytQuery);
			console.log(searchResult.videos[0].title);
			if (this.isPlaying) {
				this.songs.push([
					searchResult.videos[0].title,
					searchResult.videos[0].url,
				]);
			}
			else{
				console.log('gonna play');
				this.songs.push([
					searchResult.videos[0].title,
					searchResult.videos[0].url,
				]);

				this.playMusic();
			}
			//return [searchResult.videos[0].title,searchResult.videos[0].url ]
		} catch (error) {
			console.log(error);
			//return;
		}
	}
}

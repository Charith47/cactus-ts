import yts from 'yt-search';
import { SearchResult } from 'discord.js';

export const search = async (query: string): Promise<SearchResult | null> => {
	try {
		const searchResults = await yts(query);
		const topResult = searchResults.videos[0];

		const searchResult: SearchResult = {
			title: topResult.title,
			url: topResult.url,
		};

		return searchResult;
	} catch (error) {
		console.log(error);
		return null;
	}
};

declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, Command>
        stream: StreamDispatcher | undefined | null
    }

    export interface Command {
        name: string,
        description: string,
        execute: (message: Message, args: string[]) => any
    }

    export interface SearchResult{
        title: string | null,
        url: string | null
    }
}
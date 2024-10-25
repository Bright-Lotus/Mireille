import { Collection, Message, SlashCommandBuilder } from "discord.js";

declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, SlashCommand>,
        setMaxListeners: (amount: number) => void,
    }

    export interface SlashCommand {
        data: SlashCommandBuilder,
        execute: (interaction: Interaction) => any
    }

    export interface Command {
        name: string,
        execute: (message: Message, args: string[]) => any,
    }
}
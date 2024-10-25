import { Interaction, Message, SlashCommandBuilder } from "discord.js"

export type SlashCommand = {
    data: SlashCommandBuilder,
    execute: (interaction: Interaction) => any,
}
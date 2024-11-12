import { REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { SlashCommand } from './types/slashCommands.js';
dotenv.config();

const [clientId, token] = [process.argv[2], process.argv[3]];

// Type for JSON data of Slash Commands.
const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	import(filePath).then((slashCmd: SlashCommand) => {
		if (Object.values(slashCmd).length > 0) commands.push(slashCmd.data.toJSON());
	});
}

const rest = new REST({ version: '10' }).setToken(token);

// Submit all Slash Commands to Discord API.
rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then((data: unknown) => {
		console.log(`Successfully registered ${(data as []).length} application commands.`);
	})
	.catch(console.error);
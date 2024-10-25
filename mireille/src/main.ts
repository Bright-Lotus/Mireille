import {
	Client,
	GatewayIntentBits,
	Collection,
	Partials,
	EmbedBuilder,
	TimestampStyles,
	time,
	userMention,
	codeBlock,
	ChannelType,
} from 'discord.js';
import { readFile, readdirSync } from 'node:fs';
import * as path from 'path';
import * as http from 'http';
import { config as dotenvConfig } from 'dotenv';
import chalk from 'chalk';
import { SlashCommand } from './types/slashCommands.js';
dotenvConfig();

// This is for railway server
// So if people visit the railway site, it doesn't show a 404 error
// And instead shows the page.html file with a link to the bot's webpage hosted in vercel (https://fakeri.vercel.app/)
readFile('./page.html', function(err, html) {

	if (err) console.error(err);

	http.createServer(function(request, response) {
		response.writeHead(200, { 'Content-Type': 'text/html' });
		response.write(html);
		response.end();
	}).listen(process.env.PORT);
});

// If test is passed as an argument, use the test bot token
const token = (process.argv[2] != 'test') ? process.env.DISCORD_TOKEN : process.env.DISCORD_TEST_BOT_TOKEN;

// Create a new client instance
const client: Client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers], partials: [Partials.Message, Partials.Channel, Partials.Reaction] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module

	import(filePath).then((slashCmd: SlashCommand) => {
		if (Object.values(slashCmd).length > 0) client.commands.set(slashCmd.data.name, slashCmd);
	});
	// if (Object.values(command).length > 0) {
	// 	client.commands.set(command.data.name, command);
	// }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));
// Set the max listeners to 30 due to the amount of events
client.setMaxListeners(30);


// Add the event listeners to the client
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	// const event = require(filePath);
	import(filePath).then((event) => {
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	});
}

// Login to Discord with your client's token
client.login(token);

// Set error handlers that send a message to the error channel
process.on('unhandledRejection', async (err: Error) => {
	console.log(chalk.redBright('An error has occured! (Uncaught Rejection)'));
	console.log(chalk.red(err.message));
	console.error(err);
	const errorChannelEmbed = new EmbedBuilder().setColor('Red')
		.setTimestamp(new Date())
		.setTitle('Un error ha ocurrido!')
		.setDescription(`El siguiente error ha sucedido ${time(new Date(), TimestampStyles.RelativeTime)} ${time(new Date(), TimestampStyles.LongDateTime)}\n${codeBlock(err?.stack ?? '')}`);
	client
		.channels
		.fetch('1054804493201571912')
		.then(channel => {
			if (!channel) {
				console.log(chalk.redBright('Couldn\'t find error channel! Please help!'));
				return;
			}
			if (channel?.type === ChannelType.GuildText) {
				channel.send({ content: userMention('1011657604822474873'), embeds: [errorChannelEmbed] });
			}
		});
	if (err.message == 'Quota exceeded.') {
		console.log('Quota exceeded. Exiting...');
		process.exit(0);
	}
});
process.on('uncaughtException', async (err) => {
	console.log(chalk.redBright('An error has occured! (Uncaught Exception)'));
	console.log(chalk.red(err.message));
	console.error(err);
	const errorChannelEmbed = new EmbedBuilder().setColor('Red')
		.setTimestamp(new Date())
		.setTitle('Un error ha ocurrido!')
		.setDescription(`El siguiente error ha sucedido ${time(new Date(), TimestampStyles.RelativeTime)} ${time(new Date(), TimestampStyles.LongDateTime)}\n${codeBlock(err?.stack ?? '')}`);
	client.channels.fetch('1054804493201571912').then(channel => {
		if (channel?.type === ChannelType.GuildText) { channel.send({ content: userMention('1011657604822474873'), embeds: [errorChannelEmbed] }); }
	});
	if (err.message == 'Quota exceeded.') {
		console.log('Quota exceeded. Exiting...');
		process.exit(0);
	}
});

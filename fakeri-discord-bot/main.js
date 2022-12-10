const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

// This is for railway server
fs.readFile('./page.html', function(err, html) {

	if (err) console.error(err);

	http.createServer(function(request, response) {
		response.writeHeader(200, { 'Content-Type': 'text/html' });
		response.write(html);
		response.end();
	}).listen(process.env.PORT);
});


const token = (process.argv[2] != 'test') ? process.env.DISCORD_TOKEN : process.env.DISCORD_TEST_BOT_TOKEN;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers], partials: [Partials.Message, Partials.Channel, Partials.Reaction] });

client.on('unhandledRejection', async (err) => {
	console.error('Unhandled Promise Rejection:\n', err);
});
client.on('uncaughtException', async (err) => {
	console.error('Uncaught Promise Exception:\n', err);
});
client.on('uncaughtExceptionMonitor', async (err) => {
	console.error('Uncaught Promise Exception (Monitor):\n', err);
});
client.on('multipleResolves', async (type, promise, reason) => {
	console.error('Multiple Resolves:\n', type, promise, reason);
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	if (Object.values(command).length > 0) {
		client.commands.set(command.data.name, command);

	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


// Login to Discord with your client's token
client.login(token);


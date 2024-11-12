var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Client, GatewayIntentBits, Collection, Partials, EmbedBuilder, TimestampStyles, time, userMention, codeBlock, ChannelType, } from 'discord.js';
import { readFile, readdirSync } from 'node:fs';
import * as path from 'path';
import * as http from 'http';
import { config as dotenvConfig } from 'dotenv';
import chalk from 'chalk';
dotenvConfig();
// This is for railway server
// So if people visit the railway site, it doesn't show a 404 error
// And instead shows the page.html file with a link to the bot's webpage hosted in vercel (https://fakeri.vercel.app/)
readFile('./page.html', function (err, html) {
    if (err)
        console.error(err);
    http.createServer(function (request, response) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(html);
        response.end();
    }).listen(process.env.PORT);
});
// If test is passed as an argument, use the test bot token
var token = (process.argv[2] != 'test') ? process.env.DISCORD_TOKEN : process.env.DISCORD_TEST_BOT_TOKEN;
// Create a new client instance
var client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers], partials: [Partials.Message, Partials.Channel, Partials.Reaction] });
client.commands = new Collection();
var commandsPath = path.join(__dirname, 'commands');
var commandFiles = readdirSync(commandsPath).filter(function (file) { return file.endsWith('.js'); });
for (var _i = 0, commandFiles_1 = commandFiles; _i < commandFiles_1.length; _i++) {
    var file = commandFiles_1[_i];
    var filePath = path.join(commandsPath, file);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    import(filePath).then(function (slashCmd) {
        if (Object.values(slashCmd).length > 0)
            client.commands.set(slashCmd.data.name, slashCmd);
    });
}
var eventsPath = path.join(__dirname, 'events');
var eventFiles = readdirSync(eventsPath).filter(function (file) { return file.endsWith('.js'); });
// Set the max listeners to 30 due to the amount of events
client.setMaxListeners(30);
// Add the event listeners to the client
for (var _a = 0, eventFiles_1 = eventFiles; _a < eventFiles_1.length; _a++) {
    var file = eventFiles_1[_a];
    var filePath = path.join(eventsPath, file);
    // const event = require(filePath);
    import(filePath).then(function (event) {
        if (event.once) {
            client.once(event.name, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return event.execute.apply(event, args);
            });
        }
        else {
            client.on(event.name, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return event.execute.apply(event, args);
            });
        }
    });
}
// Login to Discord with your client's token
client.login(token);
// Set error handlers that send a message to the error channel
process.on('unhandledRejection', function (err) { return __awaiter(void 0, void 0, void 0, function () {
    var errorChannelEmbed;
    var _a;
    return __generator(this, function (_b) {
        console.log(chalk.redBright('An error has occured! (Uncaught Rejection)'));
        console.log(chalk.red(err.message));
        console.error(err);
        errorChannelEmbed = new EmbedBuilder().setColor('Red')
            .setTimestamp(new Date())
            .setTitle('Un error ha ocurrido!')
            .setDescription("El siguiente error ha sucedido ".concat(time(new Date(), TimestampStyles.RelativeTime), " ").concat(time(new Date(), TimestampStyles.LongDateTime), "\n").concat(codeBlock((_a = err === null || err === void 0 ? void 0 : err.stack) !== null && _a !== void 0 ? _a : '')));
        client
            .channels
            .fetch('1054804493201571912')
            .then(function (channel) {
            if (!channel) {
                console.log(chalk.redBright('Couldn\'t find error channel! Please help!'));
                return;
            }
            if ((channel === null || channel === void 0 ? void 0 : channel.type) === ChannelType.GuildText) {
                channel.send({ content: userMention('1011657604822474873'), embeds: [errorChannelEmbed] });
            }
        });
        if (err.message == 'Quota exceeded.') {
            console.log('Quota exceeded. Exiting...');
            process.exit(0);
        }
        return [2 /*return*/];
    });
}); });
process.on('uncaughtException', function (err) { return __awaiter(void 0, void 0, void 0, function () {
    var errorChannelEmbed;
    var _a;
    return __generator(this, function (_b) {
        console.log(chalk.redBright('An error has occured! (Uncaught Exception)'));
        console.log(chalk.red(err.message));
        console.error(err);
        errorChannelEmbed = new EmbedBuilder().setColor('Red')
            .setTimestamp(new Date())
            .setTitle('Un error ha ocurrido!')
            .setDescription("El siguiente error ha sucedido ".concat(time(new Date(), TimestampStyles.RelativeTime), " ").concat(time(new Date(), TimestampStyles.LongDateTime), "\n").concat(codeBlock((_a = err === null || err === void 0 ? void 0 : err.stack) !== null && _a !== void 0 ? _a : '')));
        client.channels.fetch('1054804493201571912').then(function (channel) {
            if ((channel === null || channel === void 0 ? void 0 : channel.type) === ChannelType.GuildText) {
                channel.send({ content: userMention('1011657604822474873'), embeds: [errorChannelEmbed] });
            }
        });
        if (err.message == 'Quota exceeded.') {
            console.log('Quota exceeded. Exiting...');
            process.exit(0);
        }
        return [2 /*return*/];
    });
}); });

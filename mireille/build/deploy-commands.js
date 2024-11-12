import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
dotenv.config();
var _a = [process.argv[2], process.argv[3]], clientId = _a[0], token = _a[1];
// Type for JSON data of Slash Commands.
var commands = [];
var commandsPath = path.join(__dirname, 'commands');
var commandFiles = fs.readdirSync(commandsPath).filter(function (file) { return file.endsWith('.js'); });
for (var _i = 0, commandFiles_1 = commandFiles; _i < commandFiles_1.length; _i++) {
    var file = commandFiles_1[_i];
    var filePath = path.join(commandsPath, file);
    import(filePath).then(function (slashCmd) {
        if (Object.values(slashCmd).length > 0)
            commands.push(slashCmd.data.toJSON());
    });
}
var rest = new REST({ version: '10' }).setToken(token);
// Submit all Slash Commands to Discord API.
rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(function (data) {
    console.log("Successfully registered ".concat(data.length, " application commands."));
})
    .catch(console.error);

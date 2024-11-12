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
var _a = require('discord.js'), Events = _a.Events, EmbedBuilder = _a.EmbedBuilder, userMention = _a.userMention, time = _a.time, TimestampStyles = _a.TimestampStyles, codeBlock = _a.codeBlock;
var _b = require('../errors/errors.js'), ErrorEmbed = _b.ErrorEmbed, EventErrors = _b.EventErrors;
var _c = require('firebase/firestore'), getFirestore = _c.getFirestore, doc = _c.doc, getDoc = _c.getDoc;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
var chalk = require('chalk');
module.exports = {
    name: Events.InteractionCreate,
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var command, player, error_1, errorEmbed, errorEmbed, errorChannelEmbed_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!interaction.isChatInputCommand())
                            return [2 /*return*/];
                        command = interaction.client.commands.get(interaction.commandName);
                        if (!command)
                            return [2 /*return*/];
                        return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo'))];
                    case 1:
                        player = _a.sent();
                        if (!player.exists() && interaction.commandName != 'register' && interaction.commandName != 'config' && interaction.commandName != 'adjust') {
                            return [2 /*return*/, interaction.reply({ embeds: [ErrorEmbed(EventErrors.PlayerNotRegistered)] })];
                        }
                        if (player.exists()) {
                            if (player.data().dead && interaction.commandName != 'profile' && interaction.commandName != 'event' && interaction.commandName != 'register') {
                                return [2 /*return*/, interaction.reply({ embeds: [ErrorEmbed(EventErrors.PlayerIsDead)] })];
                            }
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 9]);
                        return [4 /*yield*/, command.execute(interaction)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1);
                        if (!((interaction === null || interaction === void 0 ? void 0 : interaction.deferred) || (interaction === null || interaction === void 0 ? void 0 : interaction.replied))) return [3 /*break*/, 6];
                        errorEmbed = new EmbedBuilder()
                            .setColor('Red')
                            .setTitle('Algo inesperado ha sucedido!')
                            .setDescription("Si el error continua por favor contacta a ".concat(userMention('1011657604822474873')));
                        return [4 /*yield*/, interaction.editReply({ embeds: [errorEmbed], ephemeral: true })];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        errorEmbed = new EmbedBuilder()
                            .setColor('Red')
                            .setTitle('Algo inesperado ha sucedido!')
                            .setDescription("Si el error continua por favor contacta a ".concat(userMention('1011657604822474873')));
                        return [4 /*yield*/, interaction.reply({ embeds: [errorEmbed] })];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        errorChannelEmbed_1 = new EmbedBuilder().setColor('Red')
                            .setTimestamp(new Date())
                            .setTitle('Un error ha ocurrido!')
                            .setDescription("El siguiente error ha sucedido ".concat(time(new Date(), TimestampStyles.RelativeTime), " ").concat(time(new Date(), TimestampStyles.LongDateTime), "\n").concat(codeBlock(error_1)));
                        interaction.client.channels.fetch('1054804493201571912').then(function (channel) {
                            channel.send({ embeds: [errorChannelEmbed_1] });
                        });
                        return [3 /*break*/, 9];
                    case 9:
                        console.log(chalk.cyan("".concat(interaction.user.tag, " in #").concat(interaction.channel.name, " triggered an interaction.")));
                        return [2 /*return*/];
                }
            });
        });
    },
};
export {};

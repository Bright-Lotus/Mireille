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
var _a = require('discord.js'), Events = _a.Events, EmbedBuilder = _a.EmbedBuilder, userMention = _a.userMention, roleMention = _a.roleMention;
var Colors = require('../emums/colors').Colors;
var _b = require('../errors/errors'), ErrorEmbed = _b.ErrorEmbed, EventErrors = _b.EventErrors;
// TODO: Probably get this from the database
var broadcastChannels = ['1032013306631827546', '1049703237336444968', '1056685534526844938', '1056699246109270127'];
module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var errorEmbed, message, newsletter, embedColor;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // If the interaction isn't a modal submit, return
                        if (!interaction.isModalSubmit())
                            return [2 /*return*/];
                        if (!interaction.customId.includes('broadcast-'))
                            return [2 /*return*/];
                        // If the user isn't Luis or Ze, return
                        if (interaction.user.id != '773971453392584755' && interaction.user.id != '949025108897448046' && interaction.user.id != '1011657604822474873' && interaction.user.id != '743521074884640809') {
                            errorEmbed = ErrorEmbed(EventErrors.NotEnoughPermissions, "Solo ".concat(userMention('773971453392584755'), " y ").concat(userMention('1011657604822474873'), " pueden usar este comando!"));
                            return [2 /*return*/, interaction.reply({ embeds: [errorEmbed] })];
                        }
                        // Deferring the reply
                        // Returns a "Bot is thinking..." message
                        return [4 /*yield*/, interaction.deferReply()];
                    case 1:
                        // Deferring the reply
                        // Returns a "Bot is thinking..." message
                        _a.sent();
                        message = interaction.fields.getTextInputValue('broadcastMessage');
                        newsletter = interaction.customId.split('-')[1];
                        embedColor = 'luis <3';
                        switch (newsletter) {
                            case 'El Observador':
                                embedColor = Colors.ElObservador;
                                break;
                            case 'El Mega Observador':
                                embedColor = Colors.ElObservadorPlus;
                                break;
                            case 'UFOLogy':
                                embedColor = Colors.UFOLogy;
                                break;
                            case 'everyone':
                                embedColor = 'Random';
                                break;
                        }
                        // Sending the message to the channels
                        broadcastChannels.forEach(function (channel) {
                            interaction.client.channels.fetch(channel).then(function (textChannel) { return __awaiter(_this, void 0, void 0, function () {
                                var pingRole, messageEmbed;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, textChannel.guild.roles.cache.find(function (role) { return role.name.toLowerCase().includes(newsletter.toLowerCase()); })];
                                        case 1:
                                            pingRole = _a.sent();
                                            messageEmbed = new EmbedBuilder()
                                                .setTitle("".concat((newsletter == 'everyone') ? 'Alcaldia' : newsletter))
                                                .setColor(embedColor)
                                                .setAuthor({ name: 'Noticia Nueva' })
                                                .setDescription(message);
                                            // Send the message pinging the role or everyone if the newsletter specifies so
                                            textChannel.send({ content: (newsletter != 'everyone') ? roleMention(pingRole.id) : '@everyone', embeds: [messageEmbed] });
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        });
                        // Reply to the interaction saying that the messages were sent
                        interaction.editReply('Mensajes enviados!');
                        return [2 /*return*/];
                }
            });
        });
    },
};
export {};

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
var _a = require('discord.js'), SlashCommandBuilder = _a.SlashCommandBuilder, ChannelType = _a.ChannelType, PermissionFlagsBits = _a.PermissionFlagsBits, userMention = _a.userMention, ModalBuilder = _a.ModalBuilder, TextInputBuilder = _a.TextInputBuilder, TextInputStyle = _a.TextInputStyle, ActionRowBuilder = _a.ActionRowBuilder;
var _b = require('firebase/firestore'), getFirestore = _b.getFirestore, setDoc = _b.setDoc, doc = _b.doc, getDoc = _b.getDoc, increment = _b.increment, updateDoc = _b.updateDoc;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var initializeApp = require('firebase/app').initializeApp;
var _c = require('../errors/errors.js'), ErrorEmbed = _c.ErrorEmbed, EventErrors = _c.EventErrors;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Change the mortals\'s world.')
        .addSubcommand(function (subcmd) {
        return subcmd.setName('farm')
            .setDescription('Creates a new monster spawn zone.')
            .addStringOption(function (option) { return option.setName('name').setDescription('Name of the channel').setRequired(true); })
            .addIntegerOption(function (option) { return option.setName('required-level').setDescription('Level required to access the farm zone').setRequired(true); })
            .addStringOption(function (option) { return option.setName('enemies').setDescription('Enemies of the farm zone (Max: 3)').setRequired(true); })
            .addChannelOption(function (option) { return option.setName('category').setDescription('Category where the channel will be created').setRequired(true); })
            .addStringOption(function (option) {
            return option.setName('template')
                .setDescription('Used for additional channel decoration, Example: "│・『🏹』┋ {0}", {0} will be replaced with the name');
        });
    }),
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, eventConfig(interaction)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
};
function eventConfig(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var errorEmbed, template, createdChannelID, channelsSnap, channelID, modal, bonus1Input, bonus2Input, bonus3Input, bonus4Input, bonus5Input, bonus1Row, bonus2Row, bonus3Row, bonus4Row, bonus5Row;
        var _a, _b, _c, _d;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (interaction.user.id != '773971453392584755' && interaction.user.id != '949025108897448046' && interaction.user.id != '1011657604822474873' && interaction.user.id != '743521074884640809') {
                        errorEmbed = ErrorEmbed(EventErrors.NotEnoughPermissions, "Solo ".concat(userMention('743521074884640809'), " y ").concat(userMention('1011657604822474873'), " pueden usar este comando!"));
                        return [2 /*return*/, interaction.reply({ embeds: [errorEmbed] })];
                    }
                    if (!String.prototype.format) {
                        String.prototype.format = function () {
                            var args = arguments;
                            return this.replace(/{(\d+)}/g, function (match, number) {
                                return typeof args[number] != 'undefined'
                                    ? args[number]
                                    : match;
                            });
                        };
                    }
                    console.log(interaction.options.getString('template'));
                    console.log(interaction.options.getChannel('category'));
                    template = (interaction.options.getString('template')) ? interaction.options.getString('template') : '{0}';
                    return [4 /*yield*/, interaction.guild.channels.create({
                            name: template.format(interaction.options.getString('name')),
                            parent: interaction.options.getChannel('category'),
                            type: ChannelType.GuildText,
                            permissionsOverwrites: [{
                                    id: interaction.guildId,
                                    deny: [PermissionFlagsBits.ManageMessages, PermissionFlagsBits.ViewChannel],
                                    allow: [PermissionFlagsBits.SendMessages],
                                }],
                        }).then(function (channel) { createdChannelID = channel.id; })];
                case 1:
                    _f.sent();
                    return [4 /*yield*/, getDoc(doc(db, interaction.guild.id, 'FarmChannels'))];
                case 2:
                    channelsSnap = _f.sent();
                    channelID = channelsSnap.data().channelCount + 1;
                    if (!channelsSnap.exists()) return [3 /*break*/, 8];
                    if (!((_e = channelsSnap.data()) === null || _e === void 0 ? void 0 : _e.channelCount)) return [3 /*break*/, 5];
                    return [4 /*yield*/, updateDoc(doc(db, "".concat(interaction.guildId, "/FarmChannels")), (_a = {}, _a['channelCount'] = increment(1), _a), { merge: true })];
                case 3:
                    _f.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.guildId, "/FarmChannels")), (_b = {}, _b["channel".concat(channelID)] = { enemies: interaction.options.getString('enemies').split(','), id: createdChannelID, minLvl: interaction.options.getInteger('required-level') }, _b), { merge: true })];
                case 4:
                    _f.sent();
                    return [3 /*break*/, 8];
                case 5:
                    channelID = 1;
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.guildId, "/FarmChannels")), (_c = {}, _c["channel".concat(channelID)] = { enemies: interaction.options.getString('enemies').split(','), id: createdChannelID, minLvl: interaction.options.getInteger('required-level') }, _c), { merge: true })];
                case 6:
                    _f.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.guildId, "/FarmChannels")), (_d = {}, _d['channelCount'] = 1, _d), { merge: true })];
                case 7:
                    _f.sent();
                    _f.label = 8;
                case 8:
                    modal = new ModalBuilder()
                        .setCustomId("farmChannel-zoneBonuses-".concat(interaction.options.getString('enemies'), "-").concat(createdChannelID, "-").concat(channelID, "-").concat(interaction.options.getInteger('required-level')))
                        .setTitle('Bonuses de Canal');
                    bonus1Input = new TextInputBuilder()
                        .setCustomId('zoneBonusSlot1')
                        .setLabel('Bonus Ranura 1')
                        .setRequired(false)
                        .setPlaceholder('name: name, type: atk, amount: +50%')
                        .setStyle(TextInputStyle.Short);
                    bonus2Input = new TextInputBuilder()
                        .setCustomId('zoneBonusSlot2')
                        .setLabel('Bonus Ranura 2')
                        .setRequired(false)
                        .setPlaceholder('name: name, type: atk, amount: +50%')
                        .setStyle(TextInputStyle.Short);
                    bonus3Input = new TextInputBuilder()
                        .setCustomId('zoneBonusSlot3')
                        .setLabel('Bonus Ranura 3')
                        .setRequired(false)
                        .setPlaceholder('name: name, type: atk, amount: +50%')
                        .setStyle(TextInputStyle.Short);
                    bonus4Input = new TextInputBuilder()
                        .setCustomId('zoneBonusSlot4')
                        .setLabel('Bonus Ranura 4')
                        .setRequired(false)
                        .setPlaceholder('name: name, type: atk, amount: +50%')
                        .setStyle(TextInputStyle.Short);
                    bonus5Input = new TextInputBuilder()
                        .setCustomId('zoneBonusSlot5')
                        .setLabel('Bonus Ranura 5')
                        .setRequired(false)
                        .setPlaceholder('name: name, type: atk, amount: +50%')
                        .setStyle(TextInputStyle.Short);
                    bonus1Row = new ActionRowBuilder().addComponents(bonus1Input);
                    bonus2Row = new ActionRowBuilder().addComponents(bonus2Input);
                    bonus3Row = new ActionRowBuilder().addComponents(bonus3Input);
                    bonus4Row = new ActionRowBuilder().addComponents(bonus4Input);
                    bonus5Row = new ActionRowBuilder().addComponents(bonus5Input);
                    modal.addComponents(bonus1Row, bonus2Row, bonus3Row, bonus4Row, bonus5Row);
                    return [4 /*yield*/, interaction.showModal(modal)];
                case 9:
                    _f.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export {};

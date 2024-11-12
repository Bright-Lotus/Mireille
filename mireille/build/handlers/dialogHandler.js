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
var fs = require('node:fs');
var path = require('node:path');
var _a = require('discord.js'), ActionRowBuilder = _a.ActionRowBuilder, ButtonBuilder = _a.ButtonBuilder, ButtonStyle = _a.ButtonStyle, EmbedBuilder = _a.EmbedBuilder, userMention = _a.userMention, bold = _a.bold;
var execute = require('./shopHandler').execute;
var _b = require('firebase/firestore'), updateDoc = _b.updateDoc, doc = _b.doc, setDoc = _b.setDoc;
var getFirestore = require('firebase/firestore').getFirestore;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
function dialogHandler(dialogName, step, interaction, option, category, args) {
    return __awaiter(this, void 0, void 0, function () {
        var dialogPath, dialogFiles, _loop_1, _i, dialogFiles_1, file, state_1;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12;
        return __generator(this, function (_13) {
            switch (_13.label) {
                case 0:
                    dialogPath = path.join(__dirname, '..', 'dialogs', 'es_ES', category);
                    dialogFiles = fs.readdirSync(dialogPath).filter(function (file) { return file.endsWith('.js'); });
                    _loop_1 = function (file) {
                        var filePath, dialog, row, dialogEmbed_1, embedMessage, displayName, _14, _15, _16, key, value, embedMessage, _17, _18, _19, key, value, _20, shopMessage, targetChannels, target, _21, targetCharacter, targetDialog, targetQuest, targetCharacterQuest, questEmbed, _22, shopMessage, targetChannels, target, _23, targetCharacter, targetDialog, targetQuest, targetCharacterQuest, questEmbed;
                        var _24, _25, _26, _27, _28, _29;
                        return __generator(this, function (_30) {
                            switch (_30.label) {
                                case 0:
                                    filePath = path.join(dialogPath, file);
                                    dialog = require(filePath);
                                    row = new ActionRowBuilder();
                                    if (!(((_a = dialog === null || dialog === void 0 ? void 0 : dialog.dialog) === null || _a === void 0 ? void 0 : _a.name) == dialogName)) return [3 /*break*/, 23];
                                    console.log("Executing dialog ".concat(dialogName, " with step ").concat(step));
                                    dialogEmbed_1 = new EmbedBuilder();
                                    if (!(step == 1)) return [3 /*break*/, 1];
                                    embedMessage = dialog.dialog.step1.message;
                                    displayName = interaction.member.displayName;
                                    if (interaction.user.id == '407225705051455491') {
                                        displayName = 'Ashe';
                                    }
                                    if (embedMessage.includes('{displayName}')) {
                                        embedMessage = embedMessage.replace('{displayName}', displayName);
                                    }
                                    dialogEmbed_1
                                        .setTitle(dialog.dialog.step1.name)
                                        .setDescription(embedMessage)
                                        .setColor(dialog.dialog.embedColor);
                                    if ((_b = dialog === null || dialog === void 0 ? void 0 : dialog.dialog["step".concat(step)]) === null || _b === void 0 ? void 0 : _b.options) {
                                        for (_14 = 0, _15 = Object.entries(dialog.dialog["step".concat(step)].options); _14 < _15.length; _14++) {
                                            _16 = _15[_14], key = _16[0], value = _16[1];
                                            if (value.text.includes('{displayName}')) {
                                                value.text = value.text.replace('{displayName}', displayName);
                                            }
                                            row.addComponents(new ButtonBuilder()
                                                .setCustomId("dialog-".concat(dialog.dialog.name, "-step").concat(step, "-").concat(key, "-").concat(category, "-").concat(interaction.user.id))
                                                .setLabel(value.text)
                                                .setStyle(ButtonStyle.Primary)
                                                .setEmoji(value.emoji));
                                        }
                                    }
                                    if ((_c = dialog === null || dialog === void 0 ? void 0 : dialog.dialog["step".concat(step)]) === null || _c === void 0 ? void 0 : _c.options) {
                                        if (args === null || args === void 0 ? void 0 : args.replied) {
                                            return [2 /*return*/, { value: interaction.followUp({ embeds: [dialogEmbed_1], components: [row], ephemeral: ((_d = dialog.dialog) === null || _d === void 0 ? void 0 : _d.ephemeral) || false }) }];
                                        }
                                        return [2 /*return*/, { value: interaction.reply({ embeds: [dialogEmbed_1], components: [row], ephemeral: ((_e = dialog.dialog) === null || _e === void 0 ? void 0 : _e.ephemeral) || false }) }];
                                    }
                                    else {
                                        if (args === null || args === void 0 ? void 0 : args.replied) {
                                            return [2 /*return*/, { value: interaction.followUp({ embeds: [dialogEmbed_1], ephemeral: ((_f = dialog.dialog) === null || _f === void 0 ? void 0 : _f.ephemeral) || false }) }];
                                        }
                                        return [2 /*return*/, { value: interaction.reply({ embeds: [dialogEmbed_1], ephemeral: ((_g = dialog.dialog) === null || _g === void 0 ? void 0 : _g.ephemeral) || false }) }];
                                    }
                                    return [3 /*break*/, 22];
                                case 1:
                                    embedMessage = dialog.dialog["step".concat(step, "option").concat(option)].message;
                                    if (embedMessage.includes('{displayName}')) {
                                        embedMessage = embedMessage.replace('{displayName}', interaction.member.displayName);
                                    }
                                    dialogEmbed_1
                                        .setTitle(dialog.dialog["step".concat(step, "option").concat(option)].name)
                                        .setDescription(dialog.dialog["step".concat(step, "option").concat(option)].message)
                                        .setColor(dialog.dialog.embedColor);
                                    if ((_h = dialog === null || dialog === void 0 ? void 0 : dialog.dialog["step".concat(step, "option").concat(option)]) === null || _h === void 0 ? void 0 : _h.options) {
                                        for (_17 = 0, _18 = Object.entries(dialog.dialog["step".concat(step, "option").concat(option)].options); _17 < _18.length; _17++) {
                                            _19 = _18[_17], key = _19[0], value = _19[1];
                                            if (value.text.includes('{displayName}')) {
                                                value.text = value.text.replace('{displayName}', interaction.member.displayName);
                                            }
                                            row.addComponents(new ButtonBuilder()
                                                .setCustomId("dialog-".concat(dialog.dialog.name, "-step").concat(step, "-").concat(key, "-").concat(category, "-").concat(interaction.user.id))
                                                .setLabel(value.text)
                                                .setStyle(ButtonStyle.Primary)
                                                .setEmoji(value.emoji));
                                        }
                                    }
                                    if ((_j = dialog === null || dialog === void 0 ? void 0 : dialog.dialog["step".concat(step, "option").concat(option)]) === null || _j === void 0 ? void 0 : _j.msgColor) {
                                        dialogEmbed_1.setColor((_k = dialog === null || dialog === void 0 ? void 0 : dialog.dialog["step".concat(step, "option").concat(option)]) === null || _k === void 0 ? void 0 : _k.msgColor);
                                    }
                                    if (!((_l = dialog === null || dialog === void 0 ? void 0 : dialog.dialog["step".concat(step, "option").concat(option)]) === null || _l === void 0 ? void 0 : _l.options)) return [3 /*break*/, 12];
                                    _20 = (_o = (_m = dialog === null || dialog === void 0 ? void 0 : dialog.dialog["step".concat(step, "option").concat(option)]) === null || _m === void 0 ? void 0 : _m.specialFunction) === null || _o === void 0 ? void 0 : _o.name;
                                    switch (_20) {
                                        case 'openShop': return [3 /*break*/, 2];
                                        case 'continueDialogInAnotherChannel': return [3 /*break*/, 4];
                                        case 'setActiveDialog': return [3 /*break*/, 5];
                                        case 'giveQuest': return [3 /*break*/, 7];
                                    }
                                    return [3 /*break*/, 10];
                                case 2: return [4 /*yield*/, execute('open', interaction, 1, [])];
                                case 3:
                                    shopMessage = _30.sent();
                                    interaction.channel.send(shopMessage);
                                    if ((_p = dialog.dialog) === null || _p === void 0 ? void 0 : _p.ephemeral) {
                                        if ((interaction === null || interaction === void 0 ? void 0 : interaction.deferred) || (interaction === null || interaction === void 0 ? void 0 : interaction.replied)) {
                                            return [2 /*return*/, { value: interaction.followUp({ embeds: [dialogEmbed_1], components: [row], ephemeral: true }) }];
                                        }
                                        else {
                                            return [2 /*return*/, { value: interaction.reply({ embeds: [dialogEmbed_1], components: [row], ephemeral: true }) }];
                                        }
                                    }
                                    else {
                                        return [2 /*return*/, { value: interaction.channel.send({ embeds: [dialogEmbed_1], components: [row] }) }];
                                    }
                                    _30.label = 4;
                                case 4:
                                    {
                                        targetChannels = (_q = dialog === null || dialog === void 0 ? void 0 : dialog.dialog["step".concat(step, "option").concat(option)]) === null || _q === void 0 ? void 0 : _q.specialFunction.targetChannels.split('|');
                                        targetChannels.forEach(function (channelID) {
                                            interaction.guild.channels.fetch(channelID)
                                                .then(function (channel) {
                                                return channel.send({ content: userMention(interaction.user.id), embeds: [dialogEmbed_1], components: [row] });
                                            })
                                                .catch(function () { return console.log('Access denied'); });
                                        });
                                        return [3 /*break*/, 11];
                                    }
                                    _30.label = 5;
                                case 5:
                                    target = (_s = (_r = dialog === null || dialog === void 0 ? void 0 : dialog.dialog["step".concat(step, "option").concat(option)]) === null || _r === void 0 ? void 0 : _r.specialFunction) === null || _s === void 0 ? void 0 : _s.target;
                                    _21 = [target.split('/')[0], target.split('/')[1]], targetCharacter = _21[0], targetDialog = _21[1];
                                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'EventDialogProgression'), (_24 = {},
                                            _24["".concat(targetCharacter, ".activeDialog")] = targetDialog,
                                            _24), { merge: true })];
                                case 6:
                                    _30.sent();
                                    if ((_t = dialog.dialog) === null || _t === void 0 ? void 0 : _t.ephemeral) {
                                        if ((interaction === null || interaction === void 0 ? void 0 : interaction.deferred) || (interaction === null || interaction === void 0 ? void 0 : interaction.replied)) {
                                            return [2 /*return*/, { value: interaction.followUp({ embeds: [dialogEmbed_1], components: [row], ephemeral: true }) }];
                                        }
                                        else {
                                            return [2 /*return*/, { value: interaction.reply({ embeds: [dialogEmbed_1], components: [row], ephemeral: true }) }];
                                        }
                                    }
                                    else {
                                        return [2 /*return*/, { value: interaction.channel.send({ embeds: [dialogEmbed_1], components: [row] }) }];
                                    }
                                    _30.label = 7;
                                case 7:
                                    targetQuest = (_v = (_u = dialog === null || dialog === void 0 ? void 0 : dialog.dialog["step".concat(step, "option").concat(option)]) === null || _u === void 0 ? void 0 : _u.specialFunction) === null || _v === void 0 ? void 0 : _v.quest;
                                    targetCharacterQuest = (_x = (_w = dialog === null || dialog === void 0 ? void 0 : dialog.dialog["step".concat(step, "option").concat(option)]) === null || _w === void 0 ? void 0 : _w.specialFunction) === null || _x === void 0 ? void 0 : _x.questCharacter;
                                    questEmbed = new EmbedBuilder()
                                        .setTitle("".concat(targetCharacterQuest, " te ha dado una nueva mision!"))
                                        .setColor(dialog.dialog.embedColor)
                                        .setDescription(bold(targetQuest.mission));
                                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/Quests").concat(targetCharacterQuest)), (_25 = {},
                                            _25["quest".concat(targetQuest.position)] = targetQuest,
                                            _25))];
                                case 8:
                                    _30.sent();
                                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/EventQuestProgression/Weekly/").concat(targetCharacterQuest)), (_26 = {},
                                            _26["mission".concat(targetQuest.position)] = 0,
                                            _26))];
                                case 9:
                                    _30.sent();
                                    if ((_y = dialog.dialog) === null || _y === void 0 ? void 0 : _y.ephemeral) {
                                        if ((interaction === null || interaction === void 0 ? void 0 : interaction.deferred) || (interaction === null || interaction === void 0 ? void 0 : interaction.replied)) {
                                            return [2 /*return*/, { value: interaction.followUp({ embeds: [dialogEmbed_1, questEmbed], components: [row], ephemeral: true }) }];
                                        }
                                        else {
                                            return [2 /*return*/, { value: interaction.reply({ embeds: [dialogEmbed_1], components: [row], ephemeral: true }) }];
                                        }
                                    }
                                    else {
                                        return [2 /*return*/, { value: interaction.channel.send({ embeds: [dialogEmbed_1, questEmbed], components: [row] }) }];
                                    }
                                    _30.label = 10;
                                case 10:
                                    if ((_z = dialog.dialog) === null || _z === void 0 ? void 0 : _z.ephemeral) {
                                        if ((interaction === null || interaction === void 0 ? void 0 : interaction.deferred) || (interaction === null || interaction === void 0 ? void 0 : interaction.replied)) {
                                            return [2 /*return*/, { value: interaction.followUp({ embeds: [dialogEmbed_1], components: [row], ephemeral: true }) }];
                                        }
                                        else {
                                            return [2 /*return*/, { value: interaction.reply({ embeds: [dialogEmbed_1], components: [row], ephemeral: true }) }];
                                        }
                                    }
                                    else {
                                        return [2 /*return*/, { value: interaction.channel.send({ embeds: [dialogEmbed_1], components: [row] }) }];
                                    }
                                    _30.label = 11;
                                case 11: return [3 /*break*/, 22];
                                case 12:
                                    _22 = (_0 = dialog === null || dialog === void 0 ? void 0 : dialog.dialog["step".concat(step, "option").concat(option)]) === null || _0 === void 0 ? void 0 : _0.specialFunction.name;
                                    switch (_22) {
                                        case 'openShop': return [3 /*break*/, 13];
                                        case 'continueDialogInAnotherChannel': return [3 /*break*/, 15];
                                        case 'setActiveDialog': return [3 /*break*/, 16];
                                        case 'giveQuest': return [3 /*break*/, 18];
                                    }
                                    return [3 /*break*/, 21];
                                case 13: return [4 /*yield*/, execute('open', interaction, 1, [])];
                                case 14:
                                    shopMessage = _30.sent();
                                    interaction.channel.send(shopMessage);
                                    return [2 /*return*/, { value: interaction.channel.send({ embeds: [dialogEmbed_1], ephemeral: ((_1 = dialog.dialog) === null || _1 === void 0 ? void 0 : _1.ephemeral) || false }) }];
                                case 15:
                                    {
                                        targetChannels = (_2 = dialog === null || dialog === void 0 ? void 0 : dialog.dialog["step".concat(step, "option").concat(option)]) === null || _2 === void 0 ? void 0 : _2.specialFunction.targetChannels.split('|');
                                        targetChannels.forEach(function (channelID) {
                                            interaction.guild.channels.fetch(channelID)
                                                .then(function (channel) {
                                                var _a;
                                                if ((_a = dialog.dialog) === null || _a === void 0 ? void 0 : _a.ephemeral) {
                                                    if ((interaction === null || interaction === void 0 ? void 0 : interaction.deferred) || (interaction === null || interaction === void 0 ? void 0 : interaction.replied)) {
                                                        return interaction.followUp({ embeds: [dialogEmbed_1], ephemeral: true });
                                                    }
                                                    else {
                                                        return interaction.reply({ embeds: [dialogEmbed_1], ephemeral: true });
                                                    }
                                                }
                                                else {
                                                    return channel.send({ content: userMention(interaction.user.id), embeds: [dialogEmbed_1] });
                                                }
                                            })
                                                .catch(function () { return console.log('Access denied'); });
                                        });
                                        return [3 /*break*/, 21];
                                    }
                                    _30.label = 16;
                                case 16:
                                    target = (_4 = (_3 = dialog === null || dialog === void 0 ? void 0 : dialog.dialog["step".concat(step, "option").concat(option)]) === null || _3 === void 0 ? void 0 : _3.specialFunction) === null || _4 === void 0 ? void 0 : _4.target;
                                    _23 = [target.split('/')[0], target.split('/')[1]], targetCharacter = _23[0], targetDialog = _23[1];
                                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'EventDialogProgression'), (_27 = {}, _27["".concat(targetCharacter, ".activeDialog")] = targetDialog, _27), { merge: true })];
                                case 17:
                                    _30.sent();
                                    if ((_5 = dialog.dialog) === null || _5 === void 0 ? void 0 : _5.ephemeral) {
                                        if ((interaction === null || interaction === void 0 ? void 0 : interaction.deferred) || (interaction === null || interaction === void 0 ? void 0 : interaction.replied)) {
                                            return [2 /*return*/, { value: interaction.followUp({ embeds: [dialogEmbed_1], ephemeral: true }) }];
                                        }
                                        else {
                                            return [2 /*return*/, { value: interaction.reply({ embeds: [dialogEmbed_1], ephemeral: true }) }];
                                        }
                                    }
                                    else {
                                        return [2 /*return*/, { value: interaction.channel.send({ embeds: [dialogEmbed_1] }) }];
                                    }
                                    _30.label = 18;
                                case 18:
                                    targetQuest = (_7 = (_6 = dialog === null || dialog === void 0 ? void 0 : dialog.dialog["step".concat(step, "option").concat(option)]) === null || _6 === void 0 ? void 0 : _6.specialFunction) === null || _7 === void 0 ? void 0 : _7.quest;
                                    targetCharacterQuest = (_9 = (_8 = dialog === null || dialog === void 0 ? void 0 : dialog.dialog["step".concat(step, "option").concat(option)]) === null || _8 === void 0 ? void 0 : _8.specialFunction) === null || _9 === void 0 ? void 0 : _9.questCharacter;
                                    questEmbed = new EmbedBuilder()
                                        .setTitle("".concat(targetCharacterQuest, " te ha dado una nueva mision!"))
                                        .setColor(dialog.dialog.embedColor)
                                        .setDescription(bold(targetQuest.mission));
                                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/Quests").concat(targetCharacterQuest)), (_28 = {},
                                            _28["quest".concat(targetQuest.position)] = targetQuest,
                                            _28))];
                                case 19:
                                    _30.sent();
                                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/EventQuestProgression/Weekly/").concat(targetCharacterQuest)), (_29 = {},
                                            _29["mission".concat(targetQuest.position)] = 0,
                                            _29))];
                                case 20:
                                    _30.sent();
                                    if ((_10 = dialog.dialog) === null || _10 === void 0 ? void 0 : _10.ephemeral) {
                                        if ((interaction === null || interaction === void 0 ? void 0 : interaction.deferred) || (interaction === null || interaction === void 0 ? void 0 : interaction.replied)) {
                                            return [2 /*return*/, { value: interaction.followUp({ embeds: [dialogEmbed_1, questEmbed], ephemeral: true }) }];
                                        }
                                        else {
                                            return [2 /*return*/, { value: interaction.reply({ embeds: [dialogEmbed_1], ephemeral: true }) }];
                                        }
                                    }
                                    else {
                                        return [2 /*return*/, { value: interaction.channel.send({ embeds: [dialogEmbed_1, questEmbed] }) }];
                                    }
                                    _30.label = 21;
                                case 21:
                                    if ((_11 = dialog.dialog) === null || _11 === void 0 ? void 0 : _11.ephemeral) {
                                        if ((interaction === null || interaction === void 0 ? void 0 : interaction.deferred) || (interaction === null || interaction === void 0 ? void 0 : interaction.replied)) {
                                            return [2 /*return*/, { value: interaction.followUp({ embeds: [dialogEmbed_1], ephemeral: true }) }];
                                        }
                                        else {
                                            return [2 /*return*/, { value: interaction.reply({ embeds: [dialogEmbed_1], ephemeral: true }) }];
                                        }
                                    }
                                    else {
                                        return [2 /*return*/, { value: interaction.channel.send({ embeds: [dialogEmbed_1] }) }];
                                    }
                                    _30.label = 22;
                                case 22: return [3 /*break*/, 24];
                                case 23:
                                    console.log("[WARNING] The dialog at ".concat(filePath, " doesn't match the required dialog name\nREQUIRED: ").concat(dialogName, "\nFOUND: ").concat((_12 = dialog === null || dialog === void 0 ? void 0 : dialog.dialog) === null || _12 === void 0 ? void 0 : _12.name));
                                    _30.label = 24;
                                case 24: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, dialogFiles_1 = dialogFiles;
                    _13.label = 1;
                case 1:
                    if (!(_i < dialogFiles_1.length)) return [3 /*break*/, 4];
                    file = dialogFiles_1[_i];
                    return [5 /*yield**/, _loop_1(file)];
                case 2:
                    state_1 = _13.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    _13.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
module.exports = { dialogHandler: dialogHandler };
export {};

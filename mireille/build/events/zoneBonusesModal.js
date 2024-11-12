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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _a = require('discord.js'), Events = _a.Events, channelMention = _a.channelMention, ChannelType = _a.ChannelType, ThreadAutoArchiveDuration = _a.ThreadAutoArchiveDuration, bold = _a.bold;
var EmbedBuilder = require('discord.js').EmbedBuilder;
var Utils = require('../utils.js').Utils;
var _b = require('firebase/firestore'), getFirestore = _b.getFirestore, doc = _b.doc, updateDoc = _b.updateDoc, arrayUnion = _b.arrayUnion, increment = _b.increment, getDoc = _b.getDoc, setDoc = _b.setDoc;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var idSplit_1, bonuses_2, i, enemiesZone_1, createdChannelID, databaseChannelID, effectsEmbed_1, _a, bonuses_1, bonuses_1_1, bonus, bonusObj, e_1_1, embed;
            var _b;
            var _this = this;
            var _c, e_1, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!interaction.isModalSubmit())
                            return [2 /*return*/];
                        if (!interaction.customId.includes('farmChannel-zoneBonuses')) return [3 /*break*/, 16];
                        return [4 /*yield*/, interaction.deferReply()];
                    case 1:
                        _f.sent();
                        idSplit_1 = interaction.customId.split('-');
                        bonuses_2 = [];
                        for (i = 1; i < 6; i++) {
                            if (interaction.fields.getTextInputValue("zoneBonusSlot".concat(i)).trim() == '')
                                continue;
                            bonuses_2.push(interaction.fields.getTextInputValue("zoneBonusSlot".concat(i)).split(','));
                        }
                        enemiesZone_1 = idSplit_1[2];
                        createdChannelID = idSplit_1[3];
                        databaseChannelID = idSplit_1[4];
                        effectsEmbed_1 = new EmbedBuilder()
                            .setTitle('Efectos de la Zona')
                            .setColor('Blue')
                            .setDescription('Puedes ver los enemigos de la zona usando comandos de ataque.');
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 8, 9, 14]);
                        _a = true, bonuses_1 = __asyncValues(bonuses_2);
                        _f.label = 3;
                    case 3: return [4 /*yield*/, bonuses_1.next()];
                    case 4:
                        if (!(bonuses_1_1 = _f.sent(), _c = bonuses_1_1.done, !_c)) return [3 /*break*/, 7];
                        _e = bonuses_1_1.value;
                        _a = false;
                        bonus = _e;
                        bonusObj = {
                            name: bonus[0].split(':')[1].trim(),
                            type: bonus[1].split(':')[1].trim(),
                            amount: bonus[2].split(':')[1].trim(),
                        };
                        return [4 /*yield*/, updateDoc(doc(db, "".concat(interaction.guildId, "/FarmChannels")), (_b = {},
                                _b["channel".concat(databaseChannelID, ".zoneBonuses")] = arrayUnion(bonusObj),
                                _b), { merge: true })];
                    case 5:
                        _f.sent();
                        effectsEmbed_1.addFields({ name: bonusObj.name, value: "".concat(bold(Utils.FormatStatName(bonusObj.type)), " \\ ").concat(bonusObj.amount), inline: true });
                        _f.label = 6;
                    case 6:
                        _a = true;
                        return [3 /*break*/, 3];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _f.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _f.trys.push([9, , 12, 13]);
                        if (!(!_a && !_c && (_d = bonuses_1.return))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _d.call(bonuses_1)];
                    case 10:
                        _f.sent();
                        _f.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14:
                        if (bonuses_2.length == 0) {
                            effectsEmbed_1.addFields({ name: 'NONE', value: '**Sin efectos** \\ 0%' });
                        }
                        embed = new EmbedBuilder()
                            .setTitle('Canal creado exitosamente!')
                            .setDescription("Con los enemigos [".concat(enemiesZone_1, "]\n").concat(channelMention(createdChannelID)))
                            .setColor('Green');
                        interaction.editReply({ embeds: [embed] });
                        return [4 /*yield*/, interaction.guild.channels.fetch(createdChannelID).then(function (channel) { return __awaiter(_this, void 0, void 0, function () {
                                var thread, channelsSnap, enchanterEffectsEmbed, _a, bonuses_3, bonuses_3_1, bonus, bonusObj, e_2_1;
                                var _b, _c, _d;
                                var _e, e_2, _f, _g;
                                var _h;
                                return __generator(this, function (_j) {
                                    switch (_j.label) {
                                        case 0:
                                            channel.send({ embeds: [effectsEmbed_1] }).then(function (msg) { msg.pin(); });
                                            return [4 /*yield*/, channel.threads.create({
                                                    name: 'Enchanter Zone',
                                                    autoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays,
                                                    type: ChannelType.PublicThread,
                                                    reason: 'Needed a separate thread for enchanter effects',
                                                })];
                                        case 1:
                                            thread = _j.sent();
                                            return [4 /*yield*/, getDoc(doc(db, interaction.guild.id, 'FarmChannels'))];
                                        case 2:
                                            channelsSnap = _j.sent();
                                            if (!channelsSnap.exists()) return [3 /*break*/, 18];
                                            if (!((_h = channelsSnap.data()) === null || _h === void 0 ? void 0 : _h.channelCount)) return [3 /*break*/, 18];
                                            enchanterEffectsEmbed = new EmbedBuilder()
                                                .setTitle('Efectos de la Zona')
                                                .setColor('Aqua')
                                                .setDescription('Puedes ver los enemigos de la zona usando comandos de ataque.');
                                            return [4 /*yield*/, updateDoc(doc(db, "".concat(interaction.guildId, "/FarmChannels")), (_b = {}, _b['channelCount'] = increment(1), _b), { merge: true })];
                                        case 3:
                                            _j.sent();
                                            return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.guildId, "/FarmChannels")), (_c = {}, _c["channel".concat(channelsSnap.data().channelCount + 1)] = { enemies: enemiesZone_1.split(','), id: thread.id, minLvl: idSplit_1[5], enchanterOnly: true }, _c), { merge: true })];
                                        case 4:
                                            _j.sent();
                                            bonuses_2.unshift('name: Enchanter Buff, type: manaPerAttack, amount: +35%'.split(','));
                                            _j.label = 5;
                                        case 5:
                                            _j.trys.push([5, 11, 12, 17]);
                                            _a = true, bonuses_3 = __asyncValues(bonuses_2);
                                            _j.label = 6;
                                        case 6: return [4 /*yield*/, bonuses_3.next()];
                                        case 7:
                                            if (!(bonuses_3_1 = _j.sent(), _e = bonuses_3_1.done, !_e)) return [3 /*break*/, 10];
                                            _g = bonuses_3_1.value;
                                            _a = false;
                                            bonus = _g;
                                            bonusObj = {
                                                name: bonus[0].split(':')[1].trim(),
                                                type: bonus[1].split(':')[1].trim(),
                                                amount: bonus[2].split(':')[1].trim(),
                                            };
                                            return [4 /*yield*/, updateDoc(doc(db, "".concat(interaction.guildId, "/FarmChannels")), (_d = {},
                                                    _d["channel".concat(channelsSnap.data().channelCount + 1, ".zoneBonuses")] = arrayUnion(bonusObj),
                                                    _d), { merge: true })];
                                        case 8:
                                            _j.sent();
                                            enchanterEffectsEmbed.addFields({ name: bonusObj.name, value: "".concat(bold(Utils.FormatStatName(bonusObj.type)), " \\ ").concat(bonusObj.amount), inline: true });
                                            _j.label = 9;
                                        case 9:
                                            _a = true;
                                            return [3 /*break*/, 6];
                                        case 10: return [3 /*break*/, 17];
                                        case 11:
                                            e_2_1 = _j.sent();
                                            e_2 = { error: e_2_1 };
                                            return [3 /*break*/, 17];
                                        case 12:
                                            _j.trys.push([12, , 15, 16]);
                                            if (!(!_a && !_e && (_f = bonuses_3.return))) return [3 /*break*/, 14];
                                            return [4 /*yield*/, _f.call(bonuses_3)];
                                        case 13:
                                            _j.sent();
                                            _j.label = 14;
                                        case 14: return [3 /*break*/, 16];
                                        case 15:
                                            if (e_2) throw e_2.error;
                                            return [7 /*endfinally*/];
                                        case 16: return [7 /*endfinally*/];
                                        case 17:
                                            thread.send({ embeds: [enchanterEffectsEmbed] }).then(function (msg) { msg.pin(); });
                                            _j.label = 18;
                                        case 18: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 15:
                        _f.sent();
                        _f.label = 16;
                    case 16: return [2 /*return*/];
                }
            });
        });
    },
};
export {};

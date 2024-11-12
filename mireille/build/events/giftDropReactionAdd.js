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
var _a = require('firebase/firestore'), getFirestore = _a.getFirestore, doc = _a.doc, updateDoc = _a.updateDoc, getDoc = _a.getDoc, arrayUnion = _a.arrayUnion, increment = _a.increment, Timestamp = _a.Timestamp;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var _b = require('discord.js'), EmbedBuilder = _b.EmbedBuilder, AttachmentBuilder = _b.AttachmentBuilder, Events = _b.Events, underscore = _b.underscore;
var xpManager = require('../handlers/xpHandler.js').xpManager;
var path = require('node:path');
var Colors = require('../emums/colors.js').Colors;
var goldManager = require('../handlers/goldHandler.js').goldManager;
var Utils = require('../utils.js').Utils;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
module.exports = {
    name: Events.MessageReactionAdd,
    once: false,
    execute: function (reaction, usr) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, channels, activeDrop_1, _a, _b, _c, openMsg, docSnap, xpBonus, baseXp, finalXp, rewardEmbed, e_1_1, _loop_1, _d, _e, _f, e_2_1;
            var _g;
            var _this = this;
            var _h, e_1, _j, _k, _l, e_2, _m, _o, _p, e_3, _q, _r;
            var _s;
            return __generator(this, function (_t) {
                switch (_t.label) {
                    case 0:
                        if (!reaction.partial) return [3 /*break*/, 4];
                        _t.label = 1;
                    case 1:
                        _t.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, reaction.fetch()];
                    case 2:
                        _t.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _t.sent();
                        console.error('Something went wrong when fetching the message:', error_1);
                        // Return as `reaction.message.author` may be undefined/null
                        return [2 /*return*/];
                    case 4:
                        if (usr.bot)
                            return [2 /*return*/];
                        return [4 /*yield*/, getDoc(doc(db, 'Event/GiftDrops'))];
                    case 5:
                        channels = _t.sent();
                        if (!channels.exists()) return [3 /*break*/, 32];
                        if (!((_s = channels.data()) === null || _s === void 0 ? void 0 : _s.activeDrop))
                            return [2 /*return*/];
                        activeDrop_1 = channels.data().activeDrop;
                        _t.label = 6;
                    case 6:
                        _t.trys.push([6, 13, 14, 19]);
                        _a = true, _b = __asyncValues(activeDrop_1.openMsgs);
                        _t.label = 7;
                    case 7: return [4 /*yield*/, _b.next()];
                    case 8:
                        if (!(_c = _t.sent(), _h = _c.done, !_h)) return [3 /*break*/, 12];
                        _k = _c.value;
                        _a = false;
                        openMsg = _k;
                        if (activeDrop_1.destroyed)
                            return [2 /*return*/];
                        if (!(reaction.message.id == openMsg)) return [3 /*break*/, 11];
                        if (!(reaction.emoji.name == '🎁' && activeDrop_1.opened)) return [3 /*break*/, 11];
                        if (usr.bot)
                            return [2 /*return*/];
                        if (activeDrop_1.usersRewarded.some(function (member) { return member.includes(usr.id); }))
                            return [2 /*return*/];
                        return [4 /*yield*/, getDoc(doc(db, usr.id, 'PlayerInfo'))];
                    case 9:
                        docSnap = _t.sent();
                        if (!docSnap.exists()) return [3 /*break*/, 11];
                        xpBonus = docSnap.data().xpBonus;
                        baseXp = 300;
                        finalXp = baseXp + (baseXp * (xpBonus - activeDrop_1.multiplier));
                        rewardEmbed = new EmbedBuilder()
                            .setTitle('Gift Drop Rewards!')
                            .setDescription('Aqui estan tus recompensas!')
                            .setColor('Blue')
                            .addFields({ name: underscore('XP'), value: "".concat(finalXp, " XP (XP Bonus applied)") }, { name: underscore('Gold'), value: '50 GOLD' });
                        usr.send({ embeds: [rewardEmbed] });
                        xpManager('give', baseXp, usr);
                        goldManager('give', 50, usr);
                        return [4 /*yield*/, updateDoc(doc(db, 'Event/GiftDrops'), (_g = {},
                                _g['activeDrop.usersRewarded'] = arrayUnion(usr.id),
                                _g), { merge: true })];
                    case 10:
                        _t.sent();
                        return [2 /*return*/];
                    case 11:
                        _a = true;
                        return [3 /*break*/, 7];
                    case 12: return [3 /*break*/, 19];
                    case 13:
                        e_1_1 = _t.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 19];
                    case 14:
                        _t.trys.push([14, , 17, 18]);
                        if (!(!_a && !_h && (_j = _b.return))) return [3 /*break*/, 16];
                        return [4 /*yield*/, _j.call(_b)];
                    case 15:
                        _t.sent();
                        _t.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 18: return [7 /*endfinally*/];
                    case 19:
                        if (activeDrop_1.opened)
                            return [2 /*return*/];
                        if (activeDrop_1.pendingRewards.find(function (userId) { return userId == usr.id; }) != undefined)
                            return [2 /*return*/];
                        if (reaction.emoji.name != '🫳')
                            return [2 /*return*/];
                        _t.label = 20;
                    case 20:
                        _t.trys.push([20, 26, 27, 32]);
                        _loop_1 = function () {
                            var msg, giftOpenedEmbed, rewarded_1, filePath, _u, _v, _w, channelID, channel, e_3_1, users;
                            var _x, _y, _z;
                            return __generator(this, function (_0) {
                                switch (_0.label) {
                                    case 0:
                                        _o = _f.value;
                                        _d = false;
                                        msg = _o;
                                        if (!(reaction.message.id == msg)) return [3 /*break*/, 20];
                                        console.log("Reaction added to a gift drop message: ".concat(usr.id, " ").concat(usr.tag));
                                        return [4 /*yield*/, updateDoc(doc(db, 'Event/GiftDrops'), (_x = {},
                                                _x['activeDrop.pendingRewards'] = arrayUnion(usr.id),
                                                _x), { merge: true })];
                                    case 1:
                                        _0.sent();
                                        if (!(activeDrop_1.progress + 1 == activeDrop_1.goal)) return [3 /*break*/, 18];
                                        reaction.message.channel.sendTyping();
                                        giftOpenedEmbed = new EmbedBuilder()
                                            .setTitle('Goal achieved! 🎉')
                                            .setDescription('The gift has opened!\nThe rewards have been given to everyone who helped open it')
                                            .setColor(Colors[Utils.CapitalizeFirstLetter(activeDrop_1.giftColor)])
                                            .addFields({ name: 'If you didn\'t help open the gift...', value: 'React with 🎁 to this message to claim your rewards!' });
                                        rewarded_1 = [];
                                        filePath = path.join(__dirname, '..', 'assets', 'giftVideos', 'giftOpenColors', "".concat(activeDrop_1.giftColor, "_open_day.mp4"));
                                        _0.label = 2;
                                    case 2:
                                        _0.trys.push([2, 9, 10, 15]);
                                        _u = true, _v = (e_3 = void 0, __asyncValues(activeDrop_1.channels));
                                        _0.label = 3;
                                    case 3: return [4 /*yield*/, _v.next()];
                                    case 4:
                                        if (!(_w = _0.sent(), _p = _w.done, !_p)) return [3 /*break*/, 8];
                                        _r = _w.value;
                                        _u = false;
                                        channelID = _r;
                                        return [4 /*yield*/, usr.client.channels.fetch(channelID)];
                                    case 5:
                                        channel = _0.sent();
                                        return [4 /*yield*/, channel.send({
                                                embeds: [giftOpenedEmbed],
                                                files: [new AttachmentBuilder(filePath, { name: "gift_open_".concat(activeDrop_1.giftColor, ".mp4") })],
                                            }).then(function (message) { return __awaiter(_this, void 0, void 0, function () {
                                                var _a;
                                                return __generator(this, function (_b) {
                                                    switch (_b.label) {
                                                        case 0: return [4 /*yield*/, updateDoc(doc(db, 'Event/GiftDrops'), (_a = {},
                                                                _a['activeDrop.openMsgs'] = arrayUnion(message.id),
                                                                _a), { merge: true })];
                                                        case 1:
                                                            _b.sent();
                                                            message.react('🎁');
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                    case 6:
                                        _0.sent();
                                        _0.label = 7;
                                    case 7:
                                        _u = true;
                                        return [3 /*break*/, 3];
                                    case 8: return [3 /*break*/, 15];
                                    case 9:
                                        e_3_1 = _0.sent();
                                        e_3 = { error: e_3_1 };
                                        return [3 /*break*/, 15];
                                    case 10:
                                        _0.trys.push([10, , 13, 14]);
                                        if (!(!_u && !_p && (_q = _v.return))) return [3 /*break*/, 12];
                                        return [4 /*yield*/, _q.call(_v)];
                                    case 11:
                                        _0.sent();
                                        _0.label = 12;
                                    case 12: return [3 /*break*/, 14];
                                    case 13:
                                        if (e_3) throw e_3.error;
                                        return [7 /*endfinally*/];
                                    case 14: return [7 /*endfinally*/];
                                    case 15:
                                        setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                                            var _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0: return [4 /*yield*/, updateDoc(doc(db, 'Event/GiftDrops'), (_a = {},
                                                            _a['activeDrop.multiplier'] = increment(0.05),
                                                            _a), { merge: true })];
                                                    case 1:
                                                        _b.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }, 36e5);
                                        return [4 /*yield*/, getDoc(doc(db, 'Event/GiftDrops'))];
                                    case 16:
                                        users = (_0.sent()).data().activeDrop.pendingRewards || [];
                                        users.forEach(function (userID) { return __awaiter(_this, void 0, void 0, function () {
                                            var playerInfo, user, xpBonus, baseXp, finalXp, rewardEmbed;
                                            var _a;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0: return [4 /*yield*/, getDoc(doc(db, userID, 'PlayerInfo'))];
                                                    case 1:
                                                        playerInfo = _b.sent();
                                                        return [4 /*yield*/, reaction.client.users.fetch(userID)];
                                                    case 2:
                                                        user = _b.sent();
                                                        if (!playerInfo.exists()) return [3 /*break*/, 4];
                                                        xpBonus = playerInfo.data().xpBonus;
                                                        baseXp = 300;
                                                        finalXp = baseXp + (baseXp * xpBonus);
                                                        rewardEmbed = new EmbedBuilder()
                                                            .setTitle('Gift Drop Rewards!')
                                                            .setDescription('Thanks for helping open the gift, here are your rewards:')
                                                            .setColor(Colors[Utils.CapitalizeFirstLetter(activeDrop_1.giftColor)])
                                                            .addFields({ name: underscore('XP'), value: "".concat(finalXp, " XP (XP Bonus applied)") }, { name: underscore('Gold'), value: '50 GOLD' });
                                                        user.send({ embeds: [rewardEmbed] });
                                                        xpManager('give', baseXp, user);
                                                        goldManager('give', 50, user);
                                                        reaction.client.emit('type7QuestProgress', usr, reaction.client);
                                                        rewarded_1.push(userID);
                                                        return [4 /*yield*/, updateDoc(doc(db, 'Event/GiftDrops'), (_a = {},
                                                                _a['activeDrop.usersRewarded'] = rewarded_1,
                                                                _a), { merge: true })];
                                                    case 3:
                                                        _b.sent();
                                                        _b.label = 4;
                                                    case 4: return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                        return [4 /*yield*/, updateDoc(doc(db, 'Event/GiftDrops'), (_y = {},
                                                _y['activeDrop.opened'] = true,
                                                _y), { merge: true })];
                                    case 17:
                                        _0.sent();
                                        _0.label = 18;
                                    case 18: return [4 /*yield*/, updateDoc(doc(db, 'Event/GiftDrops'), (_z = {},
                                            _z['activeDrop.progress'] = activeDrop_1.pendingRewards.length + 1,
                                            _z), { merge: true })];
                                    case 19:
                                        _0.sent();
                                        _0.label = 20;
                                    case 20: return [2 /*return*/];
                                }
                            });
                        };
                        _d = true, _e = __asyncValues(activeDrop_1.messages);
                        _t.label = 21;
                    case 21: return [4 /*yield*/, _e.next()];
                    case 22:
                        if (!(_f = _t.sent(), _l = _f.done, !_l)) return [3 /*break*/, 25];
                        return [5 /*yield**/, _loop_1()];
                    case 23:
                        _t.sent();
                        _t.label = 24;
                    case 24:
                        _d = true;
                        return [3 /*break*/, 21];
                    case 25: return [3 /*break*/, 32];
                    case 26:
                        e_2_1 = _t.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 32];
                    case 27:
                        _t.trys.push([27, , 30, 31]);
                        if (!(!_d && !_l && (_m = _e.return))) return [3 /*break*/, 29];
                        return [4 /*yield*/, _m.call(_e)];
                    case 28:
                        _t.sent();
                        _t.label = 29;
                    case 29: return [3 /*break*/, 31];
                    case 30:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 31: return [7 /*endfinally*/];
                    case 32: return [2 /*return*/];
                }
            });
        });
    },
};
export {};

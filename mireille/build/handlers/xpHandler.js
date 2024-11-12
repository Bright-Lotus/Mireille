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
var _a = require('firebase/firestore'), getFirestore = _a.getFirestore, getDoc = _a.getDoc, doc = _a.doc, updateDoc = _a.updateDoc, increment = _a.increment;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var _b = require('discord.js'), EmbedBuilder = _b.EmbedBuilder, underscore = _b.underscore, bold = _b.bold, formatEmoji = _b.formatEmoji;
var Icons = require('../emums/icons.js').Icons;
var Utils = require('../utils.js').Utils;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
// Level Up Formula (Level / Constant) ^ Power
function xpManager(action, amount, user) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            amount = Number(amount);
            // eslint-disable-next-line no-async-promise-executor
            return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                    var constant, power, statConstant, statPower, secondaryStatConstant, secondaryStatPower, playerInfo, xpBonus, currentXp, nextLvlGoal, currentLvlGoal, updatedStats, maxHpCurrent, _a, previousLvl, currentLvl, levelUpEmbed, _b, _c, _d, _i, key, currentOtherStat, currentMagic, _e, currentAtk, _f, equipment, _g, _h, _j, orb, _k, _l, _m, orbValues, ratioValues, ratioSplit, ratio, ratioMax, ratioMin, newRatio, newRatioValues, e_1_1, e_2_1;
                    var _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
                    var _4, e_2, _5, _6, _7, e_1, _8, _9;
                    return __generator(this, function (_10) {
                        switch (_10.label) {
                            case 0:
                                if (!(action == 'give')) return [3 /*break*/, 60];
                                constant = 0.1;
                                power = 2;
                                statConstant = 0.3;
                                statPower = 1.1;
                                secondaryStatConstant = 0.3;
                                secondaryStatPower = 0.9;
                                return [4 /*yield*/, getDoc(doc(db, user.id, 'PlayerInfo'))];
                            case 1:
                                playerInfo = _10.sent();
                                if (!playerInfo.exists()) return [3 /*break*/, 60];
                                xpBonus = playerInfo.data().xpBonus;
                                amount = amount + ((amount / 100) * (xpBonus + 100));
                                currentXp = playerInfo.data().stats.xp + amount;
                                nextLvlGoal = Math.round(Math.pow(((playerInfo.data().playerLvl + 2) / constant), power));
                                currentLvlGoal = Math.round(Math.pow(((playerInfo.data().playerLvl + 1) / constant), power));
                                _10.label = 2;
                            case 2:
                                if (!(currentXp >= currentLvlGoal)) return [3 /*break*/, 57];
                                return [4 /*yield*/, getDoc(doc(db, user.id, 'PlayerInfo'))];
                            case 3:
                                updatedStats = _10.sent();
                                maxHpCurrent = 0;
                                console.log(currentXp, currentLvlGoal, 'debuglevelup', amount);
                                _a = [updatedStats.data().playerLvl, updatedStats.data().playerLvl + 1], previousLvl = _a[0], currentLvl = _a[1];
                                currentXp -= currentLvlGoal;
                                if (Math.sign(currentXp) == -1)
                                    currentXp = 0;
                                levelUpEmbed = new EmbedBuilder()
                                    .setTitle('Felicidades!')
                                    .setDescription("Has subido de nivel!\n".concat(bold('Tus stats han mejorado:')))
                                    .setColor('Random')
                                    .addFields({
                                    name: "Nivel ".concat((previousLvl.toString()), " > ").concat(bold(currentLvl.toString()), " ").concat(formatEmoji(Icons.LevelUp)),
                                    value: "XP Actual: ".concat(bold(currentXp)),
                                });
                                _b = updatedStats.data().stats;
                                _c = [];
                                for (_d in _b)
                                    _c.push(_d);
                                _i = 0;
                                _10.label = 4;
                            case 4:
                                if (!(_i < _c.length)) return [3 /*break*/, 24];
                                _d = _c[_i];
                                if (!(_d in _b)) return [3 /*break*/, 23];
                                key = _d;
                                if (key == 'xp')
                                    return [3 /*break*/, 23];
                                if (key == 'hp')
                                    return [3 /*break*/, 23];
                                if (key == 'mana')
                                    return [3 /*break*/, 23];
                                currentOtherStat = Math.round(Math.pow(((updatedStats.data().playerLvl + 1) / secondaryStatConstant), secondaryStatPower));
                                if (!(updatedStats.data().class == 'enchanter')) return [3 /*break*/, 14];
                                currentMagic = Math.round(Math.pow(((updatedStats.data().playerLvl + 1) / statConstant), statPower));
                                _e = key;
                                switch (_e) {
                                    case 'magicStrength': return [3 /*break*/, 5];
                                    case 'speed': return [3 /*break*/, 7];
                                    case 'manaPerAttack': return [3 /*break*/, 9];
                                }
                                return [3 /*break*/, 11];
                            case 5: return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_o = {},
                                    _o["stats.".concat(key)] = updatedStats.data().stats[key] + currentMagic,
                                    _o), { merge: true })];
                            case 6:
                                _10.sent();
                                levelUpEmbed.addFields({ name: bold(Utils.FormatStatName('magicStrength')), value: "".concat((updatedStats.data().stats[key].toString()), " > ").concat(bold((updatedStats.data().stats[key] + currentMagic).toString())) });
                                return [3 /*break*/, 13];
                            case 7:
                                currentMagic = Math.round(Math.pow(((updatedStats.data().playerLvl + 1) / statConstant), 0.5));
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_p = {},
                                        _p["stats.".concat(key)] = updatedStats.data().stats[key] + currentMagic,
                                        _p), { merge: true })];
                            case 8:
                                _10.sent();
                                levelUpEmbed.addFields({ name: bold(Utils.FormatStatName(key)), value: "".concat((updatedStats.data().stats[key].toString()), " > ").concat(bold((updatedStats.data().stats[key] + currentMagic).toString())) });
                                return [3 /*break*/, 13];
                            case 9:
                                currentMagic = Math.round(Math.pow(((updatedStats.data().playerLvl + 1) / statConstant), 0.7));
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_q = {},
                                        _q["stats.".concat(key)] = updatedStats.data().stats[key] + currentMagic,
                                        _q), { merge: true })];
                            case 10:
                                _10.sent();
                                levelUpEmbed.addFields({ name: bold(Utils.FormatStatName(key)), value: "".concat(updatedStats.data().stats[key].toString(), " > ").concat(bold((updatedStats.data().stats[key] + currentMagic).toString())) });
                                return [3 /*break*/, 13];
                            case 11: return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_r = {},
                                    _r["stats.".concat(key)] = updatedStats.data().stats[key] + currentOtherStat,
                                    _r), { merge: true })];
                            case 12:
                                _10.sent();
                                levelUpEmbed.addFields({ name: Utils.FormatStatName(key), value: "".concat(updatedStats.data().stats[key].toString(), " > ").concat(bold((updatedStats.data().stats[key] + currentOtherStat).toString())) });
                                return [3 /*break*/, 13];
                            case 13: return [3 /*break*/, 23];
                            case 14:
                                currentAtk = Math.round(Math.pow(((updatedStats.data().playerLvl + 1) / statConstant), statPower));
                                _f = key;
                                switch (_f) {
                                    case 'atk': return [3 /*break*/, 15];
                                    case 'speed': return [3 /*break*/, 17];
                                    case 'mana': return [3 /*break*/, 19];
                                }
                                return [3 /*break*/, 21];
                            case 15: return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_s = {},
                                    _s["stats.".concat(key)] = updatedStats.data().stats[key] + currentAtk,
                                    _s), { merge: true })];
                            case 16:
                                _10.sent();
                                levelUpEmbed.addFields({ name: bold(Utils.FormatStatName(key)), value: "".concat((updatedStats.data().stats[key].toString()), " > ").concat(bold((updatedStats.data().stats[key] + currentAtk).toString())) });
                                return [3 /*break*/, 23];
                            case 17:
                                currentAtk = Math.round(Math.pow(((updatedStats.data().playerLvl + 1) / statConstant), 0.5));
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_t = {},
                                        _t["stats.".concat(key)] = updatedStats.data().stats[key] + currentAtk,
                                        _t), { merge: true })];
                            case 18:
                                _10.sent();
                                levelUpEmbed.addFields({ name: bold(Utils.FormatStatName(key)), value: "".concat((updatedStats.data().stats[key].toString()), " > ").concat(bold((updatedStats.data().stats[key] + currentAtk).toString())) });
                                return [3 /*break*/, 23];
                            case 19:
                                currentAtk = Math.round(Math.pow(((updatedStats.data().playerLvl + 1) / statConstant), 0.3));
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_u = {},
                                        _u["stats.".concat(key)] = updatedStats.data().stats[key] + currentAtk,
                                        _u), { merge: true })];
                            case 20:
                                _10.sent();
                                levelUpEmbed.addFields({ name: bold(Utils.FormatStatName(key)), value: "".concat((updatedStats.data().stats[key].toString()), " > ").concat(bold((updatedStats.data().stats[key] + currentAtk).toString())) });
                                return [3 /*break*/, 23];
                            case 21: return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_v = {},
                                    _v["stats.".concat(key)] = updatedStats.data().stats[key] + currentOtherStat,
                                    _v), { merge: true })];
                            case 22:
                                _10.sent();
                                levelUpEmbed.addFields({ name: Utils.FormatStatName(key), value: "".concat(updatedStats.data().stats[key].toString(), " > ").concat(bold((updatedStats.data().stats[key] + currentOtherStat).toString())) });
                                if (key == 'maxHp')
                                    maxHpCurrent = updatedStats.data().stats[key] + currentOtherStat;
                                return [3 /*break*/, 23];
                            case 23:
                                _i++;
                                return [3 /*break*/, 4];
                            case 24:
                                user.send({ embeds: [levelUpEmbed] });
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_w = {},
                                        _w['stats.xp'] = increment(amount),
                                        _w), { merge: true })];
                            case 25:
                                _10.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_x = {},
                                        _x['eventPoints'] = increment(amount),
                                        _x), { merge: true })];
                            case 26:
                                _10.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_y = {},
                                        _y['nextLvlXpGoal'] = nextLvlGoal,
                                        _y), { merge: true })];
                            case 27:
                                _10.sent();
                                if (!(playerInfo.data().stats.hp <= updatedStats.data().stats.maxHp)) return [3 /*break*/, 29];
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_z = {},
                                        _z['stats.hp'] = maxHpCurrent,
                                        _z), { merge: true })];
                            case 28:
                                _10.sent();
                                _10.label = 29;
                            case 29: return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_0 = {},
                                    _0['playerLvl'] = increment(1),
                                    _0), { merge: true })];
                            case 30:
                                _10.sent();
                                // We emit the event to the client saying the user leveled up
                                user.client.emit('type9QuestProgress', user, user.client);
                                return [4 /*yield*/, getDoc(doc(db, user.id, 'PlayerInfo/Inventory/Equipment'))];
                            case 31: return [4 /*yield*/, (_10.sent()).data().abilityOrbs];
                            case 32:
                                equipment = _10.sent();
                                if (!equipment) return [3 /*break*/, 56];
                                _10.label = 33;
                            case 33:
                                _10.trys.push([33, 50, 51, 56]);
                                _g = true, _h = (e_2 = void 0, __asyncValues((Object === null || Object === void 0 ? void 0 : Object.entries(equipment || {})) || []));
                                _10.label = 34;
                            case 34: return [4 /*yield*/, _h.next()];
                            case 35:
                                if (!(_j = _10.sent(), _4 = _j.done, !_4)) return [3 /*break*/, 49];
                                _6 = _j.value;
                                _g = false;
                                orb = _6;
                                if (typeof orb[1] != 'object')
                                    return [3 /*break*/, 48];
                                _10.label = 36;
                            case 36:
                                _10.trys.push([36, 42, 43, 48]);
                                _k = true, _l = (e_1 = void 0, __asyncValues(Object.entries(orb[1])));
                                _10.label = 37;
                            case 37: return [4 /*yield*/, _l.next()];
                            case 38:
                                if (!(_m = _10.sent(), _7 = _m.done, !_7)) return [3 /*break*/, 41];
                                _9 = _m.value;
                                _k = false;
                                orbValues = _9;
                                if (typeof orbValues[1] != 'string' || !orbValues[1].includes('/'))
                                    return [3 /*break*/, 40];
                                ratioValues = orbValues[1];
                                ratioSplit = ratioValues.split('/');
                                ratio = ratioSplit[0];
                                ratioMax = ratioSplit[1].split('-')[1];
                                ratioMin = ratioSplit[1].split('-')[0];
                                newRatio = Number(ratio) + 2;
                                // Running a check for if the ratio goes over the max value
                                if (newRatio > Number(ratioMax))
                                    newRatio = ratioMax;
                                newRatioValues = "".concat(newRatio, "/").concat(ratioMin, "-").concat(ratioMax);
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo/Inventory/Equipment'), (_1 = {},
                                        _1["abilityOrbs.".concat(orb[0], ".").concat(orbValues[0])] = newRatioValues,
                                        _1), { merge: true })];
                            case 39:
                                _10.sent();
                                _10.label = 40;
                            case 40:
                                _k = true;
                                return [3 /*break*/, 37];
                            case 41: return [3 /*break*/, 48];
                            case 42:
                                e_1_1 = _10.sent();
                                e_1 = { error: e_1_1 };
                                return [3 /*break*/, 48];
                            case 43:
                                _10.trys.push([43, , 46, 47]);
                                if (!(!_k && !_7 && (_8 = _l.return))) return [3 /*break*/, 45];
                                return [4 /*yield*/, _8.call(_l)];
                            case 44:
                                _10.sent();
                                _10.label = 45;
                            case 45: return [3 /*break*/, 47];
                            case 46:
                                if (e_1) throw e_1.error;
                                return [7 /*endfinally*/];
                            case 47: return [7 /*endfinally*/];
                            case 48:
                                _g = true;
                                return [3 /*break*/, 34];
                            case 49: return [3 /*break*/, 56];
                            case 50:
                                e_2_1 = _10.sent();
                                e_2 = { error: e_2_1 };
                                return [3 /*break*/, 56];
                            case 51:
                                _10.trys.push([51, , 54, 55]);
                                if (!(!_g && !_4 && (_5 = _h.return))) return [3 /*break*/, 53];
                                return [4 /*yield*/, _5.call(_h)];
                            case 52:
                                _10.sent();
                                _10.label = 53;
                            case 53: return [3 /*break*/, 55];
                            case 54:
                                if (e_2) throw e_2.error;
                                return [7 /*endfinally*/];
                            case 55: return [7 /*endfinally*/];
                            case 56:
                                nextLvlGoal += Math.round(Math.pow(((playerInfo.data().playerLvl + 1) / constant), power));
                                currentLvlGoal += Math.round(Math.pow(((playerInfo.data().playerLvl + 1) / constant), power));
                                return [3 /*break*/, 2];
                            case 57: return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_2 = {},
                                    _2['stats.xp'] = currentXp,
                                    _2), { merge: true })];
                            case 58:
                                _10.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_3 = {},
                                        _3['eventPoints'] = increment(amount),
                                        _3), { merge: true })];
                            case 59:
                                _10.sent();
                                return [2 /*return*/, resolve(currentXp - playerInfo.data().nextLvlXpGoal)];
                            case 60: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
module.exports = { xpManager: xpManager };
export {};

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
import { getFirestore, updateDoc, getDoc, doc, increment, arrayUnion } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig.js';
import { Abilities } from '../emums/abilities.js';
import { ErrorEmbed, EventErrors } from '../errors/errors.js';
import { formatEmoji } from 'discord.js';
import { Icons } from '../emums/icons.js';
import { Utils } from '../utils.js';
import { converter } from './firestoreHandler.js';
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
export function ability(abilityID, target, user) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            // eslint-disable-next-line no-async-promise-executor
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var playerInfo, playerInfoData, abilityOrb, playerEquipment, activeBattlesDoc, activeBattles, __activeBattlesData, _a, playerAtk, attacks, atkRatio, finalAtkAmount, activeBuffs, playerMgcStr, healRatio, healAmount, playerMgcStrength, enemyMagicDurability, finalDamage, playerMgcStrength, enemyMagicDurability, finalDamage, burnDamage, playerMgcStr, healRatio, healAmount, targetStats, playerMgcStr, healRatio, healAmount, playerMgcStr, empowerRatio, mainStat, oldMainStat, activeBuffs, playerMgcStr, weakenRatio, playerMgcStr, weakenRatio, playerMgcStr, empowerRatio, oldMana, activeBuffs, playerMgcStr, empowerRatio, oldMana, activeBuffs, playerMgcStr, protectRatio, oldArmor, activeBuffs;
                    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
                    return __generator(this, function (_u) {
                        switch (_u.label) {
                            case 0: return [4 /*yield*/, getDoc(doc(db, user.id, 'PlayerInfo').withConverter(converter()))];
                            case 1:
                                playerInfo = (_u.sent());
                                playerInfoData = playerInfo.data();
                                return [4 /*yield*/, getDoc(doc(db, user.id, 'PlayerInfo/Inventory/Equipment'))];
                            case 2:
                                playerEquipment = _u.sent();
                                activeBattlesDoc = doc(db, user.id, 'ActiveBattles').withConverter(converter());
                                return [4 /*yield*/, getDoc(activeBattlesDoc)];
                            case 3:
                                activeBattles = (_u.sent());
                                __activeBattlesData = activeBattles.data();
                                if (playerEquipment.exists()) {
                                    abilityOrb = playerEquipment.data().abilityOrbs["abilityOrb".concat(abilityID)];
                                    if (playerInfoData.stats.mana < abilityOrb.requiredMana) {
                                        return [2 /*return*/, reject({
                                                manaEmbed: ErrorEmbed(EventErrors.NotEnoughMana, "Necesitas **".concat(abilityOrb.requiredMana - playerInfoData.stats.mana, "** ").concat(formatEmoji(Icons.Mana), " mas para cargar este orbe.")),
                                            })];
                                    }
                                }
                                _a = abilityOrb.ability;
                                switch (_a) {
                                    case Abilities.EmpoweredAttacks: return [3 /*break*/, 4];
                                    case Abilities.Heal: return [3 /*break*/, 8];
                                    case 'strike': return [3 /*break*/, 11];
                                    case 'burnStrike': return [3 /*break*/, 13];
                                    case 'healUpgraded': return [3 /*break*/, 15];
                                    case 'healRevive': return [3 /*break*/, 18];
                                    case 'empowerAlly': return [3 /*break*/, 20];
                                    case 'weaken': return [3 /*break*/, 25];
                                    case 'weakenPower': return [3 /*break*/, 27];
                                    case 'empowerMana': return [3 /*break*/, 29];
                                    case 'empowerAllyMana': return [3 /*break*/, 34];
                                    case 'protectAlly': return [3 /*break*/, 39];
                                }
                                return [3 /*break*/, 44];
                            case 4:
                                playerAtk = playerInfoData.stats.atk;
                                attacks = Number(abilityOrb.attacks.split('/')[0]);
                                atkRatio = Number(abilityOrb.ratio.split('/')[0]) + 100;
                                finalAtkAmount = Math.round((playerAtk / 100) * atkRatio);
                                activeBuffs = {
                                    buff: "increasedAtk:".concat(playerAtk),
                                    attacks: attacks,
                                };
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), 'stats.atk', finalAtkAmount)];
                            case 5:
                                _u.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), 'activeBuffs', arrayUnion(activeBuffs))];
                            case 6:
                                _u.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), 'stats.mana', increment(-Math.abs(abilityOrb.requiredMana)))];
                            case 7:
                                _u.sent();
                                return [2 /*return*/, resolve({ manaRemaining: (playerInfoData.stats.mana) + (-Math.abs(abilityOrb.requiredMana)) })];
                            case 8:
                                playerMgcStr = playerInfoData.stats.magicStrength;
                                healRatio = Number(abilityOrb.ratio.split('/')[0]) + 100;
                                healAmount = 10 + Math.round((playerMgcStr / 100) * healRatio);
                                console.log(healAmount, healRatio, playerMgcStr);
                                return [4 /*yield*/, updateDoc(doc(db, target, 'PlayerInfo'), (_b = {},
                                        _b['stats.hp'] = increment(healAmount),
                                        _b), { merge: true })];
                            case 9:
                                _u.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_c = {},
                                        _c['stats.mana'] = increment(-Math.abs(abilityOrb.requiredMana)),
                                        _c), { merge: true })];
                            case 10:
                                _u.sent();
                                return [2 /*return*/, resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) })];
                            case 11:
                                playerMgcStrength = playerInfo.data().stats.magicStrength;
                                enemyMagicDurability = activeBattles.enemyMagicDurability;
                                finalDamage = (abilityOrb.ratio.split('/')[0] / 100) * playerMgcStrength - (enemyMagicDurability * 0.7);
                                activeBattles.enemyHp -= finalDamage;
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'ActiveBattles'), (_d = {},
                                        _d["battle".concat(target)] = activeBattles,
                                        _d), { merge: true })];
                            case 12:
                                _u.sent();
                                return [2 /*return*/, resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) })];
                            case 13:
                                playerMgcStrength = playerInfo.data().stats.magicStrength;
                                enemyMagicDurability = activeBattles.enemyMagicDurability;
                                finalDamage = (abilityOrb.ratio.split('/')[0] / 100) * playerMgcStrength - (enemyMagicDurability * 0.7);
                                activeBattles.enemyHp -= finalDamage;
                                burnDamage = (abilityOrb.burnRatio / 100) * playerMgcStrength - (enemyMagicDurability * 0.6);
                                activeBattles.debuffs.push({ type: 'burn', damage: burnDamage });
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'ActiveBattles'), (_e = {},
                                        _e["battle".concat(target)] = activeBattles,
                                        _e), { merge: true })];
                            case 14:
                                _u.sent();
                                return [2 /*return*/, resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) })];
                            case 15:
                                playerMgcStr = playerInfo.data().stats.magicStrength;
                                healRatio = Number(abilityOrb.ratio.split('/')[0]);
                                healAmount = 10 + Math.round((playerMgcStr / 100) * healRatio);
                                targetStats = playerInfo.data().stats;
                                if (targetStats.maxHp * 30 / 100 < targetStats.hp) {
                                    healAmount += healAmount * 0.3;
                                }
                                console.log(healAmount, healRatio, playerMgcStr);
                                return [4 /*yield*/, updateDoc(doc(db, target, 'PlayerInfo'), (_f = {},
                                        _f['stats.hp'] = increment(healAmount),
                                        _f), { merge: true })];
                            case 16:
                                _u.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_g = {},
                                        _g['stats.mana'] = increment(-Math.abs(abilityOrb.requiredMana)),
                                        _g), { merge: true })];
                            case 17:
                                _u.sent();
                                return [2 /*return*/, resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) })];
                            case 18:
                                playerMgcStr = playerInfo.data().stats.magicStrength;
                                healRatio = Number(abilityOrb.ratio.split('/')[0]);
                                healAmount = Math.round((playerMgcStr / 100) * healRatio);
                                return [4 /*yield*/, updateDoc(doc(db, target, 'PlayerInfo'), (_h = {},
                                        _h['stats.hp'] = healAmount,
                                        _h['dead'] = false,
                                        _h), { merge: true })];
                            case 19:
                                _u.sent();
                                return [2 /*return*/, resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) })];
                            case 20:
                                playerMgcStr = playerInfo.data().stats.magicStrength;
                                empowerRatio = Number(abilityOrb.ratio.split('/')[0]);
                                mainStat = (playerInfo.class === 'warrior') ? 'atk' : 'magicStrength';
                                return [4 /*yield*/, getDoc(doc(db, target, 'PlayerInfo'))];
                            case 21: return [4 /*yield*/, (_u.sent()).data().stats[mainStat]];
                            case 22:
                                oldMainStat = _u.sent();
                                activeBuffs = {
                                    buff: "increased".concat(Utils.CapitalizeFirstLetter(mainStat), ":").concat(oldMainStat),
                                    attacks: Number(abilityOrb.attacks),
                                };
                                return [4 /*yield*/, updateDoc(doc(db, target, 'PlayerInfo'), (_j = {},
                                        _j['activeBuffs'] = arrayUnion(activeBuffs),
                                        _j), { merge: true })];
                            case 23:
                                _u.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_k = {},
                                        _k["stats.".concat(mainStat)] = increment((playerMgcStr / 100) * empowerRatio),
                                        _k), { merge: true })];
                            case 24:
                                _u.sent();
                                return [2 /*return*/, resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) })];
                            case 25:
                                playerMgcStr = playerInfo.data().stats.magicStrength;
                                weakenRatio = (playerMgcStr / 100) * Number(abilityOrb.ratio.split('/')[0]);
                                activeBattles.enemyArmor -= weakenRatio;
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'ActiveBattles'), (_l = {},
                                        _l["battle".concat(target)] = activeBattles,
                                        _l), { merge: true })];
                            case 26:
                                _u.sent();
                                return [2 /*return*/, resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) })];
                            case 27:
                                playerMgcStr = playerInfo.data().stats.magicStrength;
                                weakenRatio = (playerMgcStr / 100) * Number(abilityOrb.ratio.split('/')[0]);
                                activeBattles.enemyAtk -= weakenRatio;
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'ActiveBattles'), (_m = {},
                                        _m["battle".concat(target)] = activeBattles,
                                        _m), { merge: true })];
                            case 28:
                                _u.sent();
                                return [2 /*return*/, resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) })];
                            case 29:
                                playerMgcStr = playerInfo.data().stats.magicStrength;
                                empowerRatio = Number(abilityOrb.ratio.split('/')[0]);
                                return [4 /*yield*/, getDoc(doc(db, user.id, 'PlayerInfo'))];
                            case 30: return [4 /*yield*/, (_u.sent()).data().stats.mana];
                            case 31:
                                oldMana = _u.sent();
                                activeBuffs = {
                                    buff: "increasedMana:".concat(oldMana),
                                    attacks: Number(abilityOrb.attacks),
                                };
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_o = {},
                                        _o['activeBuffs'] = arrayUnion(activeBuffs),
                                        _o), { merge: true })];
                            case 32:
                                _u.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_p = {},
                                        _p['stats.manaPerAttack'] = increment((playerMgcStr / 100) * empowerRatio),
                                        _p), { merge: true })];
                            case 33:
                                _u.sent();
                                return [2 /*return*/, resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) })];
                            case 34:
                                playerMgcStr = playerInfo.data().stats.magicStrength;
                                empowerRatio = Number(abilityOrb.ratio.split('/')[0]);
                                return [4 /*yield*/, getDoc(doc(db, target, 'PlayerInfo'))];
                            case 35: return [4 /*yield*/, (_u.sent()).data().stats.mana];
                            case 36:
                                oldMana = _u.sent();
                                activeBuffs = {
                                    buff: "increasedMana:".concat(oldMana),
                                    attacks: Number(abilityOrb.attacks),
                                };
                                return [4 /*yield*/, updateDoc(doc(db, target, 'PlayerInfo'), (_q = {},
                                        _q['activeBuffs'] = arrayUnion(activeBuffs),
                                        _q), { merge: true })];
                            case 37:
                                _u.sent();
                                return [4 /*yield*/, updateDoc(doc(db, target, 'PlayerInfo'), (_r = {},
                                        _r['stats.manaPerAttack'] = increment((playerMgcStr / 100) * empowerRatio),
                                        _r), { merge: true })];
                            case 38:
                                _u.sent();
                                return [2 /*return*/, resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) })];
                            case 39:
                                playerMgcStr = playerInfo.data().stats.magicStrength;
                                protectRatio = Number(abilityOrb.ratio.split('/')[0]);
                                return [4 /*yield*/, getDoc(doc(db, target, 'PlayerInfo'))];
                            case 40: return [4 /*yield*/, (_u.sent()).data().stats.armor];
                            case 41:
                                oldArmor = _u.sent();
                                activeBuffs = {
                                    buff: "increasedArmor:".concat(oldArmor),
                                    attacks: Number(abilityOrb.attacks),
                                };
                                return [4 /*yield*/, updateDoc(doc(db, target, 'PlayerInfo'), (_s = {},
                                        _s['activeBuffs'] = arrayUnion(activeBuffs),
                                        _s), { merge: true })];
                            case 42:
                                _u.sent();
                                return [4 /*yield*/, updateDoc(doc(db, target, 'PlayerInfo'), (_t = {},
                                        _t['stats.armor'] = increment((playerMgcStr / 100) * protectRatio),
                                        _t), { merge: true })];
                            case 43:
                                _u.sent();
                                return [2 /*return*/, resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) })];
                            case 44: return [3 /*break*/, 45];
                            case 45: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
module.exports = { ability: ability };

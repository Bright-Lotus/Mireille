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
var _a = require('firebase/firestore'), getFirestore = _a.getFirestore, doc = _a.doc, getDoc = _a.getDoc, updateDoc = _a.updateDoc, arrayRemove = _a.arrayRemove, arrayUnion = _a.arrayUnion, deleteField = _a.deleteField, increment = _a.increment;
var xpManager = require('./xpHandler.js').xpManager;
var goldManager = require('./goldHandler.js').goldManager;
var healthManager = require('./healthHandler.js').healthManager;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var keywordHandler = require('./keywordHandler.js').keywordHandler;
var Utils = require('../utils.js').Utils;
var _b = require('discord.js'), formatEmoji = _b.formatEmoji, bold = _b.bold;
var Icons = require('../emums/icons.js').Icons;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
function attack(user, enemy, client, farmChannel) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            // eslint-disable-next-line no-async-promise-executor
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var battles, enemyObj, enemyHp, enemyAtk, enemySpd, enemyArmor, enemyMagicDurability, enemyElite, enemyUnique, enemyId, enemyXp_1, enemyGold_1, turn, debuffs, playerInfo_1, emojisDmg_1, playerAtk, _a, _b, _c, bonus, bonusAmount, e_1_1, finalDamage_1, finalEnemy_1, lifesteal_1, _i, _d, debuff, _e, enemyDmg_1, onEnemyAttack, _f, onEnemyAttack_1, onEnemyAttack_1_1, effect, _g, perkRatio, baseDamage, percentageDamage, effectDamage, markDamage, e_2_1, _h, _j, _k, bonus, bonusAmount, e_3_1, remainingHp_1, dead_1, _l, _m, _o, bonus, bonusAmount, e_4_1, emojisBonusDmg_1, _p, _q, _r, keyword, e_5_1, _s, _t, _u, keyword, e_6_1, _v, _w, _x, bonus, bonusAmount, e_7_1, i, debuff, burnDamage, markDamage, activeBuffs, onAttack, _y, onAttack_1, onAttack_1_1, effect, _z, burnDamage, markDamage, ratio, ratio, stat, ratioFreeze, ratioExtraDmg, stat, e_8_1, _0, _1, _2, keyword, e_9_1, attackCooldown, reducedAttackCdValue, resolveResults_1, _3, _4, _5, bonus, bonusAmount, e_10_1, _6, _7, _8, bonus, bonusAmount, e_11_1, _9, _10, _11, bonus, bonusAmount, e_12_1;
                    var _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32;
                    var _this = this;
                    var _33, e_1, _34, _35, _36, e_2, _37, _38, _39, e_3, _40, _41, _42, e_4, _43, _44, _45, e_5, _46, _47, _48, e_6, _49, _50, _51, e_7, _52, _53, _54, e_8, _55, _56, _57, e_9, _58, _59, _60, e_10, _61, _62, _63, e_11, _64, _65, _66, e_12, _67, _68;
                    return __generator(this, function (_69) {
                        switch (_69.label) {
                            case 0: return [4 /*yield*/, getDoc(doc(db, user.id, 'ActiveBattles'))];
                            case 1:
                                battles = _69.sent();
                                if (!battles.exists()) return [3 /*break*/, 206];
                                enemyObj = battles.data().battles["battle".concat(enemy)];
                                enemyHp = enemyObj.enemyHp;
                                enemyAtk = enemyObj.enemyAtk;
                                enemySpd = enemyObj.enemySpd;
                                enemyArmor = Number(enemyObj.enemyArmor);
                                enemyMagicDurability = Number(enemyObj.enemyMagicDurability);
                                enemyElite = enemyObj.enemyElite;
                                enemyUnique = enemyObj.enemyUnique;
                                enemyId = enemyObj.enemyId;
                                enemyXp_1 = enemyObj.enemyXp;
                                enemyGold_1 = enemyObj.enemyGold;
                                turn = enemyObj.turn;
                                debuffs = enemyObj.debuffs;
                                return [4 /*yield*/, getDoc(doc(db, user.id, 'PlayerInfo'))];
                            case 2:
                                playerInfo_1 = _69.sent();
                                emojisDmg_1 = '';
                                if (!playerInfo_1.exists()) return [3 /*break*/, 206];
                                playerAtk = Number(playerInfo_1.data().stats.atk);
                                console.log('🚀 ~ file: attackHandler.js:37 ~ returnnewPromise ~ playerAt', playerAtk);
                                if (Math.random() < 0.4) {
                                    // CRIT HIT
                                    playerAtk += playerAtk / 100 * 150;
                                    emojisDmg_1 += formatEmoji(Icons.Crit);
                                }
                                if (Math.random() < 0.2) {
                                    // LUCKY HIT
                                    playerAtk += playerAtk / 100 * 180;
                                    emojisDmg_1 += formatEmoji(Icons.Lucky);
                                }
                                _69.label = 3;
                            case 3:
                                _69.trys.push([3, 9, 10, 15]);
                                _a = true, _b = __asyncValues((farmChannel === null || farmChannel === void 0 ? void 0 : farmChannel.zoneBonuses) || []);
                                _69.label = 4;
                            case 4: return [4 /*yield*/, _b.next()];
                            case 5:
                                if (!(_c = _69.sent(), _33 = _c.done, !_33)) return [3 /*break*/, 8];
                                _35 = _c.value;
                                _a = false;
                                bonus = _35;
                                bonusAmount = Number(bonus.amount.match(/\d+/g));
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_12 = {},
                                        _12["stats.".concat(bonus.type)] = increment(Number(playerInfo_1.data().stats[bonus.type] / 100 * bonusAmount)),
                                        _12), { merge: true })];
                            case 6:
                                _69.sent();
                                _69.label = 7;
                            case 7:
                                _a = true;
                                return [3 /*break*/, 4];
                            case 8: return [3 /*break*/, 15];
                            case 9:
                                e_1_1 = _69.sent();
                                e_1 = { error: e_1_1 };
                                return [3 /*break*/, 15];
                            case 10:
                                _69.trys.push([10, , 13, 14]);
                                if (!(!_a && !_33 && (_34 = _b.return))) return [3 /*break*/, 12];
                                return [4 /*yield*/, _34.call(_b)];
                            case 11:
                                _69.sent();
                                _69.label = 12;
                            case 12: return [3 /*break*/, 14];
                            case 13:
                                if (e_1) throw e_1.error;
                                return [7 /*endfinally*/];
                            case 14: return [7 /*endfinally*/];
                            case 15:
                                finalDamage_1 = (Math.sign(playerAtk - enemyArmor) == -1) ? 0 : playerAtk - enemyArmor;
                                finalEnemy_1 = {
                                    enemyId: enemyId,
                                    enemyHp: enemyHp,
                                    enemyMaxHp: enemyObj.enemyMaxHp,
                                    enemyAtk: Number(enemyAtk),
                                    enemyArmor: enemyArmor,
                                    enemySpd: enemySpd,
                                    enemyMagicDurability: enemyMagicDurability,
                                    enemyElite: enemyElite,
                                    enemyUnique: enemyUnique,
                                    enemyXp: enemyXp_1,
                                    enemyGold: enemyGold_1,
                                    turn: turn,
                                    keywords: enemyObj.keywords,
                                    debuffs: debuffs,
                                    turnsUntilAbility: Number(enemyObj.turnsUntilAbility),
                                };
                                lifesteal_1 = '';
                                if (!(turn == 'enemy')) return [3 /*break*/, 113];
                                finalEnemy_1.turn = 'player';
                                if (!(finalEnemy_1.debuffs.length > 0)) return [3 /*break*/, 20];
                                _i = 0, _d = finalEnemy_1.debuffs;
                                _69.label = 16;
                            case 16:
                                if (!(_i < _d.length)) return [3 /*break*/, 20];
                                debuff = _d[_i];
                                _e = debuff.type;
                                switch (_e) {
                                    case 'archerDebuff': return [3 /*break*/, 17];
                                }
                                return [3 /*break*/, 19];
                            case 17:
                                if (!(debuff.turns - 1 == 0)) return [3 /*break*/, 19];
                                finalEnemy_1.debuffs = finalEnemy_1.debuffs.filter(function (e) { return e.type != 'archerDebuff'; });
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'ActiveBattles'), (_13 = {},
                                        _13["battles.battle".concat(enemy)] = finalEnemy_1,
                                        _13), { merge: true })];
                            case 18:
                                _69.sent();
                                return [2 /*return*/, resolve({ enemyAttacked: false, damageReceived: 0, remainingHp: playerInfo_1.data().stats.hp })];
                            case 19:
                                _i++;
                                return [3 /*break*/, 16];
                            case 20:
                                enemyDmg_1 = enemyAtk - (playerInfo_1.data().stats.armor / 2);
                                return [4 /*yield*/, getDoc(doc(db, user.id, 'PlayerInfo/Inventory/Equipped'))];
                            case 21: return [4 /*yield*/, (_69.sent()).data().onEnemyAttack];
                            case 22:
                                onEnemyAttack = _69.sent();
                                if (!((onEnemyAttack === null || onEnemyAttack === void 0 ? void 0 : onEnemyAttack.length) > 0)) return [3 /*break*/, 42];
                                _69.label = 23;
                            case 23:
                                _69.trys.push([23, 36, 37, 42]);
                                _f = true, onEnemyAttack_1 = __asyncValues(onEnemyAttack);
                                _69.label = 24;
                            case 24: return [4 /*yield*/, onEnemyAttack_1.next()];
                            case 25:
                                if (!(onEnemyAttack_1_1 = _69.sent(), _36 = onEnemyAttack_1_1.done, !_36)) return [3 /*break*/, 35];
                                _38 = onEnemyAttack_1_1.value;
                                _f = false;
                                effect = _38;
                                _g = effect.perk;
                                switch (_g) {
                                    case 'thornmail': return [3 /*break*/, 26];
                                    case 'mark': return [3 /*break*/, 27];
                                    case 'gainArmor': return [3 /*break*/, 28];
                                    case 'gainGold': return [3 /*break*/, 30];
                                    case 'freeze': return [3 /*break*/, 32];
                                    case 'dodge': return [3 /*break*/, 33];
                                }
                                return [3 /*break*/, 34];
                            case 26:
                                {
                                    perkRatio = effect.perkRatio.split('/');
                                    baseDamage = perkRatio[0];
                                    percentageDamage = perkRatio[1];
                                    effectDamage = baseDamage + (playerInfo_1.data().stats.armor / 100 * percentageDamage);
                                    finalEnemy_1.enemyHp -= effectDamage - (finalEnemy_1.enemyMagicDurability / 2);
                                    return [3 /*break*/, 34];
                                }
                                _69.label = 27;
                            case 27:
                                {
                                    markDamage = Math.ceil((playerInfo_1.data().stats.armor / 100) * effect.perkRatio);
                                    finalEnemy_1.debuffs.push({ type: 'mark', damage: markDamage });
                                    return [3 /*break*/, 34];
                                }
                                _69.label = 28;
                            case 28: return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_14 = {},
                                    _14['stats.armor'] = Number(effect.perkRatio),
                                    _14), { merge: true })];
                            case 29:
                                _69.sent();
                                return [3 /*break*/, 34];
                            case 30: return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_15 = {},
                                    _15['gold'] = Number(effect.perkRatio),
                                    _15), { merge: true })];
                            case 31:
                                _69.sent();
                                return [3 /*break*/, 34];
                            case 32:
                                {
                                    finalEnemy_1.enemyArmor -= (playerInfo_1.data().stats.armor / 100) * effect.ratio;
                                    return [3 /*break*/, 34];
                                }
                                _69.label = 33;
                            case 33:
                                {
                                    if ((Math.random() * 100) < effect.ratio) {
                                        enemyDmg_1 = -1;
                                    }
                                }
                                _69.label = 34;
                            case 34:
                                _f = true;
                                return [3 /*break*/, 24];
                            case 35: return [3 /*break*/, 42];
                            case 36:
                                e_2_1 = _69.sent();
                                e_2 = { error: e_2_1 };
                                return [3 /*break*/, 42];
                            case 37:
                                _69.trys.push([37, , 40, 41]);
                                if (!(!_f && !_36 && (_37 = onEnemyAttack_1.return))) return [3 /*break*/, 39];
                                return [4 /*yield*/, _37.call(onEnemyAttack_1)];
                            case 38:
                                _69.sent();
                                _69.label = 39;
                            case 39: return [3 /*break*/, 41];
                            case 40:
                                if (e_2) throw e_2.error;
                                return [7 /*endfinally*/];
                            case 41: return [7 /*endfinally*/];
                            case 42:
                                if (!(Math.sign(enemyDmg_1) == -1)) return [3 /*break*/, 57];
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'ActiveBattles'), (_16 = {},
                                        _16["battles.battle".concat(enemy)] = finalEnemy_1,
                                        _16), { merge: true })];
                            case 43:
                                _69.sent();
                                _69.label = 44;
                            case 44:
                                _69.trys.push([44, 50, 51, 56]);
                                _h = true, _j = __asyncValues((farmChannel === null || farmChannel === void 0 ? void 0 : farmChannel.zoneBonuses) || []);
                                _69.label = 45;
                            case 45: return [4 /*yield*/, _j.next()];
                            case 46:
                                if (!(_k = _69.sent(), _39 = _k.done, !_39)) return [3 /*break*/, 49];
                                _41 = _k.value;
                                _h = false;
                                bonus = _41;
                                bonusAmount = Number(bonus.amount.match(/\d+/g)[0]);
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_17 = {},
                                        _17["stats.".concat(bonus.type)] = increment(-(playerInfo_1.data().stats[bonus.type] / 100 * bonusAmount)),
                                        _17), { merge: true })];
                            case 47:
                                _69.sent();
                                _69.label = 48;
                            case 48:
                                _h = true;
                                return [3 /*break*/, 45];
                            case 49: return [3 /*break*/, 56];
                            case 50:
                                e_3_1 = _69.sent();
                                e_3 = { error: e_3_1 };
                                return [3 /*break*/, 56];
                            case 51:
                                _69.trys.push([51, , 54, 55]);
                                if (!(!_h && !_39 && (_40 = _j.return))) return [3 /*break*/, 53];
                                return [4 /*yield*/, _40.call(_j)];
                            case 52:
                                _69.sent();
                                _69.label = 53;
                            case 53: return [3 /*break*/, 55];
                            case 54:
                                if (e_3) throw e_3.error;
                                return [7 /*endfinally*/];
                            case 55: return [7 /*endfinally*/];
                            case 56: return [2 /*return*/, resolve({ enemyAttacked: true, damageReceived: 0, remainingHp: playerInfo_1.data().stats.hp })];
                            case 57:
                                dead_1 = false;
                                return [4 /*yield*/, healthManager('damage', user, enemyDmg_1).then(function (results) {
                                        if (results.dead) {
                                            dead_1 = true;
                                        }
                                        remainingHp_1 = results.remainingHp;
                                    })];
                            case 58:
                                _69.sent();
                                if (!dead_1) return [3 /*break*/, 72];
                                _69.label = 59;
                            case 59:
                                _69.trys.push([59, 65, 66, 71]);
                                _l = true, _m = __asyncValues((farmChannel === null || farmChannel === void 0 ? void 0 : farmChannel.zoneBonuses) || []);
                                _69.label = 60;
                            case 60: return [4 /*yield*/, _m.next()];
                            case 61:
                                if (!(_o = _69.sent(), _42 = _o.done, !_42)) return [3 /*break*/, 64];
                                _44 = _o.value;
                                _l = false;
                                bonus = _44;
                                bonusAmount = Number(bonus.amount.match(/\d+/g)[0]);
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_18 = {},
                                        _18["stats.".concat(bonus.type)] = increment(-Math.abs((playerInfo_1.data().stats[bonus.type] / 100 * bonusAmount))),
                                        _18), { merge: true })];
                            case 62:
                                _69.sent();
                                _69.label = 63;
                            case 63:
                                _l = true;
                                return [3 /*break*/, 60];
                            case 64: return [3 /*break*/, 71];
                            case 65:
                                e_4_1 = _69.sent();
                                e_4 = { error: e_4_1 };
                                return [3 /*break*/, 71];
                            case 66:
                                _69.trys.push([66, , 69, 70]);
                                if (!(!_l && !_42 && (_43 = _m.return))) return [3 /*break*/, 68];
                                return [4 /*yield*/, _43.call(_m)];
                            case 67:
                                _69.sent();
                                _69.label = 68;
                            case 68: return [3 /*break*/, 70];
                            case 69:
                                if (e_4) throw e_4.error;
                                return [7 /*endfinally*/];
                            case 70: return [7 /*endfinally*/];
                            case 71: return [2 /*return*/, reject({ damageReceived: enemyDmg_1, remainingHp: "0 / **".concat(playerInfo_1.data().stats.maxHp, "** ").concat(Utils.HpEmoji(0, playerInfo_1.data().stats.maxHp)) })];
                            case 72:
                                emojisBonusDmg_1 = '';
                                finalEnemy_1.turnsUntilAbility -= 1;
                                console.log('🚀 ~ file: attackHandler.js:98 ~ returnnewPromise ~ finalEnemy.turnsUntilAbility', finalEnemy_1.turnsUntilAbility);
                                if (!(finalEnemy_1.turnsUntilAbility == 0)) return [3 /*break*/, 85];
                                _69.label = 73;
                            case 73:
                                _69.trys.push([73, 79, 80, 85]);
                                _p = true, _q = __asyncValues(Object.values(finalEnemy_1.keywords));
                                _69.label = 74;
                            case 74: return [4 /*yield*/, _q.next()];
                            case 75:
                                if (!(_r = _69.sent(), _45 = _r.done, !_45)) return [3 /*break*/, 78];
                                _47 = _r.value;
                                _p = false;
                                keyword = _47;
                                if (keyword.type != 'ability')
                                    return [3 /*break*/, 77];
                                // Handle ability keyword
                                return [4 /*yield*/, keywordHandler(keyword.type, keyword.subtype, finalEnemy_1, user, { ratio: keyword.ratio, damageDealt: enemyDmg_1 }).then(function (results) {
                                        if (results === null || results === void 0 ? void 0 : results.healed) {
                                            emojisBonusDmg_1 += formatEmoji(Icons.Lifesteal);
                                            finalEnemy_1.enemyHp += results.healed;
                                            if (finalEnemy_1.enemyHp > finalEnemy_1.enemyMaxHp)
                                                results.healed = 0;
                                            lifesteal_1 += "\n\n".concat(bold('Enemy healed:'), "\n ").concat(lifesteal_1, " ").concat(results.healed, " ").concat(formatEmoji(Icons.Lifesteal));
                                            return;
                                        }
                                        enemyDmg_1 = enemyDmg_1 + Math.round(results.damageReceived);
                                        emojisBonusDmg_1 += results.bonusDmgEmoji;
                                    })];
                            case 76:
                                // Handle ability keyword
                                _69.sent();
                                _69.label = 77;
                            case 77:
                                _p = true;
                                return [3 /*break*/, 74];
                            case 78: return [3 /*break*/, 85];
                            case 79:
                                e_5_1 = _69.sent();
                                e_5 = { error: e_5_1 };
                                return [3 /*break*/, 85];
                            case 80:
                                _69.trys.push([80, , 83, 84]);
                                if (!(!_p && !_45 && (_46 = _q.return))) return [3 /*break*/, 82];
                                return [4 /*yield*/, _46.call(_q)];
                            case 81:
                                _69.sent();
                                _69.label = 82;
                            case 82: return [3 /*break*/, 84];
                            case 83:
                                if (e_5) throw e_5.error;
                                return [7 /*endfinally*/];
                            case 84: return [7 /*endfinally*/];
                            case 85:
                                if (!(finalEnemy_1.keywords.length > 0)) return [3 /*break*/, 98];
                                _69.label = 86;
                            case 86:
                                _69.trys.push([86, 92, 93, 98]);
                                _s = true, _t = __asyncValues(Object.values(finalEnemy_1.keywords));
                                _69.label = 87;
                            case 87: return [4 /*yield*/, _t.next()];
                            case 88:
                                if (!(_u = _69.sent(), _48 = _u.done, !_48)) return [3 /*break*/, 91];
                                _50 = _u.value;
                                _s = false;
                                keyword = _50;
                                if (keyword.type == 'Duelist') {
                                    finalEnemy_1.enemyAtk = Number(finalEnemy_1.enemyAtk) + Number(keyword.ratio);
                                    emojisBonusDmg_1 += formatEmoji(Icons.Duelist);
                                    return [3 /*break*/, 90];
                                }
                                if (keyword.type != 'FlameTouch' && keyword.type != 'Plasmatic' && keyword.type != 'PoisonousAttacks' && keyword.type != 'Vampiric')
                                    return [3 /*break*/, 90];
                                // Handle keywords that should trigger on enemy attack
                                return [4 /*yield*/, keywordHandler(keyword.type, keyword.subtype, finalEnemy_1, user, { ratio: keyword.ratio, damageDealt: enemyDmg_1 }).then(function (results) {
                                        if (results === null || results === void 0 ? void 0 : results.healed) {
                                            emojisBonusDmg_1 += formatEmoji(Icons.Vampiric);
                                            finalEnemy_1.enemyHp += results.healed;
                                            if (finalEnemy_1.enemyHp > finalEnemy_1.enemyMaxHp)
                                                results.healed = 0;
                                            lifesteal_1 += "\n\n".concat(bold('Enemy healed:'), "\n ").concat(lifesteal_1, " ").concat(results.healed, " ").concat(formatEmoji(Icons.Lifesteal));
                                            return;
                                        }
                                        enemyDmg_1 = enemyDmg_1 + Math.round(results.damageReceived);
                                        emojisBonusDmg_1 += results.bonusDmgEmoji;
                                    })];
                            case 89:
                                // Handle keywords that should trigger on enemy attack
                                _69.sent();
                                _69.label = 90;
                            case 90:
                                _s = true;
                                return [3 /*break*/, 87];
                            case 91: return [3 /*break*/, 98];
                            case 92:
                                e_6_1 = _69.sent();
                                e_6 = { error: e_6_1 };
                                return [3 /*break*/, 98];
                            case 93:
                                _69.trys.push([93, , 96, 97]);
                                if (!(!_s && !_48 && (_49 = _t.return))) return [3 /*break*/, 95];
                                return [4 /*yield*/, _49.call(_t)];
                            case 94:
                                _69.sent();
                                _69.label = 95;
                            case 95: return [3 /*break*/, 97];
                            case 96:
                                if (e_6) throw e_6.error;
                                return [7 /*endfinally*/];
                            case 97: return [7 /*endfinally*/];
                            case 98:
                                if (finalEnemy_1.enemyHp > finalEnemy_1.enemyMaxHp)
                                    finalEnemy_1.enemyHp = finalEnemy_1.enemyMaxHp;
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'ActiveBattles'), (_19 = {},
                                        _19["battles.battle".concat(enemy)] = finalEnemy_1,
                                        _19), { merge: true })];
                            case 99:
                                _69.sent();
                                _69.label = 100;
                            case 100:
                                _69.trys.push([100, 106, 107, 112]);
                                _v = true, _w = __asyncValues((farmChannel === null || farmChannel === void 0 ? void 0 : farmChannel.zoneBonuses) || []);
                                _69.label = 101;
                            case 101: return [4 /*yield*/, _w.next()];
                            case 102:
                                if (!(_x = _69.sent(), _51 = _x.done, !_51)) return [3 /*break*/, 105];
                                _53 = _x.value;
                                _v = false;
                                bonus = _53;
                                bonusAmount = Number(bonus.amount.match(/\d+/g)[0]);
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_20 = {},
                                        _20["stats.".concat(bonus.type)] = increment(-Math.abs((playerInfo_1.data().stats[bonus.type] / 100 * bonusAmount))),
                                        _20), { merge: true })];
                            case 103:
                                _69.sent();
                                _69.label = 104;
                            case 104:
                                _v = true;
                                return [3 /*break*/, 101];
                            case 105: return [3 /*break*/, 112];
                            case 106:
                                e_7_1 = _69.sent();
                                e_7 = { error: e_7_1 };
                                return [3 /*break*/, 112];
                            case 107:
                                _69.trys.push([107, , 110, 111]);
                                if (!(!_v && !_51 && (_52 = _w.return))) return [3 /*break*/, 109];
                                return [4 /*yield*/, _52.call(_w)];
                            case 108:
                                _69.sent();
                                _69.label = 109;
                            case 109: return [3 /*break*/, 111];
                            case 110:
                                if (e_7) throw e_7.error;
                                return [7 /*endfinally*/];
                            case 111: return [7 /*endfinally*/];
                            case 112: return [2 /*return*/, resolve({ enemyAttacked: true, damageReceived: "".concat(Math.round(enemyDmg_1), " ").concat(emojisBonusDmg_1), remainingHp: "".concat(Math.round(remainingHp_1), " / **").concat(playerInfo_1.data().stats.maxHp, "** ").concat(Utils.HpEmoji(remainingHp_1, playerInfo_1.data().stats.maxHp), " ").concat(lifesteal_1) })];
                            case 113:
                                console.log('🚀 ~ file: attackHandler.js:125 ~ returnnewPromise ~ finalEnemy.enemyHp', finalEnemy_1.enemyHp);
                                if (finalEnemy_1.debuffs.length > 0) {
                                    for (i = 0; i < finalEnemy_1.debuffs.length; i++) {
                                        debuff = finalEnemy_1.debuffs[i];
                                        switch (debuff.type) {
                                            case 'burn': {
                                                burnDamage = Math.floor(debuff.damage - (finalEnemy_1.enemyMagicDurability / 2));
                                                if (Math.sign(burnDamage) == -1) {
                                                    break;
                                                }
                                                else {
                                                    finalEnemy_1.enemyHp -= burnDamage;
                                                }
                                                break;
                                            }
                                            case 'mark': {
                                                markDamage = Math.floor(debuff.damage - (finalEnemy_1.enemyMagicDurability * 0.7));
                                                if (Math.sign(markDamage) == -1) {
                                                    break;
                                                }
                                                else {
                                                    finalEnemy_1.enemyHp -= markDamage;
                                                    finalEnemy_1.debuffs.splice(i, 1);
                                                }
                                            }
                                        }
                                    }
                                }
                                console.log('🚀 ~ file: attackHandler.js:136 ~ returnnewPromise ~ finalEnemy.enemyHp', finalEnemy_1.enemyHp);
                                if (!playerInfo_1.exists()) return [3 /*break*/, 143];
                                activeBuffs = playerInfo_1.data().activeBuffs;
                                if (activeBuffs.length > 0) {
                                    activeBuffs.forEach(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                        var buff, _a;
                                        var _b, _c, _d;
                                        return __generator(this, function (_e) {
                                            switch (_e.label) {
                                                case 0:
                                                    buff = {
                                                        buff: element.buff,
                                                        attacks: element.attacks - 1,
                                                    };
                                                    console.log('🚀 ~ file: attackHandler.js:140 ~ returnnewPromise ~ buff debug', element, buff);
                                                    _a = buff.buff.split(':')[0];
                                                    switch (_a) {
                                                        case 'increasedAtk': return [3 /*break*/, 1];
                                                    }
                                                    return [3 /*break*/, 7];
                                                case 1:
                                                    if (!(element === null || element === void 0 ? void 0 : element.attacks)) return [3 /*break*/, 6];
                                                    emojisDmg_1 += formatEmoji(Icons.BuffedAtk);
                                                    if (!(buff.attacks == 0)) return [3 /*break*/, 3];
                                                    return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_b = {},
                                                            _b['stats.atk'] = Number(element.buff.split(':')[1]),
                                                            _b), { merge: true })];
                                                case 2:
                                                    _e.sent();
                                                    _e.label = 3;
                                                case 3: return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_c = {},
                                                        _c['activeBuffs'] = arrayRemove(element),
                                                        _c), { merge: true })];
                                                case 4:
                                                    _e.sent();
                                                    if (!(buff.attacks > 0)) return [3 /*break*/, 6];
                                                    return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_d = {},
                                                            _d['activeBuffs'] = arrayUnion(buff),
                                                            _d), { merge: true })];
                                                case 5:
                                                    _e.sent();
                                                    _e.label = 6;
                                                case 6: return [3 /*break*/, 7];
                                                case 7: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                }
                                return [4 /*yield*/, getDoc(doc(db, user.id, 'PlayerInfo/Inventory/Equipped'))];
                            case 114: return [4 /*yield*/, (_69.sent()).data().onAttack];
                            case 115:
                                onAttack = _69.sent();
                                if (!onAttack) return [3 /*break*/, 141];
                                if (!((onAttack === null || onAttack === void 0 ? void 0 : onAttack.length) > 0)) return [3 /*break*/, 141];
                                _69.label = 116;
                            case 116:
                                _69.trys.push([116, 135, 136, 141]);
                                _y = true, onAttack_1 = __asyncValues(onAttack);
                                _69.label = 117;
                            case 117: return [4 /*yield*/, onAttack_1.next()];
                            case 118:
                                if (!(onAttack_1_1 = _69.sent(), _54 = onAttack_1_1.done, !_54)) return [3 /*break*/, 134];
                                _56 = onAttack_1_1.value;
                                _y = false;
                                effect = _56;
                                _z = effect.perk;
                                switch (_z) {
                                    case 'burn': return [3 /*break*/, 119];
                                    case 'mark': return [3 /*break*/, 120];
                                    case 'execute': return [3 /*break*/, 121];
                                    case 'freeze': return [3 /*break*/, 122];
                                    case 'gainSpd': return [3 /*break*/, 123];
                                    case 'gainAtk': return [3 /*break*/, 125];
                                    case 'gainGold': return [3 /*break*/, 127];
                                    case 'freezeFire': return [3 /*break*/, 129];
                                    case 'sharp': return [3 /*break*/, 130];
                                }
                                return [3 /*break*/, 131];
                            case 119:
                                {
                                    burnDamage = Math.ceil((playerAtk / 100) * effect.perkRatio);
                                    finalEnemy_1.debuffs.push({ type: 'burn', damage: burnDamage });
                                    return [3 /*break*/, 132];
                                }
                                _69.label = 120;
                            case 120:
                                {
                                    markDamage = Math.ceil((playerAtk / 100) * effect.perkRatio);
                                    finalEnemy_1.debuffs.push({ type: 'mark', damage: markDamage });
                                    return [3 /*break*/, 132];
                                }
                                _69.label = 121;
                            case 121:
                                {
                                    ratio = effect.perkRatio;
                                    if ((finalEnemy_1.enemyHp - finalDamage_1) < (100 / (finalEnemy_1.enemyHp / ratio))) {
                                        finalDamage_1 = 9999;
                                        emojisDmg_1 += formatEmoji(Icons.Execute);
                                    }
                                    return [3 /*break*/, 132];
                                }
                                _69.label = 122;
                            case 122:
                                if (typeof effect.perkRatio == 'string') {
                                    ratio = Number(effect.perkRatio.split('/')[0]) + playerInfo_1.data().stats.atk;
                                    finalEnemy_1.enemyArmor -= ratio;
                                    emojisDmg_1 += '❄️';
                                }
                                return [3 /*break*/, 132];
                            case 123: return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_21 = {},
                                    _21['stats.spd'] = Number(effect.perkRatio),
                                    _21), { merge: true })];
                            case 124:
                                _69.sent();
                                emojisDmg_1 += '➕';
                                return [3 /*break*/, 132];
                            case 125: return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_22 = {},
                                    _22['stats.atk'] = Number(effect.perkRatio),
                                    _22), { merge: true })];
                            case 126:
                                _69.sent();
                                emojisDmg_1 += '➕';
                                return [3 /*break*/, 132];
                            case 127: return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_23 = {},
                                    _23['gold'] = Number(effect.perkRatio),
                                    _23), { merge: true })];
                            case 128:
                                _69.sent();
                                emojisDmg_1 += '🪙';
                                return [3 /*break*/, 132];
                            case 129:
                                {
                                    stat = (playerInfo_1.data().playerClass == 'enchanter') ? playerInfo_1.data().stats.magicStrength : playerInfo_1.data().stats.atk;
                                    ratioFreeze = effect.perkRatio.split('/')[0];
                                    ratioExtraDmg = effect.perkRatio.split('/')[1];
                                    finalDamage_1 += Utils.ClampNumber((stat / 100 * ratioExtraDmg) - (finalEnemy_1.enemyMagicDurability / 2), 0, 9999);
                                    finalEnemy_1.enemyArmor -= stat / 100 * ratioFreeze;
                                    return [3 /*break*/, 132];
                                }
                                _69.label = 130;
                            case 130:
                                {
                                    finalDamage_1 += effect.perkRatio / finalEnemy_1.enemyArmor * 0.5;
                                    return [3 /*break*/, 132];
                                }
                                _69.label = 131;
                            case 131: return [3 /*break*/, 132];
                            case 132:
                                if (effect.perk.includes('Strike')) {
                                    stat = (playerInfo_1.data().playerClass == 'enchanter') ? playerInfo_1.data().stats.magicStrength : playerInfo_1.data().stats.atk;
                                    finalDamage_1 += (stat / 100 * effect.perkRatio) - finalEnemy_1.enemyMagicDurability * 0.4;
                                }
                                _69.label = 133;
                            case 133:
                                _y = true;
                                return [3 /*break*/, 117];
                            case 134: return [3 /*break*/, 141];
                            case 135:
                                e_8_1 = _69.sent();
                                e_8 = { error: e_8_1 };
                                return [3 /*break*/, 141];
                            case 136:
                                _69.trys.push([136, , 139, 140]);
                                if (!(!_y && !_54 && (_55 = onAttack_1.return))) return [3 /*break*/, 138];
                                return [4 /*yield*/, _55.call(onAttack_1)];
                            case 137:
                                _69.sent();
                                _69.label = 138;
                            case 138: return [3 /*break*/, 140];
                            case 139:
                                if (e_8) throw e_8.error;
                                return [7 /*endfinally*/];
                            case 140: return [7 /*endfinally*/];
                            case 141: return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_24 = {},
                                    _24['stats.mana'] = increment(playerInfo_1.data().stats.manaPerAttack),
                                    _24), { merge: true })];
                            case 142:
                                _69.sent();
                                _69.label = 143;
                            case 143:
                                if (!(finalEnemy_1.keywords.length > 0)) return [3 /*break*/, 156];
                                _69.label = 144;
                            case 144:
                                _69.trys.push([144, 150, 151, 156]);
                                _0 = true, _1 = __asyncValues(Object.values(finalEnemy_1.keywords));
                                _69.label = 145;
                            case 145: return [4 /*yield*/, _1.next()];
                            case 146:
                                if (!(_2 = _69.sent(), _57 = _2.done, !_57)) return [3 /*break*/, 149];
                                _59 = _2.value;
                                _0 = false;
                                keyword = _59;
                                if (keyword.type != 'Hardened' && keyword.type != 'Elusive')
                                    return [3 /*break*/, 148];
                                console.log('🚀 ~ file: attackHandler.js:170 ~ forawait ~ keyword', keyword);
                                // Handle keywords that should trigger on player attack
                                return [4 /*yield*/, keywordHandler(keyword.type, keyword.subtype, finalEnemy_1, user, { ratio: keyword.ratio }).then(function (results) {
                                        console.log('🚀 ~ file: attackHandler.js:172 ~ awaitkeywordHandler ~ results', results);
                                        if (results === null || results === void 0 ? void 0 : results.dodged) {
                                            finalDamage_1 = 0;
                                            emojisDmg_1 += formatEmoji(Icons.Elusive);
                                            return;
                                        }
                                        finalDamage_1 += Math.round(results.damageDone);
                                        emojisDmg_1 += results.reducedDmgEmoji;
                                    })];
                            case 147:
                                // Handle keywords that should trigger on player attack
                                _69.sent();
                                _69.label = 148;
                            case 148:
                                _0 = true;
                                return [3 /*break*/, 145];
                            case 149: return [3 /*break*/, 156];
                            case 150:
                                e_9_1 = _69.sent();
                                e_9 = { error: e_9_1 };
                                return [3 /*break*/, 156];
                            case 151:
                                _69.trys.push([151, , 154, 155]);
                                if (!(!_0 && !_57 && (_58 = _1.return))) return [3 /*break*/, 153];
                                return [4 /*yield*/, _58.call(_1)];
                            case 152:
                                _69.sent();
                                _69.label = 153;
                            case 153: return [3 /*break*/, 155];
                            case 154:
                                if (e_9) throw e_9.error;
                                return [7 /*endfinally*/];
                            case 155: return [7 /*endfinally*/];
                            case 156:
                                if (Math.sign(finalDamage_1) == -1)
                                    finalDamage_1 = 0;
                                // Attack the enemy
                                finalEnemy_1.enemyHp -= finalDamage_1;
                                if (!!playerInfo_1.attackOnCooldown) return [3 /*break*/, 159];
                                attackCooldown = 40;
                                reducedAttackCdValue = attackCooldown / (1 + (playerInfo_1.data().stats.speed / 100));
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_25 = {},
                                        _25['attackOnCooldown'] = true,
                                        _25), { merge: true })];
                            case 157:
                                _69.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_26 = {},
                                        _26['attackCooldown'] = new Date(new Date().getTime() + (reducedAttackCdValue * 1000)),
                                        _26), { merge: true })];
                            case 158:
                                _69.sent();
                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_a = {},
                                                    _a['attackOnCooldown'] = false,
                                                    _a), { merge: true })];
                                            case 1:
                                                _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }, reducedAttackCdValue * 1000);
                                _69.label = 159;
                            case 159:
                                finalEnemy_1.turn = (finalEnemy_1.turn == 'player') ? 'enemy' : 'player';
                                console.log(finalEnemy_1, 'debugattackenemy');
                                if (!(finalEnemy_1.enemyHp <= 0)) return [3 /*break*/, 191];
                                client.emit('type8QuestProgress', user, client);
                                return [4 /*yield*/, xpManager('give', Number(enemyXp_1), user).then(console.log)];
                            case 160:
                                _69.sent();
                                return [4 /*yield*/, goldManager('give', Number(enemyGold_1), user)];
                            case 161:
                                _69.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'ActiveBattles'), (_27 = {},
                                        _27["battles.battle".concat(enemy)] = deleteField(),
                                        _27), { merge: true })];
                            case 162:
                                _69.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'ActiveBattles'), (_28 = {},
                                        _28['battles.amount'] = increment(-1),
                                        _28), { merge: true })];
                            case 163:
                                _69.sent();
                                if (!(finalEnemy_1.keywords.length > 0)) return [3 /*break*/, 178];
                                resolveResults_1 = {};
                                return [4 /*yield*/, Promise.all(finalEnemy_1.keywords.map(function (keyword) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (keyword.type != 'LastBreath')
                                                        return [2 /*return*/];
                                                    return [4 /*yield*/, keywordHandler(keyword.type, keyword.subtype, finalEnemy_1, user, { ratio: keyword.ratio }).then(function (results) {
                                                            resolveResults_1 = { enemyKilled: true, xp: Math.round((enemyXp_1 / 100) * (playerInfo_1.data().xpBonus + 100)), gold: enemyGold_1, damageDone: "".concat((emojisDmg_1.trim() == '') ? Math.round(finalDamage_1) : bold(Math.round(finalDamage_1)), " ").concat(emojisDmg_1), enemySplitted: results.enemySplitted };
                                                        })];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/, true];
                                            }
                                        });
                                    }); }))];
                            case 164:
                                _69.sent();
                                _69.label = 165;
                            case 165:
                                _69.trys.push([165, 171, 172, 177]);
                                _3 = true, _4 = __asyncValues((farmChannel === null || farmChannel === void 0 ? void 0 : farmChannel.zoneBonuses) || []);
                                _69.label = 166;
                            case 166: return [4 /*yield*/, _4.next()];
                            case 167:
                                if (!(_5 = _69.sent(), _60 = _5.done, !_60)) return [3 /*break*/, 170];
                                _62 = _5.value;
                                _3 = false;
                                bonus = _62;
                                bonusAmount = Number(bonus.amount.match(/\d+/g)[0]);
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_29 = {},
                                        _29["stats.".concat(bonus.type)] = increment(-Math.abs((playerInfo_1.data().stats[bonus.type] / 100 * bonusAmount))),
                                        _29), { merge: true })];
                            case 168:
                                _69.sent();
                                _69.label = 169;
                            case 169:
                                _3 = true;
                                return [3 /*break*/, 166];
                            case 170: return [3 /*break*/, 177];
                            case 171:
                                e_10_1 = _69.sent();
                                e_10 = { error: e_10_1 };
                                return [3 /*break*/, 177];
                            case 172:
                                _69.trys.push([172, , 175, 176]);
                                if (!(!_3 && !_60 && (_61 = _4.return))) return [3 /*break*/, 174];
                                return [4 /*yield*/, _61.call(_4)];
                            case 173:
                                _69.sent();
                                _69.label = 174;
                            case 174: return [3 /*break*/, 176];
                            case 175:
                                if (e_10) throw e_10.error;
                                return [7 /*endfinally*/];
                            case 176: return [7 /*endfinally*/];
                            case 177:
                                if (resolveResults_1 === null || resolveResults_1 === void 0 ? void 0 : resolveResults_1.enemyKilled)
                                    return [2 /*return*/, resolve(resolveResults_1)];
                                _69.label = 178;
                            case 178:
                                _69.trys.push([178, 184, 185, 190]);
                                _6 = true, _7 = __asyncValues((farmChannel === null || farmChannel === void 0 ? void 0 : farmChannel.zoneBonuses) || []);
                                _69.label = 179;
                            case 179: return [4 /*yield*/, _7.next()];
                            case 180:
                                if (!(_8 = _69.sent(), _63 = _8.done, !_63)) return [3 /*break*/, 183];
                                _65 = _8.value;
                                _6 = false;
                                bonus = _65;
                                bonusAmount = Number(bonus.amount.match(/\d+/g)[0]);
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_30 = {},
                                        _30["stats.".concat(bonus.type)] = increment(-Math.abs((playerInfo_1.data().stats[bonus.type] / 100 * bonusAmount))),
                                        _30), { merge: true })];
                            case 181:
                                _69.sent();
                                _69.label = 182;
                            case 182:
                                _6 = true;
                                return [3 /*break*/, 179];
                            case 183: return [3 /*break*/, 190];
                            case 184:
                                e_11_1 = _69.sent();
                                e_11 = { error: e_11_1 };
                                return [3 /*break*/, 190];
                            case 185:
                                _69.trys.push([185, , 188, 189]);
                                if (!(!_6 && !_63 && (_64 = _7.return))) return [3 /*break*/, 187];
                                return [4 /*yield*/, _64.call(_7)];
                            case 186:
                                _69.sent();
                                _69.label = 187;
                            case 187: return [3 /*break*/, 189];
                            case 188:
                                if (e_11) throw e_11.error;
                                return [7 /*endfinally*/];
                            case 189: return [7 /*endfinally*/];
                            case 190: return [2 /*return*/, resolve({ enemyKilled: true, xp: Math.round((enemyXp_1 / 100) * (playerInfo_1.data().xpBonus + 100)), gold: enemyGold_1, damageDone: "".concat((emojisDmg_1.trim() == '') ? Math.round(finalDamage_1) : bold(Math.round(finalDamage_1)), " ").concat(emojisDmg_1) })];
                            case 191:
                                if (finalEnemy_1.enemyHp > finalEnemy_1.enemyMaxHp)
                                    finalEnemy_1.enemyHp = finalEnemy_1.enemyMaxHp;
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'ActiveBattles'), (_31 = {},
                                        _31["battles.battle".concat(enemy)] = finalEnemy_1,
                                        _31), { merge: true })];
                            case 192:
                                _69.sent();
                                _69.label = 193;
                            case 193:
                                _69.trys.push([193, 199, 200, 205]);
                                _9 = true, _10 = __asyncValues((farmChannel === null || farmChannel === void 0 ? void 0 : farmChannel.zoneBonuses) || []);
                                _69.label = 194;
                            case 194: return [4 /*yield*/, _10.next()];
                            case 195:
                                if (!(_11 = _69.sent(), _66 = _11.done, !_66)) return [3 /*break*/, 198];
                                _68 = _11.value;
                                _9 = false;
                                bonus = _68;
                                bonusAmount = Number(bonus.amount.match(/\d+/g)[0]);
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_32 = {},
                                        _32["stats.".concat(bonus.type)] = increment(-Math.abs((playerInfo_1.data().stats[bonus.type] / 100 * bonusAmount))),
                                        _32), { merge: true })];
                            case 196:
                                _69.sent();
                                _69.label = 197;
                            case 197:
                                _9 = true;
                                return [3 /*break*/, 194];
                            case 198: return [3 /*break*/, 205];
                            case 199:
                                e_12_1 = _69.sent();
                                e_12 = { error: e_12_1 };
                                return [3 /*break*/, 205];
                            case 200:
                                _69.trys.push([200, , 203, 204]);
                                if (!(!_9 && !_66 && (_67 = _10.return))) return [3 /*break*/, 202];
                                return [4 /*yield*/, _67.call(_10)];
                            case 201:
                                _69.sent();
                                _69.label = 202;
                            case 202: return [3 /*break*/, 204];
                            case 203:
                                if (e_12) throw e_12.error;
                                return [7 /*endfinally*/];
                            case 204: return [7 /*endfinally*/];
                            case 205: return [2 /*return*/, resolve({ damageDone: "".concat((emojisDmg_1.trim() == '') ? Math.round(finalDamage_1) : bold(Math.round(finalDamage_1)), " ").concat(emojisDmg_1), enemyHpRemaining: "".concat(finalEnemy_1.enemyHp, " / **").concat(finalEnemy_1.enemyMaxHp, "** ").concat(Utils.HpEmoji(finalEnemy_1.enemyHp, finalEnemy_1.enemyMaxHp)) })];
                            case 206: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
module.exports = { attack: attack };
export {};

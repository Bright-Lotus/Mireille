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
var _a = require('firebase/firestore'), getFirestore = _a.getFirestore, doc = _a.doc, updateDoc = _a.updateDoc, increment = _a.increment, getDoc = _a.getDoc;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var formatEmoji = require('discord.js').formatEmoji;
var Icons = require('../emums/icons.js').Icons;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
function keywordHandler(keyword, keywordSubtype, enemy, user, args) {
    return __awaiter(this, void 0, void 0, function () {
        var burnDamage, _a, _b, finalEnemy, key, property, i, dodgeChance, healingAmount, damageAmount, magicDurability, finalDamageAmount, damage, _c;
        var _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    if (!(keywordSubtype === 'burn')) return [3 /*break*/, 4];
                    _a = ((enemy.enemyAtk / 100) * args.ratio);
                    return [4 /*yield*/, getDoc(doc(db, user.id, 'PlayerInfo'))];
                case 1: return [4 /*yield*/, (_j.sent()).data().stats.magicDurability];
                case 2:
                    burnDamage = _a - (_j.sent()) * 0.2;
                    return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_d = {},
                            _d['stats.hp'] = increment(-Math.abs(burnDamage)),
                            _d), { merge: true })];
                case 3:
                    _j.sent();
                    return [2 /*return*/, Promise.resolve({ damageReceived: burnDamage, bonusDmgEmoji: formatEmoji(Icons[keyword]) })];
                case 4:
                    _b = keyword;
                    switch (_b) {
                        case 'LastBreath': return [3 /*break*/, 5];
                        case 'Elusive': return [3 /*break*/, 12];
                        case 'Hardened': return [3 /*break*/, 13];
                        case 'Vampiric': return [3 /*break*/, 14];
                        case 'ability': return [3 /*break*/, 15];
                        case 'elite': return [3 /*break*/, 20];
                    }
                    return [3 /*break*/, 24];
                case 5:
                    if (!(keywordSubtype == 'split')) return [3 /*break*/, 11];
                    console.log(enemy);
                    finalEnemy = {
                        enemyId: enemy.enemyId,
                        enemyHp: 'placeholder',
                        enemyMaxHp: 'placeholder',
                        enemyAtk: 'placeholder',
                        enemyArmor: 'placeholder',
                        enemySpd: 'placeholder',
                        enemyMagicDurability: 'placeholder',
                        enemyElite: 0,
                        enemyUnique: enemy.enemyUnique,
                        enemyXp: 'placeholder',
                        enemyGold: 'placeholder',
                        turn: 'player',
                        keywords: [],
                        debuffs: [],
                        turnsUntilAbility: 3,
                    };
                    for (key in enemy) {
                        property = enemy[key];
                        if (key == 'enemyId' || key == 'turn' || key == 'enemyUnique' || key == 'keywords' || key == 'enemyHp' || key == 'enemyElite' || key == 'debuffs')
                            continue;
                        finalEnemy[key] = Math.floor(property / 100 * args.ratio);
                    }
                    finalEnemy.enemyHp = finalEnemy.enemyMaxHp;
                    i = 0;
                    _j.label = 6;
                case 6:
                    if (!(i < 2)) return [3 /*break*/, 10];
                    return [4 /*yield*/, updateDoc(doc(db, user.id, 'ActiveBattles'), (_e = {},
                            _e["battles.battle".concat(finalEnemy.enemyUnique)] = finalEnemy,
                            _e), { merge: true })];
                case 7:
                    _j.sent();
                    return [4 /*yield*/, updateDoc(doc(db, user.id, 'ActiveBattles'), (_f = {},
                            _f['battles.amount'] = increment(1),
                            _f), { merge: true })];
                case 8:
                    _j.sent();
                    finalEnemy.enemyUnique += 1;
                    _j.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 6];
                case 10: return [2 /*return*/, Promise.resolve({ enemySplitted: true })];
                case 11: return [3 /*break*/, 25];
                case 12:
                    {
                        dodgeChance = (Math.random() * 100) < args.ratio;
                        if (dodgeChance) {
                            return [2 /*return*/, Promise.resolve({ dodged: true })];
                        }
                        return [2 /*return*/, Promise.resolve({ damageDone: 0, reducedDmgEmoji: formatEmoji(Icons.Elusive) })];
                    }
                    _j.label = 13;
                case 13:
                    {
                        return [2 /*return*/, Promise.resolve({ damageDone: -Math.abs(args.ratio), reducedDmgEmoji: formatEmoji(Icons.Hardened) })];
                    }
                    _j.label = 14;
                case 14:
                    {
                        healingAmount = Math.round(args.damageDealt / 100 * args.ratio);
                        return [2 /*return*/, Promise.resolve({ damageReceived: 0, healed: healingAmount })];
                    }
                    _j.label = 15;
                case 15:
                    if (!keywordSubtype.includes('Strike')) return [3 /*break*/, 19];
                    damageAmount = Math.round(enemy.enemyAtk / 100) * args.ratio;
                    return [4 /*yield*/, getDoc(doc(db, user.id, 'PlayerInfo'))];
                case 16: return [4 /*yield*/, (_j.sent()).data().stats.magicDurability];
                case 17:
                    magicDurability = _j.sent();
                    finalDamageAmount = damageAmount - (magicDurability / 2);
                    if (Math.sign(finalDamageAmount) == -1) {
                        finalDamageAmount = 0;
                    }
                    return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_g = {},
                            _g['stats.hp'] = increment(-Math.abs(finalDamageAmount)),
                            _g), { merge: true })];
                case 18:
                    _j.sent();
                    if (keywordSubtype.includes('vampiric')) {
                        return [2 /*return*/, Promise.resolve({ damageReceived: finalDamageAmount, healed: damageAmount, bonusDmgEmoji: formatEmoji(Icons.Ability) })];
                    }
                    return [2 /*return*/, Promise.resolve({ damageReceived: finalDamageAmount, bonusDmgEmoji: formatEmoji(Icons.Ability) })];
                case 19: return [3 /*break*/, 25];
                case 20:
                    _c = (Math.round(enemy.enemyAtk / 100) * args.ratio);
                    return [4 /*yield*/, getDoc(doc(db, user.id, 'PlayerInfo'))];
                case 21: return [4 /*yield*/, (_j.sent()).data().stats.magicDurability];
                case 22:
                    damage = _c - (_j.sent()) * 0.4;
                    return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_h = {},
                            _h['stats.hp'] = increment(-Math.abs(damage)),
                            _h), { merge: true })];
                case 23:
                    _j.sent();
                    return [2 /*return*/, Promise.resolve({ damageReceived: damage, bonusDmgEmoji: formatEmoji(Icons.Elite) })];
                case 24: return [3 /*break*/, 25];
                case 25: return [2 /*return*/];
            }
        });
    });
}
module.exports = { keywordHandler: keywordHandler };
export {};

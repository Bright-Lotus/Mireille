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
var _a = require('discord.js'), Events = _a.Events, userMention = _a.userMention;
var _b = require('firebase/firestore'), getFirestore = _b.getFirestore, doc = _b.doc, updateDoc = _b.updateDoc, increment = _b.increment, getDoc = _b.getDoc;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var _c = require('../errors/errors.js'), ErrorEmbed = _c.ErrorEmbed, EventErrors = _c.EventErrors;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var errorEmbed, idSplit, category, itemName, action, values, shopInventory, _a, _b, _c, itemID, item, _d, atk, spd, players, _e, _f, _g, player, equipped, swordID, equipment, sword, e_1_1, e_2_1;
            var _h, _j, _k, _l;
            var _m, e_2, _o, _p, _q, e_1, _r, _s;
            var _t;
            return __generator(this, function (_u) {
                switch (_u.label) {
                    case 0:
                        if (!interaction.isModalSubmit())
                            return [2 /*return*/];
                        if (!interaction.customId.includes('adjust-item')) return [3 /*break*/, 38];
                        // If the user isn't Luis or Ze, return
                        if (interaction.user.id != '773971453392584755' && interaction.user.id != '949025108897448046' && interaction.user.id != '1011657604822474873') {
                            errorEmbed = ErrorEmbed(EventErrors.NotEnoughPermissions, "Solo ".concat(userMention('773971453392584755'), " y ").concat(userMention('1011657604822474873'), " pueden usar este comando!"));
                            return [2 /*return*/, interaction.reply({ embeds: [errorEmbed] })];
                        }
                        idSplit = interaction.customId.split('-');
                        category = idSplit[2];
                        itemName = idSplit[3];
                        action = idSplit[4];
                        return [4 /*yield*/, interaction.reply("```[".concat(new Date().toISOString(), "] Adjusting item...\nOperation: ").concat(action.toUpperCase(), "```"))];
                    case 1:
                        _u.sent();
                        values = interaction.fields.getTextInputValue('adjustValues').split(',');
                        return [4 /*yield*/, getDoc(doc(db, '/Event/Shop/ShopInventory/items'))];
                    case 2: return [4 /*yield*/, (_u.sent()).data()];
                    case 3:
                        shopInventory = _u.sent();
                        _u.label = 4;
                    case 4:
                        _u.trys.push([4, 30, 31, 36]);
                        _a = true, _b = __asyncValues(Object.entries(shopInventory[category]));
                        _u.label = 5;
                    case 5: return [4 /*yield*/, _b.next()];
                    case 6:
                        if (!(_c = _u.sent(), _m = _c.done, !_m)) return [3 /*break*/, 29];
                        _p = _c.value;
                        _a = false;
                        itemID = _p[0], item = _p[1];
                        if (!item.name.includes(itemName)) return [3 /*break*/, 28];
                        _d = category;
                        switch (_d) {
                            case 'swords': return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 28];
                    case 7:
                        atk = values[0].split(':')[1].trim();
                        spd = values[1].split(':')[1].trim();
                        return [4 /*yield*/, updateDoc(doc(db, '/Event/Shop/ShopInventory/items'), (_h = {},
                                _h["".concat(category, ".").concat(itemID, ".stats.atk")] = increment((action == 'buff') ? atk : -atk),
                                _h["".concat(category, ".").concat(itemID, ".stats.spd")] = increment((action == 'buff') ? spd : -spd),
                                _h), { merge: true })];
                    case 8:
                        _u.sent();
                        return [4 /*yield*/, getDoc(doc(db, 'Event/Players'))];
                    case 9:
                        players = _u.sent();
                        if (!players.exists()) return [3 /*break*/, 28];
                        _u.label = 10;
                    case 10:
                        _u.trys.push([10, 22, 23, 28]);
                        _e = true, _f = (e_1 = void 0, __asyncValues(players.data().members));
                        _u.label = 11;
                    case 11: return [4 /*yield*/, _f.next()];
                    case 12:
                        if (!(_g = _u.sent(), _q = _g.done, !_q)) return [3 /*break*/, 21];
                        _s = _g.value;
                        _e = false;
                        player = _s;
                        return [4 /*yield*/, getDoc(doc(db, player.id, 'PlayerInfo/Inventory/Equipped'))];
                    case 13: return [4 /*yield*/, (_u.sent()).data()];
                    case 14:
                        equipped = _u.sent();
                        if (!((_t = equipped === null || equipped === void 0 ? void 0 : equipped.sword) === null || _t === void 0 ? void 0 : _t.id)) return [3 /*break*/, 20];
                        swordID = equipped.sword.id;
                        return [4 /*yield*/, getDoc(doc(db, player.id, 'PlayerInfo/Inventory/Equipment'))];
                    case 15: return [4 /*yield*/, (_u.sent()).data().swords];
                    case 16:
                        equipment = _u.sent();
                        sword = equipment["sword".concat(swordID)];
                        if (!sword.name.includes(itemName)) return [3 /*break*/, 20];
                        return [4 /*yield*/, updateDoc(doc(db, player.id, 'PlayerInfo'), (_j = {},
                                _j['stats.atk'] = increment(-sword.stats.atk),
                                _j['stats.speed'] = increment(-sword.stats.spd),
                                _j), { merge: true })];
                    case 17:
                        _u.sent();
                        return [4 /*yield*/, updateDoc(doc(db, player.id, 'PlayerInfo/Inventory/Equipment'), (_k = {},
                                _k["swords.sword".concat(swordID, ".stats.atk")] = increment((action == 'buff') ? atk : -atk),
                                _k["swords.sword".concat(swordID, ".stats.spd")] = increment((action == 'buff') ? spd : -spd),
                                _k), { merge: true })];
                    case 18:
                        _u.sent();
                        return [4 /*yield*/, updateDoc(doc(db, player.id, 'PlayerInfo'), (_l = {},
                                _l['stats.atk'] = increment(sword.stats.atk - ((action == 'buff') ? -atk : atk)),
                                _l['stats.speed'] = increment(sword.stats.spd - ((action == 'buff') ? -spd : spd)),
                                _l), { merge: true })];
                    case 19:
                        _u.sent();
                        _u.label = 20;
                    case 20:
                        _e = true;
                        return [3 /*break*/, 11];
                    case 21: return [3 /*break*/, 28];
                    case 22:
                        e_1_1 = _u.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 28];
                    case 23:
                        _u.trys.push([23, , 26, 27]);
                        if (!(!_e && !_q && (_r = _f.return))) return [3 /*break*/, 25];
                        return [4 /*yield*/, _r.call(_f)];
                    case 24:
                        _u.sent();
                        _u.label = 25;
                    case 25: return [3 /*break*/, 27];
                    case 26:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 27: return [7 /*endfinally*/];
                    case 28:
                        _a = true;
                        return [3 /*break*/, 5];
                    case 29: return [3 /*break*/, 36];
                    case 30:
                        e_2_1 = _u.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 36];
                    case 31:
                        _u.trys.push([31, , 34, 35]);
                        if (!(!_a && !_m && (_o = _b.return))) return [3 /*break*/, 33];
                        return [4 /*yield*/, _o.call(_b)];
                    case 32:
                        _u.sent();
                        _u.label = 33;
                    case 33: return [3 /*break*/, 35];
                    case 34:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 35: return [7 /*endfinally*/];
                    case 36: return [4 /*yield*/, interaction.followUp("```[".concat(new Date().toISOString(), "] Item adjusted.```"))];
                    case 37:
                        _u.sent();
                        _u.label = 38;
                    case 38: return [2 /*return*/];
                }
            });
        });
    },
};
export {};

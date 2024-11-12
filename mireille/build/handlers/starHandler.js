var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var _b = require('../emums/levelRewards.js'), WarriorTitles = _b.WarriorTitles, EnchanterTitles = _b.EnchanterTitles;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
function starManager(action, amount, user) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            amount = Number(amount);
            // eslint-disable-next-line no-async-promise-executor
            return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                    var playerInfo, playerCurrentStars, titles, nextTitle, _a, sword, docSnap, itemAmount, abilityOrb, docSnap, itemAmount;
                    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
                    var _u, _v, _w, _x;
                    return __generator(this, function (_y) {
                        switch (_y.label) {
                            case 0:
                                if (!(action == 'give')) return [3 /*break*/, 24];
                                return [4 /*yield*/, getDoc(doc(db, user.id, 'PlayerInfo'))];
                            case 1:
                                playerInfo = _y.sent();
                                if (!playerInfo.exists()) return [3 /*break*/, 24];
                                playerCurrentStars = playerInfo.data().instructor.level.currentStars;
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_b = {},
                                        _b['instructor.level.stars'] = increment(amount),
                                        _b), { merge: true })];
                            case 2:
                                _y.sent();
                                if (!(playerCurrentStars + amount > playerInfo.data().instructor.level.starsForNextTitle)) return [3 /*break*/, 23];
                                titles = void 0;
                                switch (playerInfo.data().class) {
                                    case 'warrior':
                                        titles = Object.values(WarriorTitles);
                                        break;
                                    case 'enchanter':
                                        titles = Object.values(EnchanterTitles);
                                        break;
                                    case 'archer':
                                        break;
                                    default:
                                        break;
                                }
                                nextTitle = titles[playerInfo.data().instructor.level.titleLevel - 1];
                                _a = nextTitle.reward;
                                switch (_a) {
                                    case 'sword': return [3 /*break*/, 3];
                                    case 'xpBonus': return [3 /*break*/, 9];
                                    case 'gold': return [3 /*break*/, 13];
                                    case 'abilityOrb': return [3 /*break*/, 17];
                                }
                                return [3 /*break*/, 23];
                            case 3:
                                sword = nextTitle.sword;
                                return [4 /*yield*/, getDoc(doc(db, user.id, 'PlayerInfo/Inventory/Equipment'))];
                            case 4:
                                docSnap = _y.sent();
                                itemAmount = void 0;
                                if (docSnap.exists()) {
                                    itemAmount = (_u = docSnap.data()) === null || _u === void 0 ? void 0 : _u['swords'].amount;
                                }
                                sword = __assign(__assign({}, sword), { id: itemAmount + 1 });
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo/Inventory/Equipment'), (_c = {},
                                        _c['swords'] = __assign(__assign({}, (_v = docSnap.data()) === null || _v === void 0 ? void 0 : _v['swords']), (_d = { amount: itemAmount + 1 }, _d["sword".concat(itemAmount + 1)] = sword, _d)),
                                        _c), { merge: true })];
                            case 5:
                                _y.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_e = {},
                                        _e['instructor.level.titleName'] = nextTitle.displayName,
                                        _e), { merge: true })];
                            case 6:
                                _y.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_f = {},
                                        _f['instructor.level.titleLevel'] = increment(1),
                                        _f), { merge: true })];
                            case 7:
                                _y.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_g = {},
                                        _g['instructor.level.currentStars'] = 0,
                                        _g), { merge: true })];
                            case 8:
                                _y.sent();
                                return [3 /*break*/, 23];
                            case 9: return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_h = {},
                                    _h['instructor.level.titleName'] = nextTitle.displayName,
                                    _h), { merge: true })];
                            case 10:
                                _y.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_j = {},
                                        _j['xpBonus'] = increment(nextTitle.amount),
                                        _j), { merge: true })];
                            case 11:
                                _y.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_k = {},
                                        _k['instructor.level.currentStars'] = 0,
                                        _k), { merge: true })];
                            case 12:
                                _y.sent();
                                return [3 /*break*/, 23];
                            case 13: return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_l = {},
                                    _l['instructor.level.titleName'] = nextTitle.displayName,
                                    _l), { merge: true })];
                            case 14:
                                _y.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_m = {},
                                        _m['gold'] = increment(nextTitle.amount),
                                        _m), { merge: true })];
                            case 15:
                                _y.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_o = {},
                                        _o['instructor.level.currentStars'] = 0,
                                        _o), { merge: true })];
                            case 16:
                                _y.sent();
                                return [3 /*break*/, 23];
                            case 17:
                                abilityOrb = nextTitle.abilityOrb;
                                return [4 /*yield*/, getDoc(doc(db, user.id, 'PlayerInfo/Inventory/Equipment'))];
                            case 18:
                                docSnap = _y.sent();
                                itemAmount = void 0;
                                if (docSnap.exists()) {
                                    itemAmount = (_w = docSnap.data()) === null || _w === void 0 ? void 0 : _w['abilityOrbs'].amount;
                                }
                                abilityOrb = __assign(__assign({}, abilityOrb), { id: itemAmount + 1 });
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo/Inventory/Equipment'), (_p = {},
                                        _p['swords'] = __assign(__assign({}, (_x = docSnap.data()) === null || _x === void 0 ? void 0 : _x['swords']), (_q = { amount: itemAmount + 1 }, _q["sword".concat(itemAmount + 1)] = abilityOrb, _q)),
                                        _p), { merge: true })];
                            case 19:
                                _y.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_r = {},
                                        _r['instructor.level.titleName'] = nextTitle.displayName,
                                        _r), { merge: true })];
                            case 20:
                                _y.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_s = {},
                                        _s['instructor.level.titleLevel'] = increment(1),
                                        _s), { merge: true })];
                            case 21:
                                _y.sent();
                                return [4 /*yield*/, updateDoc(doc(db, user.id, 'PlayerInfo'), (_t = {},
                                        _t['instructor.level.currentStars'] = 0,
                                        _t), { merge: true })];
                            case 22:
                                _y.sent();
                                return [3 /*break*/, 23];
                            case 23: return [2 /*return*/, resolve(playerCurrentStars + amount)];
                            case 24: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
module.exports = { starManager: starManager };
export {};

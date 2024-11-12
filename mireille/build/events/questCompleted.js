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
var goldManager = require('../handlers/goldHandler.js').goldManager;
var _a = require('firebase/firestore'), getFirestore = _a.getFirestore, doc = _a.doc, updateDoc = _a.updateDoc, getDocs = _a.getDocs, collection = _a.collection, increment = _a.increment;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var starManager = require('../handlers/starHandler.js').starManager;
var EmbedBuilder = require('discord.js').EmbedBuilder;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
module.exports = {
    name: 'questCompleted',
    once: false,
    execute: function (mission, user, week) {
        return __awaiter(this, void 0, void 0, function () {
            var querySnapshot;
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getDocs(collection(db, "/".concat(user.id, "/EventQuestProgression/Weekly")))];
                    case 1:
                        querySnapshot = _b.sent();
                        querySnapshot.forEach(function (document) { return __awaiter(_this, void 0, void 0, function () {
                            var _i, _a, target, _b, targetCharacter, targetDialog, completedInstructorEmbed, current;
                            var _c, _d, _e, _f, _g;
                            return __generator(this, function (_h) {
                                switch (_h.label) {
                                    case 0:
                                        console.log(document.data(), document.id);
                                        if (document.id == 'Milestones' || document.id != week)
                                            return [2 /*return*/];
                                        user.client.emit('type10QuestProgress', user, user.client);
                                        if (!(week == 'Nora' || week == 'Arissa' || week == 'Abe' || week == 'Lyra')) return [3 /*break*/, 8];
                                        if (!(mission === null || mission === void 0 ? void 0 : mission.onComplete)) return [3 /*break*/, 4];
                                        if (!((mission === null || mission === void 0 ? void 0 : mission.onComplete.function) == 'setActiveDialog')) return [3 /*break*/, 4];
                                        _i = 0, _a = (mission === null || mission === void 0 ? void 0 : mission.onComplete.targets) || [];
                                        _h.label = 1;
                                    case 1:
                                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                                        target = _a[_i];
                                        _b = [target.split('/')[0], target.split('/')[1]], targetCharacter = _b[0], targetDialog = _b[1];
                                        return [4 /*yield*/, updateDoc(doc(db, user.id, 'EventDialogProgression'), (_c = {},
                                                _c["".concat(targetCharacter, ".activeDialog")] = targetDialog,
                                                _c), { merge: true })];
                                    case 2:
                                        _h.sent();
                                        completedInstructorEmbed = new EmbedBuilder()
                                            .setTitle("Has completado una mision de ".concat(week, "!"))
                                            .setColor('#00FF48')
                                            .setDescription("Habla con ".concat(week, " de nuevo!"));
                                        user.send({ embeds: [completedInstructorEmbed] });
                                        _h.label = 3;
                                    case 3:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [4 /*yield*/, goldManager('give', Number(mission.rewards.gold), user)];
                                    case 5:
                                        _h.sent();
                                        return [4 /*yield*/, starManager('give', Number(mission.rewards.stars), user)];
                                    case 6:
                                        _h.sent();
                                        return [4 /*yield*/, updateDoc(doc(db, "".concat(user.id, "/PlayerInfo")), (_d = {}, _d['xpBonus'] = increment(Number(mission.rewards.xpBonus)), _d), { merge: true })];
                                    case 7:
                                        _h.sent();
                                        return [2 /*return*/];
                                    case 8:
                                        current = document.data().mission0;
                                        if (!current) {
                                            current = 0;
                                        }
                                        if (!((current + 1) == 5)) return [3 /*break*/, 12];
                                        return [4 /*yield*/, updateDoc(doc(db, "".concat(user.id, "/EventQuestProgression/Weekly/").concat(week)), (_e = {}, _e['mission0'] = (0), _e), { merge: true })];
                                    case 9:
                                        _h.sent();
                                        return [4 /*yield*/, updateDoc(doc(db, "".concat(user.id, "/PlayerInfo")), (_f = {}, _f['xpBonus'] = increment(12), _f), { merge: true })];
                                    case 10:
                                        _h.sent();
                                        return [4 /*yield*/, goldManager('give', 100, user)];
                                    case 11:
                                        _h.sent();
                                        return [2 /*return*/];
                                    case 12: return [4 /*yield*/, updateDoc(doc(db, "".concat(user.id, "/EventQuestProgression/Weekly/").concat(week)), (_g = {}, _g['mission0'] = increment(1), _g), { merge: true })];
                                    case 13:
                                        _h.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, goldManager('give', Number(mission.rewards.gold), user)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, updateDoc(doc(db, "".concat(user.id, "/PlayerInfo")), (_a = {}, _a['xpBonus'] = increment(Number(mission.rewards.xpBonus)), _a), { merge: true })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
};
export {};

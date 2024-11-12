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
var _a = require('firebase/firestore'), getFirestore = _a.getFirestore, doc = _a.doc, setDoc = _a.setDoc, getDocs = _a.getDocs, collection = _a.collection, orderBy = _a.orderBy, query = _a.query;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var _b = require('discord.js'), EmbedBuilder = _b.EmbedBuilder, chatInputApplicationCommandMention = _b.chatInputApplicationCommandMention;
var CommandIds = require('../emums/commandIds.js').CommandIds;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
module.exports = {
    name: 'type9QuestProgress',
    once: false,
    execute: function (user, client) {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, index;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _loop_1 = function (index) {
                            var missionsQuery, weeklyQuestsSnap, querySnapshot;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        missionsQuery = query(collection(db, (index == 0) ? '/Event' : user.id), orderBy('quest0'));
                                        return [4 /*yield*/, getDocs(missionsQuery)];
                                    case 1:
                                        weeklyQuestsSnap = _b.sent();
                                        return [4 /*yield*/, getDocs(collection(db, "/".concat(user.id, "/EventQuestProgression/Weekly")))];
                                    case 2:
                                        querySnapshot = _b.sent();
                                        weeklyQuestsSnap.forEach(function (docSnap) { return __awaiter(_this, void 0, void 0, function () {
                                            var week, _loop_2, i;
                                            var _this = this;
                                            var _a;
                                            return __generator(this, function (_b) {
                                                if (!docSnap.id.includes('Quests'))
                                                    return [2 /*return*/];
                                                week = docSnap.id.substring(6);
                                                if (!((_a = docSnap.data()) === null || _a === void 0 ? void 0 : _a.quest0))
                                                    return [2 /*return*/];
                                                _loop_2 = function (i) {
                                                    var mission = docSnap.data()["quest".concat((index == 1) ? i - 1 : i)];
                                                    /* Quest Types:
                                                    1 = Send Message | DONE
                                                    2 = React with emoji to messages | DONE
                                                    3 = Send message with certain letter | DONE
                                                    4 = Completion quest | DONE
                                                    5 = Send message with certain content | DONE
                                                    6 = Emote in channel | DONE
                                                    7 = Participate in a gift drop | DONE
                                                    8 = Kill a monster | DONE
                                                    9 = Level up | DONE
                                                    10 = Complete a quest | DONE
                                                    */
                                                    if ((mission === null || mission === void 0 ? void 0 : mission.type) == 9) {
                                                        querySnapshot.forEach(function (document) { return __awaiter(_this, void 0, void 0, function () {
                                                            var current, missionGoal, quest, progressEmbed, progressEmbed, progressEmbed, __message, completedEmbed;
                                                            var _a, _b;
                                                            var _c;
                                                            return __generator(this, function (_d) {
                                                                switch (_d.label) {
                                                                    case 0:
                                                                        if (document.id == 'Milestones' || document.id != week)
                                                                            return [2 /*return*/];
                                                                        if ((_c = document.data()) === null || _c === void 0 ? void 0 : _c.locked)
                                                                            return [2 /*return*/];
                                                                        current = document.data()["mission".concat((index == 1) ? i - 1 : i)];
                                                                        missionGoal = docSnap.data()["quest".concat((index == 1) ? i - 1 : i)].goal;
                                                                        quest = docSnap.data()["quest".concat((index == 1) ? i - 1 : i)];
                                                                        if (!(current >= missionGoal)) return [3 /*break*/, 2];
                                                                        console.log('Goal reached');
                                                                        return [4 /*yield*/, setDoc(doc(db, "".concat(user.id, "/EventQuestProgression/Weekly/").concat(week)), (_a = {}, _a["mission".concat(quest.position)] = (missionGoal), _a), { merge: true })];
                                                                    case 1:
                                                                        _d.sent();
                                                                        return [2 /*return*/];
                                                                    case 2:
                                                                        if (!current) {
                                                                            current = 0;
                                                                        }
                                                                        if ((current + 1) == Math.ceil((25 / 100) * missionGoal)) {
                                                                            progressEmbed = new EmbedBuilder()
                                                                                .setTitle('Has hecho progreso en una mision!')
                                                                                .setColor('#00FF06')
                                                                                .setDescription("Has alcanzado el 25% en una mision. (".concat(current + 1, "/").concat(missionGoal, ")"));
                                                                            user.send({ embeds: [progressEmbed] });
                                                                        }
                                                                        else if ((current + 1) == Math.ceil((50 / 100) * missionGoal)) {
                                                                            progressEmbed = new EmbedBuilder()
                                                                                .setTitle('Has hecho progreso en una mision!')
                                                                                .setColor('#00284A')
                                                                                .setDescription("Has alcanzado el 50% en una mision. (".concat(current + 1, "/").concat(missionGoal, ")"));
                                                                            user.send({ embeds: [progressEmbed] });
                                                                        }
                                                                        else if ((current + 1) == Math.ceil((75 / 100) * missionGoal)) {
                                                                            progressEmbed = new EmbedBuilder()
                                                                                .setTitle('Has hecho progreso en una mision!')
                                                                                .setColor('#0066BC')
                                                                                .setDescription("Has alcanzado el 75% en una mision. (".concat(current + 1, "/").concat(missionGoal, ")"));
                                                                            user.send({ embeds: [progressEmbed] });
                                                                        }
                                                                        console.log(current + 1, quest.position);
                                                                        return [4 /*yield*/, setDoc(doc(db, "".concat(user.id, "/EventQuestProgression/Weekly/").concat(week)), (_b = {}, _b["mission".concat(quest.position)] = (current + 1), _b), { merge: true })];
                                                                    case 3:
                                                                        _d.sent();
                                                                        if ((current + 1) >= missionGoal) {
                                                                            __message = { author: user };
                                                                            client.emit('questCompleted', mission, user, week);
                                                                            completedEmbed = new EmbedBuilder()
                                                                                .setTitle('Has completado una mision!')
                                                                                .setColor('#00FF48')
                                                                                .setDescription("Se te han sido dadas las recompensas. (".concat(chatInputApplicationCommandMention('event quests', CommandIds.Event), ")"));
                                                                            user.send({ embeds: [completedEmbed] });
                                                                        }
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        }); });
                                                    }
                                                };
                                                for (i = 1; i < 6; i++) {
                                                    _loop_2(i);
                                                }
                                                return [2 /*return*/];
                                            });
                                        }); });
                                        return [2 /*return*/];
                                }
                            });
                        };
                        index = 0;
                        _a.label = 1;
                    case 1:
                        if (!(index < 2)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(index)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        index++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
};
export {};

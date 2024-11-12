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
var _a = require('firebase/firestore'), getFirestore = _a.getFirestore, doc = _a.doc, setDoc = _a.setDoc, getDocs = _a.getDocs, collection = _a.collection, updateDoc = _a.updateDoc;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var EmbedBuilder = require('discord.js').EmbedBuilder;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
module.exports = {
    name: 'messageCreate',
    once: false,
    execute: function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var querySnapshot;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (message.author.bot)
                            return [2 /*return*/];
                        if (!message.partial) return [3 /*break*/, 1];
                        message.fetch()
                            .then(function (fullMessage) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log(fullMessage);
                                        return [4 /*yield*/, setDoc(doc(db, "".concat(message.author.id, "/EventmilestoneProgression/Weekly/Week1")), { mission1: 101 }, { merge: true })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })
                            .catch(function (error) {
                            console.log('Something went wrong when fetching the message: ', error);
                        });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, getDocs(collection(db, "/".concat(message.author.id, "/EventQuestProgression/Milestones")))];
                    case 2:
                        querySnapshot = _a.sent();
                        querySnapshot.forEach(function (milestones) { return __awaiter(_this, void 0, void 0, function () {
                            var _loop_1, i, state_1;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _loop_1 = function (i) {
                                            var milestone, current, milestoneGoal, targetCount, _b, completedEmbed, progressEmbed, progressEmbed, progressEmbed, completedEmbed, progressEmbed, progressEmbed, progressEmbed, _i, _c, key, _loop_2, index;
                                            var _d, _e, _f, _g;
                                            return __generator(this, function (_h) {
                                                switch (_h.label) {
                                                    case 0:
                                                        if (!milestones.data()["milestone".concat(i)])
                                                            return [2 /*return*/, { value: void 0 }];
                                                        milestone = milestones.data()["milestone".concat(i)];
                                                        current = milestones.data()["milestone".concat(i)].current;
                                                        if (!current) {
                                                            current = 0;
                                                        }
                                                        milestoneGoal = milestones.data()["milestone".concat(i)].goal;
                                                        targetCount = [];
                                                        _b = milestone === null || milestone === void 0 ? void 0 : milestone.type;
                                                        switch (_b) {
                                                            case 1: return [3 /*break*/, 1];
                                                            case 3: return [3 /*break*/, 5];
                                                            case 4: return [3 /*break*/, 10];
                                                            case 5: return [3 /*break*/, 11];
                                                            case 6: return [3 /*break*/, 12];
                                                        }
                                                        return [3 /*break*/, 13];
                                                    case 1:
                                                        if (current == milestoneGoal) {
                                                            return [2 /*return*/, { value: void 0 }];
                                                        }
                                                        if (!((current + 1) >= milestoneGoal)) return [3 /*break*/, 3];
                                                        return [4 /*yield*/, updateDoc(doc(db, "".concat(message.author.id, "/EventQuestProgression/Milestones/Milestones")), (_d = {}, _d["milestone".concat(i, ".current")] = (0), _d), { merge: true })];
                                                    case 2:
                                                        _h.sent();
                                                        completedEmbed = new EmbedBuilder()
                                                            .setTitle('You have completed a milestone!')
                                                            .setColor('#00FF06')
                                                            .setDescription("The milestone has now resetted. (0/".concat(milestoneGoal, ")"));
                                                        return [2 /*return*/, { value: message.author.send({ embeds: [completedEmbed] }) }];
                                                    case 3:
                                                        if ((current + 1) == Math.ceil((25 / 100) * milestoneGoal)) {
                                                            progressEmbed = new EmbedBuilder()
                                                                .setTitle('You have made progress on a milestone!')
                                                                .setColor('#00284A')
                                                                .setDescription("You have reached 25% on a milestone. (".concat(current + 1, "/").concat(milestoneGoal, ")"));
                                                            message.author.send({ embeds: [progressEmbed] });
                                                        }
                                                        else if ((current + 1) == Math.ceil((50 / 100) * milestoneGoal)) {
                                                            progressEmbed = new EmbedBuilder()
                                                                .setTitle('You have made progress on a milestone!')
                                                                .setColor('#0066BC')
                                                                .setDescription("You have reached 50% on a milestone. (".concat(current + 1, "/").concat(milestoneGoal, ")"));
                                                            message.author.send({ embeds: [progressEmbed] });
                                                        }
                                                        else if ((current + 1) == Math.ceil((75 / 100) * milestoneGoal)) {
                                                            progressEmbed = new EmbedBuilder()
                                                                .setTitle('You have made progress on a milestone!')
                                                                .setColor('#008AFF')
                                                                .setDescription("You have reached 75% on a milestone. (".concat(current + 1, "/").concat(milestoneGoal, ")"));
                                                            message.author.send({ embeds: [progressEmbed] });
                                                        }
                                                        return [4 /*yield*/, updateDoc(doc(db, "".concat(message.author.id, "/EventQuestProgression/Milestones/Milestones")), (_e = {}, _e["milestone".concat(i, ".current")] = (current + 1), _e), { merge: true })];
                                                    case 4:
                                                        _h.sent();
                                                        return [3 /*break*/, 14];
                                                    case 5:
                                                        if (current == milestoneGoal) {
                                                            return [2 /*return*/, { value: void 0 }];
                                                        }
                                                        if (!message.content.toLowerCase().includes(milestone.targetLetter.toLowerCase())) return [3 /*break*/, 9];
                                                        if (!((current + 1) >= milestoneGoal)) return [3 /*break*/, 7];
                                                        return [4 /*yield*/, updateDoc(doc(db, "".concat(message.author.id, "/EventQuestProgression/Milestones/Milestones")), (_f = {}, _f["milestone".concat(i, ".current")] = (0), _f), { merge: true })];
                                                    case 6:
                                                        _h.sent();
                                                        completedEmbed = new EmbedBuilder()
                                                            .setTitle('You have completed a milestone!')
                                                            .setColor('#00FF06')
                                                            .setDescription("The milestone has now resetted. (0/".concat(milestoneGoal, ")"));
                                                        return [2 /*return*/, { value: message.author.send({ embeds: [completedEmbed] }) }];
                                                    case 7:
                                                        if ((current + 1) == Math.ceil((25 / 100) * milestoneGoal)) {
                                                            progressEmbed = new EmbedBuilder()
                                                                .setTitle('You have made progress on a milestone!')
                                                                .setColor('#00284A')
                                                                .setDescription("You have reached 25% on a milestone. (".concat(current + 1, "/").concat(milestoneGoal, ")"));
                                                            message.author.send({ embeds: [progressEmbed] });
                                                        }
                                                        else if ((current + 1) == Math.ceil((50 / 100) * milestoneGoal)) {
                                                            progressEmbed = new EmbedBuilder()
                                                                .setTitle('You have made progress on a milestone!')
                                                                .setColor('#0066BC')
                                                                .setDescription("You have reached 50% on a milestone. (".concat(current + 1, "/").concat(milestoneGoal, ")"));
                                                            message.author.send({ embeds: [progressEmbed] });
                                                        }
                                                        else if ((current + 1) == Math.ceil((75 / 100) * milestoneGoal)) {
                                                            progressEmbed = new EmbedBuilder()
                                                                .setTitle('You have made progress on a milestone!')
                                                                .setColor('#008AFF')
                                                                .setDescription("You have reached 75% on a milestone. (".concat(current + 1, "/").concat(milestoneGoal, ")"));
                                                            message.author.send({ embeds: [progressEmbed] });
                                                        }
                                                        return [4 /*yield*/, updateDoc(doc(db, "".concat(message.author.id, "/EventQuestProgression/Milestones/Milestones")), (_g = {}, _g["milestone".concat(i, ".current")] = (current + 1), _g), { merge: true })];
                                                    case 8:
                                                        _h.sent();
                                                        _h.label = 9;
                                                    case 9: return [3 /*break*/, 14];
                                                    case 10: return [3 /*break*/, 14];
                                                    case 11:
                                                        if (message.content.toLowerCase() == milestone.targetContent[0].toLowerCase()) {
                                                            for (_i = 0, _c = milestone.targetContent; _i < _c.length; _i++) {
                                                                key = _c[_i];
                                                                targetCount.push(key);
                                                            }
                                                            targetCount[0] = 'passed';
                                                            _loop_2 = function (index) {
                                                                var filter = function (m) { return !!(m.content.toLowerCase().includes(milestone.targetContent[index].toLowerCase())); };
                                                                var collector = message.channel.createMessageCollector({ filter: filter, time: 7000 });
                                                                collector.on('collect', function (m) {
                                                                    console.log("Collected ".concat(m.content));
                                                                    targetCount[index] = 'passed';
                                                                });
                                                                collector.on('end', function (collected) { return __awaiter(_this, void 0, void 0, function () {
                                                                    var allEqual, completedEmbed, progressEmbed, progressEmbed, progressEmbed;
                                                                    var _a, _b;
                                                                    return __generator(this, function (_c) {
                                                                        switch (_c.label) {
                                                                            case 0:
                                                                                console.log("Collected ".concat(collected.size, " items"));
                                                                                console.log(targetCount);
                                                                                allEqual = function (arr) { return arr.every(function (v) { return v === arr[0]; }); };
                                                                                if (!allEqual(targetCount)) return [3 /*break*/, 4];
                                                                                if (!((current + 1) >= milestoneGoal)) return [3 /*break*/, 2];
                                                                                return [4 /*yield*/, updateDoc(doc(db, "".concat(message.author.id, "/EventQuestProgression/Milestones/Milestones")), (_a = {}, _a["milestone".concat(i, ".current")] = (0), _a), { merge: true })];
                                                                            case 1:
                                                                                _c.sent();
                                                                                completedEmbed = new EmbedBuilder()
                                                                                    .setTitle('You have completed a milestone!')
                                                                                    .setColor('#00FF06')
                                                                                    .setDescription("The milestone has now resetted. (0/".concat(milestoneGoal, ")"));
                                                                                return [2 /*return*/, message.author.send({ embeds: [completedEmbed] })];
                                                                            case 2:
                                                                                if ((current + 1) == Math.ceil((25 / 100) * milestoneGoal)) {
                                                                                    progressEmbed = new EmbedBuilder()
                                                                                        .setTitle('You have made progress on a milestone!')
                                                                                        .setColor('#00284A')
                                                                                        .setDescription("You have reached 25% on a milestone. (".concat(current + 1, "/").concat(milestoneGoal, ")"));
                                                                                    message.author.send({ embeds: [progressEmbed] });
                                                                                }
                                                                                else if ((current + 1) == Math.ceil((50 / 100) * milestoneGoal)) {
                                                                                    progressEmbed = new EmbedBuilder()
                                                                                        .setTitle('You have made progress on a milestone!')
                                                                                        .setColor('#0066BC')
                                                                                        .setDescription("You have reached 50% on a milestone. (".concat(current + 1, "/").concat(milestoneGoal, ")"));
                                                                                    message.author.send({ embeds: [progressEmbed] });
                                                                                }
                                                                                else if ((current + 1) == Math.ceil((75 / 100) * milestoneGoal)) {
                                                                                    progressEmbed = new EmbedBuilder()
                                                                                        .setTitle('You have made progress on a milestone!')
                                                                                        .setColor('#008AFF')
                                                                                        .setDescription("You have reached 75% on a milestone. (".concat(current + 1, "/").concat(milestoneGoal, ")"));
                                                                                    message.author.send({ embeds: [progressEmbed] });
                                                                                }
                                                                                return [4 /*yield*/, updateDoc(doc(db, "".concat(message.author.id, "/EventQuestProgression/Milestones/Milestones")), (_b = {}, _b["milestone".concat(i, ".current")] = (current + 1), _b), { merge: true })];
                                                                            case 3:
                                                                                _c.sent();
                                                                                _c.label = 4;
                                                                            case 4: return [2 /*return*/];
                                                                        }
                                                                    });
                                                                }); });
                                                            };
                                                            for (index = 1; index < targetCount.length; index++) {
                                                                _loop_2(index);
                                                            }
                                                        }
                                                        return [3 /*break*/, 14];
                                                    case 12: return [3 /*break*/, 14];
                                                    case 13: return [3 /*break*/, 14];
                                                    case 14: return [2 /*return*/];
                                                }
                                            });
                                        };
                                        i = 1;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < 6)) return [3 /*break*/, 4];
                                        return [5 /*yield**/, _loop_1(i)];
                                    case 2:
                                        state_1 = _a.sent();
                                        if (typeof state_1 === "object")
                                            return [2 /*return*/, state_1.value];
                                        _a.label = 3;
                                    case 3:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
};
export {};

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
var _a = require('firebase/firestore'), getFirestore = _a.getFirestore, doc = _a.doc, getDoc = _a.getDoc, Timestamp = _a.Timestamp, updateDoc = _a.updateDoc, arrayRemove = _a.arrayRemove;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var healthManager = require('./healthHandler.js').healthManager;
var EmbedBuilder = require('discord.js').EmbedBuilder;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
function timeoutManager(client) {
    return __awaiter(this, void 0, void 0, function () {
        var timeoutsSnap, timeouts, _loop_1, _a, timeouts_1, timeouts_1_1, state_1, e_1_1;
        var _this = this;
        var _b, e_1, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, getDoc(doc(db, 'Event/Timeouts'))];
                case 1:
                    timeoutsSnap = _e.sent();
                    if (!timeoutsSnap.exists()) return [3 /*break*/, 13];
                    timeouts = timeoutsSnap.data().timestamps;
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 7, 8, 13]);
                    _loop_1 = function () {
                        _d = timeouts_1_1.value;
                        _a = false;
                        var timeout = _d;
                        var timeoutDate = new Timestamp(timeout.timeoutDate.seconds, timeout.timeoutDate.nanoseconds).toDate();
                        var diff = (+Date.now()) - (+timeoutDate);
                        switch (timeout.type) {
                            case 'revive': {
                                var target = timeout.target;
                                client.users.fetch(target).then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        setTimeout(function (usr, hpManager, Embed, originalTimestamp) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, hpManager('revive', usr)];
                                                    case 1:
                                                        _a.sent();
                                                        usr.send({
                                                            embeds: [
                                                                new Embed()
                                                                    .setTitle('Has revivido!')
                                                                    .setDescription('Ya puedes usar acciones de nuevo')
                                                                    .setColor('Green'),
                                                            ],
                                                        });
                                                        return [4 /*yield*/, updateDoc(doc(db, 'Event/Timeouts'), {
                                                                timestamps: arrayRemove({
                                                                    type: 'revive',
                                                                    target: usr.id,
                                                                    timeoutDate: Timestamp.fromMillis(originalTimestamp),
                                                                }),
                                                            }, { merge: true })];
                                                    case 2:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }, Math.abs(diff), user, healthManager, EmbedBuilder, timeoutDate);
                                        return [2 /*return*/];
                                    });
                                }); });
                                return { value: void 0 };
                            }
                            // TODO: Add gift destruction timeout
                        }
                    };
                    _a = true, timeouts_1 = __asyncValues(timeouts);
                    _e.label = 3;
                case 3: return [4 /*yield*/, timeouts_1.next()];
                case 4:
                    if (!(timeouts_1_1 = _e.sent(), _b = timeouts_1_1.done, !_b)) return [3 /*break*/, 6];
                    state_1 = _loop_1();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    _e.label = 5;
                case 5:
                    _a = true;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _e.trys.push([8, , 11, 12]);
                    if (!(!_a && !_b && (_c = timeouts_1.return))) return [3 /*break*/, 10];
                    return [4 /*yield*/, _c.call(timeouts_1)];
                case 9:
                    _e.sent();
                    _e.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13: return [2 /*return*/];
            }
        });
    });
}
module.exports = { timeoutManager: timeoutManager };
export {};

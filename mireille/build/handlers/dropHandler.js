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
var _a = require('discord.js'), AttachmentBuilder = _a.AttachmentBuilder, EmbedBuilder = _a.EmbedBuilder, time = _a.time, TimestampStyles = _a.TimestampStyles;
var Colors = require('../emums/colors.js').Colors;
var path = require('node:path');
var _b = require('firebase/firestore'), getFirestore = _b.getFirestore, Timestamp = _b.Timestamp, doc = _b.doc, getDoc = _b.getDoc, updateDoc = _b.updateDoc, arrayUnion = _b.arrayUnion;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
function giftsDrop(client) {
    return __awaiter(this, void 0, void 0, function () {
        var timeoutArray, channels, msgs, dropChannels, giftColors, randomItem;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timeoutArray = [];
                    return [4 /*yield*/, getDoc(doc(db, 'Event/GiftDrops'))];
                case 1:
                    channels = _a.sent();
                    msgs = [];
                    dropChannels = [];
                    giftColors = ['Blue', 'Green', 'Red', 'Pink', 'Ourple', 'Yellow'];
                    randomItem = giftColors[Math.floor(Math.random() * giftColors.length)];
                    if (channels.exists()) {
                        Object.entries(channels.data()).forEach(function (channel) { return __awaiter(_this, void 0, void 0, function () {
                            var _loop_1, index, state_1;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _loop_1 = function (index) {
                                            var guildId, giftDropsDaily, giftDropsChannel, e_1, dropDay, dropNight, dropTime, dropTimeVerbal, date2, diffDay, timeout1, timeout2, timeout3;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        if (channel[0] == 'activeDrop')
                                                            return [2 /*return*/, { value: void 0 }];
                                                        guildId = channel[0];
                                                        giftDropsDaily = channel[1].daily;
                                                        _b.label = 1;
                                                    case 1:
                                                        _b.trys.push([1, 3, , 4]);
                                                        return [4 /*yield*/, client.guilds.fetch(guildId).then(function (guild) { return __awaiter(_this, void 0, void 0, function () {
                                                                return __generator(this, function (_a) {
                                                                    switch (_a.label) {
                                                                        case 0: return [4 /*yield*/, guild.channels.fetch(channel[1].channel).then(function (dropsChannel) { return giftDropsChannel = dropsChannel; })];
                                                                        case 1:
                                                                            _a.sent();
                                                                            return [2 /*return*/];
                                                                    }
                                                                });
                                                            }); })];
                                                    case 2:
                                                        _b.sent();
                                                        return [3 /*break*/, 4];
                                                    case 3:
                                                        e_1 = _b.sent();
                                                        console.log('');
                                                        return [3 /*break*/, 4];
                                                    case 4:
                                                        if (giftDropsChannel == undefined)
                                                            return [2 /*return*/, { value: void 0 }];
                                                        dropDay = new Timestamp(giftDropsDaily.day.seconds, giftDropsDaily.day.nanoseconds).toDate();
                                                        dropNight = new Timestamp(giftDropsDaily.night.seconds, giftDropsDaily.night.nanoseconds).toDate();
                                                        dropTime = (index == 0) ? dropDay : dropNight;
                                                        dropTimeVerbal = 'day';
                                                        dropDay.setDate(new Date().getDate());
                                                        dropDay.setMonth(new Date().getMonth());
                                                        dropDay.setFullYear(new Date().getFullYear());
                                                        dropNight.setDate(new Date().getDate());
                                                        dropNight.setMonth(new Date().getMonth());
                                                        dropNight.setFullYear(new Date().getFullYear());
                                                        date2 = new Date().getTime();
                                                        diffDay = (+date2) - (+dropTime);
                                                        if (new Date().getHours() > dropTime.getHours())
                                                            return [2 /*return*/, { value: void 0 }];
                                                        timeout1 = setTimeout(function (diff, dropsChannel) {
                                                            if (Math.sign(Math.abs(diff) - 36e5) == -1)
                                                                return;
                                                            console.log('Thy event is an hour');
                                                            dropsChannel.sendTyping();
                                                            var portalBlue = new EmbedBuilder()
                                                                .setTitle('Un portal ha aparecido en el cielo! 🧿')
                                                                .setDescription("Podria haber un drop en ".concat(time(Math.floor(dropTime.getTime() / 1000), TimestampStyles.RelativeTime)))
                                                                .setColor('#1370E4');
                                                            dropsChannel.send({
                                                                embeds: [portalBlue],
                                                                files: [new AttachmentBuilder('https://files.catbox.moe/p57xmr.mp4', { name: 'portal_blue.mp4' })],
                                                            });
                                                        }, Math.abs(diffDay) - 36e5, diffDay, giftDropsChannel);
                                                        timeout2 = setTimeout(function (diff) {
                                                            if (Math.sign(Math.abs(diff) - 18e5) == -1)
                                                                return;
                                                            console.log('Thy event is half hour');
                                                        }, Math.abs(diffDay) - 18e5, diffDay, giftDropsChannel);
                                                        timeout3 = setTimeout(function (dropsChannel) { return __awaiter(_this, void 0, void 0, function () {
                                                            var playerCount, goal, giftEmbed, fallVideoFilePath;
                                                            var _a;
                                                            var _this = this;
                                                            return __generator(this, function (_b) {
                                                                switch (_b.label) {
                                                                    case 0: return [4 /*yield*/, getDoc(doc(db, 'Event/Players'))];
                                                                    case 1: return [4 /*yield*/, (_b.sent()).data().members.length];
                                                                    case 2:
                                                                        playerCount = _b.sent();
                                                                        goal = Math.floor(playerCount * 0.6) - 1;
                                                                        giftEmbed = new EmbedBuilder()
                                                                            .setTitle('Un regalo ha caido del portal! 🎁')
                                                                            .setDescription("Necesitamos **".concat(goal, "** personas que ayuden a abrirlo! \uD83E\uDEF3"))
                                                                            .setColor(Colors[randomItem]);
                                                                        console.log('Thy event is now');
                                                                        dropsChannel.sendTyping();
                                                                        fallVideoFilePath = path.join(__dirname, '..', 'assets', 'giftVideos', 'giftFallColors', "".concat(randomItem.toLowerCase(), "_fall_").concat(dropTimeVerbal, ".mp4"));
                                                                        dropsChannel.send({ embeds: [giftEmbed], files: [new AttachmentBuilder(fallVideoFilePath, { name: "gift_fall_".concat(randomItem.toLowerCase(), ".mp4") })] })
                                                                            .then(function (msg) { return __awaiter(_this, void 0, void 0, function () {
                                                                            var endTime, giftEnd;
                                                                            var _a;
                                                                            return __generator(this, function (_b) {
                                                                                switch (_b.label) {
                                                                                    case 0:
                                                                                        endTime = new Date();
                                                                                        giftEnd = new Date();
                                                                                        endTime.setHours(endTime.getHours() + 6);
                                                                                        giftEnd.setHours(giftEnd.getHours() + 4);
                                                                                        return [4 /*yield*/, msg.react('🫳')];
                                                                                    case 1:
                                                                                        _b.sent();
                                                                                        msgs.push(msg.id);
                                                                                        dropChannels.push(dropsChannel.id);
                                                                                        return [4 /*yield*/, updateDoc(doc(db, 'Event/GiftDrops'), (_a = {},
                                                                                                _a['activeDrop'] = {
                                                                                                    progress: 0,
                                                                                                    goal: goal,
                                                                                                    totalEnd: Timestamp.fromDate(endTime),
                                                                                                    giftTimeout: Timestamp.fromDate(giftEnd),
                                                                                                    messages: msgs,
                                                                                                    channels: dropChannels,
                                                                                                    opened: false,
                                                                                                    destroyed: false,
                                                                                                    usersRewarded: [],
                                                                                                    pendingRewards: [],
                                                                                                    multiplier: 0.0,
                                                                                                    openMsgs: [],
                                                                                                    giftColor: randomItem.toLowerCase(),
                                                                                                },
                                                                                                _a), { merge: true })];
                                                                                    case 2:
                                                                                        _b.sent();
                                                                                        return [2 /*return*/];
                                                                                }
                                                                            });
                                                                        }); });
                                                                        setTimeout(function (dropChannel) { return __awaiter(_this, void 0, void 0, function () {
                                                                            var portalLaserNoParticles;
                                                                            var _this = this;
                                                                            return __generator(this, function (_a) {
                                                                                portalLaserNoParticles = new EmbedBuilder()
                                                                                    .setTitle('Another portal has appeared in the heights of the sky! 🌫️')
                                                                                    .setDescription('Portal experts say it may become dangerous\nPortal experts also say it\'s emanating a kind of Dark Energy/Magic.')
                                                                                    .setColor('#DE00FF');
                                                                                dropChannel.send({ embeds: [portalLaserNoParticles] });
                                                                                setTimeout(function (giftDropChannel) {
                                                                                    var portalLaserParticles = new EmbedBuilder()
                                                                                        .setTitle('UPDATE: The pink portal seems to be charging up! 🌩️')
                                                                                        .setDescription('Analysis show high energy signatures meaning certain destruction\n\n"We don\'t know what may come out of that portal, but something really destructive for sure"\n\n"The path that this... thing will most likely take, is going to hit and obliterate the gift, also obliterating it\'s insides."\n- Nakthiji (Portal Analysis Team)')
                                                                                        .setColor('#DE00FF');
                                                                                    giftDropChannel.send({ embeds: [portalLaserParticles] });
                                                                                }, 18e5, dropChannel);
                                                                                setTimeout(function (giftChannel) { return __awaiter(_this, void 0, void 0, function () {
                                                                                    var __destructionVideoFilePath, destructionEmbed;
                                                                                    var _a;
                                                                                    return __generator(this, function (_b) {
                                                                                        switch (_b.label) {
                                                                                            case 0:
                                                                                                __destructionVideoFilePath = path.join(__dirname, '..', 'assets', 'giftVideos', 'giftDestructionColors', randomItem.toLowerCase(), "".concat(randomItem.toLowerCase(), "_gift_").concat(dropTimeVerbal, "_destruction_v").concat(Math.floor(Math.random() * 3), ".mp4"));
                                                                                                destructionEmbed = new EmbedBuilder()
                                                                                                    .setTitle('El regalo ha sido destruido')
                                                                                                    .setDescription('Ya no es posible reclamar recompensas')
                                                                                                    .setColor('#DE00FF');
                                                                                                /* TODO: Night animations files: [new AttachmentBuilder(destructionVideoFilePath, { name: `gift_destruction_${randomItem.toLowerCase()}.mp4` })]*/
                                                                                                giftChannel.send({ embeds: [destructionEmbed] });
                                                                                                return [4 /*yield*/, updateDoc(doc(db, 'Event/GiftDrops'), (_a = {},
                                                                                                        _a['activeDrop.destroyed'] = true,
                                                                                                        _a), { merge: true })];
                                                                                            case 1:
                                                                                                _b.sent();
                                                                                                return [2 /*return*/];
                                                                                        }
                                                                                    });
                                                                                }); }, 36e5, dropChannel);
                                                                                return [2 /*return*/];
                                                                            });
                                                                        }); }, 36e5 * 5, dropsChannel);
                                                                        return [4 /*yield*/, updateDoc(doc(db, 'Event/Timeouts'), (_a = {},
                                                                                _a['timestamps'] = arrayUnion({
                                                                                    timeoutDate: Timestamp.fromMillis(new Date().setHours(new Date().getHours() + 5)),
                                                                                    type: 'giftDestruction',
                                                                                    dropChannel: giftDropsChannel.id,
                                                                                }),
                                                                                _a), { merge: true })];
                                                                    case 3:
                                                                        _b.sent();
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        }); }, Math.abs(diffDay), giftDropsChannel);
                                                        timeoutArray.push(timeout1, timeout2, timeout3);
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
                                        state_1 = _a.sent();
                                        if (typeof state_1 === "object")
                                            return [2 /*return*/, state_1.value];
                                        _a.label = 3;
                                    case 3:
                                        index++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    return [2 /*return*/, timeoutArray];
            }
        });
    });
}
module.exports = { giftsDrop: giftsDrop };
export {};

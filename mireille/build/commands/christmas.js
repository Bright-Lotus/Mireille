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
var _a = require('discord.js'), SlashCommandBuilder = _a.SlashCommandBuilder, EmbedBuilder = _a.EmbedBuilder, AttachmentBuilder = _a.AttachmentBuilder, ActionRowBuilder = _a.ActionRowBuilder, SelectMenuBuilder = _a.SelectMenuBuilder;
var Canvas = require('@napi-rs/canvas');
var sizeOf = require('image-size');
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var _b = require('firebase/firestore'), getFirestore = _b.getFirestore, collection = _b.collection, getDocs = _b.getDocs, Timestamp = _b.Timestamp, getDoc = _b.getDoc, doc = _b.doc, orderBy = _b.orderBy, query = _b.query;
var initializeApp = require('firebase/app').initializeApp;
var pagination = require('../handlers/paginationHandler.js').pagination;
var path = require('node:path');
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
module.exports = {
    data: new SlashCommandBuilder()
        .setName('event')
        .setDescription('Informacion acerca de cosas relacionadas con el evento.')
        .addSubcommand(function (subcmd) {
        return subcmd.setName('leaderboard').setDescription('Mira la tabla de puntuacion del evento');
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('quests')
            .setDescription('Lists your quests.')
            .addStringOption(function (option) {
            return option.setName('category')
                .setDescription('Category of the mission (Weekly or Milestone) and if applicable, which week.')
                .setRequired(true)
                .addChoices({ name: 'Week 1', value: 'Week 1' }, { name: 'Week 2', value: 'Week 2' }, { name: 'Week 3', value: 'Week 3' }, 
            // { name: 'Milestones', value: 'Milestones' },
            { name: 'Instructor', value: 'Instructor' }, { name: 'Nora', value: 'Nora' });
        })
            .addStringOption(function (option) { return option.setName('arguments').setDescription('Additional arguments.'); });
    }),
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, event(interaction)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    contextMenuExecute: function (interaction, selected) {
        return __awaiter(this, void 0, void 0, function () {
            var playerClass, instructor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo'))];
                    case 1: return [4 /*yield*/, (_a.sent()).data().class];
                    case 2:
                        playerClass = _a.sent();
                        switch (playerClass) {
                            case 'warrior':
                                instructor = 'Lyra';
                                break;
                            case 'enchanter':
                                instructor = 'Abe';
                                break;
                            case 'archer':
                                instructor = 'Arissa';
                                break;
                        }
                        if (!(selected == 'Instructor')) return [3 /*break*/, 4];
                        return [4 /*yield*/, quests(interaction, instructor, true)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, quests(interaction, selected, true)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    },
};
function event(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var playerClass, instructor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(interaction.options.getSubcommand() === 'quests')) return [3 /*break*/, 6];
                    if (!(interaction.options.getString('category') == 'Instructor')) return [3 /*break*/, 4];
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo'))];
                case 1: return [4 /*yield*/, (_a.sent()).data().class];
                case 2:
                    playerClass = _a.sent();
                    instructor = void 0;
                    switch (playerClass) {
                        case 'warrior':
                            instructor = 'Lyra';
                            break;
                        case 'enchanter':
                            instructor = 'Abe';
                            break;
                        case 'archer':
                            instructor = 'Arissa';
                            break;
                    }
                    return [4 /*yield*/, quests(interaction, instructor, false)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, quests(interaction, interaction.options.getString('category'), false)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    if (!(interaction.options.getSubcommand() === 'leaderboard')) return [3 /*break*/, 8];
                    return [4 /*yield*/, leaderboard(interaction)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function leaderboard(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var players, usersArray, _loop_1, _a, _b, _c, e_1_1, sortedArray;
        var _d, e_1, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, interaction.deferReply()];
                case 1:
                    _g.sent();
                    return [4 /*yield*/, getDoc(doc(db, 'Event/Players'))];
                case 2:
                    players = _g.sent();
                    usersArray = [];
                    if (!players.exists()) return [3 /*break*/, 17];
                    _g.label = 3;
                case 3:
                    _g.trys.push([3, 9, 10, 15]);
                    _loop_1 = function () {
                        var player, playerInfo;
                        return __generator(this, function (_h) {
                            switch (_h.label) {
                                case 0:
                                    _f = _c.value;
                                    _a = false;
                                    player = _f;
                                    return [4 /*yield*/, getDoc(doc(db, player.id, 'PlayerInfo'))];
                                case 1: return [4 /*yield*/, (_h.sent()).data()];
                                case 2:
                                    playerInfo = _h.sent();
                                    return [4 /*yield*/, interaction.client.users.fetch(player.id).then(function (usr) {
                                            usersArray.push({
                                                id: usr.id,
                                                eventPts: playerInfo.eventPoints,
                                                name: usr.username,
                                                playerHp: playerInfo.stats.hp,
                                                playerMaxHp: playerInfo.stats.maxHp,
                                                isPlayer: (interaction.user.id == player.id),
                                                lvl: playerInfo.playerLvl,
                                            });
                                        })];
                                case 3:
                                    _h.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a = true, _b = __asyncValues(players.data().members);
                    _g.label = 4;
                case 4: return [4 /*yield*/, _b.next()];
                case 5:
                    if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 8];
                    return [5 /*yield**/, _loop_1()];
                case 6:
                    _g.sent();
                    _g.label = 7;
                case 7:
                    _a = true;
                    return [3 /*break*/, 4];
                case 8: return [3 /*break*/, 15];
                case 9:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 15];
                case 10:
                    _g.trys.push([10, , 13, 14]);
                    if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 12];
                    return [4 /*yield*/, _e.call(_b)];
                case 11:
                    _g.sent();
                    _g.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 14: return [7 /*endfinally*/];
                case 15:
                    sortedArray = usersArray.sort(function (a, b) {
                        return b.eventPts - a.eventPts;
                    });
                    console.log(sortedArray);
                    return [4 /*yield*/, pagination('leaderboard', sortedArray, 1, interaction.user, { arraySorted: true }).then(function (results) {
                            interaction.editReply({ embeds: [results.embed], components: [results.paginationRow] });
                        })];
                case 16:
                    _g.sent();
                    _g.label = 17;
                case 17: return [2 /*return*/];
            }
        });
    });
}
function milestones(canvasContext, canvas, interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var userMilestones, ctx, attachment, _a, questEmbed, row;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getDocs(collection(db, "/".concat(interaction.user.id, "/EventQuestProgression/Milestones")))];
                case 1:
                    userMilestones = _b.sent();
                    ctx = canvasContext;
                    userMilestones.forEach(function (milestonesDoc) { return __awaiter(_this, void 0, void 0, function () {
                        var key, xCoordinates, milestone1, milestone2, __milestone3, milestone4, milestone5, milestone1Goal, __milestone2Goal, __milestone3Goal, milestone4Goal, milestone5Goal;
                        var _a, _b, _c, _d, _e;
                        return __generator(this, function (_f) {
                            for (key in milestonesDoc.data()) {
                                xCoordinates = Math.round((((milestonesDoc.data().milestone1.current / milestonesDoc.data().milestone1.goal * 100) - 10) / 100) * 873);
                                milestone1 = milestonesDoc.data().milestone1;
                                milestone2 = milestonesDoc.data().milestone2;
                                __milestone3 = milestonesDoc.data().milestone3 | 0;
                                milestone4 = milestonesDoc.data().milestone4 | 0;
                                milestone5 = milestonesDoc.data().milestone5 | 0;
                                milestone1Goal = (_a = milestonesDoc.data().milestone1) === null || _a === void 0 ? void 0 : _a.goal;
                                __milestone2Goal = ((_b = milestonesDoc.data().milestone2) === null || _b === void 0 ? void 0 : _b.goal) | 0;
                                __milestone3Goal = ((_c = milestonesDoc.data().milestone3) === null || _c === void 0 ? void 0 : _c.goal) | 0;
                                milestone4Goal = ((_d = milestonesDoc.data().milestone4) === null || _d === void 0 ? void 0 : _d.goal) | 0;
                                milestone5Goal = ((_e = milestonesDoc.data().milestone5) === null || _e === void 0 ? void 0 : _e.goal) | 0;
                                switch (key) {
                                    case 'milestone1':
                                        console.log(milestone1);
                                        ctx.fillStyle = '#000000';
                                        ctx.font = '50px "Burbank Big"';
                                        ctx.fillText("".concat(milestone1 === null || milestone1 === void 0 ? void 0 : milestone1.current, "/").concat(milestone1Goal), 1200, (sizeOf('./questUI1.png').height - 1086));
                                        ctx.font = '40px "Burbank Big"';
                                        ctx.fillStyle = ((milestone1 === null || milestone1 === void 0 ? void 0 : milestone1.current) == milestone1Goal) ? '#10CD19' : '#3284EC';
                                        ctx.fillRect(279, (sizeOf('./questUI1.png').height - 1119), Math.round((((milestone1 === null || milestone1 === void 0 ? void 0 : milestone1.current) / milestone1Goal * 100) / 100) * 873), 35);
                                        ctx.fillStyle = '#ffffff';
                                        xCoordinates += 289;
                                        if (xCoordinates <= 288) {
                                            xCoordinates = 288;
                                        }
                                        if (xCoordinates >= 1070) {
                                            xCoordinates = 1070;
                                        }
                                        ctx.fillText("".concat(Math.round(((milestone1 === null || milestone1 === void 0 ? void 0 : milestone1.current) / milestone1Goal) * 100), "%"), xCoordinates, (sizeOf('./questUI1.png').height - 1087));
                                        break;
                                    case 'milestone2':
                                        console.log(milestone2);
                                        break;
                                    case 'milestone3':
                                        break;
                                    case 'milestone4':
                                        ctx.fillStyle = '#000000';
                                        ctx.font = '50px "Burbank Big"';
                                        ctx.fillText("".concat(milestone4 === null || milestone4 === void 0 ? void 0 : milestone4.current, "/").concat(milestone4Goal), 1200, (sizeOf('./questUI1.png').height - 400));
                                        ctx.font = '40px "Burbank Big"';
                                        ctx.fillStyle = ((milestone4 === null || milestone4 === void 0 ? void 0 : milestone4.current) == milestone4Goal) ? '#10CD19' : '#3284EC';
                                        ctx.fillRect(277, (sizeOf('./questUI1.png').height - 435), Math.round((((milestone4 === null || milestone4 === void 0 ? void 0 : milestone4.current) / milestone4Goal * 100) / 100) * 876), 35);
                                        ctx.fillStyle = '#ffffff';
                                        xCoordinates = Math.round(((((milestone4 === null || milestone4 === void 0 ? void 0 : milestone4.current) / milestone4Goal * 100) - 10) / 100) * 873);
                                        xCoordinates += 289;
                                        if (xCoordinates <= 288) {
                                            xCoordinates = 288;
                                        }
                                        if (xCoordinates >= 1070) {
                                            xCoordinates = 1070;
                                        }
                                        ctx.fillText("".concat(Math.round(((milestone4 === null || milestone4 === void 0 ? void 0 : milestone4.current) / milestone4Goal) * 100), "%"), xCoordinates, (sizeOf('./questUI1.png').height - 404));
                                        break;
                                    case 'milestone5':
                                        ctx.fillStyle = '#000000';
                                        ctx.font = '50px "Burbank Big"';
                                        ctx.fillText("".concat(milestone5 === null || milestone5 === void 0 ? void 0 : milestone5.current, "/").concat(milestone5Goal), 1200, (sizeOf('./questUI1.png').height - 160));
                                        ctx.font = '40px "Burbank Big"';
                                        ctx.fillStyle = ((milestone5 === null || milestone5 === void 0 ? void 0 : milestone5.current) == milestone5Goal) ? '#10CD19' : '#3284EC';
                                        ctx.fillRect(277, (sizeOf('./questUI1.png').height - 194), Math.round((((milestone5 === null || milestone5 === void 0 ? void 0 : milestone5.goal) / milestone5Goal * 100) / 100) * 902), 35);
                                        ctx.fillStyle = '#ffffff';
                                        xCoordinates = Math.round(((((milestone5 === null || milestone5 === void 0 ? void 0 : milestone5.current) / milestone5Goal * 100) - 10) / 100) * 873);
                                        xCoordinates += 289;
                                        if (xCoordinates <= 288) {
                                            xCoordinates = 288;
                                        }
                                        if (xCoordinates >= 1070) {
                                            xCoordinates = 1070;
                                        }
                                        ctx.fillText("".concat(Math.round(((milestone5 === null || milestone5 === void 0 ? void 0 : milestone5.current) / milestone5Goal) * 100), "%"), xCoordinates, (sizeOf('./questUI1.png').height - 160));
                                        break;
                                    default:
                                        break;
                                }
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    _a = AttachmentBuilder.bind;
                    return [4 /*yield*/, canvas.encode('png')];
                case 2:
                    attachment = new (_a.apply(AttachmentBuilder, [void 0, _b.sent(), { name: 'player-quests.png' }]))();
                    questEmbed = new EmbedBuilder()
                        .setTitle('Player Milestones')
                        .setColor('#3284EC');
                    row = new ActionRowBuilder()
                        .addComponents(new SelectMenuBuilder()
                        .setCustomId('quest-category-select')
                        .setPlaceholder('Select week or see milestones')
                        .addOptions({
                        label: 'Week 1',
                        description: 'Week 1 missions',
                        value: 'Week 1',
                    }, {
                        label: 'Week 2',
                        description: 'Week 2 missions',
                        value: 'Week 2',
                    }, {
                        label: 'Milestones',
                        description: 'Milestone quests',
                        value: 'Milestones',
                    }));
                    return [2 /*return*/, { files: [attachment], components: [row], embeds: [questEmbed] }];
            }
        });
    });
}
function quests(interaction, weekToDisplay, selectMenu) {
    return __awaiter(this, void 0, void 0, function () {
        var row, userWeeklys, canvas, context, questImageURL, msg, fontSize, displayName, weekUnlocked, attachment, missionsQuery, weeklyQuestsSnap;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectMenu) {
                        interaction.deferReply();
                    }
                    Canvas.GlobalFonts.registerFromPath(path.join(__dirname, '..', 'assets', 'Font', 'BurbankBigCondensed-Black.otf'), 'Burbank Big');
                    row = new ActionRowBuilder()
                        .addComponents(new SelectMenuBuilder()
                        .setCustomId("quest-category-select/".concat(interaction.user.id))
                        .setPlaceholder('Select week or see milestones')
                        .addOptions({
                        label: 'Week 1',
                        description: 'Misiones de la semana 1',
                        value: 'Week 1',
                    }, {
                        label: 'Week 2',
                        description: 'Misiones de la semana 2',
                        value: 'Week 2',
                    }, {
                        label: 'Week 3',
                        description: 'Misiones de la semana 3',
                        value: 'Week 3',
                    }, 
                    // TODO: Milestones {
                    //     label: 'Milestones',
                    //     description: 'Milestone quests',
                    //     value: 'Milestones',
                    // },
                    {
                        label: 'Instructor',
                        description: 'Misiones de tu instructor',
                        value: 'Instructor',
                    }));
                    return [4 /*yield*/, getDocs(collection(db, "/".concat(interaction.user.id, "/EventQuestProgression/Weekly")))];
                case 1:
                    userWeeklys = _a.sent();
                    canvas = Canvas.createCanvas(sizeOf('./questUI1.png').width, sizeOf('./questUI1.png').height);
                    context = canvas.getContext('2d');
                    return [4 /*yield*/, questImage(interaction.user.id, weekToDisplay)];
                case 2:
                    questImageURL = _a.sent();
                    return [4 /*yield*/, Canvas.loadImage(questImageURL).then(function (img) {
                            context.drawImage(img, 0, 0, canvas.width, canvas.height);
                        })];
                case 3:
                    _a.sent();
                    if (!(weekToDisplay == 'Milestones')) return [3 /*break*/, 5];
                    return [4 /*yield*/, (milestones(context, canvas, interaction))];
                case 4:
                    msg = _a.sent();
                    return [2 /*return*/, interaction.editReply(msg)];
                case 5:
                    context.textAlign = 'center';
                    context.fillStyle = '#fff';
                    fontSize = 100;
                    displayName = interaction.member.displayName;
                    if (interaction.user.id == '407225705051455491') {
                        displayName = 'Ashe';
                    }
                    do {
                        // Assign the font to the context and decrement it so it can be measured again
                        fontSize -= 5;
                        context.font = "".concat(fontSize, "px \"Burbank Big\"");
                        // Compare pixel width of the text to the canvas minus the approximate avatar size
                    } while (context.measureText(displayName).width > canvas.width - 1050);
                    context.fillText(displayName, 1440, (sizeOf('./questUI1.png').height - 2165));
                    context.textAlign = 'start';
                    weekUnlocked = true;
                    missionsQuery = query(collection(db, (weekToDisplay.includes('Week')) ? '/Event' : interaction.user.id), orderBy('quest0'));
                    return [4 /*yield*/, getDocs(missionsQuery)];
                case 6:
                    weeklyQuestsSnap = _a.sent();
                    userWeeklys.forEach(function (weekly) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, questEmbed;
                        var _this = this;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (weekToDisplay.includes('Week')) {
                                        if (!weekly.id.includes(weekToDisplay.split(' ')[1])) {
                                            return [2 /*return*/];
                                        }
                                    }
                                    else {
                                        // eslint-disable-next-line no-lonely-if
                                        if (!weekly.id.includes(weekToDisplay)) {
                                            return [2 /*return*/];
                                        }
                                    }
                                    // doc.data() is never undefined for query doc snapshots
                                    weeklyQuestsSnap.forEach(function (document) { return __awaiter(_this, void 0, void 0, function () {
                                        var ctx, unlocksDate, lockedEmbed, key, xCoordinates, mission0, mission1, mission2, mission3, mission4, mission5, quest0Goal, quest1Goal, quest2Goal, quest3Goal, quest4Goal, quest5Goal, mission0XCoordinates;
                                        var _a, _b, _c, _d, _e, _f, _g;
                                        return __generator(this, function (_h) {
                                            ctx = canvas.getContext('2d');
                                            if (weekToDisplay.includes('Week')) {
                                                if (!document.id.includes(weekToDisplay.split(' ')[1])) {
                                                    return [2 /*return*/];
                                                }
                                            }
                                            else {
                                                // eslint-disable-next-line no-lonely-if
                                                if (!document.id.includes(weekToDisplay)) {
                                                    return [2 /*return*/];
                                                }
                                            }
                                            if ((_a = document.data()) === null || _a === void 0 ? void 0 : _a.locked) {
                                                weekUnlocked = false;
                                                unlocksDate = new Timestamp(document.data().locked.unlocks.seconds, document.data().locked.unlocks.nanoseconds).toDate();
                                                lockedEmbed = new EmbedBuilder()
                                                    .setTitle('Esta semana esta bloqueada!')
                                                    .setDescription("Sera desbloqueada <t:".concat(Math.floor(unlocksDate.getTime() / 1000), ":R> <t:").concat(Math.floor(unlocksDate.getTime() / 1000), ":F>"))
                                                    .setColor('#FF0000');
                                                interaction.editReply({ embeds: [lockedEmbed], attachments: [], components: [row] });
                                                return [2 /*return*/];
                                            }
                                            console.log(weekly.data());
                                            // ags the game ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                                            for (key in weekly.data()) {
                                                console.log(key);
                                                xCoordinates = Math.round((((weekly.data().mission0 / document.data().quest0.goal * 100) - 10) / 100) * 873);
                                                mission0 = weekly.data().mission0 || 0;
                                                mission1 = weekly.data().mission1 || 0;
                                                mission2 = weekly.data().mission2 || 0;
                                                mission3 = weekly.data().mission3 || 0;
                                                mission4 = weekly.data().mission4 || 0;
                                                mission5 = weekly.data().mission5 || 0;
                                                quest0Goal = ((_b = document.data().quest0) === null || _b === void 0 ? void 0 : _b.goal) || 0;
                                                quest1Goal = ((_c = document.data().quest1) === null || _c === void 0 ? void 0 : _c.goal) || 0;
                                                quest2Goal = ((_d = document.data().quest2) === null || _d === void 0 ? void 0 : _d.goal) || 0;
                                                quest3Goal = ((_e = document.data().quest3) === null || _e === void 0 ? void 0 : _e.goal) || 0;
                                                quest4Goal = ((_f = document.data().quest4) === null || _f === void 0 ? void 0 : _f.goal) || 0;
                                                quest5Goal = ((_g = document.data().quest5) === null || _g === void 0 ? void 0 : _g.goal) || 0;
                                                console.log(key.charAt(7));
                                                switch (key) {
                                                    case 'mission0': {
                                                        ctx.fillStyle = '#000000';
                                                        if (!weekToDisplay.includes('Week')) {
                                                            ctx.font = 'italic 65px "Burbank Big"';
                                                            ctx.fillText(document.data().quest0.mission, 289, (sizeOf('./questUI1.png').height - 1575));
                                                            ctx.fillStyle = '#6A6A6A';
                                                            ctx.font = 'italic 55px "Burbank Big"';
                                                            ctx.fillText(document.data().quest0.description, 289, (sizeOf('./questUI1.png').height - 1530));
                                                            ctx.fillStyle = '#000000';
                                                        }
                                                        ctx.font = '50px "Burbank Big"';
                                                        ctx.fillText("".concat(mission0, "/").concat(quest0Goal), (!weekToDisplay.includes('Week')) ? 1200 : 1235, (sizeOf('./questUI1.png').height - 1475));
                                                        ctx.font = '40px "Burbank Big"';
                                                        ctx.fillStyle = (mission0 == quest0Goal) ? '#10CD19' : '#3284EC';
                                                        ctx.fillRect(279, (sizeOf('./questUI1.png').height - 1511), Math.floor(((mission0 / quest0Goal * 100) / 100) * 873), 35);
                                                        ctx.fillStyle = '#ffffff';
                                                        mission0XCoordinates = Math.floor((((weekly.data().mission0 / quest0Goal * 100) - 10) / 100) * 873);
                                                        mission0XCoordinates += 289;
                                                        if (mission0XCoordinates <= 288) {
                                                            mission0XCoordinates = 288;
                                                        }
                                                        if (mission0XCoordinates >= 1070) {
                                                            mission0XCoordinates = 1070;
                                                        }
                                                        ctx.fillText("".concat(Math.floor((mission0 / quest0Goal) * 100), "%"), mission0XCoordinates, (sizeOf('./questUI1.png').height - 1480));
                                                        console.log(weekly.id, ' => ', weekly.data().mission1);
                                                        break;
                                                    }
                                                    case 'mission1':
                                                        ctx.fillStyle = '#000000';
                                                        ctx.font = '50px "Burbank Big"';
                                                        ctx.fillText("".concat(mission1, "/").concat(quest1Goal), 1200, (sizeOf('./questUI1.png').height - 1086));
                                                        ctx.font = '40px "Burbank Big"';
                                                        ctx.fillStyle = (mission1 == quest1Goal) ? '#10CD19' : '#3284EC';
                                                        ctx.fillRect(279, (sizeOf('./questUI1.png').height - 1119), Math.floor(((weekly.data().mission1 / quest1Goal * 100) / 100) * 873), 35);
                                                        ctx.fillStyle = '#ffffff';
                                                        xCoordinates += 289;
                                                        if (xCoordinates <= 288) {
                                                            xCoordinates = 288;
                                                        }
                                                        if (xCoordinates >= 1070) {
                                                            xCoordinates = 1070;
                                                        }
                                                        ctx.fillText("".concat(Math.floor((mission1 / quest1Goal) * 100), "%"), xCoordinates, (sizeOf('./questUI1.png').height - 1087));
                                                        console.log(weekly.id, ' => ', weekly.data().mission1);
                                                        break;
                                                    case 'mission2':
                                                        ctx.fillStyle = '#000000';
                                                        ctx.font = '50px "Burbank Big"';
                                                        ctx.fillText("".concat(mission2, "/").concat(quest2Goal), 1200, (sizeOf('./questUI1.png').height - 863));
                                                        ctx.font = '40px "Burbank Big"';
                                                        ctx.fillStyle = (mission2 == quest2Goal) ? '#10CD19' : '#3284EC';
                                                        ctx.fillRect(279, (sizeOf('./questUI1.png').height - 894), Math.floor(((weekly.data().mission2 / quest2Goal * 100) / 100) * 873), 35);
                                                        ctx.fillStyle = '#ffffff';
                                                        xCoordinates += 289;
                                                        if (xCoordinates <= 288) {
                                                            xCoordinates = 288;
                                                        }
                                                        if (xCoordinates >= 1070) {
                                                            xCoordinates = 1070;
                                                        }
                                                        ctx.fillText("".concat(Math.floor((mission2 / quest2Goal) * 100), "%"), xCoordinates, (sizeOf('./questUI1.png').height - 863));
                                                        break;
                                                    case 'mission3':
                                                        ctx.fillStyle = '#000000';
                                                        ctx.font = '50px "Burbank Big"';
                                                        ctx.fillText("".concat(mission3, "/").concat(quest3Goal), 1200, (sizeOf('./questUI1.png').height - 640));
                                                        ctx.font = '40px "Burbank Big"';
                                                        ctx.fillStyle = (mission3 == quest3Goal) ? '#10CD19' : '#3284EC';
                                                        ctx.fillRect(279, (sizeOf('./questUI1.png').height - 671), Math.floor(((weekly.data().mission3 / quest3Goal * 100) / 100) * 900), 35);
                                                        ctx.fillStyle = '#ffffff';
                                                        xCoordinates += 289;
                                                        if (xCoordinates <= 288) {
                                                            xCoordinates = 288;
                                                        }
                                                        if (xCoordinates >= 1070) {
                                                            xCoordinates = 1070;
                                                        }
                                                        ctx.fillText("".concat(Math.floor((mission3 / quest3Goal) * 100), "%"), xCoordinates, (sizeOf('./questUI1.png').height - 640));
                                                        break;
                                                    case 'mission4':
                                                        ctx.fillStyle = '#000000';
                                                        ctx.font = '50px "Burbank Big"';
                                                        ctx.fillText("".concat(mission4, "/").concat(quest4Goal), 1200, (sizeOf('./questUI1.png').height - 400));
                                                        ctx.font = '40px "Burbank Big"';
                                                        ctx.fillStyle = (mission4 == quest4Goal) ? '#10CD19' : '#3284EC';
                                                        ctx.fillRect(277, (sizeOf('./questUI1.png').height - 435), Math.floor(((mission4 / quest4Goal * 100) / 100) * 876), 35);
                                                        ctx.fillStyle = '#ffffff';
                                                        xCoordinates = Math.floor((((mission4 / quest4Goal * 100) - 10) / 100) * 873);
                                                        xCoordinates += 289;
                                                        if (xCoordinates <= 288) {
                                                            xCoordinates = 288;
                                                        }
                                                        if (xCoordinates >= 1070) {
                                                            xCoordinates = 1070;
                                                        }
                                                        ctx.fillText("".concat(Math.floor((mission4 / quest4Goal) * 100), "%"), xCoordinates, (sizeOf('./questUI1.png').height - 404));
                                                        console.log(weekly.id, ' => ', weekly.data().mission1);
                                                        break;
                                                    case 'mission5':
                                                        ctx.fillStyle = '#000000';
                                                        ctx.font = '50px "Burbank Big"';
                                                        ctx.fillText("".concat(mission5, "/").concat(quest5Goal), 1200, (sizeOf('./questUI1.png').height - 165));
                                                        ctx.font = '40px "Burbank Big"';
                                                        ctx.fillStyle = (mission5 == quest5Goal) ? '#10CD19' : '#3284EC';
                                                        ctx.fillRect(277, (sizeOf('./questUI1.png').height - 194), Math.floor(((mission5 / quest5Goal * 100) / 100) * 902), 35);
                                                        ctx.fillStyle = '#ffffff';
                                                        xCoordinates = Math.floor((((mission5 / quest5Goal * 100) - 10) / 100) * 873);
                                                        xCoordinates += 289;
                                                        if (xCoordinates <= 288) {
                                                            xCoordinates = 288;
                                                        }
                                                        if (xCoordinates >= 1070) {
                                                            xCoordinates = 1070;
                                                        }
                                                        ctx.fillText("".concat(Math.floor((mission5 / quest5Goal) * 100), "%"), xCoordinates, (sizeOf('./questUI1.png').height - 160));
                                                        break;
                                                    default:
                                                        break;
                                                }
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); });
                                    _a = AttachmentBuilder.bind;
                                    return [4 /*yield*/, canvas.encode('png')];
                                case 1:
                                    attachment = new (_a.apply(AttachmentBuilder, [void 0, _b.sent(), { name: 'player-quests.png' }]))();
                                    questEmbed = new EmbedBuilder()
                                        .setTitle("".concat(weekToDisplay, " Player Quests"))
                                        .setColor('#3284EC')
                                        .setDescription('Saldran nuevas misiones cada semana!');
                                    if (weekUnlocked) {
                                        return [2 /*return*/, interaction.editReply({ files: [attachment], components: [row], embeds: [questEmbed] })];
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
function questImage(userID, category) {
    return __awaiter(this, void 0, void 0, function () {
        var querySnapshot, missionsQuery, weeklyQuestsSnap, imgStr, completedArray, i, j, x;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getDocs(collection(db, "/".concat(userID, "/EventQuestProgression/Weekly")))];
                case 1:
                    querySnapshot = _a.sent();
                    missionsQuery = query(collection(db, (category.includes('Week')) ? '/Event' : userID), orderBy('quest0'));
                    return [4 /*yield*/, getDocs(missionsQuery)];
                case 2:
                    weeklyQuestsSnap = _a.sent();
                    imgStr = "assets/questUI/completed/Week".concat(category.split(' ')[1], "/questUI_missions_completed_");
                    completedArray = [];
                    if (category.includes('Week')) {
                        querySnapshot.forEach(function (userMissions) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                weeklyQuestsSnap.forEach(function (document) { return __awaiter(_this, void 0, void 0, function () {
                                    var key;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        for (key in userMissions.data()) {
                                            if (!userMissions.id.includes(category.split(' ')[1]))
                                                continue;
                                            if (userMissions.data()[key] == ((_a = document.data()["quest".concat(key.charAt(7))]) === null || _a === void 0 ? void 0 : _a.goal)) {
                                                completedArray.push(key.charAt(7));
                                            }
                                        }
                                        return [2 /*return*/];
                                    });
                                }); });
                                return [2 /*return*/];
                            });
                        }); });
                        for (i = 1; i < completedArray.length; i++) {
                            for (j = 0; j < i; j++) {
                                if (completedArray[i] < completedArray[j]) {
                                    x = completedArray[i];
                                    completedArray[i] = completedArray[j];
                                    completedArray[j] = x;
                                }
                            }
                        }
                        completedArray = completedArray.filter(function (item) { return item !== '0'; });
                        console.log(completedArray);
                        completedArray.forEach(function (element) {
                            imgStr += element.toString();
                        });
                        if (completedArray.length == 0) {
                            imgStr = "./assets/questUI/baseWeek".concat(category.split(' ')[1], ".png");
                        }
                        else {
                            imgStr += '.png';
                        }
                        return [2 /*return*/, imgStr];
                    }
                    else {
                        switch (category) {
                            case 'Lyra': return [2 /*return*/, 'assets/questUI/lyraBase.png'];
                            case 'Arissa': return [2 /*return*/, 'assets/questUI/arissaBase.png'];
                            case 'Nora': return [2 /*return*/, 'assets/questUI/nora.png'];
                            case 'Abe': return [2 /*return*/, 'assets/questUI/abeBase.png'];
                            case 'Milestones':
                                return [2 /*return*/, 'assets/questUI/MilestonesUI/questsUI_milestones.png'];
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export {};

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
var _a = require('firebase/firestore'), getFirestore = _a.getFirestore, doc = _a.doc, getDoc = _a.getDoc;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var _b = require('discord.js'), EmbedBuilder = _b.EmbedBuilder, SelectMenuBuilder = _b.SelectMenuBuilder, ActionRowBuilder = _b.ActionRowBuilder, ButtonStyle = _b.ButtonStyle, ButtonBuilder = _b.ButtonBuilder, formatEmoji = _b.formatEmoji, bold = _b.bold, underscore = _b.underscore;
var pagination = require('../handlers/paginationHandler.js').pagination;
var Icons = require('../emums/icons.js').Icons;
var ability = require('./abilityHandler.js').ability;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
function formatKeyword(keyword, displayName) {
    console.log('🚀 ~ file: farmChannel.js:13 ~ formatKeyword ~ keyword', keyword, displayName);
    if (keyword == 'ability')
        keyword = 'Ability';
    return "**".concat(hyperlink(displayName, 'https://fakeri.parcel.app/keywords/' + keyword.toLowerCase()), "** ").concat(formatEmoji(Icons[keyword]));
}
function formatKeywordDesc(keywordSubtype, args) {
    switch (keywordSubtype) {
        case 'split':
            return "Se divide en 2 unidades con el **".concat(args.ratio, "%** de las stats originales");
        case 'vampiric':
            return "Se cura por **".concat(args.ratio, "%** del da\u00F1o hecho con cada ataque");
        case 'hardened':
            return "Recibe **".concat(args.ratio, "** menos de da\u00F1o de todas las fuentes");
        case 'duelist':
            return "Recibe **".concat(args.ratio, " ATK** en cada ataque al jugador");
        case 'elusive':
            return "Tiene un chance del **".concat(args.ratio, "%** de esquivar el ataque del jugador");
        case 'thunderStrike':
            return "Lanza un ataque de trueno que hace **".concat(args.ratio, "% ATK**");
        case 'lavaStrike':
            return "Lanza un ataque con lava que hace **".concat(args.ratio, "% ATK**");
        case 'vampiricStrike':
            return "Lanza una mordida letal que roba vida y hace **".concat(args.ratio, "% ATK**");
        case 'plasmaStrike':
            return "Lanza un ataque con plasma que hace **".concat(args.ratio, "% ATK**");
        default:
            break;
    }
}
function targetHandler(interaction, args) {
    return __awaiter(this, void 0, void 0, function () {
        var values, activeBattles, abilityID, target, activeBattlesListEmbed, activeBattleSelectMenu, _a, activeBattleRow, players, usersArray_1, _loop_1, _b, _c, _d, e_1_1, sortedArray, btnLabel, filterRow_1;
        var _this = this;
        var _e, e_1, _f, _g;
        var _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, interaction.deferReply()];
                case 1:
                    _j.sent();
                    values = interaction.values[0].split('-');
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'ActiveBattles'))];
                case 2:
                    activeBattles = _j.sent();
                    abilityID = (args === null || args === void 0 ? void 0 : args.filter) ? values[4] : values[3];
                    target = (args === null || args === void 0 ? void 0 : args.filter) ? values[3] : values[4];
                    activeBattlesListEmbed = new EmbedBuilder()
                        .setTitle('Your active battles')
                        .setColor('Red');
                    console.log('🚀 ~ file: targetHandler.js:16 ~ targetHandler ~ values', target, abilityID);
                    activeBattleSelectMenu = new SelectMenuBuilder();
                    activeBattleSelectMenu.setCustomId("battleFlow-selectMenu-activeBattle/".concat(interaction.user.id)).setPlaceholder('Target a enemy already in battle...');
                    _a = target;
                    switch (_a) {
                        case 'enemy': return [3 /*break*/, 3];
                        case 'ally': return [3 /*break*/, 6];
                        case 'self': return [3 /*break*/, 23];
                    }
                    return [3 /*break*/, 25];
                case 3:
                    if (!activeBattles.exists()) return [3 /*break*/, 5];
                    if (!(((_h = activeBattles.data()) === null || _h === void 0 ? void 0 : _h.battles.amount) > 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, Promise.all(Object.values(activeBattles.data().battles).filter(function (element) { return (typeof element != 'number'); }).map(function (battle) { return __awaiter(_this, void 0, void 0, function () {
                            var enemy, battleEnemy, checkElite, keywordStr_1, eliteStr, abilityStr;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log(battle);
                                        return [4 /*yield*/, getDoc(doc(db, 'Event/Enemies/RegularMonsters/Monsters'))];
                                    case 1:
                                        enemy = _a.sent();
                                        if (enemy.exists()) {
                                            battleEnemy = enemy.data()["enemy".concat(battle.enemyId)];
                                            checkElite = function (stat) {
                                                if (battle.enemyElite != '0')
                                                    return (stat == battle.enemyElite.split(':')[0]) ? formatEmoji(Icons.Elite) : '';
                                                return '';
                                            };
                                            keywordStr_1 = '';
                                            battle.keywords.forEach(function (keyword) {
                                                var _a, _b;
                                                console.log('🚀 ~ file: farmChannel.js:224 ~ awaitPromise.all ~ keyword', keyword);
                                                if (keyword.type != 'ability') {
                                                    var displayName = void 0;
                                                    if (keyword.type == 'LastBreath') {
                                                        displayName = 'Last Breath';
                                                    }
                                                    else if (((_b = (_a = keyword === null || keyword === void 0 ? void 0 : keyword.type) === null || _a === void 0 ? void 0 : _a.match(/[A-Z]/g)) === null || _b === void 0 ? void 0 : _b.length) < 2) {
                                                        displayName = keyword.type;
                                                    }
                                                    console.log('🚀 ~ file: farmChannel.js:191 ~ awaitPromise.all ~ keyword', keyword);
                                                    console.log(keyword, 'debugkeyword');
                                                    keywordStr_1 += "".concat(formatKeyword(keyword.type, displayName), "\n").concat(formatKeywordDesc(keyword.subtype, { ratio: keyword.ratio }), "\n\n");
                                                }
                                            });
                                            if (battleEnemy === null || battleEnemy === void 0 ? void 0 : battleEnemy.abilities) {
                                                keywordStr_1 += "".concat(formatKeyword(battleEnemy.abilities.type, battleEnemy.abilities.displayName), "\n").concat(formatKeywordDesc(battleEnemy.abilities.subtype, { ratio: battleEnemy.abilities.ratio }), "\n\n");
                                            }
                                            if (keywordStr_1 == '') {
                                                keywordStr_1 = 'No special properties!';
                                            }
                                            activeBattlesListEmbed.addFields({
                                                name: bold(underscore(battleEnemy.name)),
                                                value: "\n**Properties:**\n\n".concat(keywordStr_1, "\n\n\n                                    **Stats:**\n\n**").concat(battle.enemyAtk, "** - ATK ").concat(Icons.ATK, " ").concat(checkElite('atk'), "\n**").concat(battle.enemyHp, "** - Current HP ").concat(Icons.SeventyFivePercentHp, " ").concat(checkElite('hp'), "\n**").concat(battle.enemySpd, "** - SPD ").concat(Icons.SPD, " ").concat(checkElite('spd'), "\n**").concat(battle.enemyArmor, "** - ARMOR ").concat(Icons.Armor, " ").concat(checkElite('armor'), "\n**").concat(battle.enemyMagicDurability, "** - MAGIC DURABILITY ").concat(Icons.MagicDurability, " ").concat(checkElite('magicDurability'), "\n\n                                    \n**__Level:__** ").concat(battleEnemy.minLvl),
                                                inline: true,
                                            });
                                            eliteStr = void 0;
                                            if (battle.enemyElite != '0') {
                                                eliteStr = "- ".concat(formatEmoji(Icons.Elite), " ").concat(battle.enemyElite.split(':')[0].toUpperCase(), ": ").concat(battle.enemyElite.split(':')[1].toUpperCase());
                                            }
                                            abilityStr = (abilityID) ? "-".concat(abilityID) : '';
                                            activeBattleSelectMenu.addOptions({
                                                label: "".concat(battleEnemy.name, " ").concat((battle.enemyElite != '0') ? eliteStr : ''),
                                                description: ("".concat((battleEnemy.ability) ? battleEnemy.ability.abilityDesc : 'No special Properties!')),
                                                value: "battle-ability-monster-".concat(battle.enemyId, "-").concat(battle.enemyUnique, "-").concat(activeBattles.data().battles.length).concat(abilityStr),
                                            });
                                            return [2 /*return*/, true];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 4:
                    _j.sent();
                    activeBattleRow = new ActionRowBuilder();
                    activeBattleRow.addComponents(activeBattleSelectMenu);
                    return [2 /*return*/, interaction.editReply({ embeds: [activeBattlesListEmbed], components: [activeBattleRow] })];
                case 5: return [3 /*break*/, 25];
                case 6: return [4 /*yield*/, getDoc(doc(db, 'Event/Players'))];
                case 7:
                    players = _j.sent();
                    usersArray_1 = [];
                    console.log(abilityID, 'targetHandler.js');
                    if (!players.exists()) return [3 /*break*/, 22];
                    _j.label = 8;
                case 8:
                    _j.trys.push([8, 14, 15, 20]);
                    _loop_1 = function () {
                        var user, playerStats;
                        return __generator(this, function (_k) {
                            switch (_k.label) {
                                case 0:
                                    _g = _d.value;
                                    _b = false;
                                    user = _g;
                                    return [4 /*yield*/, getDoc(doc(db, user.id, 'PlayerInfo'))];
                                case 1: return [4 /*yield*/, (_k.sent()).data().stats];
                                case 2:
                                    playerStats = _k.sent();
                                    return [4 /*yield*/, interaction.client.users.fetch(user.id).then(function (usr) {
                                            usersArray_1.push({ id: usr.id, playerHp: playerStats.hp, playerMaxHp: playerStats.maxHp, name: usr.username, abilityID: abilityID });
                                        })];
                                case 3:
                                    _k.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _b = true, _c = __asyncValues(players.data().members);
                    _j.label = 9;
                case 9: return [4 /*yield*/, _c.next()];
                case 10:
                    if (!(_d = _j.sent(), _e = _d.done, !_e)) return [3 /*break*/, 13];
                    return [5 /*yield**/, _loop_1()];
                case 11:
                    _j.sent();
                    _j.label = 12;
                case 12:
                    _b = true;
                    return [3 /*break*/, 9];
                case 13: return [3 /*break*/, 20];
                case 14:
                    e_1_1 = _j.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 20];
                case 15:
                    _j.trys.push([15, , 18, 19]);
                    if (!(!_b && !_e && (_f = _c.return))) return [3 /*break*/, 17];
                    return [4 /*yield*/, _f.call(_c)];
                case 16:
                    _j.sent();
                    _j.label = 17;
                case 17: return [3 /*break*/, 19];
                case 18:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 19: return [7 /*endfinally*/];
                case 20:
                    sortedArray = usersArray_1.sort(function (a, b) {
                        return a.playerHp - b.playerHp;
                    });
                    if (args === null || args === void 0 ? void 0 : args.filter) {
                        sortedArray = sortedArray.filter(function (element) { return element.name.match(args.match) != null; });
                    }
                    btnLabel = (args === null || args === void 0 ? void 0 : args.filter) ? "Filtro: ".concat(args === null || args === void 0 ? void 0 : args.match.toString().substring((args === null || args === void 0 ? void 0 : args.match.toString().indexOf('[')) + 1, args === null || args === void 0 ? void 0 : args.match.toString().indexOf(']'))) : 'Filtrar';
                    filterRow_1 = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("filterButton-abiilty-target-".concat(target, "-").concat(abilityID))
                        .setStyle(ButtonStyle.Primary)
                        .setLabel(btnLabel)
                        .setEmoji('🔎'));
                    return [4 /*yield*/, pagination('allyTarget', sortedArray, 1, interaction.user, { arraySorted: true }).then(function (results) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, interaction.editReply({ embeds: [results.embed], components: [results.paginationRow, filterRow_1, results.selectMenuRow] })];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 21:
                    _j.sent();
                    _j.label = 22;
                case 22: return [3 /*break*/, 25];
                case 23: return [4 /*yield*/, ability(abilityID, -1, interaction.user).then(function (results) { return __awaiter(_this, void 0, void 0, function () {
                        var orbEmbed;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    orbEmbed = new EmbedBuilder()
                                        .setTitle('Has usado el orbe seleccionada')
                                        .setColor('Blue')
                                        .setDescription("".concat(bold('Mana restante:'), " ").concat(results.manaRemaining, " ").concat(formatEmoji(Icons.Mana)));
                                    return [4 /*yield*/, interaction.editReply({ embeds: [orbEmbed] })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }).catch(function (results) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, interaction.editReply({ embeds: [results.manaEmbed] })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 24:
                    _j.sent();
                    return [3 /*break*/, 25];
                case 25: return [2 /*return*/];
            }
        });
    });
}
module.exports = { targetHandler: targetHandler };
export {};

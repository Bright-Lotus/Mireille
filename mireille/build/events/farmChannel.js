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
var _a = require('discord.js'), EmbedBuilder = _a.EmbedBuilder, ActionRowBuilder = _a.ActionRowBuilder, SelectMenuBuilder = _a.SelectMenuBuilder, Events = _a.Events, bold = _a.bold, underscore = _a.underscore, formatEmoji = _a.formatEmoji, hyperlink = _a.hyperlink, chatInputApplicationCommandMention = _a.chatInputApplicationCommandMention;
var _b = require('firebase/firestore'), getFirestore = _b.getFirestore, doc = _b.doc, getDocs = _b.getDocs, collection = _b.collection, getDoc = _b.getDoc, increment = _b.increment, updateDoc = _b.updateDoc;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var _c = require('../errors/errors.js'), ErrorEmbed = _c.ErrorEmbed, EventErrors = _c.EventErrors;
var Icons = require('../emums/icons.js').Icons;
var pagination = require('../handlers/paginationHandler.js').pagination;
var Utils = require('../utils.js').Utils;
var CommandIds = require('../emums/commandIds.js').CommandIds;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
function formatKeyword(keyword, displayName) {
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
        case 'dodge':
            return "Tiene un chance del **".concat(args.ratio, "%** de esquivar el ataque del jugador");
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
        case 'elite':
            return "Cada cierta cantidad de ataques, hace da\u00F1o extra haciendo **".concat(args.ratio, "% ATK**");
        case 'burn':
            return "Hace extra da\u00F1o por **".concat(args.ratio, "% ATK** cada ataque");
        default:
            break;
    }
}
module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var farmChannelsSnap, monsterSnap, farmChannels, i, passed, playerInfo, enemiesListEmbed, activeBattlesListEmbed, row, battleSelectMenu, activeBattleSelectMenu, unique, eliteConstant, elitePower, eliteCount, activeBattles, hasActiveBattles_1, _a, activeBattleRow, playerEquipment, playerMana, abilityOrbs, abilityOrbsArray, playerEquipment, consumables, noConsumablesEmbed, activeBattleRow, noBattlesEmbed;
            var _b, _c;
            var _this = this;
            var _d, _e, _f, _g, _h, _j, _k, _l;
            return __generator(this, function (_m) {
                switch (_m.label) {
                    case 0: 
                    // Testing purposes
                    return [4 /*yield*/, updateDoc(doc(db, 'Event/Info'), (_b = {},
                            _b['messageCount'] = increment(1),
                            _b), { merge: true })];
                    case 1:
                        // Testing purposes
                        _m.sent();
                        if (message.author.bot)
                            return [2 /*return*/];
                        return [4 /*yield*/, getDoc(doc(db, message.guild.id, 'FarmChannels'))];
                    case 2:
                        farmChannelsSnap = _m.sent();
                        return [4 /*yield*/, getDocs(collection(db, '/Event/Enemies/RegularMonsters'))];
                    case 3:
                        monsterSnap = _m.sent();
                        farmChannels = [];
                        if (farmChannelsSnap.exists()) {
                            for (i = 1; i < (farmChannelsSnap.data().channelCount + 1); i++) {
                                if (farmChannelsSnap.data()["channel".concat(i)].id == message.channel.id) {
                                    farmChannels.push(farmChannelsSnap.data()["channel".concat(i)]);
                                }
                            }
                        }
                        farmChannels = farmChannels.filter(function (element) { return element !== undefined; });
                        passed = [];
                        return [4 /*yield*/, getDoc(doc(db, message.author.id, 'PlayerInfo'))];
                    case 4:
                        playerInfo = _m.sent();
                        farmChannels.forEach(function (element) {
                            if (element.enchanterOnly) {
                                if (playerInfo.data().class != 'enchanter') {
                                    message.reply({ embeds: [ErrorEmbed(EventErrors.EnchanterOnlyZone)] });
                                    return;
                                }
                            }
                            if (message.channel.id != element.id) {
                                passed.push('failed');
                                return;
                            }
                            passed.push('pass');
                        });
                        enemiesListEmbed = new EmbedBuilder()
                            .setTitle('Zone\'s Enemies')
                            .setColor('Blue');
                        activeBattlesListEmbed = new EmbedBuilder()
                            .setTitle('Your active battles')
                            .setColor('Red');
                        row = new ActionRowBuilder();
                        battleSelectMenu = new SelectMenuBuilder();
                        battleSelectMenu.setCustomId("battleFlow-selectMenu/".concat(message.author.id)).setPlaceholder('Target a new enemy...');
                        activeBattleSelectMenu = new SelectMenuBuilder();
                        activeBattleSelectMenu.setCustomId("battleFlow-selectMenu-activeBattle/".concat(message.author.id)).setPlaceholder('Target a enemy already in battle...');
                        unique = 1;
                        eliteConstant = 0.1;
                        elitePower = 1;
                        eliteCount = 0;
                        return [4 /*yield*/, getDoc(doc(db, message.author.id, 'ActiveBattles'))];
                    case 5:
                        activeBattles = _m.sent();
                        if (!(((_d = activeBattles.data()) === null || _d === void 0 ? void 0 : _d.battles.amount) > 0 && !((_e = activeBattles.data()) === null || _e === void 0 ? void 0 : _e.battles.battle0))) return [3 /*break*/, 8];
                        return [4 /*yield*/, updateDoc(doc(db, message.author.id, 'ActiveBattles'), (_c = {},
                                _c['battles.amount'] = 0,
                                _c), { merge: true })];
                    case 6:
                        _m.sent();
                        return [4 /*yield*/, getDoc(doc(db, message.author.id, 'ActiveBattles'))];
                    case 7:
                        activeBattles = _m.sent();
                        _m.label = 8;
                    case 8:
                        if (!(passed.filter(function (element) { return (element == 'pass'); }).length > 0)) return [3 /*break*/, 26];
                        hasActiveBattles_1 = false;
                        message.content = message.content.toLowerCase();
                        if (message.content == 'atk') {
                            message.content = 'attack';
                        }
                        else if (message.content == 'abl') {
                            message.content = 'ability';
                        }
                        if (!playerInfo.exists() && message.content == 'attack') {
                            return [2 /*return*/, message.reply({ embeds: [ErrorEmbed(EventErrors.PlayerNotRegistered)] })];
                        }
                        _a = message.content;
                        switch (_a) {
                            case 'attack': return [3 /*break*/, 9];
                            case 'ability': return [3 /*break*/, 13];
                            case 'item': return [3 /*break*/, 17];
                            case 'charge': return [3 /*break*/, 21];
                        }
                        return [3 /*break*/, 25];
                    case 9:
                        message.channel.sendTyping();
                        if ((_f = playerInfo.data()) === null || _f === void 0 ? void 0 : _f.dead) {
                            return [2 /*return*/, message.reply({ embeds: [ErrorEmbed(EventErrors.PlayerIsDead)] })];
                        }
                        farmChannels.forEach(function (farmChannel) { return __awaiter(_this, void 0, void 0, function () {
                            var constant, power, farmChannelName;
                            var _this = this;
                            return __generator(this, function (_a) {
                                constant = 0.1;
                                power = 1;
                                farmChannelName = '';
                                message.channel.name.match(/\w+/g).forEach(function (element) {
                                    farmChannelName += Utils.CapitalizeFirstLetter(element) + ' ';
                                });
                                enemiesListEmbed.setAuthor({ name: "Actualmente estas en ".concat(farmChannelName) });
                                if (playerInfo.data().class == 'archer' && playerInfo.data().playerLvl + 5 < farmChannel.minLvl) {
                                    return [2 /*return*/, message.reply({ embeds: [ErrorEmbed(EventErrors.NotEnoughLevelForZone, "Necesitas ser nivel ".concat(Icons.Level, " ").concat(bold(farmChannel.minLvl), " para esta zona\nEres nivel ").concat(Icons.Level, " ").concat(bold(playerInfo.data().playerLvl + 5), " \uD83C\uDFF9 ahora mismo."))] })];
                                }
                                else if (playerInfo.data().class != 'archer' && playerInfo.data().playerLvl < farmChannel.minLvl) {
                                    return [2 /*return*/, message.reply({ embeds: [ErrorEmbed(EventErrors.NotEnoughLevelForZone, "Necesitas ser nivel ".concat(Icons.Level, " ").concat(bold(farmChannel.minLvl), " para esta zona\nEres nivel ").concat(Icons.Level, " ").concat(bold(playerInfo.data().playerLvl), " ahora mismo."))] })];
                                }
                                farmChannel.enemies.forEach(function (monsters) {
                                    monsterSnap.forEach(function (monsterDoc) { return __awaiter(_this, void 0, void 0, function () {
                                        var monster, randomProperty, randProp, valueKeyword, keywordStr, _i, _a, stat, randPropDisplay, eliteStr, turn;
                                        var _b, _c;
                                        return __generator(this, function (_d) {
                                            monster = monsterDoc.data()["enemy".concat(monsters)];
                                            monster.elite = Math.random() < 0.3;
                                            randomProperty = function (obj) {
                                                var keys = Object.keys(obj);
                                                return keys[Math.floor(Math.random() * keys.length)];
                                            };
                                            randProp = randomProperty(monster.stats);
                                            valueKeyword = (monster.keywords.length > 0) ? '-' : '';
                                            keywordStr = '';
                                            if (monster.elite) {
                                                monster.gold += monster.gold * 0.25;
                                                monster.baseXp += monster.baseXp * 0.25;
                                            }
                                            monster.baseXp += Math.round(Math.pow((playerInfo.data().playerLvl / 0.1), 1));
                                            monster.gold += Math.round(Math.pow((playerInfo.data().playerLvl / 0.1), 0.9));
                                            for (_i = 0, _a = Object.keys(monster.stats); _i < _a.length; _i++) {
                                                stat = _a[_i];
                                                if (playerInfo.data().class == 'archer' && playerInfo.data().playerLvl < farmChannel.minLvl) {
                                                    monster.stats[stat] += Math.round(Math.pow((playerInfo.data().playerLvl / constant), 1.1));
                                                    if (monster.stats[stat] < 0) {
                                                        monster.stats[stat] = 0;
                                                    }
                                                }
                                                else {
                                                    monster.stats[stat] += Math.round(Math.pow((playerInfo.data().playerLvl / constant), power));
                                                }
                                            }
                                            if (monster.elite) {
                                                monster.keywords.push({ type: 'Elite', displayName: 'Elite', subtype: 'elite', ratio: 30 });
                                            }
                                            monster.keywords.forEach(function (keyword) {
                                                console.log(formatKeyword(keyword.type, keyword.displayName));
                                                keywordStr += "".concat(formatKeyword(keyword.type, keyword.displayName), "\n").concat(formatKeywordDesc(keyword.subtype, { ratio: keyword.ratio }), "\n\n");
                                                valueKeyword += "".concat(keyword.type, ":").concat(keyword.subtype, ":").concat(Math.round(keyword.ratio), "/");
                                            });
                                            if (monster === null || monster === void 0 ? void 0 : monster.abilities) {
                                                keywordStr += "".concat(formatKeyword(monster.abilities.type, monster.abilities.displayName), "\n").concat(formatKeywordDesc(monster.abilities.subtype, { ratio: monster.abilities.ratio }), "\n\n");
                                                valueKeyword += "-".concat(monster.abilities.type, ":").concat(monster.abilities.subtype, ":").concat(monster.abilities.ratio, "/");
                                            }
                                            if (keywordStr == '') {
                                                keywordStr = 'No special properties!\n\n\n';
                                            }
                                            if (!monster.elite) {
                                                enemiesListEmbed.addFields({
                                                    name: bold(underscore(monster.name)),
                                                    value: "\n**Properties:**\n\n".concat(keywordStr, "\n\n\n                                            **Stats:**\n\n**").concat(monster.stats.atk, "** - ATK ").concat(Icons.ATK, " \n**").concat(monster.stats.hp, "** - Max HP ").concat(Icons.FullHp, " \n**").concat(monster.stats.spd, "** - SPD ").concat(Icons.SPD, "\n**").concat(monster.stats.armor, "** - ARMOR ").concat(Icons.Armor, "\n**").concat(monster.stats.magicDurability, "** - MAGIC DURABILITY").concat(Icons.MagicDurability, "\n\n                                            \n**__Level:__** ").concat(monster.minLvl),
                                                    inline: true,
                                                });
                                            }
                                            else {
                                                eliteCount++;
                                                monster.stats[randProp] += Math.round(Math.pow((playerInfo.data().playerLvl / eliteConstant), elitePower));
                                                monster.baseXp += monster.baseXp * 0.4;
                                                monster.gold += monster.gold * 0.4;
                                                enemiesListEmbed.addFields({
                                                    name: bold(underscore(monster.name)),
                                                    // TODO: Add hyperlink to monster page
                                                    value: "\n**Properties:**\n\n**".concat(hyperlink('Elite', 'https://blank.page/'), "** ").concat(formatEmoji(Icons.Elite), "\nEsta unidad recibe una mejora en una estadistica aleatoria\n\n**No puedes ver sus estadisticas hasta que inicias una pelea con esta unidad**\n\n\n                                            \n**__Level:__** ").concat(monster.minLvl),
                                                    inline: true,
                                                });
                                            }
                                            randPropDisplay = randProp;
                                            if (randProp == 'magicDurability') {
                                                randPropDisplay = 'mgcDrb';
                                            }
                                            eliteStr = "".concat(randPropDisplay, ":").concat(Math.round(monster.stats[randProp]));
                                            turn = (((_b = playerInfo.data()) === null || _b === void 0 ? void 0 : _b.stats.spd) > monster.stats.spd) ? 'player' : 'enemy';
                                            battleSelectMenu.addOptions({
                                                label: "".concat(monster.name, " - Recommended Level: ").concat(Math.ceil((monster.minLvl / 85) * 100), " "),
                                                description: ("Rewards: ".concat(monster.baseXp, " XP | ").concat(monster.gold, " GOLD")),
                                                // B is abbreviation for battle, b is abbreviation for begin, e is abbreviation for enemy
                                                // This is done so that the value is not too long but still we know what it does
                                                value: "b-s-e-".concat(monster.id, "-").concat(Math.round(monster.stats.hp), "-").concat(Math.round(monster.stats.atk), "-").concat(Math.round(monster.stats.spd), "-").concat(Math.round(monster.stats.armor), "-").concat(Math.round(monster.stats.magicDurability), "-").concat((monster.elite) ? eliteStr : '0', "-").concat(monster.baseXp, "-").concat(Math.round(monster.gold), "-").concat(turn).concat(valueKeyword, "-").concat(unique),
                                                emoji: (monster.elite) ? Icons.Elite : Icons[(_c = monster.keywords[0]) === null || _c === void 0 ? void 0 : _c.type],
                                            });
                                            unique++;
                                            return [2 /*return*/];
                                        });
                                    }); });
                                });
                                return [2 /*return*/];
                            });
                        }); });
                        row.addComponents(battleSelectMenu);
                        if (!activeBattles.exists()) return [3 /*break*/, 12];
                        if (!(((_g = activeBattles.data()) === null || _g === void 0 ? void 0 : _g.battles.amount) > 0)) return [3 /*break*/, 11];
                        return [4 /*yield*/, Promise.all(Object.values(activeBattles.data().battles).filter(function (element) { return (typeof element != 'number'); }).map(function (battle) { return __awaiter(_this, void 0, void 0, function () {
                                var enemy, battleEnemy, checkElite, keywordStr_1, eliteStr;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, getDoc(doc(db, 'Event/Enemies/RegularMonsters/Monsters'))];
                                        case 1:
                                            enemy = _a.sent();
                                            if (enemy.exists()) {
                                                hasActiveBattles_1 = true;
                                                battleEnemy = enemy.data()["enemy".concat(battle.enemyId)];
                                                checkElite = function (stat) {
                                                    if (stat == 'mgcDrb') {
                                                        stat = 'magicDurability';
                                                    }
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
                                                    value: "\n**Properties:**\n\n".concat(keywordStr_1, "\n\n                                            **Stats:**\n\n**").concat(battle.enemyAtk, "** - ATK ").concat(Icons.ATK, " ").concat(checkElite('atk'), "\n**").concat(battle.enemyHp, "** - Current HP ").concat(Icons.SeventyFivePercentHp, " ").concat(checkElite('hp'), "\n**").concat(battle.enemySpd, "** - SPD ").concat(Icons.SPD, " ").concat(checkElite('spd'), "\n**").concat(battle.enemyArmor, "** - ARMOR ").concat(Icons.Armor, " ").concat(checkElite('armor'), "\n**").concat(battle.enemyMagicDurability, "** - MAGIC DURABILITY ").concat(Icons.MagicDurability, " ").concat(checkElite('magicDurability'), "\n\n                                            \n**__Level:__** ").concat(battleEnemy.minLvl),
                                                    inline: true,
                                                });
                                                console.log('start options');
                                                eliteStr = void 0;
                                                if (battle.enemyElite != '0') {
                                                    eliteStr = "- ".concat(battle.enemyElite.split(':')[0].toUpperCase(), ": ").concat(battle.enemyElite.split(':')[1].toUpperCase());
                                                }
                                                activeBattleSelectMenu.addOptions({
                                                    label: "".concat(battleEnemy.name, " ").concat((battle.enemyElite != '0') ? eliteStr : ''),
                                                    description: ("".concat((battleEnemy.ability) ? battleEnemy.ability.abilityDesc : 'No special Properties!')),
                                                    value: "battle-attack-monster-".concat(battle.enemyId, "-").concat(battle.enemyUnique, "-").concat(activeBattles.data().battles.amount),
                                                    emoji: (battle.enemyElite != '0') ? Icons.Elite : Icons.Attack,
                                                });
                                                console.log('end options');
                                                return [2 /*return*/, true];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 10:
                        _m.sent();
                        activeBattleRow = new ActionRowBuilder();
                        activeBattleRow.addComponents(activeBattleSelectMenu);
                        if ((activeBattles.data().battles.length + 1) > 3) {
                            return [2 /*return*/, message.reply({ embeds: [activeBattlesListEmbed], components: [activeBattleRow], ephemeral: true })];
                        }
                        if (eliteCount > 0)
                            enemiesListEmbed.setColor('#8A1DE6');
                        message.reply({ embeds: [enemiesListEmbed, activeBattlesListEmbed], components: [row, activeBattleRow], ephemeral: true });
                        return [3 /*break*/, 12];
                    case 11:
                        if (eliteCount > 0)
                            enemiesListEmbed.setColor('#8A1DE6');
                        message.reply({ embeds: [enemiesListEmbed], components: [row.toJSON()], ephemeral: true }).catch(function (err) { return console.error(err); });
                        _m.label = 12;
                    case 12: return [3 /*break*/, 26];
                    case 13:
                        if (playerInfo.data().class != 'enchanter')
                            return [2 /*return*/];
                        message.channel.sendTyping();
                        if ((_h = playerInfo.data()) === null || _h === void 0 ? void 0 : _h.dead) {
                            return [2 /*return*/, message.reply({ embeds: [ErrorEmbed(EventErrors.PlayerIsDead)] })];
                        }
                        return [4 /*yield*/, getDoc(doc(db, message.author.id, 'PlayerInfo/Inventory/Equipment'))];
                    case 14:
                        playerEquipment = _m.sent();
                        if (!playerEquipment.exists()) return [3 /*break*/, 16];
                        if (!playerInfo.exists()) return [3 /*break*/, 16];
                        playerMana = playerInfo.data().stats.mana;
                        abilityOrbs = playerEquipment.data().abilityOrbs;
                        abilityOrbsArray = Object.values(abilityOrbs).filter(function (element) { return (typeof element != 'number'); });
                        return [4 /*yield*/, pagination('abilityOrbs', abilityOrbsArray, 1, message.author, { currentMana: playerMana }).then(function (results) {
                                return message.reply({ embeds: [results.embed], components: [results.paginationRow, results.selectMenuRow] });
                            })];
                    case 15:
                        _m.sent();
                        _m.label = 16;
                    case 16: return [3 /*break*/, 26];
                    case 17:
                        message.channel.sendTyping();
                        return [4 /*yield*/, getDoc(doc(db, message.author.id, 'PlayerInfo/Inventory/Equipment'))];
                    case 18:
                        playerEquipment = _m.sent();
                        if (!playerInfo.exists()) return [3 /*break*/, 20];
                        consumables = Object.values(((_j = playerEquipment === null || playerEquipment === void 0 ? void 0 : playerEquipment.data()) === null || _j === void 0 ? void 0 : _j.consumables) || {}).filter(function (element) { return typeof element != 'number'; });
                        if (consumables.length == 0) {
                            noConsumablesEmbed = new EmbedBuilder()
                                .setTitle('No tienes ningún consumible!')
                                .setDescription("Compra alguno en la tienda! (".concat(chatInputApplicationCommandMention('shop', CommandIds.Shop), ")"))
                                .setColor('#FF0000');
                            message.reply({ embeds: [noConsumablesEmbed] });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, pagination('consumables', consumables, 1, message.author).then(function (results) {
                                return message.reply({ embeds: [results.embed], components: [results.paginationRow, results.selectMenuRow] });
                            })];
                    case 19:
                        _m.sent();
                        _m.label = 20;
                    case 20: return [3 /*break*/, 26];
                    case 21:
                        if (playerInfo.data().class != 'warrior')
                            return [2 /*return*/];
                        message.channel.sendTyping();
                        if ((_k = playerInfo.data()) === null || _k === void 0 ? void 0 : _k.dead) {
                            return [2 /*return*/, message.reply({ embeds: [ErrorEmbed(EventErrors.PlayerIsDead)] })];
                        }
                        if (!activeBattles.exists()) return [3 /*break*/, 24];
                        if (!(((_l = activeBattles.data()) === null || _l === void 0 ? void 0 : _l.battles.amount) > 0)) return [3 /*break*/, 23];
                        return [4 /*yield*/, Promise.all(Object.values(activeBattles.data().battles).filter(function (element) { return (typeof element != 'number'); }).map(function (battle) { return __awaiter(_this, void 0, void 0, function () {
                                var enemy, battleEnemy, checkElite, keywordStr_2, eliteStr;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log(battle, 'debugpromisebattles');
                                            return [4 /*yield*/, getDoc(doc(db, 'Event/Enemies/RegularMonsters/Monsters'))];
                                        case 1:
                                            enemy = _a.sent();
                                            if (enemy.exists()) {
                                                hasActiveBattles_1 = true;
                                                battleEnemy = enemy.data()["enemy".concat(battle.enemyId)];
                                                checkElite = function (stat) {
                                                    if (stat == 'mgcDrb') {
                                                        stat = 'magicDurability';
                                                    }
                                                    if (battle.enemyElite != '0') {
                                                        return (stat == battle.enemyElite.split(':')[0]) ? formatEmoji(Icons.Elite) : '';
                                                    }
                                                    return '';
                                                };
                                                keywordStr_2 = '';
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
                                                        keywordStr_2 += "".concat(formatKeyword(keyword.type, displayName), "\n").concat(formatKeywordDesc(keyword.subtype, { ratio: keyword.ratio }), "\n\n");
                                                    }
                                                });
                                                if (battleEnemy === null || battleEnemy === void 0 ? void 0 : battleEnemy.abilities) {
                                                    keywordStr_2 += "".concat(formatKeyword(battleEnemy.abilities.type, battleEnemy.abilities.displayName), "\n").concat(formatKeywordDesc(battleEnemy.abilities.subtype, { ratio: battleEnemy.abilities.ratio }), "\n\n");
                                                }
                                                if (keywordStr_2 == '') {
                                                    keywordStr_2 = 'No special properties!';
                                                }
                                                activeBattlesListEmbed.addFields({
                                                    name: bold(underscore(battleEnemy.name)),
                                                    value: "\n**Properties:**\n\n".concat(keywordStr_2, "\n\n\n                                            **Stats:**\n\n**").concat(battle.enemyAtk, "** - ATK ").concat(Icons.ATK, " ").concat(checkElite('atk'), "\n**").concat(battle.enemyHp, "** - Current HP ").concat(Icons.SeventyFivePercentHp, " ").concat(checkElite('hp'), "\n**").concat(battle.enemySpd, "** - SPD ").concat(Icons.SPD, " ").concat(checkElite('spd'), "\n**").concat(battle.enemyArmor, "** - ARMOR ").concat(Icons.Armor, " ").concat(checkElite('armor'), "\n**").concat(battle.enemyMagicDurability, "** - MAGIC DURABILITY ").concat(Icons.MagicDurability, " ").concat(checkElite('magicDurability'), "\n\n                                            \n**__Level:__** ").concat(battleEnemy.minLvl),
                                                    inline: true,
                                                });
                                                console.log('start options');
                                                eliteStr = void 0;
                                                if (battle.enemyElite != '0') {
                                                    eliteStr = "- ".concat(battle.enemyElite.split(':')[0].toUpperCase(), ": ").concat(battle.enemyElite.split(':')[1].toUpperCase());
                                                }
                                                activeBattleSelectMenu.addOptions({
                                                    label: "".concat(battleEnemy.name, " ").concat((battle.enemyElite != '0') ? eliteStr : ''),
                                                    description: ("".concat((battleEnemy.ability) ? battleEnemy.ability.abilityDesc : 'No special Properties!')),
                                                    value: "battle-chargeAttack-monster-".concat(battle.enemyId, "-").concat(battle.enemyUnique, "-").concat(activeBattles.data().battles.amount),
                                                    emoji: (battle.enemyElite != '0') ? Icons.Elite : Icons.BuffedAtk,
                                                });
                                                console.log('end options');
                                                return [2 /*return*/, true];
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 22:
                        _m.sent();
                        activeBattleRow = new ActionRowBuilder();
                        activeBattleRow.addComponents(activeBattleSelectMenu);
                        console.log(row.components);
                        console.log('start repl');
                        if ((activeBattles.data().battles.length + 1) > 3) {
                            return [2 /*return*/, message.reply({ embeds: [activeBattlesListEmbed], components: [activeBattleRow] }).catch(console.error)];
                        }
                        if (eliteCount > 0)
                            enemiesListEmbed.setColor('#8A1DE6');
                        message.reply({ embeds: [activeBattlesListEmbed], components: [activeBattleRow] });
                        return [3 /*break*/, 24];
                    case 23:
                        noBattlesEmbed = new EmbedBuilder()
                            .setTitle('No tienes batallas activas')
                            .setDescription('Usa "attack" para empezar una batalla')
                            .setColor('Red');
                        message.reply({ embeds: [noBattlesEmbed] });
                        _m.label = 24;
                    case 24: return [3 /*break*/, 26];
                    case 25: return [3 /*break*/, 26];
                    case 26: return [2 /*return*/];
                }
            });
        });
    },
};
export {};

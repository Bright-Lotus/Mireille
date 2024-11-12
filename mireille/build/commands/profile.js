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
var _a = require('discord.js'), SlashCommandBuilder = _a.SlashCommandBuilder, EmbedBuilder = _a.EmbedBuilder, chatInputApplicationCommandMention = _a.chatInputApplicationCommandMention, bold = _a.bold, formatEmoji = _a.formatEmoji, ActionRowBuilder = _a.ActionRowBuilder, ButtonBuilder = _a.ButtonBuilder, ButtonStyle = _a.ButtonStyle;
var CommandIds = require('../emums/commandIds.js').CommandIds;
var Icons = require('../emums/icons.js').Icons;
var _b = require('firebase/firestore'), getFirestore = _b.getFirestore, getDoc = _b.getDoc, doc = _b.doc;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
var getAverageColor = require('fast-average-color-node').getAverageColor;
var Utils = require('../utils.js').Utils;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Comando para que veas tu perfil!')
        .addUserOption(function (option) { return option.setName('jugador').setDescription('Usuario del que quieres ver el perfil, dejalo en blanco para el tuyo!'); }),
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, profile(interaction)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    contextMenuExecute: function (interaction, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, profile(interaction, args)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
};
function profile(interaction, args) {
    return __awaiter(this, void 0, void 0, function () {
        var playerID, playerUser, playerInfo, displayName, capitalizeFirstLetter, playerStats, profileEmbed_1, extraData, statRow, hpEmoji_1, percentageOfMaxHp, statEmoji, equipped, equipment, key, baseStat, itemStat, stat;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, interaction.deferReply()];
                case 1:
                    _d.sent();
                    playerID = ((_a = interaction.options.getUser('jugador')) === null || _a === void 0 ? void 0 : _a.id) || interaction.user.id;
                    if (args === null || args === void 0 ? void 0 : args.contextMenu) {
                        playerID = interaction.targetId;
                    }
                    return [4 /*yield*/, interaction.guild.members.fetch(playerID)];
                case 2:
                    playerUser = _d.sent();
                    return [4 /*yield*/, getDoc(doc(db, playerID, 'PlayerInfo'))];
                case 3:
                    playerInfo = _d.sent();
                    displayName = playerUser.displayName;
                    capitalizeFirstLetter = function (string) {
                        return string.charAt(0).toUpperCase() + string.slice(1);
                    };
                    if (!playerInfo.exists()) return [3 /*break*/, 7];
                    if (interaction.user.id == '407225705051455491') {
                        displayName = 'Ashe';
                    }
                    playerStats = playerInfo.data().stats;
                    profileEmbed_1 = new EmbedBuilder()
                        .setTitle("Perfil de ".concat(displayName))
                        .setThumbnail(playerUser.displayAvatarURL({ extension: 'jpg' }))
                        .setDescription(bold(playerInfo.data().instructor.level.titleName));
                    extraData = new EmbedBuilder()
                        .setTitle('Informacion Adicional')
                        .setColor('Blurple')
                        .setDescription('_ _');
                    extraData.addFields({ name: "Experiencia ".concat(formatEmoji(Icons.LevelUp)), value: "".concat(playerInfo.data().stats.xp, " / ").concat(bold(playerInfo.data().nextLvlXpGoal), "\n _ _") }, { name: 'Estrellas Instructor 🌟', value: "".concat(playerInfo.data().instructor.level.currentStars, " / ").concat(bold(playerInfo.data().instructor.level.starsForNextTitle), "\n _ _") }, { name: "Nivel Jugador ".concat(Icons.Level), value: "".concat(playerInfo.data().playerLvl, " / ").concat(bold(100), "\n _ _") });
                    statRow = new ActionRowBuilder().addComponents(new ButtonBuilder()
                        .setCustomId("goldBtn-".concat(playerInfo.data().gold))
                        .setLabel("".concat(Utils.NumberFormatWithLetter(playerInfo.data().gold), " - Oro"))
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji(Icons.Gold), new ButtonBuilder()
                        .setCustomId('manaBtn')
                        .setLabel("".concat(playerInfo.data().stats.mana, " - Mana Actual"))
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji(Icons.Mana), new ButtonBuilder()
                        .setCustomId('xpBonusBtn')
                        .setLabel("".concat(playerInfo.data().xpBonus, "% - XP Bonus"))
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('⬆️'), new ButtonBuilder()
                        .setCustomId('classBtn')
                        .setLabel("".concat(capitalizeFirstLetter(playerInfo.data().class), " - Clase"))
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('💫'), new ButtonBuilder()
                        .setCustomId("eventPointsBtn-".concat(playerInfo.data().eventPoints))
                        .setLabel("".concat(Utils.NumberFormatWithLetter(playerInfo.data().eventPoints), " - Puntos Evento"))
                        .setStyle(ButtonStyle.Success)
                        .setEmoji('✨'));
                    return [4 /*yield*/, getAverageColor(playerUser.displayAvatarURL({ extension: 'jpg' })).then(function (color) {
                            profileEmbed_1.setColor(color.hex);
                        })];
                case 4:
                    _d.sent();
                    hpEmoji_1 = '';
                    percentageOfMaxHp = (playerStats.hp / playerStats.maxHp) * 100;
                    if (percentageOfMaxHp > 100) {
                        hpEmoji_1 = Icons.MoreThanFullHp;
                    }
                    else if (percentageOfMaxHp >= 75) {
                        hpEmoji_1 = Icons.FullHp;
                    }
                    else if (percentageOfMaxHp >= 50) {
                        hpEmoji_1 = Icons.SeventyFivePercentHp;
                    }
                    else if (percentageOfMaxHp >= 25) {
                        hpEmoji_1 = Icons.FiftyPercentHp;
                    }
                    else if (percentageOfMaxHp > 0) {
                        hpEmoji_1 = Icons.TwentyFivePercentHp;
                    }
                    else if (playerStats.hp == 0) {
                        hpEmoji_1 = formatEmoji(Icons.DeadHp);
                    }
                    statEmoji = function (stat) {
                        switch (stat) {
                            case 'hp': return hpEmoji_1;
                            case 'atk': return Icons.ATK;
                            case 'manaPerAttack': return formatEmoji(Icons.Mana);
                            case 'armor': return Icons.Armor;
                            case 'magicDurability': return Icons.MagicDurability;
                            case 'speed': return Icons.SPD;
                            case 'magicStrength': return Icons.MagicStrength;
                            default:
                                break;
                        }
                    };
                    return [4 /*yield*/, getDoc(doc(db, playerID, 'PlayerInfo/Inventory/Equipped'))];
                case 5:
                    equipped = _d.sent();
                    return [4 /*yield*/, getDoc(doc(db, playerID, 'PlayerInfo/Inventory/Equipment'))];
                case 6:
                    equipment = _d.sent();
                    for (key in playerStats) {
                        if (key == 'maxHp' || key == 'xp' || key == 'mana')
                            continue;
                        baseStat = void 0;
                        itemStat = void 0;
                        if (equipment.exists()) {
                            if ((_b = equipped.data().sword) === null || _b === void 0 ? void 0 : _b.id) {
                                stat = (key == 'speed') ? 'spd' : key;
                                baseStat = playerStats[key] - ((_c = equipment.data().swords["sword".concat(equipped.data().sword.id)]) === null || _c === void 0 ? void 0 : _c.stats[stat]) || undefined;
                                itemStat = equipment.data().swords["sword".concat(equipped.data().sword.id)].stats[stat] || undefined;
                            }
                        }
                        if (!baseStat) {
                            baseStat = playerStats[key];
                        }
                        if (!itemStat) {
                            itemStat = 0;
                        }
                        console.log(baseStat, key, itemStat);
                        profileEmbed_1.addFields({
                            name: "".concat(Utils.FormatStatName(key)),
                            value: "".concat(playerStats[key], " ").concat((key == 'hp') ? '/ ' + bold(playerStats.maxHp) : '', " ").concat(statEmoji(key), "\n\n") + bold("+".concat(baseStat)) + '  | Base' + bold("\n+".concat(itemStat)) + '  | Items\n\n',
                            inline: true,
                        });
                    }
                    interaction.editReply({ embeds: [profileEmbed_1, extraData], components: [statRow] });
                    _d.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
export {};

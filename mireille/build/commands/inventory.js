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
var _a = require('discord.js'), SlashCommandBuilder = _a.SlashCommandBuilder, EmbedBuilder = _a.EmbedBuilder, ActionRowBuilder = _a.ActionRowBuilder, ButtonBuilder = _a.ButtonBuilder, ButtonStyle = _a.ButtonStyle, chatInputApplicationCommandMention = _a.chatInputApplicationCommandMention, formatEmoji = _a.formatEmoji, bold = _a.bold;
var _b = require('firebase/firestore'), getFirestore = _b.getFirestore, getDoc = _b.getDoc, doc = _b.doc;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var pagination = require('../handlers/paginationHandler.js').pagination;
var CommandIds = require('../emums/commandIds.js').CommandIds;
var Icons = require('../emums/icons.js').Icons;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('Muestra tu inventario'),
    execute: function (interaction, category) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inventory(interaction, category)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    inventoryExecute: function (interaction, category, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, inventory(interaction, category, args)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
};
function inventory(interaction, category, args) {
    return __awaiter(this, void 0, void 0, function () {
        var playerInfo, classSignatureWeapon, equipment, equipped, items, itemsArray, itemRow_1, categories, categoriesButton_1, categoryRow_1, orbsRow_1, orbEquipRow_1, currentlyEquippedEmbed_1, sword, bow, armorPlate, wand, orbEquippedInSlot, i, classStr_1, functionArgs;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0: return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo'))];
                case 1:
                    playerInfo = _j.sent();
                    return [4 /*yield*/, interaction.deferReply()];
                case 2:
                    _j.sent();
                    classSignatureWeapon = 'luisin';
                    if (!playerInfo.exists()) return [3 /*break*/, 6];
                    switch (playerInfo.data().class) {
                        case 'warrior':
                            classSignatureWeapon = 'swords';
                            break;
                        case 'enchanter':
                            classSignatureWeapon = 'wands';
                            break;
                        case 'archer':
                            classSignatureWeapon = 'bows';
                            break;
                        default:
                            break;
                    }
                    if (!category) {
                        category = classSignatureWeapon;
                    }
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'))];
                case 3:
                    equipment = _j.sent();
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'))];
                case 4:
                    equipped = _j.sent();
                    if (!equipment.exists()) return [3 /*break*/, 6];
                    items = equipment.data()[category];
                    if (items.amount < 1) {
                        return [2 /*return*/, interaction.editReply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setTitle('No tienes nada en tu inventario')
                                        .setDescription("Puedes usar ".concat(chatInputApplicationCommandMention('shop', CommandIds.Shop), " para comprar objetos."))
                                        .setColor('Red'),
                                ],
                            })];
                    }
                    itemsArray = Object.values(items).filter(function (element) { return (typeof element != 'number'); });
                    itemRow_1 = new ActionRowBuilder();
                    categories = [classSignatureWeapon, 'armorPlates'];
                    if (playerInfo.data().class == 'enchanter') {
                        categories.push('abilityOrbs');
                    }
                    categories = categories.filter(function (element) { return element != category; });
                    categoriesButton_1 = {
                        abilityOrbs: 'Orbes de Habilidad',
                        swords: 'Espadas',
                        wands: 'Varitas',
                        bows: 'Arcos',
                        armorPlates: 'Armaduras',
                        abilityOrbsEmoji: Icons.AbilityOrb,
                        swordsEmoji: Icons.ATK,
                        armorPlatesEmoji: Icons.Armor,
                        wandsEmoji: Icons.Wands,
                        bowsEmoji: Icons.Bows,
                    };
                    console.log(categories);
                    categoryRow_1 = new ActionRowBuilder();
                    orbsRow_1 = new ActionRowBuilder();
                    orbEquipRow_1 = new ActionRowBuilder();
                    currentlyEquippedEmbed_1 = new EmbedBuilder().setTitle("Actualmente equipado en ranura ".concat((args === null || args === void 0 ? void 0 : args.orbPosition) || 0)).setColor('Aqua');
                    categories.forEach(function (elmnt) {
                        categoryRow_1.addComponents(new ButtonBuilder()
                            .setCustomId("".concat(elmnt, "-view-btn"))
                            .setEmoji("".concat(categoriesButton_1[elmnt + 'Emoji']))
                            .setStyle(ButtonStyle.Primary)
                            .setLabel(categoriesButton_1[elmnt]));
                    });
                    if (equipped.exists()) {
                        if (category == 'swords') {
                            if ((_a = equipped.data().sword) === null || _a === void 0 ? void 0 : _a.id) {
                                console.log('Algo equipado');
                                sword = equipment.data().swords["sword".concat(equipped.data().sword.id)];
                                itemRow_1.addComponents(new ButtonBuilder()
                                    .setCustomId('equippedSword-btn')
                                    .setEmoji('🪓')
                                    .setStyle(ButtonStyle.Primary)
                                    .setLabel(sword.name));
                            }
                            else {
                                itemRow_1.addComponents(new ButtonBuilder()
                                    .setCustomId('equippedSword-btn')
                                    .setEmoji('❎')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setLabel('Nada equipado'));
                            }
                        }
                        if (category == 'bows') {
                            if ((_b = equipped.data().bow) === null || _b === void 0 ? void 0 : _b.id) {
                                console.log('Algo equipado');
                                bow = equipment.data().bows["bow".concat(equipped.data().bow.id)];
                                itemRow_1.addComponents(new ButtonBuilder()
                                    .setCustomId('equippedBow-btn')
                                    .setEmoji('🏹')
                                    .setStyle(ButtonStyle.Primary)
                                    .setLabel(bow.name));
                            }
                            else {
                                itemRow_1.addComponents(new ButtonBuilder()
                                    .setCustomId('equippedBow-btn')
                                    .setEmoji('❎')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setLabel('Nada equipado'));
                            }
                        }
                        if (category == 'armorPlates') {
                            if ((_c = equipped.data().armorPlate) === null || _c === void 0 ? void 0 : _c.id) {
                                console.log('Algo equipado');
                                armorPlate = equipment.data().armorPlates["armorPlate".concat(equipped.data().armorPlate.id)];
                                itemRow_1.addComponents(new ButtonBuilder()
                                    .setCustomId('equippedArmorPlate-btn')
                                    .setEmoji('🛡️')
                                    .setStyle(ButtonStyle.Primary)
                                    .setLabel(armorPlate.name));
                            }
                            else {
                                itemRow_1.addComponents(new ButtonBuilder()
                                    .setCustomId('equippedArmorPlate-btn')
                                    .setEmoji('❎')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setLabel('Nada equipado'));
                            }
                        }
                        if (category == 'wands') {
                            if ((_d = equipped.data().wand) === null || _d === void 0 ? void 0 : _d.id) {
                                console.log('Algo equipado');
                                wand = equipment.data().wands["wand".concat(equipped.data().wand.id)];
                                itemRow_1.addComponents(new ButtonBuilder()
                                    .setCustomId('equippedSword-btn')
                                    .setEmoji('🪄')
                                    .setStyle(ButtonStyle.Primary)
                                    .setLabel(wand.name));
                            }
                            else {
                                itemRow_1.addComponents(new ButtonBuilder()
                                    .setCustomId('equippedSword-btn')
                                    .setEmoji('❎')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setLabel('Nada equipado'));
                            }
                        }
                        if (category == 'abilityOrbs') {
                            // TODO: Maybe implement ability orbs for Archers and Warriors
                            if ((_e = equipped.data().abilityOrbs) === null || _e === void 0 ? void 0 : _e["orb".concat((args === null || args === void 0 ? void 0 : args.orbPosition) || -1)]) {
                                orbEquippedInSlot = equipment.data().abilityOrbs["abilityOrb".concat((_f = equipped.data().abilityOrbs) === null || _f === void 0 ? void 0 : _f['orb' + (args === null || args === void 0 ? void 0 : args.orbPosition) || -1])];
                                currentlyEquippedEmbed_1.addFields({
                                    name: "__".concat(orbEquippedInSlot.name, "__ | ID: ").concat(orbEquippedInSlot.id),
                                    value: orbEquippedInSlot.desc + "\n\n".concat(bold('Mana requerido:'), " ").concat(orbEquippedInSlot.requiredMana, " ").concat(formatEmoji(Icons.Mana)),
                                });
                            }
                            else {
                                currentlyEquippedEmbed_1.setDescription('No tienes nada actualmente equipado en esta ranura!');
                            }
                            for (i = 1; i < 6; i++) {
                                if ((_g = equipped.data().abilityOrbs) === null || _g === void 0 ? void 0 : _g["orb".concat(i)]) {
                                    orbsRow_1.addComponents(new ButtonBuilder()
                                        .setCustomId("orbButtonView".concat(i, "/").concat(interaction.user.id))
                                        .setEmoji(Icons.AbilityOrb)
                                        .setStyle((i != 5) ? ButtonStyle.Primary : ButtonStyle.Success));
                                }
                                else {
                                    orbsRow_1.addComponents(new ButtonBuilder()
                                        .setCustomId("orbButtonView".concat(i, "/").concat(interaction.user.id))
                                        .setEmoji('❎')
                                        .setStyle((i != 5) ? ButtonStyle.Secondary : ButtonStyle.Danger));
                                }
                                orbEquipRow_1.addComponents(new ButtonBuilder()
                                    .setCustomId("orbButtonEquip".concat(i, "/").concat(interaction.user.id))
                                    .setEmoji('🔃')
                                    .setStyle((i != 5) ? ButtonStyle.Primary : ButtonStyle.Success));
                            }
                        }
                    }
                    classStr_1 = (playerInfo.data().class == 'enchanter' && category != 'swords') ? 'Enchanter' : '';
                    functionArgs = {
                        class: playerInfo.data().class,
                    };
                    console.log(args, functionArgs, category);
                    if (args === null || args === void 0 ? void 0 : args.orbPosition) {
                        functionArgs.orbPosition = args.orbPosition;
                    }
                    console.log("".concat(category, "Inventory").concat(classStr_1));
                    return [4 /*yield*/, pagination("".concat(category, "Inventory").concat(classStr_1).concat(((_h = args === null || args === void 0 ? void 0 : args.action) === null || _h === void 0 ? void 0 : _h.toUpperCase()) || ''), itemsArray, 1, interaction.user, functionArgs).then(function (results) {
                            if (category == 'abilityOrbs') {
                                if ((args === null || args === void 0 ? void 0 : args.action) == 'equip') {
                                    console.log(results.paginationRow.components, results.selectMenuRow.components);
                                    return interaction.editReply({ embeds: [currentlyEquippedEmbed_1, results.embed], components: [results.paginationRow, results.selectMenuRow] });
                                }
                                if (classStr_1 == 'Enchanter') {
                                    return interaction.editReply({ embeds: [results.embed], components: [results.paginationRow, orbsRow_1, orbEquipRow_1, categoryRow_1] });
                                }
                                return interaction.editReply({ embeds: [results.embed], components: [results.paginationRow, itemRow_1, results.selectMenuRow, results.selectMenuOrb2Row, categoryRow_1] });
                            }
                            return interaction.editReply({ embeds: [results.embed], components: [results.paginationRow, itemRow_1, results.selectMenuRow, categoryRow_1] });
                        })];
                case 5:
                    _j.sent();
                    console.log(equipment.data()[category]);
                    _j.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
export {};

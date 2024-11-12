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
var _a = require('discord.js'), EmbedBuilder = _a.EmbedBuilder, ActionRowBuilder = _a.ActionRowBuilder, SelectMenuBuilder = _a.SelectMenuBuilder, bold = _a.bold, formatEmoji = _a.formatEmoji, ButtonBuilder = _a.ButtonBuilder, ButtonStyle = _a.ButtonStyle, chatInputApplicationCommandMention = _a.chatInputApplicationCommandMention;
var CommandIds = require('../emums/commandIds').CommandIds;
var Icons = require('../emums/icons').Icons;
var Utils = require('../utils').Utils;
function pagination(category, objects, page, user, args) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    var _a, _b, _c, _d, _e, _f;
                    var embed = new EmbedBuilder();
                    var paginationRow = new ActionRowBuilder();
                    var selectMenu = new SelectMenuBuilder();
                    var selectMenuOrb2 = new SelectMenuBuilder();
                    var selectMenuRow = new ActionRowBuilder();
                    var selectMenuOrb2Row = new ActionRowBuilder();
                    var orbsRow = new ActionRowBuilder();
                    orbsRow.addComponents(new ButtonBuilder()
                        .setCustomId('orb1Button')
                        .setEmoji(Icons.AbilityOrb)
                        .setStyle(ButtonStyle.Primary), new ButtonBuilder()
                        .setCustomId('orb2Button')
                        .setEmoji(Icons.AbilityOrb)
                        .setStyle(ButtonStyle.Primary), new ButtonBuilder()
                        .setCustomId('orb3Button')
                        .setEmoji(Icons.AbilityOrb)
                        .setStyle(ButtonStyle.Primary), new ButtonBuilder()
                        .setCustomId('orb4Button')
                        .setEmoji(Icons.AbilityOrb)
                        .setStyle(ButtonStyle.Primary), new ButtonBuilder()
                        .setCustomId('orb5Button')
                        .setEmoji(Icons.AbilityOrb)
                        .setStyle(ButtonStyle.Success));
                    var orbEquippedRow = new ActionRowBuilder();
                    orbEquippedRow.addComponents(new ButtonBuilder()
                        .setCustomId('orb1ButtonChange')
                        .setEmoji('🔃')
                        .setStyle(ButtonStyle.Primary), new ButtonBuilder()
                        .setCustomId('orb2ButtonChange')
                        .setEmoji('🔃')
                        .setStyle(ButtonStyle.Primary), new ButtonBuilder()
                        .setCustomId('orb3ButtonChange')
                        .setEmoji('🔃')
                        .setStyle(ButtonStyle.Primary), new ButtonBuilder()
                        .setCustomId('orb4ButtonChange')
                        .setEmoji('🔃')
                        .setStyle(ButtonStyle.Primary), new ButtonBuilder()
                        .setCustomId('orb5ButtonChange')
                        .setEmoji('🔃')
                        .setStyle(ButtonStyle.Success));
                    var maxPages;
                    var maxItemsInPage = (category != 'leaderboard') ? 3 : 5;
                    if (category == 'allyTarget') {
                        maxItemsInPage = 10;
                    }
                    var itemsProcessed = 1;
                    var currentItem = 0;
                    if (!(args === null || args === void 0 ? void 0 : args.arraySorted)) {
                        objects.sort(function (a, b) {
                            return (a.id - b.id);
                        });
                    }
                    // Max items minus one
                    if (page != 1) {
                        for (var ignore = 1; ignore < page; ignore++) {
                            console.log('Adding +3');
                            currentItem += (category != 'leaderboard') ? 3 : 5;
                        }
                    }
                    for (var i = 0; i < maxItemsInPage; i++) {
                        maxPages = objects.length;
                        var element = objects[currentItem];
                        switch (category) {
                            case 'abilityOrbsInventoryEnchanterEQUIP': {
                                embed.setTitle("EQUIP: Orbe Habilidad ".concat(Icons.AbilityOrb)).setColor('Aqua');
                                embed.setDescription("Equipando en ranura ".concat(args.orbPosition));
                                selectMenu.setCustomId("inventoryAbilityOrbsModal-orb".concat(args.orbPosition, "-selectMenu/").concat(user.id)).setPlaceholder("Equipar orbe en ranura ".concat(args.orbPosition, "..."));
                                console.log(currentItem, itemsProcessed, maxItemsInPage, 'sadfasd');
                                if (itemsProcessed > maxItemsInPage) {
                                    continue;
                                }
                                if (!element)
                                    continue;
                                embed.addFields({
                                    name: "__".concat(element.name, "__ | ID: ").concat(element.id),
                                    value: "".concat(Utils.FormatDescription(element.desc, element)) + "\n\n".concat(bold('Mana requerido:'), " ").concat(element.requiredMana, " ").concat(formatEmoji(Icons.Mana)),
                                });
                                selectMenu.addOptions({
                                    label: "".concat(element.name),
                                    description: "Mana requerido: ".concat(element.requiredMana),
                                    value: "abilityOrbsInventoryModal-ability-equip-orb".concat(args.orbPosition, "-").concat(element.id),
                                    emoji: Icons.AbilityOrb,
                                });
                                itemsProcessed += 1;
                                currentItem += 1;
                                break;
                            }
                            case 'abilityOrbsInventoryEnchanter': {
                                embed.setTitle("Tus Orbes de Habilidad ".concat(Icons.AbilityOrb)).setColor('Aqua');
                                console.log(currentItem, itemsProcessed, maxItemsInPage, 'sadfasd');
                                if (itemsProcessed > maxItemsInPage) {
                                    continue;
                                }
                                if (!element)
                                    continue;
                                embed.addFields({
                                    name: "".concat(element.name, " | ID: ").concat(element.id),
                                    value: "".concat(Utils.FormatDescription(element.desc, element)) + "\n\n".concat(bold('Mana requerido:'), " ").concat(element.requiredMana, " ").concat(formatEmoji(Icons.Mana)),
                                });
                                itemsProcessed += 1;
                                currentItem += 1;
                                break;
                            }
                            case 'abilityOrbsInventory': {
                                embed.setTitle("Tus Orbes de Habilidad ".concat(Icons.AbilityOrb)).setColor('Aqua');
                                selectMenu.setCustomId("inventoryAbilityOrbsModal-orb1-selectMenu/".concat(user.id)).setPlaceholder('Equipar ranura de habilidad 1...');
                                selectMenuOrb2.setCustomId("inventoryAbilityOrbsModal-orb2-selectMenu/".concat(user.id)).setPlaceholder('Equipar ranura de habilidad 2...');
                                console.log(currentItem, itemsProcessed, maxItemsInPage, 'sadfasd');
                                if (itemsProcessed > maxItemsInPage) {
                                    continue;
                                }
                                if (!element)
                                    continue;
                                embed.addFields({
                                    name: "__".concat(element.name, "__ | ID: ").concat(element.id),
                                    value: "".concat(Utils.FormatDescription(element.desc, element)) + "\n\n".concat(bold('Mana requerido:'), " ").concat(element.requiredMana, " ").concat(formatEmoji(Icons.Mana)),
                                });
                                selectMenu.addOptions({
                                    label: "".concat(element.name),
                                    description: "Mana requerido: ".concat(element.requiredMana),
                                    value: "abilityOrbsInventoryModal-ability-equip-orb1-".concat(element.id),
                                    emoji: Icons.AbilityOrb,
                                });
                                selectMenuOrb2.addOptions({
                                    label: "".concat(element.name),
                                    description: "Mana requerido: ".concat(element.requiredMana),
                                    value: "abilityOrbsInventoryModal-ability-equip-orb2-".concat(element.id),
                                    emoji: Icons.AbilityOrb,
                                });
                                itemsProcessed += 1;
                                currentItem += 1;
                                console.log(currentItem, 'log0001');
                                break;
                            }
                            case 'swordsInventory': {
                                embed.setTitle('Your Swords').setColor('#F83636');
                                selectMenu.setCustomId("inventorySwordsModal-selectMenu/".concat(user.id)).setPlaceholder('Cambiar espada equipada...');
                                console.log(currentItem, itemsProcessed, maxItemsInPage, 'sadfasd');
                                if (itemsProcessed > maxItemsInPage) {
                                    continue;
                                }
                                if (!element)
                                    continue;
                                var perksStr = "\n\n***".concat(((_a = element === null || element === void 0 ? void 0 : element.perks) === null || _a === void 0 ? void 0 : _a.perkName) || 'Ninguno', "***\n").concat(((_b = element === null || element === void 0 ? void 0 : element.perks) === null || _b === void 0 ? void 0 : _b.perkDesc) || 'Este objeto no tiene ningun perk', "\n\n");
                                for (var index = 0; index < Object.values((element === null || element === void 0 ? void 0 : element.perks) || []).length; index++) {
                                    var perk = element === null || element === void 0 ? void 0 : element.perks["perk".concat(index + 1)];
                                    if (index == 0) {
                                        perksStr = "\n\n**".concat(perk === null || perk === void 0 ? void 0 : perk.perkName, "**\n").concat(perk === null || perk === void 0 ? void 0 : perk.perkDesc, "\n\n");
                                    }
                                    else {
                                        perksStr += "\n\n**".concat(perk === null || perk === void 0 ? void 0 : perk.perkName);
                                    }
                                }
                                embed.addFields({
                                    name: '__' + element.name + '__',
                                    value: "\n\n\n***Stats***\n\n**+".concat(element.stats.atk, "** - ATK\n**+").concat(element.stats.spd, "** - SPD\n\n**Perks**").concat(perksStr, "**Minimum Level:** ").concat(element.minLvl),
                                    inline: true,
                                });
                                selectMenu.addOptions({
                                    label: element.name,
                                    description: "Nivel minimo: ".concat(element.minLvl),
                                    value: "inventorySwordModal-sword-equip-".concat(element.id),
                                    emoji: '🪓',
                                });
                                itemsProcessed += 1;
                                currentItem += 1;
                                console.log(currentItem, 'log0001');
                                break;
                            }
                            case 'armorPlatesInventory': {
                                embed.setTitle('Tus Armaduras').setColor('#F83636');
                                selectMenu.setCustomId("inventoryArmorPlatesModal-selectMenu/".concat(user.id)).setPlaceholder('Cambiar armadura equipada...');
                                console.log(currentItem, itemsProcessed, maxItemsInPage, 'sadfasd');
                                if (itemsProcessed > maxItemsInPage) {
                                    continue;
                                }
                                if (!element)
                                    continue;
                                var perksStr = "\n\n***".concat(((_c = element === null || element === void 0 ? void 0 : element.perks) === null || _c === void 0 ? void 0 : _c.perkName) || 'Ninguno', "***\n").concat(((_d = element === null || element === void 0 ? void 0 : element.perks) === null || _d === void 0 ? void 0 : _d.perkDesc) || 'Este objeto no tiene ningun perk', "\n\n");
                                for (var index = 0; index < Object.values((element === null || element === void 0 ? void 0 : element.perks) || []).length; index++) {
                                    var perk = element === null || element === void 0 ? void 0 : element.perks["perk".concat(index + 1)];
                                    if (index == 0) {
                                        perksStr = "\n\n**".concat(perk === null || perk === void 0 ? void 0 : perk.perkName, "**\n").concat(perk === null || perk === void 0 ? void 0 : perk.perkDesc, "\n\n");
                                    }
                                    else {
                                        perksStr += "\n\n**".concat(perk === null || perk === void 0 ? void 0 : perk.perkName);
                                    }
                                }
                                embed.addFields({
                                    name: '__' + element.name + '__',
                                    value: "\n\n\n***Stats***\n\n**+".concat(element.stats.armor, "** - Armor\n**+").concat(element.stats.magicDurability, "** - Magic DURABILITY\n\n**Perks**").concat(perksStr, "**Minimum Level:** ").concat(element.minLvl),
                                    inline: true,
                                });
                                selectMenu.addOptions({
                                    label: element.name,
                                    description: "Nivel minimo: ".concat(element.minLvl),
                                    value: "inventoryArmorPlateModal-armorPlate-equip-".concat(element.id),
                                    emoji: '🛡️',
                                });
                                itemsProcessed += 1;
                                currentItem += 1;
                                console.log(currentItem, 'log0001');
                                break;
                            }
                            case 'bowsInventory': {
                                embed.setTitle('Your Bows').setColor('Green');
                                selectMenu.setCustomId("inventoryBowsModal-selectMenu/".concat(user.id)).setPlaceholder('Cambiar arco equipado...');
                                console.log(currentItem, itemsProcessed, maxItemsInPage, 'sadfasd');
                                if (itemsProcessed > maxItemsInPage) {
                                    continue;
                                }
                                if (!element)
                                    continue;
                                var perksStr = '\n\n***Ninguno***\nEste objeto no tiene ningun perk\n\n';
                                for (var index = 0; index < Object.values(element === null || element === void 0 ? void 0 : element.perks).length; index++) {
                                    var perk = element === null || element === void 0 ? void 0 : element.perks["perk".concat(index + 1)];
                                    if (index == 0) {
                                        perksStr = "\n\n**".concat(perk.perkName, "**\n").concat(perk.perkDesc, "\n\n");
                                    }
                                    else {
                                        perksStr += "\n\n**".concat(perk.perkName);
                                    }
                                }
                                embed.addFields({
                                    name: '__' + element.name + '__',
                                    value: "\n\n\n***Stats***\n\n**+".concat(element.stats.atk, "** - ATK\n**+").concat(element.stats.spd, "** - SPD\n\n**Perks**").concat(perksStr, "**Minimum Level:** ").concat(element.minLvl),
                                    inline: true,
                                });
                                selectMenu.addOptions({
                                    label: element.name,
                                    description: "Nivel minimo: ".concat(element.minLvl),
                                    value: "inventoryBowModal-bow-equip-".concat(element.id),
                                    emoji: '🏹',
                                });
                                itemsProcessed += 1;
                                currentItem += 1;
                                console.log(currentItem, 'log0001');
                                break;
                            }
                            case 'abilityOrbs':
                                embed.setTitle('Your Ability Orbs').setColor('Aqua');
                                selectMenu.setCustomId("abilityModal-selectMenu/".concat(user.id)).setPlaceholder('Select ability...');
                                console.log(currentItem, itemsProcessed, maxItemsInPage, 'sadfasd');
                                if (itemsProcessed > maxItemsInPage) {
                                    continue;
                                }
                                if (!element)
                                    continue;
                                embed.setDescription("".concat(bold('Mana actual: '), " ").concat(args.currentMana, " ").concat(formatEmoji(Icons.Mana)));
                                embed.addFields({
                                    name: "__".concat(element.name, "__ | ID: ").concat(element.id),
                                    value: "".concat(Utils.FormatDescription(element.desc, element)) + "\n\n".concat(bold('Mana requerido:'), " ").concat(element.requiredMana, " ").concat(formatEmoji(Icons.Mana)),
                                });
                                selectMenu.addOptions({
                                    label: "".concat(element.name),
                                    description: "Mana requerido: ".concat(element.requiredMana),
                                    value: "abilityModal-ability-select-".concat(element.id, "-").concat(element.target),
                                    emoji: Icons.AbilityOrb,
                                });
                                console.log(currentItem, 'log0000');
                                itemsProcessed += 1;
                                currentItem += 1;
                                console.log(currentItem, 'log0001');
                                break;
                            case 'wandsInventoryEnchanter':
                                embed.setTitle('Your Magical Wands').setColor('Blue');
                                selectMenu.setCustomId("inventoryWandsModal-selectMenu/".concat(user.id)).setPlaceholder('Cambiar varita equipada...');
                                console.log(currentItem, itemsProcessed, maxItemsInPage, 'sadfasd');
                                if (itemsProcessed > maxItemsInPage) {
                                    continue;
                                }
                                if (!element)
                                    continue;
                                embed.addFields({
                                    name: '__' + element.name + '__',
                                    value: "\n\n\n***Stats***\n\n**+".concat(element.stats.magicStrength, "** - MGC STR\n**+").concat(element.stats.mana, "** - MANA\n\n**Perks**\n\n***").concat(((_e = element === null || element === void 0 ? void 0 : element.perks) === null || _e === void 0 ? void 0 : _e.perkName) || 'Ninguno', "***\n").concat(((_f = element === null || element === void 0 ? void 0 : element.perks) === null || _f === void 0 ? void 0 : _f.perkDesc) || 'Este objeto no tiene ningun perk', "\n\n**Minimum Level:** ").concat(element.minLvl),
                                    inline: true,
                                });
                                selectMenu.addOptions({
                                    label: element.name,
                                    description: "Nivel minimo: ".concat(element.minLvl),
                                    value: "inventoryWandModal-wand-equip-".concat(element.id),
                                    emoji: '🪄',
                                });
                                itemsProcessed += 1;
                                currentItem += 1;
                                console.log(currentItem, 'log0001');
                                break;
                            case 'leaderboard':
                                embed.setTitle('Tabla del Evento').setColor('Aqua');
                                console.log(element);
                                if (!element)
                                    continue;
                                embed.addFields({
                                    name: "".concat(currentItem + 1, " \\ ").concat(bold(element.name), " ").concat(element.isPlayer ? '(Tú)' : '', " - ").concat(chatInputApplicationCommandMention('profile', CommandIds.Profile)),
                                    value: "Puntos: **".concat(new Intl.NumberFormat().format(element.eventPts), "**\nNivel: **").concat(element.lvl, "**\nVida: **").concat(element.playerHp, "/").concat(element.playerMaxHp, "** ").concat(Utils.HpEmoji(element.playerHp, element.playerMaxHp)),
                                });
                                itemsProcessed += 1;
                                currentItem += 1;
                                break;
                            case 'allyTarget': {
                                embed.setTitle('Aliados').setColor('Green');
                                selectMenu.setCustomId("allyTarget-selectMenu/".concat(user.id)).setPlaceholder('Seleccionar aliado...');
                                if (!element)
                                    continue;
                                embed.addFields({
                                    name: "(+) ".concat(bold(element.name)),
                                    value: "HP ".concat(element.playerHp, "/").concat(bold(element.playerMaxHp), " ").concat(Utils.HpEmoji(element.playerHp, element.playerMaxHp)),
                                });
                                selectMenu.addOptions({
                                    label: element.name,
                                    description: "HP ".concat(element.playerHp, "/").concat(element.playerMaxHp, " ").concat(Utils.HpEmoji(element.playerHp, element.playerMaxHp)),
                                    value: "ability-target-ally-".concat(element.id, "-").concat(element.abilityID),
                                    emoji: '🪄',
                                });
                                itemsProcessed += 1;
                                currentItem += 1;
                                break;
                            }
                            case 'consumables': {
                                embed.setTitle('Consumibles').setColor('Green');
                                selectMenu.setCustomId("consumable-selectMenu/".concat(user.id)).setPlaceholder('Seleccionar consumible...');
                                if (!element)
                                    continue;
                                embed.addFields({
                                    name: "".concat(bold(element.name)),
                                    value: "".concat(bold(element.type.toUpperCase()), "\n(+) ").concat(element.amount, "\n\n**Cantidad:** ").concat(element.consumableAmount),
                                });
                                selectMenu.addOptions({
                                    label: element.name,
                                    description: "".concat(element.type.toUpperCase(), " | ").concat(element.amount),
                                    value: "consumable-use-".concat(element.id),
                                    emoji: '🥤',
                                });
                                itemsProcessed += 1;
                                currentItem += 1;
                                break;
                            }
                            default:
                                break;
                        }
                    }
                    maxPages = Math.ceil(maxPages / maxItemsInPage);
                    var enemyUniqueStr = (category == 'abilityOrbs') ? "-".concat(args === null || args === void 0 ? void 0 : args.enemyUnique) : '';
                    selectMenuRow.addComponents(selectMenu);
                    selectMenuOrb2Row.addComponents(selectMenuOrb2);
                    paginationRow.addComponents(new ButtonBuilder()
                        .setCustomId("".concat(category, "Modal-page").concat(page - 1, "-").concat(category, "-").concat(user.id).concat(enemyUniqueStr))
                        .setLabel('<')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(((page - 1) <= 0) ? true : false), new ButtonBuilder()
                        .setCustomId('shopModal-pageViewer')
                        .setLabel("".concat(page, " \u200B / \u200B ").concat(maxPages))
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false), new ButtonBuilder()
                        .setCustomId("".concat(category, "Modal-page").concat(page + 1, "-").concat(category, "-").concat(user.id).concat(enemyUniqueStr))
                        .setLabel('>')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(((page + 1) > maxPages) ? true : false));
                    return resolve({
                        embed: embed,
                        paginationRow: paginationRow,
                        selectMenuRow: (category != 'abilityOrbsInventoryEnchanter') ? selectMenuRow : orbsRow,
                        selectMenuOrb2Row: (category != 'abilityOrbsInventoryEnchanter') ? selectMenuOrb2Row : orbEquippedRow,
                    });
                })];
        });
    });
}
module.exports = { pagination: pagination };
export {};

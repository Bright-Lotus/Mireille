var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { getFirestore, doc, setDoc, updateDoc, getDoc, increment, arrayUnion, Timestamp, deleteField } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig.js';
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
import { contextMenuExecute } from '../commands/christmas.js';
import { EmbedBuilder, bold, underscore, formatEmoji, chatInputApplicationCommandMention, time, TimestampStyles } from 'discord.js';
import { attack } from '../handlers/attackHandler.js';
import { ErrorEmbed, EventErrors } from '../errors/errors.js';
import { healthManager } from '../handlers/healthHandler.js';
import { Abilities } from '../emums/abilities.js';
import { pagination } from '../handlers/paginationHandler.js';
import { ability } from '../handlers/abilityHandler.js';
import { dialogHandler } from '../handlers/dialogHandler.js';
import { targetHandler } from '../handlers/targetHandler.js';
import { Icons } from '../emums/icons.js';
import { CommandIds } from '../emums/commandIds.js';
import { converter } from '../handlers/firestoreHandler.js';
function abilityModalTriggered(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Target handler is for proccessing the target of the ability
                return [4 /*yield*/, targetHandler(interaction)];
                case 1:
                    // Target handler is for proccessing the target of the ability
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function allyTargetTriggered(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var idSplit, target, abilityID;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idSplit = interaction.values[0].split('-');
                    target = idSplit[3];
                    abilityID = idSplit[4];
                    return [4 /*yield*/, ability(Number(abilityID), target, interaction.user).then(function (results) {
                            var orbUsedEmbed = new EmbedBuilder()
                                .setTitle('Has usado la habilidad seleccionada!')
                                .setColor('Blue')
                                .setDescription("Mana restante: **".concat(results.manaRemaining, "** ").concat(formatEmoji(Icons.Mana)));
                            interaction.reply({ embeds: [orbUsedEmbed], ephemeral: true });
                        }).catch(function (results) {
                            interaction.reply({ embeds: [results.manaEmbed], ephemeral: true });
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function inventoryBowsModalTriggered(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var bowID, equipment, equipmentData, bow, bowStats, equipped, itemPerks_1, equippedEmbed;
        var _this = this;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    bowID = interaction.values[0].split('-')[3];
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment').withConverter(converter()))];
                case 1:
                    equipment = _c.sent();
                    equipmentData = equipment.data();
                    if (!equipment.exists()) return [3 /*break*/, 9];
                    bow = (_a = equipmentData.bows) === null || _a === void 0 ? void 0 : _a["bow".concat(bowID)];
                    if (!bow)
                        return [2 /*return*/];
                    bowStats = bow.stats;
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'))];
                case 2:
                    equipped = _c.sent();
                    // This is for removing the stats of the currently equipped bow
                    if (!equipped.exists())
                        return [2 /*return*/];
                    if (!((_b = equipped.data().sword) === null || _b === void 0 ? void 0 : _b.id)) return [3 /*break*/, 4];
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), 'stats.atk', increment(-Math.abs(bowStats.atk)), [{ 'stats.speed': increment(-Math.abs(bowStats.spd)) }])];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4: 
                // Sets the bow ID to the equipped bow
                return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'), 'bow', { id: bowID })];
                case 5:
                    // Sets the bow ID to the equipped bow
                    _c.sent();
                    // Adds the stats of the bow to the player stats
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), 'stats.atk', increment(bowStats.atk), [{ 'stats.speed': increment(bowStats.spd) }])];
                case 6:
                    // Adds the stats of the bow to the player stats
                    _c.sent();
                    if (!(bow === null || bow === void 0 ? void 0 : bow.perks)) return [3 /*break*/, 8];
                    itemPerks_1 = [];
                    Object.values(bow.perks).forEach(function (perk) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            itemPerks_1.push({ perkRatio: perk.ratio, perk: perk.perk });
                            return [2 /*return*/];
                        });
                    }); });
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'), 'onAttack', itemPerks_1)];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8:
                    equippedEmbed = new EmbedBuilder()
                        .setTitle('Se ha equipado el arco exitosamente!')
                        .setColor('Green')
                        .setDescription("Se ha equipado ".concat(bow.name, "\n\n+").concat(bowStats.atk, " - ATK\n+").concat(bowStats.spd, " - SPD"));
                    interaction.reply({ embeds: [equippedEmbed] });
                    _c.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
function inventoryArmorPlatesModalTriggered(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var armorPlateID, equipment, armorPlate, armorPlateStats, equipped, itemPerks_2, equippedEmbed;
        var _a, _b, _c, _d;
        var _this = this;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (interaction.user.id != interaction.customId.split('/')[1]) {
                        return [2 /*return*/, interaction.reply({ embeds: [ErrorEmbed(EventErrors.NotOwnerOfInteraction)], ephemeral: true })];
                    }
                    armorPlateID = interaction.values[0].split('-')[3];
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'))];
                case 1:
                    equipment = _f.sent();
                    if (!equipment.exists()) return [3 /*break*/, 9];
                    armorPlate = equipment.data().armorPlates["armorPlate".concat(armorPlateID)];
                    armorPlateStats = armorPlate.stats;
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'))];
                case 2:
                    equipped = _f.sent();
                    if (!equipped.exists()) return [3 /*break*/, 4];
                    if (!((_e = equipped.data().sword) === null || _e === void 0 ? void 0 : _e.id)) return [3 /*break*/, 4];
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), (_a = {},
                            _a['stats.armor'] = increment(-Math.abs(armorPlateStats.armor)),
                            _a['stats.magicDurability'] = increment(-Math.abs(armorPlateStats.magicDurability)),
                            _a['stats.maxHp'] = increment(-Math.abs(armorPlateStats.maxHp)),
                            _a), { merge: true })];
                case 3:
                    _f.sent();
                    _f.label = 4;
                case 4: return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'), (_b = {},
                        _b['armorPlate'] = { id: armorPlateID },
                        _b), { merge: true })];
                case 5:
                    _f.sent();
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), (_c = {},
                            _c['stats.armor'] = increment(armorPlateStats.armor),
                            _c['stats.magicDurability'] = increment(armorPlateStats.magicDurability),
                            _c['stats.maxHp'] = increment(Math.abs(armorPlateStats.maxHp)),
                            _c), { merge: true })];
                case 6:
                    _f.sent();
                    if (!(armorPlate === null || armorPlate === void 0 ? void 0 : armorPlate.perks)) return [3 /*break*/, 8];
                    itemPerks_2 = [];
                    Object.values(armorPlate.perks).forEach(function (perk) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            itemPerks_2.push({ perkRatio: perk.ratio, perk: perk.perk });
                            return [2 /*return*/];
                        });
                    }); });
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'), (_d = {},
                            _d['onEnemyAttack'] = itemPerks_2,
                            _d), { merge: true })];
                case 7:
                    _f.sent();
                    _f.label = 8;
                case 8:
                    equippedEmbed = new EmbedBuilder()
                        .setTitle('Se ha equipado la armadura exitosamente!')
                        .setColor('Green')
                        .setDescription("Se ha equipado ".concat(armorPlate.name, "\n\n+").concat(armorPlateStats.armor, " - Armor\n+").concat(armorPlateStats.magicDurability, " - Magic DURABILITY"));
                    interaction.reply({ embeds: [equippedEmbed] });
                    _f.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
function inventoryWandsModalTriggered(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var wandID, equipment, wand, wandStats, equipped, itemPerks_3, equippedEmbed;
        var _a, _b, _c, _d, _e, _f;
        var _this = this;
        var _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (interaction.user.id != interaction.customId.split('/')[1]) {
                        return [2 /*return*/, interaction.reply({ embeds: [ErrorEmbed(EventErrors.NotOwnerOfInteraction)], ephemeral: true })];
                    }
                    wandID = interaction.values[0].split('-')[3];
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'))];
                case 1:
                    equipment = _h.sent();
                    if (!equipment.exists()) return [3 /*break*/, 11];
                    wand = equipment.data().wands["wand".concat(wandID)];
                    wandStats = wand.stats;
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'))];
                case 2:
                    equipped = _h.sent();
                    if (!equipped.exists()) return [3 /*break*/, 5];
                    if (!((_g = equipped.data().sword) === null || _g === void 0 ? void 0 : _g.id)) return [3 /*break*/, 5];
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), (_a = {},
                            _a['stats.manaPerAttack'] = increment(-Math.abs(wandStats.mana)),
                            _a), { merge: true })];
                case 3:
                    _h.sent();
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), (_b = {},
                            _b['stats.magicStrength'] = increment(-Math.abs(wandStats.magicStrength)),
                            _b), { merge: true })];
                case 4:
                    _h.sent();
                    _h.label = 5;
                case 5: return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'), (_c = {},
                        _c['wand'] = { id: wandID },
                        _c), { merge: true })];
                case 6:
                    _h.sent();
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), (_d = {},
                            _d['stats.manaPerAttack'] = increment(wandStats.mana),
                            _d), { merge: true })];
                case 7:
                    _h.sent();
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), (_e = {},
                            _e['stats.magicStrength'] = increment(wandStats.magicStrength),
                            _e), { merge: true })];
                case 8:
                    _h.sent();
                    if (!(wand === null || wand === void 0 ? void 0 : wand.perks)) return [3 /*break*/, 10];
                    itemPerks_3 = [];
                    Object.values(wand.perks).forEach(function (perk) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            itemPerks_3.push({ perkRatio: perk.ratio, perk: perk.perk });
                            return [2 /*return*/];
                        });
                    }); });
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'), (_f = {},
                            _f['onAttack'] = itemPerks_3,
                            _f), { merge: true })];
                case 9:
                    _h.sent();
                    _h.label = 10;
                case 10:
                    equippedEmbed = new EmbedBuilder()
                        .setTitle('Se ha equipado la varita exitosamente!')
                        .setColor('Green')
                        .setDescription("Se ha equipado ".concat(wand.name, "\n\n+").concat(wandStats.manaPerAttack, " - Mana PER ATTACK\n+").concat(wandStats.magicStrength, " - Magic STRENGTH"));
                    interaction.reply({ embeds: [equippedEmbed] });
                    _h.label = 11;
                case 11: return [2 /*return*/];
            }
        });
    });
}
function inventoryAbilityOrbsModalTriggered(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var abilityOrbID, equipment, abilityOrb, equipped, abilityOrbEquipped, playerInfo, ratio, equippedEmbed;
        var _a, _b, _c, _d;
        var _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (interaction.user.id != interaction.customId.split('/')[1]) {
                        return [2 /*return*/, interaction.reply({ embeds: [ErrorEmbed(EventErrors.NotOwnerOfInteraction)], ephemeral: true })];
                    }
                    abilityOrbID = interaction.values[0].split('-')[4];
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'))];
                case 1:
                    equipment = _h.sent();
                    if (!equipment.exists()) return [3 /*break*/, 8];
                    abilityOrb = equipment.data().abilityOrbs["abilityOrb".concat(abilityOrbID)];
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'))];
                case 2:
                    equipped = _h.sent();
                    if (!equipped.exists()) return [3 /*break*/, 4];
                    if (!((_e = equipped.data()) === null || _e === void 0 ? void 0 : _e.abilityOrbs[interaction.customId.split('-')[1]])) return [3 /*break*/, 4];
                    abilityOrbEquipped = equipment.data().abilityOrbs["abilityOrb".concat((_f = equipped.data()) === null || _f === void 0 ? void 0 : _f.abilityOrbs[interaction.customId.split('-')[1]])];
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'), (_a = {},
                            _a["abilityOrbs.abilityOrb".concat((_g = equipped.data()) === null || _g === void 0 ? void 0 : _g.abilityOrbs[interaction.customId.split('-')[1]], ".requiredMana")] = abilityOrbEquipped === null || abilityOrbEquipped === void 0 ? void 0 : abilityOrbEquipped.staticMana,
                            _a), { merge: true })];
                case 3:
                    _h.sent();
                    _h.label = 4;
                case 4: return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'), (_b = {},
                        _b['abilityOrbs'] = __assign(__assign({}, equipped.data().abilityOrbs), (_c = {}, _c[interaction.customId.split('-')[1]] = abilityOrbID, _c)),
                        _b), { merge: true })];
                case 5:
                    _h.sent();
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo'))];
                case 6:
                    playerInfo = _h.sent();
                    ratio = (playerInfo.data().class != 'enchanter') ? 0.7 : 0.65;
                    if (interaction.customId.split('-')[1] == 'orb5')
                        ratio -= 0.3;
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'), (_d = {},
                            _d["abilityOrbs.abilityOrb".concat(abilityOrbID, ".requiredMana")] = Math.round(abilityOrb.requiredMana * ratio),
                            _d), { merge: true })];
                case 7:
                    _h.sent();
                    equippedEmbed = new EmbedBuilder()
                        .setTitle('Se ha equipado el orbe de habilidad exitosamente!')
                        .setColor('Green')
                        .setDescription("Se ha equipado ".concat(abilityOrb.name, ", en la ranura 1.\n\n").concat(abilityOrb.desc));
                    interaction.reply({ embeds: [equippedEmbed] });
                    _h.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function consumableSelectMenuTriggered(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var consumableID, playerEquipment, consumable, _a, noMoreConsumableEmbed, healEmbed, playerStats, noMoreConsumableEmbed, manaEmbed;
        var _b, _c, _d, _e, _f, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    if (interaction.user.id != interaction.customId.split('/')[1]) {
                        return [2 /*return*/, interaction.reply({ embeds: [ErrorEmbed(EventErrors.NotOwnerOfInteraction)], ephemeral: true })];
                    }
                    consumableID = interaction.values[0].split('-')[2];
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'))];
                case 1:
                    playerEquipment = _k.sent();
                    if (!playerEquipment.exists()) return [3 /*break*/, 17];
                    consumable = playerEquipment.data().consumables["consumable".concat(consumableID)];
                    _a = consumable.type;
                    switch (_a) {
                        case 'heal': return [3 /*break*/, 2];
                        case 'mana': return [3 /*break*/, 12];
                    }
                    return [3 /*break*/, 17];
                case 2:
                    if (consumable.consumableAmount == 0) {
                        noMoreConsumableEmbed = new EmbedBuilder()
                            .setTitle('Ya no tienes mas de este consumible')
                            .setColor('Red')
                            .setDescription("Puedes usar ".concat(chatInputApplicationCommandMention('shop', CommandIds.Shop), " para comprar mas"));
                        interaction.reply({ embeds: [noMoreConsumableEmbed] });
                        return [2 /*return*/];
                    }
                    healEmbed = new EmbedBuilder()
                        .setTitle('Has usado el consumible')
                        .setColor('Green')
                        .setDescription("Te has curado ".concat(bold(consumable.amount), " ").concat(formatEmoji(Icons.Heal)));
                    interaction.reply({ embeds: [healEmbed] });
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo'))];
                case 3: return [4 /*yield*/, (_k.sent()).data().stats];
                case 4:
                    playerStats = _k.sent();
                    if (!(playerStats.hp + consumable.amount > playerStats.maxHp)) return [3 /*break*/, 7];
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), (_b = {},
                            _b['stats.hp'] = playerStats.maxHp,
                            _b), { merge: true })];
                case 5:
                    _k.sent();
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'), (_c = {},
                            _c["consumables.consumable".concat(consumableID, ".consumableAmount")] = (consumable.consumableAmount != 0) ? increment(-1) : 0,
                            _c), { merge: true })];
                case 6:
                    _k.sent();
                    return [2 /*return*/];
                case 7: return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), (_d = {},
                        _d['stats.hp'] = increment(consumable.amount),
                        _d), { merge: true })];
                case 8:
                    _k.sent();
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'), (_e = {},
                            _e["consumables.consumable".concat(consumableID, ".consumableAmount")] = (consumable.consumableAmount != 0) ? increment(-1) : 0,
                            _e), { merge: true })];
                case 9:
                    _k.sent();
                    if (!((consumable.consumableAmount - 1) == 0)) return [3 /*break*/, 11];
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'), (_f = {},
                            _f["consumables.consumable".concat(consumableID)] = deleteField(),
                            _f), { merge: true })];
                case 10:
                    _k.sent();
                    _k.label = 11;
                case 11: return [3 /*break*/, 17];
                case 12:
                    if (consumable.consumableAmount == 0) {
                        noMoreConsumableEmbed = new EmbedBuilder()
                            .setTitle('Ya no tienes mas de este consumible')
                            .setColor('Red')
                            .setDescription("Puedes usar ".concat(chatInputApplicationCommandMention('shop', CommandIds.Shop), " para comprar mas"));
                        interaction.reply({ embeds: [noMoreConsumableEmbed] });
                        return [2 /*return*/];
                    }
                    manaEmbed = new EmbedBuilder()
                        .setTitle('Has usado el consumible')
                        .setColor('Blue')
                        .setDescription("Has obtenido ".concat(bold(consumable.amount), " ").concat(formatEmoji(Icons.Mana)));
                    interaction.reply({ embeds: [manaEmbed] });
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), (_g = {},
                            _g['stats.mana'] = increment(consumable.amount),
                            _g), { merge: true })];
                case 13:
                    _k.sent();
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'), (_h = {},
                            _h["consumables.consumable".concat(consumableID, ".consumableAmount")] = (consumable.consumableAmount != 0) ? increment(-1) : 0,
                            _h), { merge: true })];
                case 14:
                    _k.sent();
                    if (!((consumable.consumableAmount - 1) == 0)) return [3 /*break*/, 16];
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'), (_j = {},
                            _j["consumables.consumable".concat(consumableID)] = deleteField(),
                            _j), { merge: true })];
                case 15:
                    _k.sent();
                    _k.label = 16;
                case 16: return [3 /*break*/, 17];
                case 17: return [2 /*return*/];
            }
        });
    });
}
function inventorySwordsModalTriggered(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var swordID, equipment, sword, swordStats, equipped, itemPerks_4, equippedEmbed;
        var _a, _b, _c, _d, _e, _f;
        var _this = this;
        var _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    if (interaction.user.id != interaction.customId.split('/')[1]) {
                        return [2 /*return*/, interaction.reply({ embeds: [ErrorEmbed(EventErrors.NotOwnerOfInteraction)], ephemeral: true })];
                    }
                    swordID = interaction.values[0].split('-')[3];
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'))];
                case 1:
                    equipment = _h.sent();
                    if (!equipment.exists()) return [3 /*break*/, 11];
                    sword = equipment.data().swords["sword".concat(swordID)];
                    swordStats = sword.stats;
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'))];
                case 2:
                    equipped = _h.sent();
                    if (!equipped.exists()) return [3 /*break*/, 5];
                    if (!((_g = equipped.data().sword) === null || _g === void 0 ? void 0 : _g.id)) return [3 /*break*/, 5];
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), (_a = {},
                            _a['stats.atk'] = increment(-Math.abs(swordStats.atk)),
                            _a), { merge: true })];
                case 3:
                    _h.sent();
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), (_b = {},
                            _b['stats.speed'] = increment(-Math.abs(swordStats.spd)),
                            _b), { merge: true })];
                case 4:
                    _h.sent();
                    _h.label = 5;
                case 5: return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'), (_c = {},
                        _c['sword'] = { id: swordID },
                        _c), { merge: true })];
                case 6:
                    _h.sent();
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), (_d = {},
                            _d['stats.atk'] = increment(swordStats.atk),
                            _d), { merge: true })];
                case 7:
                    _h.sent();
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), (_e = {},
                            _e['stats.speed'] = increment(swordStats.spd),
                            _e), { merge: true })];
                case 8:
                    _h.sent();
                    if (!(sword === null || sword === void 0 ? void 0 : sword.perks)) return [3 /*break*/, 10];
                    itemPerks_4 = [];
                    Object.values(sword.perks).forEach(function (perk) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            itemPerks_4.push({ perkRatio: perk.ratio, perk: perk.perk });
                            return [2 /*return*/];
                        });
                    }); });
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'), (_f = {},
                            _f['onAttack'] = itemPerks_4,
                            _f), { merge: true })];
                case 9:
                    _h.sent();
                    _h.label = 10;
                case 10:
                    equippedEmbed = new EmbedBuilder()
                        .setTitle('Se ha equipado la espada exitosamente!')
                        .setColor('Green')
                        .setDescription("Se ha equipado ".concat(sword.name, "\n\n+").concat(swordStats.atk, " - ATK\n+").concat(swordStats.spd, " - SPD"));
                    interaction.reply({ embeds: [equippedEmbed] });
                    _h.label = 11;
                case 11: return [2 /*return*/];
            }
        });
    });
}
function battleFlowSelectMenuTriggered(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var playerInfo, idSplit, enemy, enemyHp, enemyAtk, enemySpd, enemyArmor, enemyMagicDurability, enemyElite, enemyXp, enemyGold, turn, keywords, keywordsArray, enemyUnique, activeBattles, errorEmbed, enemyAttackedEmbed, messageEmbeds, battleStartEmbed, debuffs;
        var _a, _b;
        var _this = this;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (interaction.user.id != interaction.customId.split('/')[1]) {
                        return [2 /*return*/, interaction.reply({ embeds: [ErrorEmbed(EventErrors.NotOwnerOfInteraction)], ephemeral: true })];
                    }
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo'))];
                case 1:
                    playerInfo = _d.sent();
                    idSplit = interaction.values[0].split('-');
                    enemy = idSplit[3];
                    enemyHp = idSplit[4];
                    enemyAtk = idSplit[5];
                    enemySpd = idSplit[6];
                    enemyArmor = idSplit[7];
                    enemyMagicDurability = idSplit[8];
                    enemyElite = idSplit[9];
                    enemyXp = Number(idSplit[10]);
                    enemyGold = Number(idSplit[11]);
                    turn = idSplit[12];
                    keywords = idSplit[13].split('/').filter(function (element) { return element != ''; });
                    keywordsArray = [];
                    keywords.forEach(function (element) {
                        var keywordObj = {
                            type: element.split(':')[0] || 0,
                            subtype: element.split(':')[1] || 0,
                            ratio: element.split(':')[2] || 0,
                        };
                        if (keywordObj.type !== 0 && keywordObj.subtype !== 0) {
                            keywordsArray.push(keywordObj);
                        }
                    });
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'ActiveBattles'))];
                case 2:
                    activeBattles = _d.sent();
                    if (activeBattles.exists()) {
                        if ((((_c = activeBattles.data()) === null || _c === void 0 ? void 0 : _c.battles.amount) + 1) > 3) {
                            errorEmbed = ErrorEmbed(EventErrors.BattleLimitReached);
                            return [2 /*return*/, interaction.reply({ embeds: [errorEmbed] })];
                        }
                        enemyUnique = activeBattles.data().battles.amount;
                    }
                    enemyAttackedEmbed = new EmbedBuilder()
                        .setColor('Red')
                        .addFields({ name: "_                          _".concat(formatEmoji(Icons.EnemyAttack), "                         _ _\n\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2588     ").concat(bold('Tu enemigo ha atacado'), "    \u2588 \n\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584"), value: '_ _' });
                    messageEmbeds = [];
                    battleStartEmbed = new EmbedBuilder()
                        .setTitle('Batalla empezada con el enemigo seleccionado!')
                        .setDescription('Escribe "attack" de nuevo para atacar a este enemigo.')
                        .setColor('Green');
                    messageEmbeds.push(battleStartEmbed);
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'ActiveBattles'), (_a = {},
                            _a['battles.amount'] = increment(1),
                            _a), { merge: true })];
                case 3:
                    _d.sent();
                    debuffs = [];
                    if (playerInfo.data().class == 'archer') {
                        turn = 'player';
                        debuffs.push({ type: 'archerDebuff', turns: 1 });
                    }
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'ActiveBattles'), (_b = {},
                            _b["battles.battle".concat(enemyUnique)] = {
                                enemyId: enemy,
                                enemyHp: enemyHp,
                                enemyMaxHp: enemyHp,
                                enemyAtk: enemyAtk,
                                enemyArmor: enemyArmor,
                                enemySpd: enemySpd,
                                enemyMagicDurability: enemyMagicDurability,
                                enemyElite: enemyElite,
                                enemyXp: enemyXp,
                                enemyGold: enemyGold,
                                turn: turn,
                                enemyUnique: enemyUnique,
                                keywords: keywordsArray,
                                debuffs: debuffs,
                                turnsUntilAbility: 3,
                            },
                            _b), { merge: true }).then(function () { return __awaiter(_this, void 0, void 0, function () {
                            var channel, farmChannel, _a, _b, _c, farmChnnl, e_1_1;
                            var _this = this;
                            var _d, e_1, _e, _f;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0:
                                        if (!(turn == 'enemy')) return [3 /*break*/, 15];
                                        return [4 /*yield*/, getDoc(doc(db, interaction.guildId, 'FarmChannels'))];
                                    case 1:
                                        channel = _g.sent();
                                        farmChannel = void 0;
                                        _g.label = 2;
                                    case 2:
                                        _g.trys.push([2, 7, 8, 13]);
                                        _a = true, _b = __asyncValues(Object.values(channel.data()));
                                        _g.label = 3;
                                    case 3: return [4 /*yield*/, _b.next()];
                                    case 4:
                                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 6];
                                        _f = _c.value;
                                        _a = false;
                                        farmChnnl = _f;
                                        console.log('🚀 ~ file: interactionCreateSelectMenu.js:279 ~ forawait ~ farmChnnl', farmChnnl, interaction.channelId, farmChannel);
                                        if ((farmChnnl === null || farmChnnl === void 0 ? void 0 : farmChnnl.id) == (interaction === null || interaction === void 0 ? void 0 : interaction.channelId)) {
                                            farmChannel = farmChnnl;
                                        }
                                        _g.label = 5;
                                    case 5:
                                        _a = true;
                                        return [3 /*break*/, 3];
                                    case 6: return [3 /*break*/, 13];
                                    case 7:
                                        e_1_1 = _g.sent();
                                        e_1 = { error: e_1_1 };
                                        return [3 /*break*/, 13];
                                    case 8:
                                        _g.trys.push([8, , 11, 12]);
                                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 10];
                                        return [4 /*yield*/, _e.call(_b)];
                                    case 9:
                                        _g.sent();
                                        _g.label = 10;
                                    case 10: return [3 /*break*/, 12];
                                    case 11:
                                        if (e_1) throw e_1.error;
                                        return [7 /*endfinally*/];
                                    case 12: return [7 /*endfinally*/];
                                    case 13:
                                        console.log('🚀 ~ file: interactionCreateSelectMenu.js:284 ~ forawait ~ farmChannel', interaction.channelId, farmChannel);
                                        return [4 /*yield*/, attack(interaction.user, enemyUnique, interaction.client, farmChannel).then(function (results) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    if (results.enemyAttacked) {
                                                        enemyAttackedEmbed.addFields({ name: bold('<             Daño recibido               >'), value: "".concat(results.damageReceived) }, { name: bold('<              Vida restante               >'), value: "".concat(results.remainingHp) });
                                                        messageEmbeds.push(enemyAttackedEmbed);
                                                    }
                                                    return [2 /*return*/];
                                                });
                                            }); }).catch(function (results) { return __awaiter(_this, void 0, void 0, function () {
                                                var deadEmbed;
                                                var _a;
                                                var _this = this;
                                                return __generator(this, function (_b) {
                                                    switch (_b.label) {
                                                        case 0:
                                                            enemyAttackedEmbed.addFields({ name: bold('<             Daño recibido               >'), value: "".concat(results.damageReceived) }, { name: bold('<              Vida restante               >'), value: '0' });
                                                            deadEmbed = new EmbedBuilder()
                                                                .setTitle('Has muerto!')
                                                                .setColor('Red')
                                                                .setDescription("No puedes hacer nada hasta que revivas.\n".concat(bold('Reviviras en 8 mega-revers.')));
                                                            return [4 /*yield*/, interaction.user.send({ embeds: [deadEmbed] })];
                                                        case 1:
                                                            _b.sent();
                                                            return [4 /*yield*/, updateDoc(doc(db, 'Event/Timeouts'), (_a = {},
                                                                    _a['timestamps'] = arrayUnion({
                                                                        timeoutDate: Timestamp.fromMillis(new Date().setHours(new Date().getHours() + 4)),
                                                                        type: 'revive',
                                                                        target: interaction.user.id,
                                                                    }),
                                                                    _a), { merge: true })];
                                                        case 2:
                                                            _b.sent();
                                                            setTimeout(function (user, hpManager) { return __awaiter(_this, void 0, void 0, function () {
                                                                return __generator(this, function (_a) {
                                                                    switch (_a.label) {
                                                                        case 0: return [4 /*yield*/, hpManager('revive', user)];
                                                                        case 1:
                                                                            _a.sent();
                                                                            user.send({
                                                                                embeds: [
                                                                                    new EmbedBuilder()
                                                                                        .setTitle('Has revivido!')
                                                                                        .setDescription('Ya puedes usar acciones de nuevo')
                                                                                        .setColor('Green'),
                                                                                ],
                                                                            });
                                                                            return [2 /*return*/];
                                                                    }
                                                                });
                                                            }); }, (36e5 * 4), interaction.user, healthManager);
                                                            messageEmbeds.push(enemyAttackedEmbed);
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                    case 14:
                                        _g.sent();
                                        _g.label = 15;
                                    case 15: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 4:
                    _d.sent();
                    return [2 /*return*/, interaction.reply({ embeds: messageEmbeds })];
            }
        });
    });
}
function battleFlowActiveBattleTriggered(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var idSplit, enemyUnique, playerInfo, playerAtk, bonus, activeBuffs, replyEmbeds_1, enemyAttackedEmbed_1, chargeEmbed, channel, farmChannel_1, _a, _b, _c, farmChnnl, e_2_1, enemyAttackedEmbed_2, orbUsed, channel, farmChannel_2, _d, _e, _f, farmChnnl, e_3_1, playerEquipment, playerMana, abilityOrbs, abilityOrbsArray, messageEmbeds, guildFarmChannels, farmChannel, _g, _h, _j, farmChnnl, e_4_1;
        var _k, _l, _m, _o;
        var _this = this;
        var _p, e_2, _q, _r, _s, e_3, _t, _u, _v, e_4, _w, _x;
        var _y;
        return __generator(this, function (_z) {
            switch (_z.label) {
                case 0:
                    console.log(interaction.customId.split('-'), 'debug202');
                    if (interaction.user.id != interaction.customId.split('/')[1]) {
                        return [2 /*return*/, interaction.reply({ embeds: [ErrorEmbed(EventErrors.NotOwnerOfInteraction)], ephemeral: true })];
                    }
                    return [4 /*yield*/, interaction.deferReply()];
                case 1:
                    _z.sent();
                    idSplit = interaction.values[0].split('-');
                    console.log(idSplit, 'interaction debug select flow');
                    enemyUnique = idSplit[4];
                    console.log(enemyUnique, 'debugunique');
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo'))];
                case 2:
                    playerInfo = _z.sent();
                    if (playerInfo.data().attackOnCooldown) {
                        return [2 /*return*/, interaction.editReply({ embeds: [ErrorEmbed(EventErrors.AttackOnCooldown, "Puedes atacar ".concat(time(new Timestamp(playerInfo.data().attackCooldown.seconds, playerInfo.data().attackCooldown.nanoseconds).toDate(), TimestampStyles.RelativeTime)))], ephemeral: true })];
                    }
                    console.log(idSplit[1], 'love');
                    if (!(idSplit[1] == 'chargeAttack')) return [3 /*break*/, 22];
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'ActiveBattles'), (_k = {},
                            _k["battles.battle".concat(idSplit[4], ".turn")] = 'enemy',
                            _k), { merge: true })];
                case 3:
                    _z.sent();
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo'))];
                case 4: return [4 /*yield*/, (_z.sent()).data().stats.atk];
                case 5:
                    playerAtk = _z.sent();
                    bonus = playerAtk / 100 * 200;
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), (_l = {},
                            _l['stats.atk'] = bonus,
                            _l), { merge: true })];
                case 6:
                    _z.sent();
                    activeBuffs = {
                        buff: "increasedAtk:".concat(playerAtk),
                        attacks: 1,
                    };
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo'), (_m = {},
                            _m['activeBuffs'] = arrayUnion(activeBuffs),
                            _m), { merge: true })];
                case 7:
                    _z.sent();
                    replyEmbeds_1 = [];
                    enemyAttackedEmbed_1 = new EmbedBuilder()
                        .setColor('Red')
                        .addFields({ name: "_                          _".concat(formatEmoji(Icons.EnemyAttack), "                         _ _\n\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2588     ").concat(bold('Tu enemigo ha atacado'), "    \u2588 \n\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584"), value: '_ _' });
                    chargeEmbed = new EmbedBuilder()
                        .setTitle('Has cargado un ataque poderoso contra el enemigo')
                        .setDescription('Atacalo de nuevo!')
                        .setColor('Red');
                    replyEmbeds_1.push(chargeEmbed);
                    return [4 /*yield*/, getDoc(doc(db, interaction.guildId, 'FarmChannels'))];
                case 8:
                    channel = _z.sent();
                    _z.label = 9;
                case 9:
                    _z.trys.push([9, 14, 15, 20]);
                    _a = true, _b = __asyncValues(Object.values(channel.data()));
                    _z.label = 10;
                case 10: return [4 /*yield*/, _b.next()];
                case 11:
                    if (!(_c = _z.sent(), _p = _c.done, !_p)) return [3 /*break*/, 13];
                    _r = _c.value;
                    _a = false;
                    farmChnnl = _r;
                    if (farmChnnl.id == interaction.channelId) {
                        farmChannel_1 = farmChnnl;
                    }
                    _z.label = 12;
                case 12:
                    _a = true;
                    return [3 /*break*/, 10];
                case 13: return [3 /*break*/, 20];
                case 14:
                    e_2_1 = _z.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 20];
                case 15:
                    _z.trys.push([15, , 18, 19]);
                    if (!(!_a && !_p && (_q = _b.return))) return [3 /*break*/, 17];
                    return [4 /*yield*/, _q.call(_b)];
                case 16:
                    _z.sent();
                    _z.label = 17;
                case 17: return [3 /*break*/, 19];
                case 18:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 19: return [7 /*endfinally*/];
                case 20: return [4 /*yield*/, attack(interaction.user, idSplit[4], interaction.client, farmChannel_1).then(function (results) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (results.enemyAttacked) {
                                enemyAttackedEmbed_1.addFields({ name: bold('<             Daño recibido               >'), value: "".concat(results.damageReceived) }, { name: bold('<              Vida restante               >'), value: "".concat(results.remainingHp) });
                                replyEmbeds_1.push(enemyAttackedEmbed_1);
                            }
                            return [2 /*return*/];
                        });
                    }); }).catch(function (results) { return __awaiter(_this, void 0, void 0, function () {
                        var deadEmbed;
                        var _a;
                        var _this = this;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    enemyAttackedEmbed_1.addFields({ name: bold('<             Daño recibido               >'), value: "".concat(results.damageReceived) }, { name: bold('<              Vida restante               >'), value: '0' });
                                    deadEmbed = new EmbedBuilder()
                                        .setTitle('Has muerto!')
                                        .setColor('Red')
                                        .setDescription("No puedes hacer nada hasta que revivas.\n".concat(bold('Reviviras en 8 mega-revers.')));
                                    return [4 /*yield*/, interaction.user.send({ embeds: [deadEmbed] })];
                                case 1:
                                    _b.sent();
                                    return [4 /*yield*/, updateDoc(doc(db, 'Event/Timeouts'), (_a = {},
                                            _a['timestamps'] = arrayUnion({
                                                timeoutDate: Timestamp.fromMillis(new Date().setHours(new Date().getHours() + 4)),
                                                type: 'revive',
                                                target: interaction.user.id,
                                            }),
                                            _a), { merge: true })];
                                case 2:
                                    _b.sent();
                                    setTimeout(function (user, hpManager) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, hpManager('revive', user)];
                                                case 1:
                                                    _a.sent();
                                                    user.send({
                                                        embeds: [
                                                            new EmbedBuilder()
                                                                .setTitle('Has revivido!')
                                                                .setDescription('Ya puedes usar acciones de nuevo')
                                                                .setColor('Green'),
                                                        ],
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }, (36e5 * 4), interaction.user, healthManager);
                                    replyEmbeds_1.push(enemyAttackedEmbed_1);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 21:
                    _z.sent();
                    interaction.editReply({ embeds: replyEmbeds_1 });
                    return [2 /*return*/];
                case 22:
                    if (!(idSplit[1] === 'ability')) return [3 /*break*/, 43];
                    if (!(((_y = idSplit[6]) === null || _y === void 0 ? void 0 : _y.trim()) != '')) return [3 /*break*/, 39];
                    enemyAttackedEmbed_2 = new EmbedBuilder()
                        .setColor('Red')
                        .addFields({ name: "_                          _".concat(formatEmoji(Icons.EnemyAttack), "                         _ _\n\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2588     ").concat(bold('Tu enemigo ha atacado'), "    \u2588 \n\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584"), value: '_ _' });
                    orbUsed = new EmbedBuilder()
                        .setTitle('Orbe usada')
                        .setDescription('Has usado el orbe seleccionada');
                    interaction.editReply({ embeds: [orbUsed] });
                    return [4 /*yield*/, ability(idSplit[6], idSplit[4], interaction.user)];
                case 23:
                    _z.sent();
                    return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'ActiveBattles'), (_o = {},
                            _o["battles.battle".concat(idSplit[4], ".turn")] = 'enemy',
                            _o), { merge: true })];
                case 24:
                    _z.sent();
                    return [4 /*yield*/, getDoc(doc(db, interaction.guildId, 'FarmChannels'))];
                case 25:
                    channel = _z.sent();
                    _z.label = 26;
                case 26:
                    _z.trys.push([26, 31, 32, 37]);
                    _d = true, _e = __asyncValues(Object.values(channel.data()));
                    _z.label = 27;
                case 27: return [4 /*yield*/, _e.next()];
                case 28:
                    if (!(_f = _z.sent(), _s = _f.done, !_s)) return [3 /*break*/, 30];
                    _u = _f.value;
                    _d = false;
                    farmChnnl = _u;
                    if (farmChnnl.id == interaction.channelId) {
                        farmChannel_2 = farmChnnl;
                    }
                    _z.label = 29;
                case 29:
                    _d = true;
                    return [3 /*break*/, 27];
                case 30: return [3 /*break*/, 37];
                case 31:
                    e_3_1 = _z.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 37];
                case 32:
                    _z.trys.push([32, , 35, 36]);
                    if (!(!_d && !_s && (_t = _e.return))) return [3 /*break*/, 34];
                    return [4 /*yield*/, _t.call(_e)];
                case 33:
                    _z.sent();
                    _z.label = 34;
                case 34: return [3 /*break*/, 36];
                case 35:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 36: return [7 /*endfinally*/];
                case 37: return [4 /*yield*/, attack(interaction.user, idSplit[4], interaction.client, farmChannel_2).then(function (results) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (results.enemyAttacked) {
                                enemyAttackedEmbed_2.addFields({ name: bold('<             Daño recibido               >'), value: "".concat(results.damageReceived) }, { name: bold('<              Vida restante               >'), value: "".concat(results.remainingHp) });
                                messageEmbeds.push(enemyAttackedEmbed_2);
                            }
                            return [2 /*return*/];
                        });
                    }); }).catch(function (results) { return __awaiter(_this, void 0, void 0, function () {
                        var deadEmbed;
                        var _a;
                        var _this = this;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    enemyAttackedEmbed_2.addFields({ name: bold('<             Daño recibido               >'), value: "".concat(results.damageReceived) }, { name: bold('<              Vida restante               >'), value: '0' });
                                    deadEmbed = new EmbedBuilder()
                                        .setTitle('Has muerto!')
                                        .setColor('Red')
                                        .setDescription("No puedes hacer nada hasta que revivas.\n".concat(bold('Reviviras en 8 mega-revers.')));
                                    return [4 /*yield*/, interaction.user.send({ embeds: [deadEmbed] })];
                                case 1:
                                    _b.sent();
                                    return [4 /*yield*/, updateDoc(doc(db, 'Event/Timeouts'), (_a = {},
                                            _a['timestamps'] = arrayUnion({
                                                timeoutDate: Timestamp.fromMillis(new Date().setHours(new Date().getHours() + 4)),
                                                type: 'revive',
                                                target: interaction.user.id,
                                            }),
                                            _a), { merge: true })];
                                case 2:
                                    _b.sent();
                                    setTimeout(function (user, hpManager) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, hpManager('revive', user)];
                                                case 1:
                                                    _a.sent();
                                                    user.send({
                                                        embeds: [
                                                            new EmbedBuilder()
                                                                .setTitle('Has revivido!')
                                                                .setDescription('Ya puedes usar acciones de nuevo')
                                                                .setColor('Green'),
                                                        ],
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }, (36e5 * 4), interaction.user, healthManager);
                                    messageEmbeds.push(enemyAttackedEmbed_2);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 38:
                    _z.sent();
                    return [2 /*return*/];
                case 39: return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'))];
                case 40:
                    playerEquipment = _z.sent();
                    if (!playerEquipment.exists()) return [3 /*break*/, 42];
                    if (!playerInfo.exists()) return [3 /*break*/, 42];
                    playerMana = playerInfo.data().stats.mana;
                    abilityOrbs = playerEquipment.data().abilityOrbs;
                    abilityOrbsArray = Object.values(abilityOrbs).filter(function (element) { return (typeof element != 'number'); });
                    return [4 /*yield*/, pagination('abilityOrbs', abilityOrbsArray, 1, interaction.user, { currentMana: playerMana, enemyUnique: enemyUnique }).then(function (results) {
                            return interaction.editReply({ embeds: [results.embed], components: [results.paginationRow, results.selectMenuRow] });
                        })];
                case 41:
                    _z.sent();
                    _z.label = 42;
                case 42: return [2 /*return*/];
                case 43:
                    messageEmbeds = [];
                    return [4 /*yield*/, getDoc(doc(db, interaction.guildId, 'FarmChannels'))];
                case 44:
                    guildFarmChannels = _z.sent();
                    _z.label = 45;
                case 45:
                    _z.trys.push([45, 50, 51, 56]);
                    _g = true, _h = __asyncValues(Object.values(guildFarmChannels.data()));
                    _z.label = 46;
                case 46: return [4 /*yield*/, _h.next()];
                case 47:
                    if (!(_j = _z.sent(), _v = _j.done, !_v)) return [3 /*break*/, 49];
                    _x = _j.value;
                    _g = false;
                    farmChnnl = _x;
                    if (farmChnnl.id == interaction.channelId) {
                        farmChannel = farmChnnl;
                    }
                    _z.label = 48;
                case 48:
                    _g = true;
                    return [3 /*break*/, 46];
                case 49: return [3 /*break*/, 56];
                case 50:
                    e_4_1 = _z.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 56];
                case 51:
                    _z.trys.push([51, , 54, 55]);
                    if (!(!_g && !_v && (_w = _h.return))) return [3 /*break*/, 53];
                    return [4 /*yield*/, _w.call(_h)];
                case 52:
                    _z.sent();
                    _z.label = 53;
                case 53: return [3 /*break*/, 55];
                case 54:
                    if (e_4) throw e_4.error;
                    return [7 /*endfinally*/];
                case 55: return [7 /*endfinally*/];
                case 56: return [4 /*yield*/, attack(interaction.user, enemyUnique, interaction.client, farmChannel).then(function (results) { return __awaiter(_this, void 0, void 0, function () {
                        var killedEmbed, splitEmbed, damageDone, damageEmbed, enemyAttackedEmbed;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log(results, 'debugresults');
                                    if (!(results === null || results === void 0 ? void 0 : results.enemyKilled)) return [3 /*break*/, 4];
                                    killedEmbed = new EmbedBuilder()
                                        .setTitle('Has matado al enemigo!')
                                        .setColor('Random')
                                        .addFields({ name: bold('Daño hecho'), value: "".concat(results.damageDone) }, { name: bold("Recompensas | ".concat(underscore('XP'), ":")), value: underscore(results.xp) }, { name: bold("Recompensas | ".concat(underscore('Oro'), ":")), value: underscore(results.gold) });
                                    if (!(results === null || results === void 0 ? void 0 : results.enemySplitted)) return [3 /*break*/, 2];
                                    splitEmbed = new EmbedBuilder()
                                        .setTitle('El enemigo se ha dividido en 2!')
                                        .setDescription('Tienes dos nuevas batallas activas.')
                                        .setColor('Red');
                                    return [4 /*yield*/, interaction.editReply({ embeds: [killedEmbed, splitEmbed] })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                                case 2: return [4 /*yield*/, interaction.editReply({ embeds: [killedEmbed] })];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/];
                                case 4:
                                    damageDone = "".concat(results.damageDone);
                                    damageEmbed = new EmbedBuilder()
                                        // .setTitle(`Has atacado al enemigo! ${formatEmoji(Icons.PlayerAttack)}`)
                                        .setColor('Blue')
                                        .addFields({ name: bold('<                Daño hecho                 >'), value: damageDone }, { name: bold('<   Vida restante del enemigo  >'), value: "".concat(results.enemyHpRemaining, "\n\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584") }, { name: "\u2588   ".concat(bold('Has atacado al enemigo'), "    \u2588\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n _                        _ ").concat(formatEmoji(Icons.PlayerAttack), "                         _ _ \n"), value: '_ _' });
                                    messageEmbeds.push(damageEmbed);
                                    enemyAttackedEmbed = new EmbedBuilder()
                                        .setColor('Red')
                                        .addFields({ name: "_                          _".concat(formatEmoji(Icons.EnemyAttack), "                         _ _\n\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2588     ").concat(bold('Tu enemigo ha atacado'), "    \u2588 \n\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584"), value: '_ _' });
                                    return [4 /*yield*/, attack(interaction.user, enemyUnique, interaction.client, farmChannel).then(function (resultsEnemy) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                if (resultsEnemy.enemyAttacked) {
                                                    enemyAttackedEmbed.addFields({ name: bold('<             Daño recibido               >'), value: "".concat(resultsEnemy.damageReceived) }, { name: bold('<              Vida restante               >'), value: "".concat(resultsEnemy.remainingHp) });
                                                    messageEmbeds.push(enemyAttackedEmbed);
                                                }
                                                else {
                                                    enemyAttackedEmbed
                                                        .setColor('#D4D4D4')
                                                        .setFields({ name: "_                          _".concat(formatEmoji(Icons.CantAttack), "                         _ _\n\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\u2588     ").concat(bold('Tu enemigo no te ataco'), "    \u2588 \n\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584"), value: '_ _' }, { name: bold('<             Daño recibido               >'), value: '0' }, { name: bold('<              Vida restante               >'), value: "".concat(playerInfo.data().stats.hp) });
                                                    messageEmbeds.push(enemyAttackedEmbed);
                                                }
                                                return [2 /*return*/];
                                            });
                                        }); }).catch(function (resultsDead) { return __awaiter(_this, void 0, void 0, function () {
                                            var deadEmbed;
                                            var _a;
                                            var _this = this;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        enemyAttackedEmbed.addFields({ name: bold('<             Daño recibido               >'), value: "".concat(resultsDead.damageReceived) }, { name: bold('<              Vida restante               >'), value: "".concat(resultsDead.remainingHp) });
                                                        deadEmbed = new EmbedBuilder()
                                                            .setTitle('Has muerto!')
                                                            .setColor('Red')
                                                            .setDescription("No puedes hacer nada hasta que revivas.\n".concat(bold('Reviviras en 8 mega-revers.')));
                                                        return [4 /*yield*/, interaction.user.send({ embeds: [deadEmbed] })];
                                                    case 1:
                                                        _b.sent();
                                                        return [4 /*yield*/, updateDoc(doc(db, 'Event/Timeouts'), (_a = {},
                                                                _a['timestamps'] = arrayUnion({
                                                                    timeoutDate: Timestamp.fromMillis(new Date().setHours(new Date().getHours() + 4)),
                                                                    type: 'revive',
                                                                    target: interaction.user.id,
                                                                }),
                                                                _a), { merge: true })];
                                                    case 2:
                                                        _b.sent();
                                                        setTimeout(function (user, hpManager) { return __awaiter(_this, void 0, void 0, function () {
                                                            return __generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0: return [4 /*yield*/, hpManager('revive', user)];
                                                                    case 1:
                                                                        _a.sent();
                                                                        user.send({
                                                                            embeds: [
                                                                                new EmbedBuilder()
                                                                                    .setTitle('Has revivido!')
                                                                                    .setDescription('Ya puedes usar acciones de nuevo')
                                                                                    .setColor('Green'),
                                                                            ],
                                                                        });
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        }); }, (36e5 * 4), interaction.user, healthManager);
                                                        messageEmbeds.push(enemyAttackedEmbed);
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); })];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, interaction.editReply({ embeds: messageEmbeds })];
                                case 6: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); }).catch(function (results) { return __awaiter(_this, void 0, void 0, function () {
                        var deadEmbed;
                        var _a;
                        var _this = this;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    deadEmbed = new EmbedBuilder()
                                        .setTitle('Has muerto!')
                                        .setColor('Red')
                                        .setDescription("No puedes hacer nada hasta que revivas.\n".concat(bold('Reviviras en 8 mega-revers.')));
                                    return [4 /*yield*/, interaction.user.send({ embeds: [deadEmbed] })];
                                case 1:
                                    _b.sent();
                                    return [4 /*yield*/, updateDoc(doc(db, 'Event/Timeouts'), (_a = {},
                                            _a['timestamps'] = arrayUnion({
                                                timeoutDate: Timestamp.fromMillis(new Date().setHours(new Date().getHours() + 4)),
                                                type: 'revive',
                                                target: interaction.user.id,
                                            }),
                                            _a), { merge: true })];
                                case 2:
                                    _b.sent();
                                    setTimeout(function (user, hpManager) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, hpManager('revive', user)];
                                                case 1:
                                                    _a.sent();
                                                    user.send({
                                                        embeds: [
                                                            new EmbedBuilder()
                                                                .setTitle('Has revivido!')
                                                                .setDescription('Ya puedes usar acciones de nuevo')
                                                                .setColor('Green'),
                                                        ],
                                                    });
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); }, (36e5 * 4), interaction.user, healthManager);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 57:
                    _z.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function classSelectTriggered(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (interaction.user.id != interaction.customId.split('/')[1]) {
                        return [2 /*return*/, interaction.reply({ embeds: [ErrorEmbed(EventErrors.NotOwnerOfInteraction)], ephemeral: true })];
                    }
                    return [4 /*yield*/, interaction.deferUpdate()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, classSelect(interaction)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    name: 'interactionCreate',
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var interactionHandlers, interactionType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // This handler only proccesses select menu interactions.
                        if (!interaction.isAnySelectMenu())
                            return [2 /*return*/];
                        // Shop gets handled by another file.
                        if (interaction.customId.includes('shopModal-selectMenu'))
                            return [2 /*return*/];
                        if (interaction.user.id != interaction.customId.split('/')[1]) {
                            return [2 /*return*/, interaction.reply({ embeds: [ErrorEmbed(EventErrors.NotOwnerOfInteraction)], ephemeral: true })];
                        }
                        interactionHandlers = {
                            // Use an ability
                            'abilityModal-selectMenu/': abilityModalTriggered,
                            // Target an ally
                            'allyTarget-selectMenu/': allyTargetTriggered,
                            // Equip a bow
                            'inventoryBowsModal-selectMenu/': inventoryBowsModalTriggered,
                            // Equip an armor plate
                            'inventoryArmorPlatesModal-selectMenu/': inventoryArmorPlatesModalTriggered,
                            // Equip a wand
                            'inventoryWandsModal-selectMenu/': inventoryWandsModalTriggered,
                            // Equip a sword
                            'inventorySwordsModal-selectMenu/': inventorySwordsModalTriggered,
                            // Equip ability orbs
                            'inventoryAbilityOrbsModal': inventoryAbilityOrbsModalTriggered,
                            // Use consumable
                            'consumable-selectMenu/': consumableSelectMenuTriggered,
                            // Start a battle
                            'battleFlow-selectMenu/': battleFlowSelectMenuTriggered,
                            // Attack on active battle
                            'battleFlow-selectMenu-activeBattle/': battleFlowActiveBattleTriggered,
                            // Select class
                            'class-select/': classSelectTriggered,
                        };
                        interactionType = interaction.customId.split('/')[0];
                        interactionHandlers[interactionType](interaction);
                        /*  The following if code snippet
                        Checks if the creator of the components,
                        Is the same as the one who triggered the interaction
                            if (interaction.user.id != interaction.customId.split('/')[1]) {
                                return interaction.reply({ embeds: [ErrorEmbed(EventErrors.NotOwnerOfInteraction)], ephemeral: true });
                            }
                        */
                        return [4 /*yield*/, interaction.deferUpdate()];
                    case 1:
                        /*  The following if code snippet
                        Checks if the creator of the components,
                        Is the same as the one who triggered the interaction
                            if (interaction.user.id != interaction.customId.split('/')[1]) {
                                return interaction.reply({ embeds: [ErrorEmbed(EventErrors.NotOwnerOfInteraction)], ephemeral: true });
                            }
                        */
                        _a.sent();
                        contextMenuExecute(interaction, interaction.values[0]);
                        console.log("".concat(interaction.user.tag, " in #").concat(interaction.channel.name, " triggered an interaction."));
                        return [2 /*return*/];
                }
            });
        });
    },
};
function classSelect(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var selectedClass, embed, warriorStats, archerStats, enchanterStats, desc, empoweredAttacks, _a, index, mission;
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
        return __generator(this, function (_7) {
            switch (_7.label) {
                case 0:
                    selectedClass = interaction.values[0];
                    embed = new EmbedBuilder()
                        .setTitle('El Destino te ha dado tu camino')
                        .setAuthor({ name: 'Piedra del Destino' })
                        .setDescription("Te ha sido dado ".concat(selectedClass, "!"))
                        .setColor('#ffffff');
                    interaction.editReply({ embeds: [embed], components: [] });
                    return [4 /*yield*/, dialogHandler('postRegisterTutorial', 1, interaction, '', 'register', { replied: true })];
                case 1:
                    _7.sent();
                    warriorStats = {
                        atk: 50,
                        hp: 200,
                        maxHp: 200,
                        armor: 25,
                        magicDurability: 20,
                        mana: 5,
                        manaPerAttack: 20,
                        speed: 15,
                        xp: 0,
                    };
                    archerStats = {
                        atk: 40,
                        hp: 190,
                        maxHp: 190,
                        armor: 20,
                        mana: 5,
                        manaPerAttack: 20,
                        speed: 50,
                        magicDurability: 15,
                        xp: 0,
                    };
                    enchanterStats = {
                        atk: 20,
                        hp: 180,
                        maxHp: 180,
                        armor: 20,
                        magicDurability: 20,
                        mana: 20,
                        speed: 20,
                        magicStrength: 30,
                        manaPerAttack: 30,
                        xp: 0,
                    };
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/EventDialogProgression")), (_b = {},
                            _b['Nora'] = { activeDialog: 'default' },
                            _b['Lyra'] = { activeDialog: 'postRegisterTutorial' },
                            _b['Arissa'] = { activeDialog: 'postRegisterTutorial' },
                            _b['Abe'] = { activeDialog: 'postRegisterTutorial' },
                            _b), { merge: true })];
                case 2:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo")), (_c = {},
                            _c['xpBonus'] = 0,
                            _c['playerLvl'] = 1,
                            _c['nextLvlXpGoal'] = 400,
                            _c['dead'] = false,
                            _c['activeBuffs'] = [],
                            _c['eventPoints'] = 0,
                            _c['attackOnCooldown'] = false,
                            _c['attackCooldown'] = 0,
                            _c), { merge: true })];
                case 3:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/ActiveBattles")), (_d = {}, _d['battles'] = { amount: 0 }, _d), { merge: true })];
                case 4:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, 'Event/Players'), (_e = {}, _e['members'] = arrayUnion({ id: interaction.user.id }), _e), { merge: true })];
                case 5:
                    _7.sent();
                    desc = 'Esta orbe te da **__+{ratio}% ATK__** (**25%** - **75%** ✳️) por tus siguientes **__{attacks}__** (**3** - **5** ✳️) ataques.';
                    empoweredAttacks = {
                        ratio: '25/25-75',
                        ability: Abilities.EmpoweredAttacks,
                        attacks: '3/3-5',
                        requiredMana: '150',
                        staticMana: '150',
                        innate: true,
                        desc: desc,
                        name: 'Arcanic Power',
                        id: 1,
                        minLvl: 1,
                    };
                    _a = selectedClass.toLowerCase();
                    switch (_a) {
                        case 'warrior': return [3 /*break*/, 6];
                        case 'archer': return [3 /*break*/, 15];
                        case 'enchanter': return [3 /*break*/, 24];
                    }
                    return [3 /*break*/, 34];
                case 6: return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo/Inventory/Equipment")), (_f = {}, _f['swords'] = { amount: 0 }, _f))];
                case 7:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo")), (_g = {}, _g['gold'] = (10), _g), { merge: true })];
                case 8:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo/Inventory/Equipped")), (_h = {}, _h['sword'] = {}, _h), { merge: true })];
                case 9:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo/Inventory/Equipped")), (_j = {}, _j['abilityOrbs'] = {}, _j), { merge: true })];
                case 10:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo/Inventory/Equipment")), (_k = {}, _k['armorPlates'] = { amount: 0 }, _k), { merge: true })];
                case 11:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo")), (_l = {}, _l['class'] = (selectedClass.toLowerCase()), _l), { merge: true })];
                case 12:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo")), (_m = {}, _m['stats'] = (warriorStats), _m), { merge: true })];
                case 13:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo")), (_o = {},
                            _o['instructor'] = {
                                level: {
                                    currentStars: 0,
                                    starsForNextTitle: 30,
                                    titleLevel: 1,
                                    titleName: 'Beginner',
                                },
                                name: 'Lyra',
                            },
                            _o), { merge: true })];
                case 14:
                    _7.sent();
                    return [3 /*break*/, 35];
                case 15: return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo/Inventory/Equipment")), (_p = {}, _p['bows'] = { amount: 0 }, _p))];
                case 16:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo")), (_q = {}, _q['gold'] = (10), _q), { merge: true })];
                case 17:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo/Inventory/Equipped")), (_r = {}, _r['bow'] = {}, _r), { merge: true })];
                case 18:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo/Inventory/Equipped")), (_s = {}, _s['abilityOrbs'] = {}, _s), { merge: true })];
                case 19:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo/Inventory/Equipment")), (_t = {}, _t['armorPlates'] = { amount: 0 }, _t), { merge: true })];
                case 20:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo")), (_u = {}, _u['class'] = (selectedClass.toLowerCase()), _u), { merge: true })];
                case 21:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo")), (_v = {}, _v['stats'] = (archerStats), _v), { merge: true })];
                case 22:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo")), (_w = {},
                            _w['instructor'] = {
                                level: {
                                    currentStars: 0,
                                    starsForNextTitle: 30,
                                    titleLevel: 1,
                                    titleName: 'Beginner',
                                },
                                name: 'Arissa',
                            },
                            _w), { merge: true })];
                case 23:
                    _7.sent();
                    return [3 /*break*/, 35];
                case 24: return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo/Inventory/Equipment")), (_x = {}, _x['wands'] = { amount: 0 }, _x))];
                case 25:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo")), (_y = {}, _y['gold'] = (15), _y), { merge: true })];
                case 26:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo/Inventory/Equipped")), (_z = {}, _z['wand'] = {}, _z), { merge: true })];
                case 27:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo/Inventory/Equipped")), (_0 = {}, _0['abilityOrbs'] = {}, _0), { merge: true })];
                case 28:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo/Inventory/Equipment")), (_1 = {}, _1['abilityOrbs'] = { amount: 1, abilityOrb1: empoweredAttacks }, _1), { merge: true })];
                case 29:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo/Inventory/Equipment")), (_2 = {}, _2['armorPlates'] = { amount: 0 }, _2), { merge: true })];
                case 30:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo")), (_3 = {}, _3['class'] = (selectedClass.toLowerCase()), _3), { merge: true })];
                case 31:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo")), (_4 = {}, _4['stats'] = (enchanterStats), _4), { merge: true })];
                case 32:
                    _7.sent();
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/PlayerInfo")), (_5 = {},
                            _5['instructor'] = {
                                level: {
                                    currentStars: 0,
                                    starsForNextTitle: 30,
                                    titleLevel: 1,
                                    titleName: 'Beginner',
                                },
                                name: 'Abe',
                            },
                            _5), { merge: true })];
                case 33:
                    _7.sent();
                    return [3 /*break*/, 35];
                case 34: return [3 /*break*/, 35];
                case 35:
                    index = 1;
                    _7.label = 36;
                case 36:
                    if (!(index < 9)) return [3 /*break*/, 41];
                    mission = 0;
                    _7.label = 37;
                case 37:
                    if (!(mission < 6)) return [3 /*break*/, 40];
                    return [4 /*yield*/, setDoc(doc(db, "".concat(interaction.user.id, "/EventQuestProgression/Weekly/Week").concat(index)), (_6 = {}, _6["mission".concat(mission)] = (0), _6), { merge: true })];
                case 38:
                    _7.sent();
                    _7.label = 39;
                case 39:
                    mission++;
                    return [3 /*break*/, 37];
                case 40:
                    index++;
                    return [3 /*break*/, 36];
                case 41: return [2 /*return*/];
            }
        });
    });
}

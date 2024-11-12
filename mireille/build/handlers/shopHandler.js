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
var _a = require('firebase/firestore'), getFirestore = _a.getFirestore, getDocs = _a.getDocs, collection = _a.collection, getDoc = _a.getDoc, doc = _a.doc;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var _b = require('discord.js'), EmbedBuilder = _b.EmbedBuilder, ActionRowBuilder = _b.ActionRowBuilder, ButtonBuilder = _b.ButtonBuilder, ButtonStyle = _b.ButtonStyle, SelectMenuBuilder = _b.SelectMenuBuilder, formatEmoji = _b.formatEmoji, bold = _b.bold;
var Icons = require('../emums/icons.js').Icons;
var Utils = require('../utils.js').Utils;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
module.exports = {
    execute: function (action, interaction, page, previousEmbeds, category) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, shop(action, interaction, page, previousEmbeds, category)];
            });
        });
    },
};
function shop(action, interaction, page, previousEmbeds, category) {
    return __awaiter(this, void 0, void 0, function () {
        var shopInventory, playerInfo, playerClass, playerGold, playerLvl, shopEmbed, paginationRow, maxPages, maxItemsInPage, itemsProcessed, currentItem, buyRow, selectMenu, items, classSignatureWeapon, categories, categoriesButton, changeItemsRow, embeds;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = Number(page);
                    return [4 /*yield*/, getDocs(collection(db, '/Event/Shop/ShopInventory'))];
                case 1:
                    shopInventory = _a.sent();
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo'))];
                case 2:
                    playerInfo = _a.sent();
                    playerClass = 'lu';
                    playerGold = 'is';
                    playerLvl = 'in';
                    if (playerInfo.exists()) {
                        playerClass = playerInfo.data().class;
                        playerGold = playerInfo.data().gold;
                        playerLvl = playerInfo.data().playerLvl;
                    }
                    shopEmbed = new EmbedBuilder();
                    paginationRow = new ActionRowBuilder();
                    maxItemsInPage = 3;
                    itemsProcessed = 1;
                    currentItem = 0;
                    buyRow = new ActionRowBuilder();
                    selectMenu = new SelectMenuBuilder();
                    selectMenu.setCustomId("shopModal-selectMenu-".concat(interaction.user.id)).setPlaceholder('Buy item...');
                    switch (playerClass) {
                        case 'warrior':
                            classSignatureWeapon = 'swords';
                            items = 'swords';
                            break;
                        case 'enchanter':
                            classSignatureWeapon = 'wands';
                            items = 'wands';
                            break;
                        case 'archer':
                            classSignatureWeapon = 'bows';
                            items = 'bows';
                            break;
                        default:
                            break;
                    }
                    if (category)
                        items = category;
                    if (!category)
                        category = items;
                    shopInventory.forEach(function (document) { return __awaiter(_this, void 0, void 0, function () {
                        var itemsArray, i, itemStr, __key, item, perksStr, index, perk, perksStr, index, perk, perksStr, index, perk, itemEmoji, perkDesc;
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                        return __generator(this, function (_m) {
                            // Max items minus one
                            console.log('🚀 ~ file: shopHandler.js:63 ~ shopInventory.forEach ~ document.data()', document.data()[items], items);
                            itemsArray = Object.entries(document.data()[items]);
                            maxPages = Object.entries(document.data()[items]).length;
                            console.log('page', page);
                            if (page != 1) {
                                for (i = 1; i < page; i++) {
                                    console.log('Adding +3');
                                    currentItem += 3;
                                }
                            }
                            else {
                                maxItemsInPage = 3;
                                currentItem = 0;
                            }
                            itemsArray.sort(function (a, b) {
                                if (category == 'consumables') {
                                    return (Number(a[1].price) - Number(b[1].price));
                                }
                                return (Number(a[1].minLvl) - Number(b[1].minLvl));
                            });
                            for (__key in document.data()[items]) {
                                item = itemsArray[currentItem][1] || null;
                                if (!item)
                                    return [2 /*return*/];
                                switch (playerClass) {
                                    case 'archer': {
                                        shopEmbed.setTitle('Archer Items').setColor('#37BC6C');
                                        perksStr = "\n\n***".concat(((_a = item === null || item === void 0 ? void 0 : item.perks) === null || _a === void 0 ? void 0 : _a.perkName) || 'Ninguno', "***\n").concat(((_b = item === null || item === void 0 ? void 0 : item.perks) === null || _b === void 0 ? void 0 : _b.perkDesc) || 'Este objeto no tiene ningun perk', "\n\n");
                                        for (index = 0; index < Object.values((item === null || item === void 0 ? void 0 : item.perks) || []).length; index++) {
                                            perk = item === null || item === void 0 ? void 0 : item.perks["perk".concat(index + 1)];
                                            if (index == 0) {
                                                perksStr = "\n\n**".concat(perk === null || perk === void 0 ? void 0 : perk.perkName, "**\n").concat(perk === null || perk === void 0 ? void 0 : perk.perkDesc, "\n\n");
                                            }
                                            else {
                                                perksStr += "\n\n**".concat(perk === null || perk === void 0 ? void 0 : perk.perkName);
                                            }
                                        }
                                        if (category == 'abilityOrbs') {
                                            shopEmbed.setTitle('Ability Orbs \\ Warrior').setColor('Aqua');
                                            itemStr = "".concat(Utils.FormatDescription(item.desc, item)) + "\n\n".concat(bold('Mana requerido:'), " ").concat(item.requiredMana, " ").concat(formatEmoji(Icons.Mana));
                                        }
                                        else if (category == 'armorPlates') {
                                            shopEmbed.setTitle('Armaduras').setColor('Blue');
                                            itemStr = "\n\n\n***Stats***\n\n**+".concat(item.stats.armor, "** - Armor\n**+").concat(item.stats.magicDurability, "** - Magic DURABILITY\n\n**Perks**").concat(perksStr, "**Price:** ").concat(item.price, " \uD83E\uDE99 ").concat((playerGold < item.price) ? formatEmoji(Icons.NotEnoughGold) : '', "\n**Minimum Level:** ").concat(item.minLvl || 1, " ").concat(Icons.Level, " ").concat((playerLvl < item.minLvl) ? formatEmoji(Icons.NotEnoughLevel) : '');
                                        }
                                        else if (category == 'consumables') {
                                            shopEmbed.setTitle('Consumibles').setColor('Green');
                                            itemStr = "".concat(bold(item.type.toUpperCase()), "\n(+) ").concat(item.amount, "\n\n**Precio:** ").concat(item.price, " ").concat(Icons.Gold, " ").concat((playerGold < item.price) ? formatEmoji(Icons.NotEnoughGold) : '');
                                        }
                                        else {
                                            itemStr = "\n\n\n***Stats***\n\n**+".concat(item.stats.atk, "** - ATK\n**+").concat(item.stats.spd, "** - SPD\n\n**Perks**").concat(perksStr, "**Price:** ").concat(item.price, " \uD83E\uDE99 ").concat((playerGold < item.price) ? formatEmoji(Icons.NotEnoughGold) : '', "\n**Minimum Level:** ").concat(item.minLvl || 1, " ").concat(Icons.Level, " ").concat((playerLvl < item.minLvl) ? formatEmoji(Icons.NotEnoughLevel) : '');
                                        }
                                        break;
                                    }
                                    case 'warrior': {
                                        shopEmbed.setTitle('Warrior Items').setColor('#F83636');
                                        perksStr = "\n\n***".concat(((_c = item === null || item === void 0 ? void 0 : item.perks) === null || _c === void 0 ? void 0 : _c.perkName) || 'Ninguno', "***\n").concat(((_d = item === null || item === void 0 ? void 0 : item.perks) === null || _d === void 0 ? void 0 : _d.perkDesc) || 'Este objeto no tiene ningun perk', "\n\n");
                                        for (index = 0; index < Object.values((item === null || item === void 0 ? void 0 : item.perks) || []).length; index++) {
                                            perk = item === null || item === void 0 ? void 0 : item.perks["perk".concat(index + 1)];
                                            if (index == 0) {
                                                perksStr = "\n\n**".concat(perk === null || perk === void 0 ? void 0 : perk.perkName, "**\n").concat(perk === null || perk === void 0 ? void 0 : perk.perkDesc, "\n\n");
                                            }
                                            else {
                                                perksStr += "\n\n**".concat(perk === null || perk === void 0 ? void 0 : perk.perkName);
                                            }
                                        }
                                        if (category == 'abilityOrbs') {
                                            shopEmbed.setTitle('Ability Orbs \\ Warrior').setColor('Aqua');
                                            itemStr = "".concat(Utils.FormatDescription(item.desc, item)) + "\n\n".concat(bold('Mana requerido:'), " ").concat(item.requiredMana, " ").concat(formatEmoji(Icons.Mana));
                                        }
                                        else if (category == 'armorPlates') {
                                            shopEmbed.setTitle('Armaduras').setColor('Blue');
                                            itemStr = "\n\n\n***Stats***\n\n**+".concat(item.stats.armor, "** - Armor\n**+").concat(item.stats.magicDurability, "** - Magic DURABILITY\n\n**Perks**").concat(perksStr, "**Price:** ").concat(item.price, " \uD83E\uDE99 ").concat((playerGold < item.price) ? formatEmoji(Icons.NotEnoughGold) : '', "\n**Minimum Level:** ").concat(item.minLvl || 1, " ").concat(Icons.Level, " ").concat((playerLvl < item.minLvl) ? formatEmoji(Icons.NotEnoughLevel) : '');
                                        }
                                        else if (category == 'consumables') {
                                            shopEmbed.setTitle('Consumibles').setColor('Green');
                                            itemStr = "".concat(bold(item.type.toUpperCase()), "\n(+) ").concat(item.amount, "\n\n**Precio:** ").concat(item.price, " ").concat(Icons.Gold, " ").concat((playerGold < item.price) ? formatEmoji(Icons.NotEnoughGold) : '');
                                        }
                                        else {
                                            itemStr = "\n\n\n***Stats***\n\n**+".concat(item.stats.atk, "** - ATK\n**+").concat(item.stats.spd, "** - SPD\n\n**Perks**").concat(perksStr, "**Price:** ").concat(item.price, " \uD83E\uDE99 ").concat((playerGold < item.price) ? formatEmoji(Icons.NotEnoughGold) : '', "\n**Minimum Level:** ").concat(item.minLvl || 1, " ").concat(Icons.Level, " ").concat((playerLvl < item.minLvl) ? formatEmoji(Icons.NotEnoughLevel) : '');
                                        }
                                        break;
                                    }
                                    case 'enchanter': {
                                        if (category == 'abilityOrbs')
                                            shopEmbed.setTitle('Ability Orbs | Enchanter').setColor('Aqua');
                                        perksStr = "\n\n***".concat(((_e = item === null || item === void 0 ? void 0 : item.perks) === null || _e === void 0 ? void 0 : _e.perkName) || 'Ninguno', "***\n").concat(((_f = item === null || item === void 0 ? void 0 : item.perks) === null || _f === void 0 ? void 0 : _f.perkDesc) || 'Este objeto no tiene ningun perk', "\n\n");
                                        for (index = 0; index < Object.values((item === null || item === void 0 ? void 0 : item.perks) || []).length; index++) {
                                            perk = item === null || item === void 0 ? void 0 : item.perks["perk".concat(index + 1)];
                                            if (index == 0) {
                                                perksStr = "\n\n**".concat(perk === null || perk === void 0 ? void 0 : perk.perkName, "**\n").concat(perk === null || perk === void 0 ? void 0 : perk.perkDesc, "\n\n");
                                            }
                                            else {
                                                perksStr += "\n\n**".concat(perk === null || perk === void 0 ? void 0 : perk.perkName);
                                            }
                                        }
                                        shopEmbed.setTitle('Enchanter Items').setColor('#00EAFF');
                                        if (category == 'abilityOrbs') {
                                            shopEmbed.setTitle('Ability Orbs \\ Enchanter').setColor('Aqua');
                                            itemStr = "".concat(Utils.FormatDescription(item.desc, item)) + "\n\n".concat(bold('Mana requerido:'), " ").concat(item.requiredMana, " ").concat(formatEmoji(Icons.Mana));
                                        }
                                        else if (category == 'armorPlates') {
                                            shopEmbed.setTitle('Armaduras').setColor('Blue');
                                            itemStr = "\n\n\n***Stats***\n\n**+".concat(item.stats.armor, "** - Armor\n**+").concat(item.stats.magicDurability, "** - Magic DURABILITY\n\n**Perks**").concat(perksStr, "**Price:** ").concat(item.price, " \uD83E\uDE99 ").concat((playerGold < item.price) ? formatEmoji(Icons.NotEnoughGold) : '', "\n**Minimum Level:** ").concat(item.minLvl || 1, " ").concat(Icons.Level, " ").concat((playerLvl < item.minLvl) ? formatEmoji(Icons.NotEnoughLevel) : '');
                                        }
                                        else if (category == 'consumables') {
                                            shopEmbed.setTitle('Consumibles').setColor('Green');
                                            itemStr = "".concat(bold(item.type.toUpperCase()), "\n(+) ").concat(item.amount, "\n\n**Precio:** ").concat(item.price, " ").concat(Icons.Gold, " ").concat((playerGold < item.price) ? formatEmoji(Icons.NotEnoughGold) : '');
                                        }
                                        else {
                                            itemStr = "\n\n\n***Stats***\n\n**+".concat(item.stats.magicStrength, "** - Magic STRENGTH\n**+").concat(item.stats.mana, "** - Mana PER ATTACK\n\n**Perks**").concat(perksStr, "**Price:** ").concat(item.price, " \uD83E\uDE99 ").concat((playerGold < item.price) ? formatEmoji(Icons.NotEnoughGold) : '', "\n**Minimum Level:** ").concat(item.minLvl || 1, " ").concat(Icons.Level, " ").concat((playerLvl < item.minLvl) ? formatEmoji(Icons.NotEnoughLevel) : '');
                                        }
                                        break;
                                    }
                                    default:
                                        break;
                                }
                                // Checks is the orb is targeted towards the playerClass
                                // For example if the player is a warrior and the orb is targeted towards archers
                                // The search should return -1
                                // The orb target class is formatted as 'warrior|archer|enchanter'
                                // If the class the player is playing is not in the target class, the orb is not shown
                                if (item === null || item === void 0 ? void 0 : item.targetClass) {
                                    if (Math.sign((_g = item === null || item === void 0 ? void 0 : item.targetClass) === null || _g === void 0 ? void 0 : _g.search(playerClass)) == -1) {
                                        itemsProcessed += 1;
                                        currentItem += 1;
                                        continue;
                                    }
                                }
                                itemEmoji = Icons.ShopBtn;
                                if (playerLvl < item.minLvl) {
                                    itemEmoji = Icons.NotEnoughLevel;
                                }
                                else if (playerGold < item.price) {
                                    itemEmoji = Icons.NotEnoughGold;
                                }
                                console.log('🚀 ~ file: shopHandler.js:143 ~ shopInventory.forEach ~ element', item);
                                if (itemsProcessed > maxItemsInPage) {
                                    continue;
                                }
                                if (!Object.entries(document.data()[items])[currentItem]) {
                                    continue;
                                }
                                if (!item)
                                    continue;
                                shopEmbed.setDescription("**Oro actual:** ".concat(playerGold, " \uD83E\uDE99"));
                                shopEmbed.addFields({
                                    name: '__' + item.name + '__',
                                    value: itemStr,
                                    inline: true,
                                });
                                perkDesc = undefined;
                                if (((_j = (_h = item.perks) === null || _h === void 0 ? void 0 : _h.perk1) === null || _j === void 0 ? void 0 : _j.perkDesc.length) >= 100) {
                                    perkDesc = (_l = (_k = item.perks) === null || _k === void 0 ? void 0 : _k.perk1) === null || _l === void 0 ? void 0 : _l.perkDesc.substring(0, 97);
                                    perkDesc += '...';
                                }
                                if (category == 'consumables') {
                                    selectMenu.addOptions({
                                        label: "".concat(item.name, " - ").concat(item.price, " GOLD"),
                                        description: "".concat(item.type.toUpperCase(), " | +").concat(item.amount),
                                        value: "shopModal-item-buy-".concat(itemsArray[currentItem][0].match(/\d+/g)[0], "-").concat(category),
                                        emoji: itemEmoji,
                                    });
                                }
                                else {
                                    selectMenu.addOptions({
                                        label: "".concat(item.name, " - ").concat(item.price, " GOLD"),
                                        description: "".concat((!(item === null || item === void 0 ? void 0 : item.requiredMana)) ? perkDesc || 'No tiene perks' : 'Mana requerido: ' + (item === null || item === void 0 ? void 0 : item.requiredMana)),
                                        value: "shopModal-item-buy-".concat(itemsArray[currentItem][0].match(/\d+/g)[0], "-").concat(category),
                                        emoji: itemEmoji,
                                    });
                                }
                                itemsProcessed += 1;
                                currentItem += 1;
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    maxPages = Math.ceil(maxPages / maxItemsInPage);
                    paginationRow.addComponents(new ButtonBuilder()
                        .setCustomId("shopModal-page".concat(page - 1, "-").concat(category, "-").concat(interaction.user.id))
                        .setLabel('<')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(((Number(page) - 1) <= 0) ? true : false), new ButtonBuilder()
                        .setCustomId('shopModal-pageViewer')
                        .setLabel("".concat(page, " \u200B / \u200B ").concat(maxPages))
                        .setStyle(ButtonStyle.Success)
                        .setDisabled(false), new ButtonBuilder()
                        .setCustomId("shopModal-page".concat(page + 1, "-").concat(category, "-").concat(interaction.user.id))
                        .setLabel('>')
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(((Number(page) + 1) > maxPages) ? true : false));
                    categories = [classSignatureWeapon, 'armorPlates', 'consumables'];
                    if (playerInfo.data().class == 'enchanter')
                        categories.push('abilityOrbs');
                    categories = categories.filter(function (elmnt) { return elmnt != category; });
                    categoriesButton = {
                        abilityOrbs: 'Orbes de Habilidad',
                        swords: 'Espadas',
                        wands: 'Varitas',
                        bows: 'Arcos',
                        armorPlates: 'Armaduras',
                        consumables: 'Consumibles',
                        consumablesEmoji: '🥤',
                        abilityOrbsEmoji: Icons.AbilityOrb,
                        swordsEmoji: Icons.ATK,
                        armorPlatesEmoji: Icons.Armor,
                        wandsEmoji: Icons.Wands,
                        bowsEmoji: Icons.Bows,
                    };
                    changeItemsRow = new ActionRowBuilder();
                    console.log(categories);
                    categories.forEach(function (elmnt) {
                        changeItemsRow.addComponents(new ButtonBuilder()
                            .setCustomId("shopModal-".concat(elmnt, "-").concat(interaction.user.id))
                            .setEmoji("".concat(categoriesButton[elmnt + 'Emoji']))
                            .setStyle(ButtonStyle.Primary)
                            .setLabel(categoriesButton[elmnt]));
                    });
                    buyRow.addComponents(selectMenu);
                    console.log(previousEmbeds);
                    embeds = [];
                    embeds.push(shopEmbed);
                    embeds.push.apply(embeds, previousEmbeds);
                    console.log(buyRow.components[0].options);
                    return [2 /*return*/, { embeds: embeds, components: [paginationRow, changeItemsRow, buyRow] }];
            }
        });
    });
}
export {};

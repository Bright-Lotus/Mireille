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
var _a = require('firebase/firestore'), getDoc = _a.getDoc, doc = _a.doc, getFirestore = _a.getFirestore, collection = _a.collection, getDocs = _a.getDocs, updateDoc = _a.updateDoc, increment = _a.increment;
var _b = require('../errors/errors.js'), ErrorEmbed = _b.ErrorEmbed, EventErrors = _b.EventErrors;
var execute = require('../handlers/shopHandler.js').execute;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var pagination = require('../handlers/paginationHandler.js').pagination;
var _c = require('discord.js'), ActionRowBuilder = _c.ActionRowBuilder, ButtonBuilder = _c.ButtonBuilder, ButtonStyle = _c.ButtonStyle, ModalBuilder = _c.ModalBuilder, TextInputBuilder = _c.TextInputBuilder, TextInputStyle = _c.TextInputStyle, EmbedBuilder = _c.EmbedBuilder, bold = _c.bold, underscore = _c.underscore;
var inventoryExecute = require('../commands/inventory.js').inventoryExecute;
var Colors = require('../emums/colors.js').Colors;
var goldManager = require('../handlers/goldHandler.js').goldManager;
var Icons = require('../emums/icons.js').Icons;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
function equippedButton(interaction, playerClass) {
    return __awaiter(this, void 0, void 0, function () {
        var itemRow, equipped, equipment, sword, bow, wand, armorPlate;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    itemRow = new ActionRowBuilder();
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'))];
                case 1:
                    equipped = _e.sent();
                    return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'))];
                case 2:
                    equipment = _e.sent();
                    if (equipped.exists()) {
                        if (playerClass == 'warrior') {
                            if ((_a = equipped.data().sword) === null || _a === void 0 ? void 0 : _a.id) {
                                console.log('Algo equipado');
                                if (equipment.exists()) {
                                    sword = equipment.data().swords["sword".concat(equipped.data().sword.id)];
                                    itemRow.addComponents(new ButtonBuilder()
                                        .setCustomId('equippedSword-btn')
                                        .setEmoji('🪓')
                                        .setStyle(ButtonStyle.Primary)
                                        .setLabel(sword.name));
                                }
                            }
                            else {
                                itemRow.addComponents(new ButtonBuilder()
                                    .setCustomId('equippedSword-btn')
                                    .setEmoji('❎')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setLabel('Nada equipado'));
                            }
                        }
                        else if (playerClass == 'archer') {
                            if ((_b = equipped.data().bow) === null || _b === void 0 ? void 0 : _b.id) {
                                console.log('Algo equipado');
                                bow = equipment.data().bows["bow".concat(equipped.data().bow.id)];
                                itemRow.addComponents(new ButtonBuilder()
                                    .setCustomId('equippedBow-btn')
                                    .setEmoji('🏹')
                                    .setStyle(ButtonStyle.Primary)
                                    .setLabel(bow.name));
                            }
                            else {
                                itemRow.addComponents(new ButtonBuilder()
                                    .setCustomId('equippedBow-btn')
                                    .setEmoji('❎')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setLabel('Nada equipado'));
                            }
                        }
                        else if (playerClass == 'enchanter') {
                            if ((_c = equipped.data().wand) === null || _c === void 0 ? void 0 : _c.id) {
                                console.log('Algo equipado');
                                wand = equipment.data().wands["wand".concat(equipped.data().wand.id)];
                                itemRow.addComponents(new ButtonBuilder()
                                    .setCustomId('equippedSword-btn')
                                    .setEmoji('🪄')
                                    .setStyle(ButtonStyle.Primary)
                                    .setLabel(wand.name));
                            }
                            else {
                                itemRow.addComponents(new ButtonBuilder()
                                    .setCustomId('equippedSword-btn')
                                    .setEmoji('❎')
                                    .setStyle(ButtonStyle.Secondary)
                                    .setLabel('Nada equipado'));
                            }
                        }
                        if ((_d = equipped.data().armorPlate) === null || _d === void 0 ? void 0 : _d.id) {
                            console.log('Algo equipado');
                            armorPlate = equipment.data().armorPlates["armorPlate".concat(equipped.data().armorPlate.id)];
                            itemRow.addComponents(new ButtonBuilder()
                                .setCustomId('equippedArmorPlate-btn')
                                .setEmoji('🛡️')
                                .setStyle(ButtonStyle.Primary)
                                .setLabel(armorPlate.name));
                        }
                        else {
                            itemRow.addComponents(new ButtonBuilder()
                                .setCustomId('equippedArmorPlate-btn')
                                .setEmoji('❎')
                                .setStyle(ButtonStyle.Secondary)
                                .setLabel('Nada equipado'));
                        }
                    }
                    return [2 /*return*/, itemRow];
            }
        });
    });
}
module.exports = {
    name: 'interactionCreate',
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var idSplit_1, itemId_1, shopInventory, item_1, category_1, rejectedEmbed, filterModal, filterUserInput, modalRow, itemRow_1, idSplit, page_1, equipment, items, itemsArray, playerInfo, classSignatureWeapon, categories, categoriesButton_1, categoryRow_1, itemRow_2, idSplit, page_2, equipment, items, itemsArray, itemRow_3, idSplit, page_3, equipment, items, itemsArray, idSplit, page_4, equipment, items, itemsArray, idSplit, page_5, enemyUnique, playerEquipment, playerInfo, playerMana, abilityOrbs, abilityOrbsArray, players, usersArray_1, _loop_1, _a, _b, _c, e_1_1, sortedArray, page, category, row, row;
            var _this = this;
            var _d, e_1, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!interaction.isButton())
                            return [2 /*return*/];
                        if (!interaction.customId.includes('buyInfoBtnAccept')) return [3 /*break*/, 3];
                        if (interaction.user.id != interaction.customId.split('/')[1]) {
                            return [2 /*return*/, interaction.reply({ embeds: [ErrorEmbed(EventErrors.NotOwnerOfInteraction)], ephemeral: true })];
                        }
                        idSplit_1 = interaction.customId.split('-')[1].split('|');
                        itemId_1 = idSplit_1[1];
                        return [4 /*yield*/, getDocs(collection(db, '/Event/Shop/ShopInventory'))];
                    case 1:
                        shopInventory = _g.sent();
                        shopInventory.forEach(function (document) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                item_1 = document.data()[idSplit_1[0]][itemId_1];
                                return [2 /*return*/];
                            });
                        }); });
                        category_1 = idSplit_1[0];
                        console.log(idSplit_1, itemId_1, item_1);
                        return [4 /*yield*/, goldManager('buy', item_1.price, interaction.user)
                                .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                var buyResponses, thanksEmbed, dialogEnd, goldEmbed, docSnap, itemAmount;
                                var _a, _b, _c, _d, _e, _f;
                                var _g, _h, _j, _k;
                                return __generator(this, function (_l) {
                                    switch (_l.label) {
                                        case 0:
                                            buyResponses = [
                                                'Pff, disfruta',
                                                'OYE ME PAGASTE MENOS DE LO QUE ERA\n...\nAh no olvidalo',
                                                'Ya te puedes ir!\nO compra algo mas entonces',
                                                'Considera comprar otras cosas tambien, necesito dinero',
                                                '...',
                                                'Uhhhhh, gracias',
                                            ];
                                            thanksEmbed = new EmbedBuilder()
                                                .setTitle('Nora')
                                                .setColor(Colors.NoraColor)
                                                .setDescription(buyResponses[Math.floor(Math.random() * buyResponses.length)]);
                                            dialogEnd = new ActionRowBuilder().addComponents(new ButtonBuilder()
                                                .setCustomId('end')
                                                .setLabel('Dialog has ended')
                                                .setStyle(ButtonStyle.Secondary)
                                                .setEmoji('🛑'));
                                            goldEmbed = new EmbedBuilder()
                                                .setTitle('La compra ha sido exitosa')
                                                .setAuthor({ name: 'Banco Aelram ◑ Factura' })
                                                .setDescription("".concat(bold('Has comprado ' + underscore(item_1.name) + ' por ' + underscore(item_1.price) + ' oro'), "\nOro restante: ").concat(result))
                                                .setColor('Gold');
                                            return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'))];
                                        case 1:
                                            docSnap = _l.sent();
                                            if (!docSnap.exists()) return [3 /*break*/, 4];
                                            if (!!((_g = docSnap === null || docSnap === void 0 ? void 0 : docSnap.data()) === null || _g === void 0 ? void 0 : _g["".concat(category_1)])) return [3 /*break*/, 3];
                                            return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'), (_a = {},
                                                    _a[category_1] = { amount: 0 },
                                                    _a), { merge: true })];
                                        case 2:
                                            _l.sent();
                                            _l.label = 3;
                                        case 3:
                                            itemAmount = ((_h = docSnap.data()["".concat(category_1)]) === null || _h === void 0 ? void 0 : _h.amount) || 0;
                                            _l.label = 4;
                                        case 4:
                                            console.log(itemAmount);
                                            item_1 = __assign(__assign({}, item_1), { id: itemAmount + 1 });
                                            if (!(category_1 == 'consumables')) return [3 /*break*/, 7];
                                            return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'), (_b = {},
                                                    _b[category_1] = __assign(__assign({}, (_j = docSnap.data()) === null || _j === void 0 ? void 0 : _j["".concat(category_1)]), (_c = { amount: itemAmount + 1 }, _c["".concat(category_1.slice(0, -1)).concat(itemAmount + 1)] = item_1, _c)),
                                                    _b), { merge: true })];
                                        case 5:
                                            _l.sent();
                                            return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'), (_d = {},
                                                    _d["".concat(category_1, ".").concat(category_1.slice(0, -1)).concat(itemAmount + 1, ".consumableAmount")] = increment(1),
                                                    _d), { merge: true })];
                                        case 6:
                                            _l.sent();
                                            return [3 /*break*/, 9];
                                        case 7: return [4 /*yield*/, updateDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'), (_e = {},
                                                _e[category_1] = __assign(__assign({}, (_k = docSnap.data()) === null || _k === void 0 ? void 0 : _k["".concat(category_1)]), (_f = { amount: itemAmount + 1 }, _f["".concat(category_1.slice(0, -1)).concat(itemAmount + 1)] = item_1, _f)),
                                                _e), { merge: true })];
                                        case 8:
                                            _l.sent();
                                            _l.label = 9;
                                        case 9: return [4 /*yield*/, interaction.reply({ embeds: [goldEmbed, thanksEmbed], components: [dialogEnd] })];
                                        case 10:
                                            _l.sent();
                                            console.log('wut');
                                            return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function (error) {
                                if (error.errorCode == EventErrors.NotEnoughGold) {
                                    var goldErrorEmbed = new EmbedBuilder()
                                        .setTitle('Nora')
                                        .setColor('#C600FF')
                                        .setDescription('Compra algo mas barato o vuelve cuando tengas mas oro!!');
                                    return interaction.reply({ embeds: [error.errorEmbed, goldErrorEmbed] });
                                }
                            })];
                    case 2:
                        _g.sent();
                        return [2 /*return*/];
                    case 3:
                        if (interaction.customId.includes('buyInfoBtnReject')) {
                            rejectedEmbed = new EmbedBuilder()
                                .setTitle('Nora')
                                .setColor('#C600FF')
                                .setDescription('Mira lo que te gusta y COMPRALO!\nY deja de desperdiciar mi tiempo!');
                            return [2 /*return*/, interaction.reply({ embeds: [rejectedEmbed] })];
                        }
                        if (!interaction.customId.includes('filterButton-abiilty-target')) return [3 /*break*/, 5];
                        filterModal = new ModalBuilder()
                            .setCustomId(interaction.customId.replace('Button', 'Modal'))
                            .setTitle('Filtrar');
                        filterUserInput = new TextInputBuilder()
                            .setCustomId('userFilter')
                            .setLabel('Busqueda')
                            .setRequired(true)
                            .setStyle(TextInputStyle.Short);
                        modalRow = new ActionRowBuilder().addComponents(filterUserInput);
                        filterModal.addComponents(modalRow);
                        console.log('mewoewer');
                        return [4 /*yield*/, interaction.showModal(filterModal)];
                    case 4:
                        _g.sent();
                        return [2 /*return*/];
                    case 5:
                        if (!interaction.customId.includes('abilityOrbs-view-btn')) return [3 /*break*/, 7];
                        return [4 /*yield*/, inventoryExecute(interaction, 'abilityOrbs')];
                    case 6:
                        _g.sent();
                        return [2 /*return*/];
                    case 7:
                        if (!interaction.customId.includes('-view-btn')) return [3 /*break*/, 9];
                        return [4 /*yield*/, inventoryExecute(interaction, interaction.customId.split('-')[0])];
                    case 8:
                        _g.sent();
                        return [2 /*return*/];
                    case 9:
                        if (!interaction.customId.includes('inventorySwordsModal')) return [3 /*break*/, 14];
                        return [4 /*yield*/, equippedButton(interaction)];
                    case 10:
                        itemRow_1 = _g.sent();
                        idSplit = interaction.customId.split('-');
                        page_1 = Number(idSplit[1].match(/\d+/g)[0]);
                        return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'))];
                    case 11:
                        equipment = _g.sent();
                        if (!equipment.exists()) return [3 /*break*/, 13];
                        items = equipment.data().swords;
                        itemsArray = Object.values(items).filter(function (element) { return (typeof element != 'number'); });
                        return [4 /*yield*/, pagination('inventorySwords', itemsArray, page_1, interaction.user).then(function (results) {
                                interaction.update({ embeds: [results.embed], components: [results.paginationRow, itemRow_1, results.selectMenuRow] });
                            })];
                    case 12:
                        _g.sent();
                        _g.label = 13;
                    case 13: return [2 /*return*/];
                    case 14:
                        if (!interaction.customId.includes('wandsInventoryEnchanterModal')) return [3 /*break*/, 20];
                        console.log('its reacghin here');
                        return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo'))];
                    case 15:
                        playerInfo = _g.sent();
                        classSignatureWeapon = 'luisin';
                        if (playerInfo.exists()) {
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
                        }
                        categories = [classSignatureWeapon, 'armorPlates'];
                        if (playerInfo.data().class == 'enchanter') {
                            categories.push('abilityOrbs');
                        }
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
                        categories.forEach(function (elmnt) {
                            categoryRow_1.addComponents(new ButtonBuilder()
                                .setCustomId("".concat(elmnt, "-view-btn"))
                                .setEmoji("".concat(categoriesButton_1[elmnt + 'Emoji']))
                                .setStyle(ButtonStyle.Primary)
                                .setLabel(categoriesButton_1[elmnt]));
                        });
                        return [4 /*yield*/, equippedButton(interaction, playerInfo.data().class)];
                    case 16:
                        itemRow_2 = _g.sent();
                        idSplit = interaction.customId.split('-');
                        page_2 = Number(idSplit[1].match(/\d+/g)[0]);
                        return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'))];
                    case 17:
                        equipment = _g.sent();
                        if (!equipment.exists()) return [3 /*break*/, 19];
                        items = equipment.data().wands;
                        itemsArray = Object.values(items).filter(function (element) { return (typeof element != 'number'); });
                        return [4 /*yield*/, pagination('wandsInventoryEnchanter', itemsArray, page_2, interaction.user).then(function (results) {
                                interaction.update({ embeds: [results.embed], components: [results.paginationRow, itemRow_2, results.selectMenuRow, categoryRow_1] });
                            })];
                    case 18:
                        _g.sent();
                        _g.label = 19;
                    case 19: return [2 /*return*/];
                    case 20:
                        if (!interaction.customId.includes('inventoryBowsModal')) return [3 /*break*/, 25];
                        return [4 /*yield*/, equippedButton(interaction)];
                    case 21:
                        itemRow_3 = _g.sent();
                        idSplit = interaction.customId.split('-');
                        page_3 = Number(idSplit[1].match(/\d+/g)[0]);
                        return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'))];
                    case 22:
                        equipment = _g.sent();
                        if (!equipment.exists()) return [3 /*break*/, 24];
                        items = equipment.data().swords;
                        itemsArray = Object.values(items).filter(function (element) { return (typeof element != 'number'); });
                        return [4 /*yield*/, pagination('inventorySwords', itemsArray, page_3, interaction.user).then(function (results) {
                                interaction.update({ embeds: [results.embed], components: [results.paginationRow, itemRow_3, results.selectMenuRow] });
                            })];
                    case 23:
                        _g.sent();
                        _g.label = 24;
                    case 24: return [2 /*return*/];
                    case 25:
                        if (!interaction.customId.includes('consumablesModal')) return [3 /*break*/, 29];
                        idSplit = interaction.customId.split('-');
                        page_4 = Number(idSplit[1].match(/\d+/g)[0]);
                        return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'))];
                    case 26:
                        equipment = _g.sent();
                        if (!equipment.exists()) return [3 /*break*/, 28];
                        items = equipment.data().consumables;
                        itemsArray = Object.values(items).filter(function (element) { return (typeof element != 'number'); });
                        return [4 /*yield*/, pagination('consumables', itemsArray, page_4, interaction.user).then(function (results) {
                                interaction.update({ embeds: [results.embed], components: [results.paginationRow, results.selectMenuRow] });
                            })];
                    case 27:
                        _g.sent();
                        _g.label = 28;
                    case 28: return [2 /*return*/];
                    case 29:
                        if (!interaction.customId.includes('abilityOrbsModal')) return [3 /*break*/, 34];
                        idSplit = interaction.customId.split('-');
                        console.log(idSplit);
                        page_5 = Number(idSplit[1].match(/\d+/g)[0]);
                        enemyUnique = Number(idSplit[4]);
                        return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'))];
                    case 30:
                        playerEquipment = _g.sent();
                        if (!playerEquipment.exists()) return [3 /*break*/, 33];
                        return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo'))];
                    case 31:
                        playerInfo = _g.sent();
                        if (!playerInfo.exists()) return [3 /*break*/, 33];
                        playerMana = playerInfo.data().stats.mana;
                        abilityOrbs = playerEquipment.data().abilityOrbs;
                        abilityOrbsArray = Object.values(abilityOrbs).filter(function (element) { return (typeof element != 'number'); });
                        return [4 /*yield*/, pagination('abilityOrbs', abilityOrbsArray, page_5, interaction.user, { currentMana: playerMana, enemyUnique: enemyUnique }).then(function (results) {
                                interaction.update({ embeds: [results.embed], components: [results.paginationRow, results.selectMenuRow] });
                            })];
                    case 32:
                        _g.sent();
                        _g.label = 33;
                    case 33: return [2 /*return*/];
                    case 34:
                        if (!interaction.customId.includes('leaderboardModal')) return [3 /*break*/, 50];
                        return [4 /*yield*/, getDoc(doc(db, 'Event/Players'))];
                    case 35:
                        players = _g.sent();
                        usersArray_1 = [];
                        if (!players.exists()) return [3 /*break*/, 50];
                        _g.label = 36;
                    case 36:
                        _g.trys.push([36, 42, 43, 48]);
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
                                                usersArray_1.push({
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
                        _g.label = 37;
                    case 37: return [4 /*yield*/, _b.next()];
                    case 38:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 41];
                        return [5 /*yield**/, _loop_1()];
                    case 39:
                        _g.sent();
                        _g.label = 40;
                    case 40:
                        _a = true;
                        return [3 /*break*/, 37];
                    case 41: return [3 /*break*/, 48];
                    case 42:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 48];
                    case 43:
                        _g.trys.push([43, , 46, 47]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 45];
                        return [4 /*yield*/, _e.call(_b)];
                    case 44:
                        _g.sent();
                        _g.label = 45;
                    case 45: return [3 /*break*/, 47];
                    case 46:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 47: return [7 /*endfinally*/];
                    case 48:
                        sortedArray = usersArray_1.sort(function (a, b) {
                            return b.eventPts - a.eventPts;
                        });
                        console.log(sortedArray);
                        return [4 /*yield*/, pagination('leaderboard', sortedArray, interaction.customId.split('-')[1].charAt(4), interaction.user, { arraySorted: true }).then(function (results) {
                                interaction.update({ embeds: [results.embed], components: [results.paginationRow] });
                            })];
                    case 49:
                        _g.sent();
                        return [2 /*return*/];
                    case 50:
                        if (!interaction.customId.includes('shopModal') || interaction.customId.includes('pageViewer'))
                            return [2 /*return*/];
                        page = interaction.customId.split('-')[1];
                        category = interaction.customId.split('-')[2];
                        // If the page includes page means it's from the pagination buttons
                        // If not is from the change category buttons
                        // These too don't have the ID check in the same position (ID is in index [2] in category change and [3] in pagination button)
                        // The ID check is the ID of the user to make sure the creator of the original interaction
                        // Is the same as the author of the interaction
                        if (interaction.user.id != interaction.customId.split('-')["".concat((page.includes('page')) ? '3' : '2')]) {
                            return [2 /*return*/, interaction.reply({ embeds: [ErrorEmbed(EventErrors.NotOwnerOfPagination)], ephemeral: true })];
                        }
                        console.log('🚀 ~ file: interactionCreateButtonPagination.js:110 ~ execute ~ page', page, category);
                        if (!!page.includes('page')) return [3 /*break*/, 52];
                        return [4 /*yield*/, execute('open', interaction, 1, [], page)];
                    case 51:
                        row = _g.sent();
                        return [2 /*return*/, interaction.update(row)];
                    case 52: return [4 /*yield*/, execute('open', interaction, page.charAt(4), [], category)];
                    case 53:
                        row = _g.sent();
                        return [2 /*return*/, interaction.update(row)];
                }
            });
        });
    },
};
export {};

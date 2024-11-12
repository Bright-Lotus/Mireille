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
var _a = require('firebase/firestore'), getFirestore = _a.getFirestore, doc = _a.doc, getDocs = _a.getDocs, collection = _a.collection, updateDoc = _a.updateDoc, getDoc = _a.getDoc, increment = _a.increment;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
var _b = require('discord.js'), EmbedBuilder = _b.EmbedBuilder, ActionRowBuilder = _b.ActionRowBuilder, ButtonBuilder = _b.ButtonBuilder, ButtonStyle = _b.ButtonStyle, bold = _b.bold, underscore = _b.underscore, formatEmoji = _b.formatEmoji;
var goldManager = require('../handlers/goldHandler.js').goldManager;
var _c = require('../errors/errors.js'), EventErrors = _c.EventErrors, ErrorEmbed = _c.ErrorEmbed;
var Icons = require('../emums/icons.js').Icons;
var Utils = require('../utils.js').Utils;
var Colors = require('../emums/colors.js').Colors;
module.exports = {
    name: 'interactionCreate',
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var itemId, category, item, shopInventory, filter, itemStr, playerInfo, playerClass, playerGold, playerLvl, perksStr, index, perk, confirmationEmbed, itemEmbed, row, row2;
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        if (!interaction.isSelectMenu())
                            return [2 /*return*/];
                        if (!interaction.customId.includes('shopModal-selectMenu'))
                            return [2 /*return*/];
                        return [4 /*yield*/, interaction.deferReply()];
                    case 1:
                        _j.sent();
                        if (interaction.user.id != interaction.customId.split('-')[2]) {
                            return [2 /*return*/, interaction.reply({ embeds: [ErrorEmbed(EventErrors.NotOwnerOfInteraction)], ephemeral: true })];
                        }
                        itemId = interaction.values[0].split('-')[3];
                        category = interaction.values[0].split('-')[4];
                        return [4 /*yield*/, getDocs(collection(db, '/Event/Shop/ShopInventory'))];
                    case 2:
                        shopInventory = _j.sent();
                        shopInventory.forEach(function (document) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                item = document.data()[category]["".concat(category.slice(0, -1)).concat(itemId)];
                                return [2 /*return*/];
                            });
                        }); });
                        filter = function (msg) { return (msg.content.toLowerCase().includes('confirmar') && msg.author.id == interaction.user.id || msg.content.toLowerCase().includes('rechazar') && msg.author.id == interaction.user.id); };
                        return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo'))];
                    case 3:
                        playerInfo = (_j.sent()).data();
                        playerClass = playerInfo.class;
                        playerGold = playerInfo.gold;
                        playerLvl = playerInfo.playerLvl;
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
                        switch (playerClass) {
                            case 'archer':
                                itemStr = "\n\n\n***Stats***\n\n**+".concat((_c = item === null || item === void 0 ? void 0 : item.stats) === null || _c === void 0 ? void 0 : _c.atk, "** - ATK\n**+").concat((_d = item.stats) === null || _d === void 0 ? void 0 : _d.spd, "** - SPD\n\n**Perks**").concat(perksStr, "**Price:** ").concat(item.price, " \uD83E\uDE99 ").concat((playerGold < item.price) ? formatEmoji(Icons.NotEnoughGold) : '', "\n**Minimum Level:** ").concat(item.minLvl || 1, " ").concat(Icons.Level, " ").concat((playerLvl < item.minLvl) ? formatEmoji(Icons.NotEnoughLevel) : '');
                                break;
                            case 'warrior':
                                itemStr = "\n\n\n***Stats***\n\n**+".concat((_e = item === null || item === void 0 ? void 0 : item.stats) === null || _e === void 0 ? void 0 : _e.atk, "** - ATK\n**+").concat((_f = item.stats) === null || _f === void 0 ? void 0 : _f.spd, "** - SPD\n\n**Perks**").concat(perksStr, "**Price:** ").concat(item.price, " \uD83E\uDE99 ").concat((playerGold < item.price) ? formatEmoji(Icons.NotEnoughGold) : '', "\n**Minimum Level:** ").concat(item.minLvl || 1, " ").concat(Icons.Level, " ").concat((playerLvl < item.minLvl) ? formatEmoji(Icons.NotEnoughLevel) : '');
                                // eslint-disable-next-line no-unused-vars
                                break;
                            case 'enchanter':
                                itemStr = "\n\n\n***Stats***\n\n**+".concat((_g = item.stats) === null || _g === void 0 ? void 0 : _g.magicStrength, "** - MAGIC STR\n**+").concat((_h = item.stats) === null || _h === void 0 ? void 0 : _h.mana, "** - MANA\n\n**Perks**").concat(perksStr, "**Price:** ").concat(item.price, " \uD83E\uDE99 ").concat((playerGold < item.price) ? formatEmoji(Icons.NotEnoughGold) : '', "\n**Minimum Level:** ").concat(item.minLvl || 1, " ").concat(Icons.Level, " ").concat((playerLvl < item.minLvl) ? formatEmoji(Icons.NotEnoughLevel) : '');
                                break;
                            default:
                                break;
                        }
                        if (category == 'armorPlates') {
                            itemStr = "\n\n\n***Stats***\n\n**+".concat(item.stats.armor, "** - Armor\n**+").concat(item.stats.magicDurability, "** - Magic DURABILITY\n\n**Perks**").concat(perksStr, "**Price:** ").concat(item.price, " \uD83E\uDE99 ").concat((playerGold < item.price) ? formatEmoji(Icons.NotEnoughGold) : '', "\n**Minimum Level:** ").concat(item.minLvl || 1, " ").concat(Icons.Level, " ").concat((playerLvl < item.minLvl) ? formatEmoji(Icons.NotEnoughLevel) : '');
                        }
                        else if (category == 'abilityOrbs') {
                            itemStr = "".concat(Utils.FormatDescription(item.desc, item)) + "\n\n".concat(bold('Mana requerido:'), " ").concat(item.requiredMana, " ").concat(formatEmoji(Icons.Mana));
                        }
                        else if (category == 'consumables') {
                            itemStr = "".concat(bold(item.type.toUpperCase()), "\n(+) ").concat(item.amount, "\n\n**Precio:** ").concat(item.price, " ").concat(Icons.Gold);
                        }
                        confirmationEmbed = new EmbedBuilder()
                            .setTitle('Nora')
                            .setColor('#C600FF')
                            .setDescription('Vas a comprar eso?');
                        itemEmbed = new EmbedBuilder()
                            .setTitle('__' + item.name + '__')
                            .setColor('#C600FF')
                            .setDescription(itemStr);
                        row = new ActionRowBuilder().addComponents(new ButtonBuilder()
                            .setCustomId("buyInfoBtnAccept-".concat(category, "|").concat(category.slice(0, -1)).concat(itemId, "-/").concat(interaction.user.id))
                            .setLabel('Confirmar compra')
                            .setEmoji('✅')
                            .setStyle(ButtonStyle.Success));
                        row2 = new ActionRowBuilder().addComponents(new ButtonBuilder()
                            .setCustomId('buyInfoBtnReject')
                            .setLabel('Rechazar compra')
                            .setEmoji('⛔')
                            .setStyle(ButtonStyle.Danger));
                        interaction.editReply({ embeds: [confirmationEmbed, itemEmbed], components: [row, row2], fetchReply: true })
                            .then(function () {
                            interaction.channel.awaitMessages({ filter: filter, max: 1, time: 20000, errors: ['time'] })
                                .then(function (collected) { return __awaiter(_this, void 0, void 0, function () {
                                var rejectedEmbed;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(collected.first().content.toLowerCase() == 'confirmar')) return [3 /*break*/, 2];
                                            return [4 /*yield*/, goldManager('buy', item.price, interaction.user)
                                                    .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                                                    var buyResponses, thanksEmbed, dialogEnd, goldEmbed, docSnap, itemAmount, infoEmbed;
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
                                                                    .setDescription("".concat(bold('Has comprado ' + underscore(item.name) + ' por ' + underscore(item.price) + ' oro'), "\nOro restante: ").concat(result))
                                                                    .setColor('Gold');
                                                                return [4 /*yield*/, getDoc(doc(db, collected.first().author.id, 'PlayerInfo/Inventory/Equipment'))];
                                                            case 1:
                                                                docSnap = _l.sent();
                                                                if (!docSnap.exists()) return [3 /*break*/, 4];
                                                                if (!!((_g = docSnap === null || docSnap === void 0 ? void 0 : docSnap.data()) === null || _g === void 0 ? void 0 : _g["".concat(category)])) return [3 /*break*/, 3];
                                                                return [4 /*yield*/, updateDoc(doc(db, collected.first().author.id, 'PlayerInfo/Inventory/Equipment'), (_a = {},
                                                                        _a[category] = { amount: 0 },
                                                                        _a), { merge: true })];
                                                            case 2:
                                                                _l.sent();
                                                                _l.label = 3;
                                                            case 3:
                                                                itemAmount = ((_h = docSnap.data()["".concat(category)]) === null || _h === void 0 ? void 0 : _h.amount) || 0;
                                                                _l.label = 4;
                                                            case 4:
                                                                console.log(itemAmount);
                                                                item = __assign(__assign({}, item), { id: itemAmount + 1 });
                                                                if (!(category == 'consumables')) return [3 /*break*/, 7];
                                                                return [4 /*yield*/, updateDoc(doc(db, collected.first().author.id, 'PlayerInfo/Inventory/Equipment'), (_b = {},
                                                                        _b[category] = __assign(__assign({}, (_j = docSnap.data()) === null || _j === void 0 ? void 0 : _j["".concat(category)]), (_c = { amount: itemAmount + 1 }, _c["".concat(category.slice(0, -1)).concat(itemAmount + 1)] = item, _c)),
                                                                        _b), { merge: true })];
                                                            case 5:
                                                                _l.sent();
                                                                return [4 /*yield*/, updateDoc(doc(db, collected.first().author.id, 'PlayerInfo/Inventory/Equipment'), (_d = {},
                                                                        _d["".concat(category, ".").concat(category.slice(0, -1)).concat(itemAmount + 1, ".consumableAmount")] = increment(1),
                                                                        _d), { merge: true })];
                                                            case 6:
                                                                _l.sent();
                                                                return [3 /*break*/, 9];
                                                            case 7: return [4 /*yield*/, updateDoc(doc(db, collected.first().author.id, 'PlayerInfo/Inventory/Equipment'), (_e = {},
                                                                    _e[category] = __assign(__assign({}, (_k = docSnap.data()) === null || _k === void 0 ? void 0 : _k["".concat(category)]), (_f = { amount: itemAmount + 1 }, _f["".concat(category.slice(0, -1)).concat(itemAmount + 1)] = item, _f)),
                                                                    _e), { merge: true })];
                                                            case 8:
                                                                _l.sent();
                                                                _l.label = 9;
                                                            case 9:
                                                                collected.first().reply({ embeds: [goldEmbed, thanksEmbed], components: [dialogEnd] });
                                                                infoEmbed = new EmbedBuilder()
                                                                    .setTitle('Informacion')
                                                                    .setDescription('Debido a los siguientes tres tontitos que no quisieron leer o no tuvieron suficiente IQ para entender, ahora **ya es posible usar los botones para confirmar o rechazar tu compra:**\n- **Contodorespeto (En especial este)**\n- Erziok\n- Joang\n\nSolo hazle clic a los botones respectivos!')
                                                                    .setColor('Red');
                                                                interaction.followUp({ embeds: [infoEmbed], ephemeral: true });
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }).catch(function (error) {
                                                    if (error.errorCode == EventErrors.NotEnoughGold) {
                                                        var goldErrorEmbed = new EmbedBuilder()
                                                            .setTitle('Nora')
                                                            .setColor('#C600FF')
                                                            .setDescription('Compra algo mas barato o vuelve cuando tengas mas oro!!');
                                                        return collected.first().reply({ embeds: [error.errorEmbed, goldErrorEmbed] });
                                                    }
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            rejectedEmbed = new EmbedBuilder()
                                                .setTitle('Nora')
                                                .setColor('#C600FF')
                                                .setDescription('Mira lo que te gusta y seleccionalo!\nY deja de desperdiciar mi tiempo.');
                                            return [2 /*return*/, collected.first().reply({ embeds: [rejectedEmbed] })];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function () {
                                var rejectedEmbed = new EmbedBuilder()
                                    .setTitle('Nora')
                                    .setColor('#C600FF')
                                    .setDescription('Mira lo que te gusta y seleccionalo!\nY deja de desperdiciar mi tiempo.');
                                return interaction.followUp({ embeds: [rejectedEmbed] });
                            });
                        });
                        console.log("".concat(interaction.user.tag, " in #").concat(interaction.channel.name, " triggered an interaction."));
                        return [2 /*return*/];
                }
            });
        });
    },
};
export {};

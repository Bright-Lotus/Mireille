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
var inventoryExecute = require('../commands/inventory.js').inventoryExecute;
var _a = require('../errors/errors.js'), EventErrors = _a.EventErrors, ErrorEmbed = _a.ErrorEmbed;
var _b = require('firebase/firestore'), getFirestore = _b.getFirestore, doc = _b.doc, getDoc = _b.getDoc;
var initializeApp = require('firebase/app').initializeApp;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var _c = require('discord.js'), EmbedBuilder = _c.EmbedBuilder, bold = _c.bold, underscore = _c.underscore, formatEmoji = _c.formatEmoji;
var Icons = require('../emums/icons.js').Icons;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
module.exports = {
    name: 'interactionCreate',
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var equipment, equipped, abilityId, abilityOrbEquipped, abilityOrbEmbed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!interaction.isButton())
                            return [2 /*return*/];
                        if (!interaction.customId.includes('equippedOrb1-btn-')) return [3 /*break*/, 4];
                        return [4 /*yield*/, interaction.deferReply()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipment'))];
                    case 2:
                        equipment = _a.sent();
                        return [4 /*yield*/, getDoc(doc(db, interaction.user.id, 'PlayerInfo/Inventory/Equipped'))];
                    case 3:
                        equipped = _a.sent();
                        abilityId = interaction.customId.split('-')[2];
                        if (equipment.exists() && equipped.exists()) {
                            abilityOrbEquipped = equipment.data().abilityOrbs["abilityOrb".concat(abilityId)];
                            abilityOrbEmbed = new EmbedBuilder()
                                .setTitle(underscore(bold(abilityOrbEquipped.name)))
                                .setColor('Aqua')
                                .setDescription("".concat(abilityOrbEquipped.desc, "\n\n**Mana requerido:** ").concat(abilityOrbEquipped.requiredMana, " ").concat(formatEmoji(Icons.Mana)));
                            return [2 /*return*/, interaction.editReply({ embeds: [abilityOrbEmbed] })];
                        }
                        _a.label = 4;
                    case 4:
                        if (!interaction.customId.includes('Button') || interaction.customId.includes('filterButton'))
                            return [2 /*return*/];
                        console.log(interaction.customId, 'loglogloglog');
                        if (interaction.user.id != interaction.customId.split('/')[1]) {
                            return [2 /*return*/, interaction.reply({ embeds: [ErrorEmbed(EventErrors.NotOwnerOfPagination)], ephemeral: true })];
                        }
                        inventoryExecute(interaction, 'abilityOrbs', { action: 'equip', orbPosition: interaction.customId.charAt(14) });
                        return [2 /*return*/];
                }
            });
        });
    },
};
export {};

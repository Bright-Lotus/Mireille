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
var _a = require('discord.js'), SlashCommandBuilder = _a.SlashCommandBuilder, EmbedBuilder = _a.EmbedBuilder, ActionRowBuilder = _a.ActionRowBuilder, SelectMenuBuilder = _a.SelectMenuBuilder;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Creates a new player profile on the event.'),
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                register(interaction);
                return [2 /*return*/];
            });
        });
    },
};
function register(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var row, classEmbed, warriorEmbed, archerEmbed, enchanterEmbed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, interaction.deferReply()];
                case 1:
                    _a.sent();
                    row = new ActionRowBuilder()
                        .addComponents(new SelectMenuBuilder()
                        .setCustomId("class-select/".concat(interaction.user.id))
                        .setPlaceholder('Choose your class')
                        .addOptions({
                        label: 'Warrior 🗡️',
                        description: 'The most bloodthirsty on the battlefield!',
                        value: 'Warrior',
                    }, {
                        label: 'Archer 🏹',
                        description: 'Always waiting for the best shot...',
                        value: 'Archer',
                    }, {
                        label: 'Enchanter 🪄',
                        description: 'Good for support but also deals damage with spells!',
                        value: 'Enchanter',
                    }));
                    classEmbed = new EmbedBuilder()
                        .setTitle('Let\'s find your destined path!')
                        .setDescription('Warrior | Archer | Enchanter')
                        .setFooter({ text: 'Mana PER ATTACK is the same for Warrior and Archer', iconURL: 'https://cdn.discordapp.com/emojis/1048224179507433572.png?v=1' })
                        .setColor('#ffffff');
                    warriorEmbed = new EmbedBuilder()
                        .setTitle('Warrior 🗡️')
                        .setDescription('**Stats:**\nMore base ATK\nMore base HP\nLess base Speed\n\n**Good for damage**')
                        .setColor('#F83636');
                    archerEmbed = new EmbedBuilder()
                        .setTitle('Archer 🏹')
                        .setDescription('**Stats:**\nRegular base ATK\nLess base HP\nMore base Speed\nCan access farm channels five levels above\n\n**Good for range**')
                        .setColor('#37BC6C');
                    enchanterEmbed = new EmbedBuilder()
                        .setTitle('Enchanter 🪄')
                        .setDescription('**Stats:**\nLess base ATK\nMore base HP\nLess base Speed\nMore base Mana PER ATTACK\n\n**Good for support and damage**')
                        .setColor('#00EAFF');
                    interaction.editReply({ embeds: [classEmbed, warriorEmbed, archerEmbed, enchanterEmbed], components: [row] });
                    return [2 /*return*/];
            }
        });
    });
}
export {};

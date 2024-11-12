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
var _a = require('discord.js'), SlashCommandBuilder = _a.SlashCommandBuilder, EmbedBuilder = _a.EmbedBuilder, userMention = _a.userMention, bold = _a.bold, hyperlink = _a.hyperlink;
var dotenv = require('dotenv');
dotenv.config();
var version = process.env.BOT_VERSION;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('credits')
        .setDescription('Creditos a los que ayudaron creando a Fakeri!'),
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var creditEmbed;
            return __generator(this, function (_a) {
                creditEmbed = new EmbedBuilder()
                    .setTitle('Creditos!')
                    .setDescription("Bot hecho en JavaScript con ".concat(hyperlink('Discord.JS', 'https://discordjs.guide/'), "!"))
                    .addFields({ name: bold('Desarrolladora principal'), value: "".concat(userMention('1011657604822474873'), "\n\n- Codigo\n- Multimedia 3D"), inline: true }, { name: bold('Supervisor creativo'), value: "".concat(userMention('743521074884640809'), "\n\n- Revisor de ideas y conceptos\n- Opiniones acerca de ideas y conceptos\n**- Nombre del Bot**"), inline: true }, { name: bold('Herramientas usadas'), value: '\n\n- Visual Studio Code\n- Blender 3.3.1\n- Adobe Photoshop 2023' })
                    .setFooter({ text: "Bot version: ".concat(version) })
                    .setColor('Gold');
                return [2 /*return*/, interaction.reply({ embeds: [creditEmbed] })];
            });
        });
    },
};
export {};

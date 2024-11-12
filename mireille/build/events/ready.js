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
var giftsDrop = require('../handlers/dropHandler').giftsDrop;
var figlet = require('figlet');
var chalk = require('chalk');
var ActivityType = require('discord.js').ActivityType;
var timeoutManager = require('../handlers/timeoutsHandler').timeoutManager;
module.exports = {
    name: 'ready',
    once: true,
    execute: function (client) {
        return __awaiter(this, void 0, void 0, function () {
            var botStatuses;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        botStatuses = [
                            { name: 'Aelram', type: ActivityType.Watching },
                            { name: 'El Evento', type: ActivityType.Competing },
                            { name: 'Comprenle a Nora!', type: ActivityType.Streaming },
                            { name: 'Es Faker Cry pero no le digan a Luis', type: ActivityType.Watching },
                            { name: 'Cuidado con la muerte! Se pueden morir.', type: ActivityType.Playing },
                            { name: 'Nuevas misiones el 5 de Enero', type: ActivityType.Playing },
                            { name: 'Tilin es el impostor', type: ActivityType.Streaming },
                            { name: 'Que bacaneria, aqui con mi compa, Ete Sech', type: ActivityType.Listening },
                            { name: 'La cumbia del tilin', type: ActivityType.Listening },
                            { name: 'Luis haga stream', type: ActivityType.Streaming },
                            { name: 'Navidad se acaba cuando se acabe el Evento', type: ActivityType.Playing },
                            { name: 'Esos regalos se ven jugosos', type: ActivityType.Watching },
                            { name: 'Abrir regalos', type: ActivityType.Playing },
                            { name: 'Le quiero poner un apodo a Luis pero no se me ocurre nada', type: ActivityType.Competing },
                            { name: 'Arissa es muy amable, pero cruel cuando debe', type: ActivityType.Watching },
                            { name: 'Abe tiene 60 años por si no sabian', type: ActivityType.Playing },
                            { name: 'Lyra no piensa antes de meterse primera en la batalla', type: ActivityType.Watching },
                            { name: 'Nora a veces es como si fuera fria', type: ActivityType.Watching },
                            { name: 'Si ven bugs o comportamiento inesperado, reportenlo!', type: ActivityType.Playing },
                            { name: 'Hagamos golpe de estado a este server...', type: ActivityType.Playing },
                            { name: 'Aqui con mi compa, Ete Sech', type: ActivityType.Playing },
                            { name: 'So - El gran comediante Contodocirco', type: ActivityType.Playing },
                            { name: 'Que - Persona que no tuvo cuidado', type: ActivityType.Playing },
                            { name: 'No.. no le creo que sech era el impostor', type: ActivityType.Playing },
                            { name: '"Fakeri" fue todo idea de Luis, molesta mucho con eso de Faker Pipipi', type: ActivityType.Playing },
                            { name: 'Luis es super raro', type: ActivityType.Playing },
                            { name: 'Mucho Luis pero es que la creadora mia esta obsesionada', type: ActivityType.Watching },
                            { name: 'Guerra Civil', type: ActivityType.Streaming },
                            { name: 'meow', type: ActivityType.Playing },
                            { name: 'Arissa podria tener un crush en alguien', type: ActivityType.Watching },
                            { name: 'Abe sera inmortal? Yo digo que si', type: ActivityType.Watching },
                            { name: 'La espada de Lyra es hecha de un material muy especial', type: ActivityType.Watching },
                            { name: 'Diganle a Luis que no se olvide de hacer stream', type: ActivityType.Playing },
                            { name: 'Contododinero', type: ActivityType.Watching },
                            { name: 'Pa cuando nuevo video Luis', type: ActivityType.Watching },
                            { name: 'No olviden de comprar consumibles!', type: ActivityType.Playing },
                            { name: 'Los monstruos elite dan 30% mas de recompensas', type: ActivityType.Playing },
                            { name: 'Los monstruos ganan una cantidad considerable de stats dependiendo del LVL del jugador', type: ActivityType.Playing },
                            { name: 'El nivel maximo que pueden obtener es 100!', type: ActivityType.Streaming },
                            { name: 'El torneo de Luis', type: ActivityType.Competing },
                            { name: 'No se olviden de completar las misiones!', type: ActivityType.Watching },
                            { name: 'ttv/luisyepez221 c:', type: ActivityType.Watching },
                            { name: 'No olviden comprar consumibles y armaduras!', type: ActivityType.Playing },
                            { name: 'Equipen objetos con /inventory', type: ActivityType.Playing },
                            { name: 'Si me gustan mucho los gatos', type: ActivityType.Playing },
                            { name: 'Codigo LUISIN en la tienda', type: ActivityType.Playing },
                            { name: 'Lu', type: ActivityType.Watching },
                            { name: 'Muchos bugs y comportamientos inesperados...', type: ActivityType.Watching },
                            { name: 'WoW tilin', type: ActivityType.Listening },
                            { name: '221', type: ActivityType.Playing },
                            { name: 'Ayeye', type: ActivityType.Playing },
                            { name: 'Son Robots!', type: ActivityType.Watching },
                            { name: 'Jojos', type: ActivityType.Watching },
                            { name: 'Faker Whats was that', type: ActivityType.Listening },
                            { name: 'Faker pipipi 2', type: ActivityType.Playing },
                        ];
                        client.user.setPresence({ activities: [botStatuses[Math.floor(Math.random() * botStatuses.length)]] });
                        // Choose a random status from botStatuses and set it to the client
                        setInterval(function (bot, statuses) {
                            bot.user.setPresence({ activities: [statuses[Math.floor(Math.random() * statuses.length)]] });
                        }, 6e5, client, botStatuses);
                        return [4 /*yield*/, giftsDrop(client)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, timeoutManager(client)];
                    case 2:
                        _a.sent();
                        setInterval(function (botClient) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, giftsDrop(botClient)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, (36e5 * 24), client);
                        figlet('Fakeri', {
                            font: 'Graffiti',
                            horizontalLayout: 'default',
                            verticalLayout: 'default',
                            width: 80,
                            whitespaceBreak: true,
                        }, function (err, data) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            console.log(chalk.blueBright(data));
                            figlet('Online', {
                                font: 'Graffiti',
                                horizontalLayout: 'default',
                                verticalLayout: 'default',
                                width: 80,
                                whitespaceBreak: true,
                            }, function (err, dataOnline) {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                                console.log(chalk.greenBright(dataOnline));
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
};
export {};

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
var _a = require('discord.js'), SlashCommandBuilder = _a.SlashCommandBuilder, EmbedBuilder = _a.EmbedBuilder, userMention = _a.userMention;
var firebaseConfig = require('../firebaseConfig.js').firebaseConfig;
var _b = require('firebase/firestore'), getFirestore = _b.getFirestore, doc = _b.doc, getDoc = _b.getDoc, setDoc = _b.setDoc, updateDoc = _b.updateDoc;
var initializeApp = require('firebase/app').initializeApp;
var app = initializeApp(firebaseConfig);
var db = getFirestore(app);
var ReadText = require('text-from-image');
var fetch = require('node-fetch');
var ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffprobePath = require('ffprobe-static').path;
var ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfprobePath(ffprobePath);
ffmpeg.setFfmpegPath(ffmpegPath);
var Buffer = require('buffer').Buffer;
var fs = require('node:fs');
var imageToChunks = require('split-images').imageToChunks;
var sizeOf = require('image-size');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('duel')
        .setDescription('Start a duel with someone!')
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('start')
            .setDescription('Starts a duel battle.')
            .addUserOption(function (option) {
            return option.setName('with')
                .setDescription('The person to duel with.')
                .setRequired(true);
        });
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('accept')
            .setDescription('Accepts a duel challenge. (This command will instantly start the duel)')
            .addIntegerOption(function (option) {
            return option.setName('number')
                .setDescription('Number of the request to accept')
                .setRequired(true);
        });
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('requests')
            .setDescription('Lists all your duel challenges.');
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('ban')
            .setDescription('Bans a GIF on a duel.')
            .addStringOption(function (option) {
            return option.setName('link')
                .setDescription('The URL to the GIF to ban. (Only available on a Duel Thread)')
                .setRequired(true);
        });
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('surrender')
            .setDescription('Surrenders duel you are on. (Only available on a Duel Thread)');
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('forfeit')
            .setDescription('Surrenders duel you are on. (Only available on a Duel Thread)');
    })
        .addSubcommand(function (subcommand) {
        return subcommand
            .setName('ff')
            .setDescription('Surrenders duel you are on. (Only available on a Duel Thread)');
    }),
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, duel(interaction)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
};
function duel(interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var docRef, docSnap, listString, i, element, ListEmbed, docRef, docSnap, pendingRequests, i, element, duelPlayers_1, docRef, docSnap, element, thread, sides, duelInfo, sideEmbed, duelEmbed, player1, player2, query, duelInfoRef, duelInfoDocSnap, urlOption_1, urlRegex, player1, player2, query_1, duelInfoRef, duelInfoDocSnap_1;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    if (!(interaction.options.getSubcommand() === 'requests')) return [3 /*break*/, 2];
                    docRef = doc(db, interaction.user.id, 'PendingRequests');
                    return [4 /*yield*/, getDoc(docRef)];
                case 1:
                    docSnap = _k.sent();
                    if (docSnap.exists()) {
                        listString = ' ';
                        for (i = 0; i < 10; i++) {
                            if (docSnap.data()["duel".concat(i)]) {
                                element = docSnap.data()["duel".concat(i)];
                                listString += "\n".concat(i, " |- ").concat(userMention(element[0]), " / Duel mode: ").concat(element[1]);
                            }
                        }
                        console.log(listString);
                        ListEmbed = new EmbedBuilder()
                            .setColor(0x0099FF)
                            .setTitle('Challenges pending:')
                            .setDescription("You can have up to 10 requests.\n".concat(listString))
                            .setFooter({ text: 'You can accept any request by using /duel accept [number]' });
                        return [2 /*return*/, interaction.reply({
                                content: 'Pending requests:',
                                ephemeral: true,
                                embeds: [ListEmbed],
                            })];
                    }
                    else {
                        // doc.data() will be undefined in this case
                        console.log('No such document!');
                    }
                    _k.label = 2;
                case 2:
                    if (!(interaction.options.getSubcommand() === 'start')) return [3 /*break*/, 5];
                    docRef = doc(db, interaction.options.getUser('with').id, 'PendingRequests');
                    return [4 /*yield*/, getDoc(docRef)];
                case 3:
                    docSnap = _k.sent();
                    pendingRequests = 0;
                    if (docSnap.exists()) {
                        for (i = 0; i < 10; i++) {
                            if (docSnap.data()["duel".concat(i)]) {
                                element = docSnap.data()["duel".concat(i)];
                                if (element[0] === interaction.user.id) {
                                    return [2 /*return*/, interaction.reply({ content: 'You have already sent a duel challenge to this user! Wait for them to accept.', ephemeral: true })];
                                }
                                pendingRequests++;
                            }
                        }
                    }
                    return [4 /*yield*/, setDoc(doc(db, interaction.options.getUser('with').id, 'PendingRequests'), (_a = {},
                            _a["duel".concat(pendingRequests + 1)] = [
                                interaction.user.id,
                                'GIF Duel',
                                false,
                            ],
                            _a), { merge: true })];
                case 4:
                    _k.sent();
                    return [2 /*return*/, interaction.reply("A duel challenge to ".concat(userMention(interaction.options.getUser('with').id), " has been sent. They now have to accept."))];
                case 5:
                    if (!(interaction.options.getSubcommand() === 'accept')) return [3 /*break*/, 11];
                    duelPlayers_1 = [];
                    docRef = doc(db, interaction.user.id, 'PendingRequests');
                    return [4 /*yield*/, getDoc(docRef)];
                case 6:
                    docSnap = _k.sent();
                    if (!docSnap.exists()) return [3 /*break*/, 8];
                    element = docSnap.data()["duel".concat(interaction.options.getInteger('number'))];
                    duelPlayers_1.push(interaction.user);
                    return [4 /*yield*/, interaction.client.users.fetch(element[0]).then(function (usr) {
                            duelPlayers_1.push(usr.username);
                            duelPlayers_1.push(usr.id);
                        })];
                case 7:
                    _k.sent();
                    _k.label = 8;
                case 8:
                    console.log('Step 1 of 3\nCreating duel thread...');
                    return [4 /*yield*/, interaction.channel.threads.create({
                            name: "".concat(duelPlayers_1[0].username, " vs ").concat(duelPlayers_1[1]),
                            autoArchiveDuration: 60,
                            reason: 'Needed a separate thread for duel',
                        })];
                case 9:
                    thread = _k.sent();
                    interaction.reply({ content: "Thread for duel has been created: <#".concat(thread.id, ">"), ephemeral: true });
                    console.log("Created thread: ".concat(thread.name, " with ID ").concat(thread.id, "\n\nStep 1 of 3 succeeded\nProceeding with step 2 of 3:\nCreating documents in DB..."));
                    console.log(interaction);
                    sides = ['blue', 'red'];
                    duelInfo = (_b = {},
                        _b[duelPlayers_1[0].id] = { side: sides[Math.floor(Math.random() * sides.length)] },
                        _b[duelPlayers_1[2]] = { side: sides[Math.floor(Math.random() * sides.length)] },
                        _b);
                    if (duelInfo[duelPlayers_1[0].id].side == duelInfo[duelPlayers_1[2]].side) {
                        console.log('The players have the same side, assigning correct sides.');
                        duelInfo[duelPlayers_1[2]].side = sides[(sides.indexOf(duelInfo[duelPlayers_1[2]].side)) == 0 ? 1 : 0];
                        console.log('The players now have the correct sides.');
                    }
                    return [4 /*yield*/, setDoc(doc(db, interaction.guildId, 'ActiveDuels'), (_c = {},
                            _c["".concat(duelPlayers_1[0].username, "|").concat(duelPlayers_1[1])] = {
                                player1: duelPlayers_1[0].id,
                                player2: duelPlayers_1[2],
                                gamemode: 'GIF Duel',
                                ended: false,
                                winner: 'empty',
                                ban_turn: 'red',
                                duelInfo: {
                                    bans: {
                                        red_ban_1: 'empty',
                                        red_ban_2: 'empty',
                                        blue_ban_1: 'empty',
                                        blue_ban_2: 'empty',
                                    },
                                    sides: {
                                        red_side: (duelInfo[duelPlayers_1[0].id].side) == 'red' ? duelPlayers_1[0].id : duelPlayers_1[2],
                                        blue_side: (duelInfo[duelPlayers_1[0].id].side) == 'red' ? duelPlayers_1[2] : duelPlayers_1[0].id,
                                    },
                                    red_side_hp: 2,
                                    blue_side_hp: 2,
                                    turn: 'blue',
                                },
                            },
                            _c), { merge: true })];
                case 10:
                    _k.sent();
                    console.log('Documents in DB created successfully\n\nProceeding with step 3 of 3:\nSending instructions in thread...');
                    console.log(duelInfo);
                    sideEmbed = new EmbedBuilder()
                        .setColor(0x0099ff)
                        .setTitle('Sides for each player')
                        .addFields({
                        name: '\u200b',
                        value: "".concat(userMention(duelPlayers_1[0].id), " side: ").concat(duelInfo[duelPlayers_1[0].id].side),
                    }, {
                        name: '\u200b',
                        value: "".concat(userMention(duelPlayers_1[2]), " side: ").concat(duelInfo[duelPlayers_1[2]].side),
                    });
                    duelEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('GIF Duel')
                        .setDescription('¡Buena suerte!\n\n')
                        .addFields({
                        name: 'Reglas',
                        value: 'Mejor de 5\nPrimero a 3\n\nHay dos bandos en este juego: bando azul, y bando rojo.\nAl inicio del duelo se eligen aleatoriamente los bandos\n\nEl bando azul tiene que atacar con GIFs de "Hello Chat".\nEl bando rojo tiene que defender el ataque con GIFs de "Goodbye Chat"\nEl GIF de "Goodbye Chat" tiene que corresponder al de "Hello Chat".\n\nSi el bando rojo no puede defender, este mismo bando pierde 1 punto de vida (PV).\nCada bando tiene 2 PV.\n\n',
                    }, {
                        name: '\u200b',
                        'value': '**Fase de baneos**\nEn esta fase, el bando rojo puede prohibir 2 GIFs de "Hello Chat"\nY el bando azul puede prohibir 2 potenciadores, luego comienza la fase de selección.\n\nEl bando rojo banea primero.\n\n**Fase de selecciónes**\nEn esta fase, cada lado puede elegir 2 potenciadores para usar, una vez se haya elegido un potenciador para un bando, el otro bando no puede elegir el mismo potenciador.\nEl bando rojo elige primero y luego el bando azul. Turnandose.\n\nEl que pierde la primera ronda elige su bando en la siguiente ronda.\n\n**Potenciadores**\nPuedes cargar tu barra de potenciadores atacando o defendiendo, una vez que tu barra esté completamente cargada, puedes usar uno de los potenciadores que elegiste.\n\n**__Tienes 5 minutos para hacer tu jugada:__**\nSi no haces nada en tu turno, pierdes 1 PV, ya sea que estés en el lado rojo o en el lado azul.\n',
                    }, {
                        name: 'Comandos',
                        value: 'Puedes usar `/duel ban [enlace del GIF]` para banear un GIF\nUsa `/duel pick [Nombre del potenciador]`para elegir un potenciador\nEs posible usar `/ff`, `/duel surrender` o `/duel forfeit` para rendirse del duelo.',
                    });
                    thread.send({
                        content: "Bienvenidos al Duelo Epico de GIFs:\n".concat(userMention(duelPlayers_1[0].id), " vs ").concat(userMention(duelPlayers_1[2])),
                        embeds: [duelEmbed, sideEmbed],
                    });
                    console.log('Instructions sent in thread successfuly.');
                    duelGameFlow(thread, interaction);
                    _k.label = 11;
                case 11:
                    if (!(interaction.options.getSubcommand() === 'ban')) return [3 /*break*/, 26];
                    player1 = void 0;
                    player2 = void 0;
                    if (interaction.channel.isThread()) {
                        player1 = interaction.channel.name.split(' ')[0];
                        player2 = interaction.channel.name.split(' ')[2];
                    }
                    else {
                        interaction.reply({ content: 'You are not on an active Duel Thread!', ephemeral: true });
                        return [2 /*return*/];
                    }
                    query = '';
                    if (interaction.user.username == player1 || interaction.user.username == player2) {
                        query = "".concat(player1, "|").concat(player2);
                        console.log(query);
                    }
                    duelInfoRef = doc(db, interaction.guildId, 'ActiveDuels');
                    return [4 /*yield*/, getDoc(duelInfoRef)];
                case 12:
                    duelInfoDocSnap = _k.sent();
                    if (!duelInfoDocSnap.exists()) return [3 /*break*/, 26];
                    console.log((!duelInfoDocSnap.data()[query]) ? 'non existent' : 'exists');
                    console.log(duelInfoDocSnap.data()[query].duelInfo);
                    if (!duelInfoDocSnap.data()[query]) {
                        return [2 /*return*/, interaction.reply({ content: 'You don\'t seem to be participating on an active duel!', ephemeral: true })];
                    }
                    urlOption_1 = interaction.options.getString('link');
                    if (urlOption_1.includes('tenor')) {
                        urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
                        if (urlRegex.exec(urlOption_1) == 0) {
                            return [2 /*return*/, interaction.reply({ content: 'The URL provided is not a valid URL!', ephemeral: true })];
                        }
                    }
                    else {
                        return [2 /*return*/, interaction.reply({ content: 'The URL provided is not a valid URL!', ephemeral: true })];
                    }
                    if (!(interaction.user.id == duelInfoDocSnap.data()[query].duelInfo.sides.red_side)) return [3 /*break*/, 20];
                    console.log('User is in the red side');
                    if (!(duelInfoDocSnap.data()[query].ban_turn == 'red')) return [3 /*break*/, 18];
                    if (!(duelInfoDocSnap.data()[query].duelInfo.bans.red_ban_1 == 'empty')) return [3 /*break*/, 14];
                    return [4 /*yield*/, updateDoc(duelInfoRef, (_d = {},
                            _d["".concat(query, ".duelInfo.bans.red_ban_1")] = urlOption_1,
                            _d["".concat(query, ".ban_turn")] = 'blue',
                            _d)).then(function () {
                            return interaction.reply("\uD83D\uDD34 ".concat(userMention(interaction.user.id), "> has banned a GIF: ").concat(urlOption_1, "\nBans remaining: 1"));
                        }).catch(function () {
                            return interaction.reply({ content: 'There was an error banning your GIF!', ephemeral: true });
                        })];
                case 13:
                    _k.sent();
                    return [3 /*break*/, 17];
                case 14:
                    if (!(duelInfoDocSnap.data()[query].duelInfo.bans.red_ban_2 == 'empty')) return [3 /*break*/, 16];
                    return [4 /*yield*/, updateDoc(duelInfoRef, (_e = {},
                            _e["".concat(query, ".duelInfo.bans.red_ban_2")] = urlOption_1,
                            _e["".concat(query, ".ban_turn")] = 'blue',
                            _e)).then(function () {
                            return interaction.reply("\uD83D\uDD34 ".concat(userMention(interaction.user.id), "> has banned a GIF: ").concat(urlOption_1, "\nBans remaining: 0"));
                        }).catch(function () {
                            return interaction.reply({ content: 'There was an error banning your GIF!', ephemeral: true });
                        })];
                case 15:
                    _k.sent();
                    return [3 /*break*/, 17];
                case 16: return [2 /*return*/, interaction.reply({ content: 'You have no more bans left!', ephemeral: true })];
                case 17: return [3 /*break*/, 19];
                case 18: return [2 /*return*/, interaction.reply({ content: 'It\'s not your turn to ban!', ephemeral: true })];
                case 19: return [3 /*break*/, 25];
                case 20:
                    if (!(interaction.user.id == duelInfoDocSnap.data()[query].duelInfo.sides.blue_side)) return [3 /*break*/, 25];
                    console.log('User is in the blue side');
                    if (!(duelInfoDocSnap.data()[query].duelInfo.bans.blue_ban_1 == 'empty')) return [3 /*break*/, 22];
                    return [4 /*yield*/, updateDoc(duelInfoRef, (_f = {},
                            _f["".concat(query, ".duelInfo.bans.blue_ban_1")] = urlOption_1,
                            _f["".concat(query, ".ban_turn")] = 'red',
                            _f)).then(function () {
                            return interaction.reply("\uD83D\uDD37 <@".concat(interaction.user.id, "> has banned a GIF: ").concat(urlOption_1, "\nBans remaining: 1"));
                        }).catch(function () {
                            return interaction.reply({ content: 'There was an error banning your GIF!', ephemeral: true });
                        })];
                case 21:
                    _k.sent();
                    return [3 /*break*/, 25];
                case 22:
                    if (!(duelInfoDocSnap.data()[query].duelInfo.bans.blue_ban_2 == 'empty')) return [3 /*break*/, 24];
                    return [4 /*yield*/, updateDoc(duelInfoRef, (_g = {},
                            _g["".concat(query, ".duelInfo.bans.blue_ban_2")] = urlOption_1,
                            _g["".concat(query, ".ban_turn")] = 'red',
                            _g)).then(function () {
                            return interaction.reply("\uD83D\uDD37 <@".concat(interaction.user.id, "> has banned a GIF: ").concat(urlOption_1, "\nBans remaining: 0"));
                        }).catch(function () {
                            return interaction.reply({ content: 'There was an error banning your GIF!', ephemeral: true });
                        })];
                case 23:
                    _k.sent();
                    return [3 /*break*/, 25];
                case 24: return [2 /*return*/, interaction.reply({ content: 'You have no more bans left!', ephemeral: true })];
                case 25:
                    console.log(duelInfoDocSnap.data()[query].duelInfo.bans);
                    _k.label = 26;
                case 26:
                    if (!(interaction.options.getSubcommand() == 'ff' || interaction.options.getSubcommand() == 'forfeit' || interaction.options.getSubcommand() == 'surrender')) return [3 /*break*/, 31];
                    player1 = void 0;
                    player2 = void 0;
                    if (interaction.channel.isThread()) {
                        player1 = interaction.channel.name.split(' ')[0];
                        player2 = interaction.channel.name.split(' ')[2];
                    }
                    else {
                        interaction.reply({ content: 'You are not on an active Duel Thread!', ephemeral: true });
                        return [2 /*return*/];
                    }
                    query_1 = '';
                    if (interaction.user.username == player1 || interaction.user.username == player2) {
                        query_1 = "".concat(player1, "|").concat(player2);
                        console.log(query_1);
                    }
                    duelInfoRef = doc(db, interaction.guildId, 'ActiveDuels');
                    return [4 /*yield*/, getDoc(duelInfoRef)];
                case 27:
                    duelInfoDocSnap_1 = _k.sent();
                    if (!duelInfoDocSnap_1.exists()) return [3 /*break*/, 31];
                    console.log((!duelInfoDocSnap_1.data()[query_1]) ? 'non existent' : 'exists');
                    console.log(duelInfoDocSnap_1.data()[query_1].duelInfo);
                    if (!duelInfoDocSnap_1.data()[query_1]) {
                        return [2 /*return*/, interaction.reply({ content: 'You don\'t seem to be participating on an active duel!', ephemeral: true })];
                    }
                    if (!(interaction.user.id == duelInfoDocSnap_1.data()[query_1].duelInfo.sides.blue_side)) return [3 /*break*/, 29];
                    return [4 /*yield*/, updateDoc(duelInfoRef, (_h = {},
                            _h["".concat(query_1, ".winner")] = 'red',
                            _h)).then(function () {
                            return interaction.reply("\uD83D\uDD37 <@".concat(interaction.user.id, "> has surrendered the duel!\n\n\uD83D\uDD34 <@").concat(duelInfoDocSnap_1.data()[query_1].duelInfo.sides.red_side, "> wins the duel!"));
                        }).catch(function () {
                            return interaction.reply({ content: 'There was an error!', ephemeral: true });
                        })];
                case 28:
                    _k.sent();
                    _k.label = 29;
                case 29: return [4 /*yield*/, updateDoc(duelInfoRef, (_j = {},
                        _j["".concat(query_1, ".winner")] = 'blue',
                        _j)).then(function () {
                        return interaction.reply("\uD83D\uDD34 <@".concat(interaction.user.id, "> has surrendered the duel!\n\n\uD83D\uDD37 <@").concat(duelInfoDocSnap_1.data()[query_1].duelInfo.sides.blue_side, "> wins the duel!"));
                    }).catch(function () {
                        return interaction.reply({ content: 'There was an error!', ephemeral: true });
                    })];
                case 30:
                    _k.sent();
                    _k.label = 31;
                case 31: return [2 /*return*/];
            }
        });
    });
}
function duelGameFlow(thread, interaction) {
    return __awaiter(this, void 0, void 0, function () {
        var filterGifs, gifsCollector;
        var _this = this;
        return __generator(this, function (_a) {
            console.log(interaction.client);
            filterGifs = function (m) { return m.content.toLowerCase().includes('tenor') && m.author != interaction.client.user.id; };
            gifsCollector = thread.createMessageCollector({ filter: filterGifs, time: 9999 * 9999 });
            gifsCollector.on('collect', function (m) { return __awaiter(_this, void 0, void 0, function () {
                var player1, player2, turn, opponentSide, opponentID, duelInfoRef, duelInfoDocSnap, query, msgAuthorSide;
                var _this = this;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            console.log("Collected ".concat(m.attachments));
                            console.log((_b = (_a = m.embeds[0]) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.video);
                            if (thread.isThread()) {
                                player1 = thread.name.split('vs')[0];
                                player2 = thread.name.split('vs')[1];
                            }
                            console.log(thread.name, m);
                            duelInfoRef = doc(db, interaction.guildId, 'ActiveDuels');
                            return [4 /*yield*/, getDoc(duelInfoRef)];
                        case 1:
                            duelInfoDocSnap = _d.sent();
                            query = '';
                            console.log(m.author.username, (m.author.username == player1));
                            if (m.author.username == player1 || m.author.username == player2) {
                                query = "".concat(player1, "|").concat(player2);
                                console.log(query);
                            }
                            if (duelInfoDocSnap.exists()) {
                                if (!duelInfoDocSnap.data()[query]) {
                                    console.log('Non existant');
                                    return [2 /*return*/];
                                }
                                console.log(duelInfoDocSnap.data()[query].duelInfo.bans, typeof duelInfoDocSnap.data()[query].duelInfo.bans);
                                msgAuthorSide = (m.author.id == duelInfoDocSnap.data()[query].duelInfo.sides.blue_side) ? 'blue' : 'red';
                                turn = duelInfoDocSnap.data()[query].duelInfo.turn;
                                opponentSide = (msgAuthorSide == 'blue') ? 'red' : 'blue';
                                opponentID = duelInfoDocSnap.data()[query].duelInfo.sides["".concat(opponentSide, "_side")];
                                Object.values(duelInfoDocSnap.data()[query].duelInfo.bans).forEach(function (value) {
                                    console.log(value);
                                    if (m.content == value) {
                                        m.channel.send("<@".concat(m.author.id, "> sent a banned GIF: ").concat(m.content));
                                        m.delete();
                                    }
                                });
                            }
                            return [4 /*yield*/, fetchFile((_c = m.embeds[0]) === null || _c === void 0 ? void 0 : _c.data.video.url).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                    var processMsg;
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                m.channel.send('Processing GIF...').then(function (message) {
                                                    processMsg = message;
                                                });
                                                console.log('bruh!');
                                                return [4 /*yield*/, mp4toframe('C:/Users/djblu/BattleBot/tenorgif.mp4', './').then(function () { return __awaiter(_this, void 0, void 0, function () {
                                                        var _this = this;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, ReadText('./tn.png').then(function (text) { return __awaiter(_this, void 0, void 0, function () {
                                                                        var dimensions, chunkSize, tests_1;
                                                                        var _this = this;
                                                                        return __generator(this, function (_a) {
                                                                            switch (_a.label) {
                                                                                case 0:
                                                                                    console.log(text);
                                                                                    if (!(!text.toLowerCase().includes('hello chat') && !text.toLowerCase().includes('goodbye chat'))) return [3 /*break*/, 4];
                                                                                    dimensions = sizeOf('./tn.png');
                                                                                    chunkSize = dimensions.height / 2;
                                                                                    return [4 /*yield*/, imageToChunks('./tn.png', chunkSize).then(function (chunks) {
                                                                                            var i = 0;
                                                                                            chunks.forEach(function (c) {
                                                                                                i++;
                                                                                                fs.writeFileSync("slice_".concat(i, ".png"), c);
                                                                                            });
                                                                                        })];
                                                                                case 1:
                                                                                    _a.sent();
                                                                                    tests_1 = { slice1: 'pending', slice2: 'pending' };
                                                                                    return [4 /*yield*/, ReadText('./slice_1.png').then(function (textSlice1) {
                                                                                            console.log(textSlice1);
                                                                                            if (!textSlice1.toLowerCase().includes('hello chat') || !textSlice1.toLowerCase().includes('goodbye chat')) {
                                                                                                console.log('Failed text extraction of Slice 1');
                                                                                                tests_1.slice1 = 'failed';
                                                                                            }
                                                                                        })];
                                                                                case 2:
                                                                                    _a.sent();
                                                                                    return [4 /*yield*/, ReadText('./slice_2.png').then(function (textSlice2) {
                                                                                            console.log(textSlice2);
                                                                                            if (!textSlice2.toLowerCase().includes('hello chat') || !textSlice2.toLowerCase().includes('goodbye chat')) {
                                                                                                console.log('Failed text extraction of Slice 2');
                                                                                                tests_1.slice2 = 'failed';
                                                                                            }
                                                                                        })];
                                                                                case 3:
                                                                                    _a.sent();
                                                                                    if (tests_1.slice1 && tests_1.slice2 == 'failed') {
                                                                                        m.reply("I could not read the GIF text!\n".concat((opponentSide == 'red') ? '🔴🛡️' : '🗡️🔷', " <@").concat(opponentID, "> has 1 minute to verify the GIF previously sent.\n\nSend 'verify' to verify that the GIF is valid!\nOR 'invalid' to invalidate the GIF (Don't do this in bad faith)"))
                                                                                            .then(function (msg) {
                                                                                            var filter = function (response) {
                                                                                                if (response.author.id == opponentID) {
                                                                                                    return (response.content.toLowerCase() == 'verify' || response.content.toLowerCase() == 'invalid');
                                                                                                }
                                                                                            };
                                                                                            msg.channel.awaitMessages({ filter: filter, max: 1, time: 60000, errors: ['time'] })
                                                                                                .then(function (collected) { return __awaiter(_this, void 0, void 0, function () {
                                                                                                var _a;
                                                                                                return __generator(this, function (_b) {
                                                                                                    switch (_b.label) {
                                                                                                        case 0:
                                                                                                            if (!(collected.first().content == 'verify')) return [3 /*break*/, 2];
                                                                                                            collected.first().reply("".concat((msgAuthorSide == 'red') ? '🔴🛡️' : '🗡️🔷', " <@").concat(m.author.id, ">'s GIF has been verified."));
                                                                                                            return [4 /*yield*/, updateDoc(duelInfoRef, (_a = {},
                                                                                                                    _a["".concat(query, ".duelInfo.turn")] = 'red',
                                                                                                                    _a)).then(function () {
                                                                                                                    m.channel.send("It's red side turn now! ".concat((opponentSide == 'red') ? '🔴🛡️' : '🗡️🔷', " <@").concat(opponentID, ">"));
                                                                                                                })];
                                                                                                        case 1:
                                                                                                            _b.sent();
                                                                                                            return [2 /*return*/];
                                                                                                        case 2:
                                                                                                            collected.first().reply("".concat((msgAuthorSide == 'red') ? '🔴🛡️' : '🗡️🔷', " <@").concat(m.author.id, ">'s GIF has been invalidated, please send a valid GIF for your side!"));
                                                                                                            return [2 /*return*/];
                                                                                                    }
                                                                                                });
                                                                                            }); });
                                                                                        });
                                                                                    }
                                                                                    _a.label = 4;
                                                                                case 4:
                                                                                    if (msgAuthorSide == 'blue' && text.toLowerCase().includes('hello chat') && turn == 'blue') {
                                                                                        processMsg.edit('Text extracted.\nGIF is valid for your side.').then(function (msg) { return __awaiter(_this, void 0, void 0, function () {
                                                                                            var _a;
                                                                                            return __generator(this, function (_b) {
                                                                                                switch (_b.label) {
                                                                                                    case 0: return [4 /*yield*/, updateDoc(duelInfoRef, (_a = {},
                                                                                                            _a["".concat(query, ".duelInfo.turn")] = 'red',
                                                                                                            _a)).then(function () {
                                                                                                            msg.channel.send("It's red side turn now! ".concat((opponentSide == 'red') ? '🔴🛡️' : '🗡️🔷', " <@").concat(opponentID, ">"));
                                                                                                        })];
                                                                                                    case 1:
                                                                                                        _b.sent();
                                                                                                        setTimeout(function () { return msg.delete(); }, 4000);
                                                                                                        return [2 /*return*/];
                                                                                                }
                                                                                            });
                                                                                        }); });
                                                                                    }
                                                                                    else if (msgAuthorSide == 'blue' && turn != 'blue') {
                                                                                        processMsg.edit('It\'s not your turn!').then(function (msg) {
                                                                                            setTimeout(msg.delete(), 5000);
                                                                                        });
                                                                                    }
                                                                                    if (msgAuthorSide == 'red' && text.toLowerCase().includes('goodbye chat') && turn == 'red') {
                                                                                        processMsg.edit('Text extracted.\nGIF is valid for your side.').then(function (msg) { return __awaiter(_this, void 0, void 0, function () {
                                                                                            var _a;
                                                                                            return __generator(this, function (_b) {
                                                                                                switch (_b.label) {
                                                                                                    case 0: return [4 /*yield*/, updateDoc(duelInfoRef, (_a = {},
                                                                                                            _a["".concat(query, ".duelInfo.turn")] = 'blue',
                                                                                                            _a)).then(function () {
                                                                                                            msg.channel.send("It's blue side turn now! ".concat((opponentSide == 'red') ? '🔴🛡️' : '🗡️🔷', " <@").concat(opponentID, ">"));
                                                                                                        })];
                                                                                                    case 1:
                                                                                                        _b.sent();
                                                                                                        setTimeout(function () { return msg.delete(); }, 4000);
                                                                                                        return [2 /*return*/];
                                                                                                }
                                                                                            });
                                                                                        }); });
                                                                                    }
                                                                                    else if (msgAuthorSide == 'blue' && turn != 'blue') {
                                                                                        processMsg.edit('It\'s not your turn!').then(function (msg) {
                                                                                            setTimeout(msg.delete(), 5000);
                                                                                        });
                                                                                    }
                                                                                    return [2 /*return*/];
                                                                            }
                                                                        });
                                                                    }); }).catch(function (err) {
                                                                        console.log(err);
                                                                    })];
                                                                case 1:
                                                                    _a.sent();
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    }); })];
                                            case 1:
                                                _a.sent();
                                                console.log('hewo');
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            _d.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            gifsCollector.on('end', function (collected) {
                console.log("Collected ".concat(collected.size, " items"));
            });
            return [2 /*return*/];
        });
    });
}
function fetchFile(url) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url).then(function (resp) {
                        return resp.blob();
                    }).then(function (blob) {
                        return __awaiter(this, void 0, void 0, function () {
                            var buffer;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, blob.arrayBuffer()];
                                    case 1:
                                        buffer = _a.sent();
                                        buffer = Buffer.from(buffer);
                                        fs.createWriteStream('tenorgif.mp4').write(buffer);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function mp4toframe(url, des) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    ffmpeg(url)
                        .screenshots(({ count: 1, folder: des }))
                        .on('end', function () {
                        console.log('Finished proccessing video.');
                        resolve();
                    });
                })];
        });
    });
}
export {};

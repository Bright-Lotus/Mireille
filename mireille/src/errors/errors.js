import { EmbedBuilder, chatInputApplicationCommandMention } from 'discord.js';
import { CommandIds } from '../emums/commandIds';

/*
Error Code 0: NotEnoughGold: When there is not enough gold for purchases
Error Code 1: NotEnoughMana: When there is not enough mana for using an ability
Error Code 2: NotEnoughPermissions: When user does not have permissions for using a command
Error Code 3: AttackOnCooldown: When the attack is on cooldown and can't be used
Error Code 4: NotEnoughLevelForItem: When the player is underleveled for using a item
Error Code 5: NotEnoughLevelForZone: When the player is underleveled for a farming zone
Error Code 6: PlayerIsDead: When the player attempts to do an action in the event but is dead
Error Code 7: PlayerNotRegistered: When the player is not registered in the bot
Error Code 8: When the player has reached the maximum limit of 3 active battles at once
Error Code 9: When the interaction creator is not the owner of the original component
Error Code 10: Same as ERR C9
Error Code 11: When the interaction creator is not the owner of the dialog
Error Code 12: Zone is only for enchanters
Error Code 13: When the user is trying to equip an item that already is equipped
*/
const BotErrors = Object.freeze({
    NotEnoughGold: Symbol(0),
    NotEnoughMana: Symbol(1),
    NotEnoughPermissions: Symbol(2),
    AttackOnCooldown: Symbol(3),
    NotEnoughLevelForItem: Symbol(4),
    NotEnoughLevelForZone: Symbol(5),
    PlayerIsDead: Symbol(6),
    PlayerNotRegistered: Symbol(7),
    BattleLimitReached: Symbol(8),
    NotOwnerOfPagination: Symbol(9),
    NotOwnerOfInteraction: Symbol(10),
    NotOwnerOfDialog: Symbol(11),
    EnchanterOnlyZone: Symbol(12),
    ItemAlreadyEquipped: Symbol(13),
    DocumentsDoesNotExist: Symbol(14),
});

function ErrorEmbed(errorCode, args) {
    console.log(errorCode, args);
    switch (errorCode) {
        case BotErrors.NotEnoughGold:
            return new EmbedBuilder()
                .setColor('Red')
                .setAuthor({ name: 'Banco Aelram ◑ Rechazo' })
                .setTitle('No tienes suficiente dinero')
                .setDescription(args);

        case BotErrors.NotEnoughMana:
            return new EmbedBuilder()
                .setColor('DarkBlue')
                .setTitle('No tienes suficiente mana')
                .setDescription(args);

        case BotErrors.NotEnoughPermissions:
            return new EmbedBuilder()
                .setColor('Red')
                .setTitle('¡No tienes suficientes permisos!')
                .setDescription(args);

        case BotErrors.AttackOnCooldown:
            return new EmbedBuilder()
                .setColor('Red')
                .setTitle('¡Todavia no puedes atacar!')
                .setDescription(args);

        case BotErrors.NotEnoughLevelForItem:
            return new EmbedBuilder()
                .setColor('Red')
                .setTitle('¡No tienes el suficiente nivel para este item!')
                .setDescription(args);

        case BotErrors.NotEnoughLevelForZone:
            return new EmbedBuilder()
                .setColor('Red')
                .setTitle('No tienes el suficiente nivel para farmear en esta zona!')
                .setDescription(args);

        case BotErrors.PlayerIsDead:
            return new EmbedBuilder()
                .setColor('Red')
                .setTitle('¡Estas muerto!')
                .setDescription('No puedes usar esta accion.');

        case BotErrors.PlayerNotRegistered:
            return new EmbedBuilder()
                .setColor('Red')
                .setTitle('No estas registrado en el evento!')
                .setDescription(`Puedes usar ${chatInputApplicationCommandMention('register', CommandIds.Register)} para jugar en el evento!`);

        case BotErrors.BattleLimitReached:
            return new EmbedBuilder()
                .setColor('Red')
                .setTitle('Si te metes con otro enemigo...')
                .setDescription('¡Te van a abrumar!');

        case BotErrors.NotOwnerOfPagination:
            return new EmbedBuilder()
                .setColor('Red')
                .setTitle('¡Esta paginacion no es tuya!');

        case BotErrors.NotOwnerOfInteraction:
            return new EmbedBuilder()
                .setColor('Red')
                .setDescription('No puedes usar interacciones que no son tuyas')
                .setTitle('¡Esta interaccion no es tuya!');

        case BotErrors.NotOwnerOfDialog:
            return new EmbedBuilder()
                .setColor('Red')
                .setDescription('No puedes continuar un dialogo que no es tuyo')
                .setTitle('¡Este dialogo no es tuyo!');

        case BotErrors.EnchanterOnlyZone:
            return new EmbedBuilder()
                .setColor('Red')
                .setTitle('Esta zona esta hecha solo para **Enchanters**')
                .setDescription('Usa el canal respectivo para tu clase.');

        case BotErrors.ItemAlreadyEquipped:
            return new EmbedBuilder()
                .setColor('Red')
                .setTitle('¡Item ya equipado!')
                .setDescription('El item que quieres equipar ya esta equipado.');

        default:
            return new EmbedBuilder();
    }
}

export default { EventErrors: BotErrors, ErrorEmbed };
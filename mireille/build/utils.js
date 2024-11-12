import { formatEmoji } from 'discord.js';
import { Icons } from './emums/icons.js';
var ranges = [{
        divider: 1E3,
        suffix: 'K',
    }, {
        divider: 1E6,
        suffix: 'M',
    }, {
        divider: 1E9,
        suffix: 'B',
    }];
export var Utils = Object.freeze({
    NumberFormatWithLetter: function (input) {
        for (var index = ranges.length - 1; index >= 0; index--) {
            if (input > ranges[index].divider) {
                var quotient = input / ranges[index].divider;
                if (quotient < 10) {
                    quotient = Math.floor(quotient * 10) / 10;
                }
                else {
                    quotient = Math.floor(quotient);
                }
                return quotient.toString() + ranges[index].suffix;
            }
        }
        return input.toString();
    },
    HpEmoji: function (hp, maxHp) {
        var hpEmoji = '';
        var percentageOfMaxHp = (hp / maxHp) * 100;
        if (percentageOfMaxHp > 100) {
            hpEmoji = Icons.MoreThanFullHp;
        }
        else if (percentageOfMaxHp >= 75) {
            hpEmoji = Icons.FullHp;
        }
        else if (percentageOfMaxHp >= 50) {
            hpEmoji = Icons.SeventyFivePercentHp;
        }
        else if (percentageOfMaxHp >= 25) {
            hpEmoji = Icons.FiftyPercentHp;
        }
        else if (percentageOfMaxHp > 0) {
            hpEmoji = Icons.TwentyFivePercentHp;
        }
        else if (hp == 0) {
            hpEmoji = formatEmoji(Icons.DeadHp);
        }
        return hpEmoji;
    },
    FormatDescription: function (desc, item) {
        for (var _i = 0, _a = Object.entries(item); _i < _a.length; _i++) {
            var element = _a[_i];
            if (typeof element[1] != 'string' || !element[1].includes('/') || element[0] == 'desc')
                continue;
            console.log(element[1]);
            item[element[0]] = element[1].split('/')[0];
        }
        return desc.replace(/{(\w+)}/g, function (match, key) {
            return item[key];
        });
    },
    FormatStatName: function (stat) {
        switch (stat) {
            case 'manaPerAttack': return 'Mana PER ATTACK';
            case 'maxHp': return 'Max HP';
            case 'magicStrength': return 'Magic STRENGTH';
            case 'magicDurability': return 'Magic DURABILITY';
            case 'atk': return 'Attack POWER';
            case 'speed': return 'Speed';
            case 'hp': return 'Current HP';
            case 'armor': return 'Armor';
            default: return stat.toUpperCase();
        }
    },
    ClampNumber: function (number, min, max) {
        return Math.max(min, Math.min(number, max));
    },
    CapitalizeFirstLetter: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
});

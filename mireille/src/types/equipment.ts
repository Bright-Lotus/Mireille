import { ArmorPlate, Bow, Consumable, Sword, Wand } from './item.js';

export type Equipment = {
    armorPlates?: {
        amount: number,
        [key: `armorPlate${number}`]: ArmorPlate | undefined,
    },
    bows?: {
        amount: number,
        [key: `bow${number}`]: Bow | undefined,
    },
    swords?: {
        amount: number,
        [key: `sword${number}`]: Sword | undefined,
    },
    wands?: {
        amount: number,
        [key: `wand${number}`]: Wand | undefined,
    },
    consumables?: {
        amount: number,
        [key: `consumable${number}`]: Consumable | undefined,
    }
}

export type Equipped = {
    abilityOrbs?: {
        orb1?: string,
        orb2?: string,
        orb3?: string,
    },
    bow?: { id: string },
    sword?: { id: string },
    wand?: { id: string },
    onAttack?: OnAttack[],
    onEnemyAttack?: OnAttack[],
    armorPlate?: { id: string },
}

export type OnAttack = {
    perk: string,
    perkRatio: number | `${number}/${number}`,
}
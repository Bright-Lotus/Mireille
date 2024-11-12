import { bows } from '../emums/items.js';

export type Item = AbilityOrb | Sword | Bow | ArmorPlate | Wand | Consumable;

console.log(bows);

export type AbilityOrb = {
    ability: AttackType,
    durationInAttacks?: AttacksString,
    desc: string,
    minLvl: number,
    name: string,
    price: number,
    ratio: RatioString,
    requiredMana: number,
    staticMana: number,
    targetClass: 'warrior' | 'enchanter' | 'archer',
    target: 'enemy' | 'ally' | 'self',
    burnRatio?: number,
}

export type Sword = {
    minLvl: number,
    name: string,
    perks: Perks,
    price: number,
    stats: {
        atk: number,
        spd: number,
    }
}

export type Bow = {
    minLvl: number,
    name: string,
    perks: Perks,
    price: number,
    stats: {
        atk: number,
        spd: number,
    }
}

export type Wand = {
    minLvl: number,
    name: string,
    perks: Perks,
    price: number,
    stats: {
        magicStrength: number,
        mana: number,
    }
}

export type Consumable = {
    amount: number,
    name: string,
    price: number,
    type: 'heal' | 'mana',
}

export type ArmorPlate = {
    minLvl: number,
    name: string,
    perks: Perks,
    price: number,
    stats: {
        armor: number,
        magicDurability: number,
        maxHp: number,
    }
}

export type Swords = Readonly<{
    [key: string]: Sword
}>

export type ArmorPlates = Readonly<{
    [key: string]: ArmorPlate
}>

export type Wands = Readonly<{
    [key: string]: Wand
}>

export type Bows = Readonly<{
    [key: string]: Bow
}>

export type Consumables = Readonly<{
    [key: string]: Consumable,
}>

export type AbilityOrbs = Readonly<{
    [key: string]: AbilityOrb
}>;

type AttackType =
    'strike'
    | 'burnStrike'
    | 'heal'
    | 'healUpgraded'
    | 'healRevive'
    | 'empowerAlly'
    | 'weaken'
    | 'weakenPower'
    | 'empowerMana'
    | 'empowerAllyMana'
    | 'protectAlly'
    | 'empowerAttack'

type AttacksString = `${number}/${number}-${number}`
type RatioString = `${number}/${number}-${number}`
type PerkRatioString = `${number}/${number}`
type Perks = {
    [k: string]: {
        perk: string,
        perkDesc: string,
        perkName: string,
        perkRatio: number | PerkRatioString,
    }
}
export interface ActiveBattle {
    battles: {
        amount: number,
        battle0?: Battle,
        battle1?: Battle,
        battle2?: Battle,
    }
}

type Battle = {
    debuffs: [],
    enemyArmor: number,
    enemyAtk: number,
    enemyElite: number,
    enemyGold: number,
    enemyHp: number,
    enemyId: string,
    enemyMagicDurability: number,
    enemyMaxHp: number,
    enemySpd: number,
    enemyUnique: number,
    enemyXp: number,
    keywords: [],
    turn: 'player' | 'enemy',
    turnsUntilAbility: number,
}
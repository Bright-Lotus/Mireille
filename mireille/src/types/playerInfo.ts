export type PlayerInfo = {
    EventDialogProgression?: {
        Abe?: {
            activeDialog: string;
        },
        Arissa?: {
            activeDialog: string;
        },
        Lyra?: {
            activeDialog: string;
        },
        Nora?: {
            activeDialog: string;
        }
    }
    activeBuffs: [],
    attackCooldown: Date,
    attackOnCooldown: boolean,
    class: 'enchanter' | 'warrior' | 'archer',
    dead: boolean,
    eventPoints: number,
    gold: number,
    instructor: {
        level: {
            currentStars: number,
            starsForNextTitle: number,
            titleLevel: number,
            titleName: string,
        },
        name: 'Abe' | 'Lyra' | 'Arissa',
    }
    nextLvlXpGoal: number,
    playerLvl: number,
    stats: {
        armor: number,
        atk: number,
        hp: number,
        magicDurability: number,
        magicStrength?: number,
        mana: number,
        manaPerAttack: number,
        maxHp: number,
        speed: number,
        xp: number,
    }
    xpBonus: number,
}
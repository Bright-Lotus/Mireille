export type FirestoreDB = {
    Event: Event,
}

export type Cache = {
    Event?: Event,
}

export type FirestoreDBModel<K extends string | number | symbol> = FirestoreDB & Record<K, Player | Event>
export const asFirestoreDBModel = <T extends FirestoreDBModel<keyof T>>(obj: T) => obj;

export type Player = {
    PlayerInfo: {
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
}

export interface Event {
    Enemies: {
        RegularMonsters: {
            Monsters: {
                [key: `enemy${number}`]: Enemy,
            }
        }
    },
    GiftDrops: {
        [key: string]: {
            channel: string,
            daily: {
                day: Date,
                night: Date,
            }
        }
    },
    Info: { messageCount: number },
    Players: { members: { id: number }[] },
    QuestsNora: Quest,
    [key: `QuestsWeek${number}`]: {
        [key: `quest${number}`]: Quest | {
            current: number,
            goal: number,
            position: number,
            type: number,
        },
    },
    Timeouts: {
        timestamps: {
            dropChannel: string,
            timeoutDate: Date,
            type: 'revive' | 'giftDestruction',
        }[]
    },
};

export type Quest = {
    goal: number,
    position: number,
    description?: string,
    rewards: {
        gold: number,
        xpBonus: number,
    },
    type: number,
    targetContent?: string[],
    targetChannel?: string,
    targetReaction?: string,
    targetLetter?: string,
}

export type Locked = {
    locked: {
        unlocks: Date,
    },
    quest0: object,
}

export type Enemy = {
    baseXp: number,
    gold: number,
    id: number,
    keywords: Keyword[],
    minLvl: number,
    name: string,
}

export type Keyword = {
    displayName: string,
    ratio: number,
    subtype: string,
    type: string,
}
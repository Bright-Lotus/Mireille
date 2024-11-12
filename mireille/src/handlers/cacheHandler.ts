import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { asFirestoreDBModel } from '../types/dbTypes.js';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Placeholder data for cache.
export const cache = asFirestoreDBModel({
    Event: {
        Enemies: {
            RegularMonsters: {
                Monsters: {
                    enemy1: {
                        baseXp: 1,
                        gold: 50,
                        id: 1,
                        keywords: [],
                        minLvl: 1,
                        name: 'Bubble',
                    },
                },
            },
        },
        GiftDrops: {
            test: {
                channel: 'test',
                daily: {
                    day: new Date(),
                    night: new Date(),
                },
            },
        },
        Info: { messageCount: 100 },
        Players: { members: [{ id: 1011 }] },
        QuestsNora: {
            goal: 10,
            position: 0,
            rewards: {
                gold: 100,
                xpBonus: 100,
            },
            type: 1,
        },
        Timeouts: {
            timestamps: [{ dropChannel: '1111', timeoutDate: new Date(), type: 'revive' }],
        },
    },
    '9999': {
        PlayerInfo: {
            activeBuffs: [],
            attackCooldown: new Date(),
            attackOnCooldown: false,
            class: 'enchanter',
            dead: false,
            eventPoints: 100,
            gold: 100,
            instructor: {
                level: {
                    currentStars: 1,
                    starsForNextTitle: 10,
                    titleLevel: 11,
                    titleName: 'Bubble',
                },
                name: 'Lyra',
            },
            nextLvlXpGoal: 10,
            playerLvl: 100,
            stats: {
                armor: 100,
                atk: 200,
                hp: 300,
                magicDurability: 10,
                mana: 20,
                manaPerAttack: 2,
                maxHp: 1000,
                speed: 24,
                xp: 456,
            },
            xpBonus: 100,
        },
    },
});
const recentlyUpdatedPaths: string[] = [];

function readObj(path: string, object: Record<string, Value>): Value {
    // path structure: path/to/firebaseDoc
    // Starting from object root: path[to] then to[firebaseDoc] and so on.
    return path.split('/').reduce((o, i) => o?.[i], object);
}

type Value = string | object | boolean | number | Date;

function writeObj(path: string, object: Record<string | number | symbol, unknown>, value: Value) {
    const split = path.split('/');
    let current = object;

    split.forEach(segment => {
        if (typeof current[segment] === 'object') {
            if (segment === split[split.length - 1]) {
                current[segment] = (typeof value === 'object')
                ? { ...current[segment], ...value }
                : { ...current[segment], value };
            }
            if (!current[segment]) current[segment] = {};
            current = current[segment] as typeof object;
        }
    });
    object = current;
}

export type PathValuePair = string | Value;

export async function updateData(path: string, data: PathValuePair[]) {
    // updateDoc function takes as the second parameter a string or FieldPath
    // And as the third, a value for the path
    const firstTwoElementsOfData = data.splice(0, 2);
    await updateDoc(
        doc(db, path), firstTwoElementsOfData[0].toString(), firstTwoElementsOfData[1],
        data,
    );
    recentlyUpdatedPaths.push(path);
}

export function getData(dataPath: string): Value {
    // docPath structure: path/to/firebaseDoc
    let obj = readObj(dataPath, cache);
    // If the path got updated somewhere else
    // It would get added to the recentlyUpdatedPaths array
    // Maybe a path gets updated but doesn't get read until further on
    // Better to update the cache when the path gets read
    // If the path doesn't get found in the cache, update it
    if (!obj || recentlyUpdatedPaths.includes(dataPath)) updateCache(dataPath);
    obj = readObj(dataPath, cache);
    return obj;
}

export async function updateCache(path: string) {
    // Data retrieval from DB would go here.
    const dataFromDB = (await getDoc(doc(db, path)));
    if (dataFromDB.exists()) {
        writeObj(path, cache, dataFromDB.data());
    }
    else {
        // TODO: Implement error handler
        // Error Code: 14
    }
}
import { getFirestore, updateDoc, getDoc, doc, increment, arrayUnion } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig.js';
import { Abilities } from '../emums/abilities.js';
import { ErrorEmbed, EventErrors } from '../errors/errors.js';
import { formatEmoji, User } from 'discord.js';
import { Icons } from '../emums/icons.js';
import { Utils } from '../utils.js';
import { converter } from './firestoreHandler.js';
import { ActiveBattle } from '../types/activeBattles.js';
import { PlayerInfo } from '../types/playerInfo.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ability(abilityID: number, target: string, user: User): Promise<{ manaRemaining: number }> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        const playerInfo = (await getDoc(doc(db, user.id, 'PlayerInfo').withConverter(converter<PlayerInfo>())));
        const playerInfoData = playerInfo.data() as PlayerInfo;
        let abilityOrb;
        const playerEquipment = await getDoc(doc(db, user.id, 'PlayerInfo/Inventory/Equipment'));
        // const enemy = (await getDoc(doc(db, user.id, 'ActiveBattles').withConverter(converter<ActiveBattle>())));
        const activeBattlesDoc = doc(db, user.id, 'ActiveBattles').withConverter(converter<ActiveBattle>());
        const activeBattles = (await getDoc(activeBattlesDoc));
        const __activeBattlesData = activeBattles.data() as ActiveBattle;

        if (playerEquipment.exists()) {
            abilityOrb = playerEquipment.data().abilityOrbs[ `abilityOrb${abilityID}` ];
            if (playerInfoData.stats.mana < abilityOrb.requiredMana) {
                return reject(
                    {
                        manaEmbed: ErrorEmbed(EventErrors.NotEnoughMana,
                            `Necesitas **${abilityOrb.requiredMana - playerInfoData.stats.mana}** ${formatEmoji(Icons.Mana)} mas para cargar este orbe.`),
                    });
            }
        }

            switch (abilityOrb.ability) {
                case Abilities.EmpoweredAttacks: {
                    // Retrieve player ATK stat
                    const playerAtk = playerInfoData.stats.atk;
                    const attacks = Number(abilityOrb.attacks.split('/')[ 0 ]);
                    const atkRatio = Number(abilityOrb.ratio.split('/')[ 0 ]) + 100;
                    const finalAtkAmount = Math.round((playerAtk / 100) * atkRatio);
                    const activeBuffs = {
                        buff: `increasedAtk:${playerAtk}`,
                        attacks: attacks,
                    };

                    await updateDoc(
                        doc(db, user.id, 'PlayerInfo'), 'stats.atk', finalAtkAmount,
                    );
                    await updateDoc(
                        doc(db, user.id, 'PlayerInfo'), 'activeBuffs', arrayUnion(activeBuffs),
                    );
                    await updateDoc(
                        doc(db, user.id, 'PlayerInfo'), 'stats.mana', increment(-Math.abs(abilityOrb.requiredMana)),
                    );
                    return resolve({ manaRemaining: (playerInfoData.stats.mana) + (-Math.abs(abilityOrb.requiredMana)) });
                }

                case Abilities.Heal: {
                    const playerMgcStr = playerInfoData.stats.magicStrength;
                    const healRatio = Number(abilityOrb.ratio.split('/')[ 0 ]) + 100;
                    const healAmount = 10 + Math.round((playerMgcStr / 100) * healRatio);
                    console.log(healAmount, healRatio, playerMgcStr);

                    await updateDoc(doc(db, target, 'PlayerInfo'), {
                        [ 'stats.hp' ]: increment(healAmount),
                    }, { merge: true });
                    await updateDoc(doc(db, user.id, 'PlayerInfo'), {
                        [ 'stats.mana' ]: increment(-Math.abs(abilityOrb.requiredMana)),
                    }, { merge: true });
                    return resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) });
                }

                case 'strike': {
                    const playerMgcStrength = playerInfo.data().stats.magicStrength;
                    const enemyMagicDurability = activeBattles.enemyMagicDurability;
                    const finalDamage = (abilityOrb.ratio.split('/')[ 0 ] / 100) * playerMgcStrength - (enemyMagicDurability * 0.7);
                    activeBattles.enemyHp -= finalDamage;
                    await updateDoc(doc(db, user.id, 'ActiveBattles'), {
                        [ `battle${target}` ]: activeBattles,
                    }, { merge: true });
                    return resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) });
                }

                case 'burnStrike': {
                    const playerMgcStrength = playerInfo.data().stats.magicStrength;
                    const enemyMagicDurability = activeBattles.enemyMagicDurability;
                    const finalDamage = (abilityOrb.ratio.split('/')[ 0 ] / 100) * playerMgcStrength - (enemyMagicDurability * 0.7);
                    activeBattles.enemyHp -= finalDamage;
                    const burnDamage = (abilityOrb.burnRatio / 100) * playerMgcStrength - (enemyMagicDurability * 0.6);
                    activeBattles.debuffs.push({ type: 'burn', damage: burnDamage });
                    await updateDoc(doc(db, user.id, 'ActiveBattles'), {
                        [ `battle${target}` ]: activeBattles,
                    }, { merge: true });
                    return resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) });
                }

                case 'healUpgraded': {
                    const playerMgcStr = playerInfo.data().stats.magicStrength;
                    const healRatio = Number(abilityOrb.ratio.split('/')[ 0 ]);
                    let healAmount = 10 + Math.round((playerMgcStr / 100) * healRatio);
                    const targetStats = playerInfo.data().stats;
                    if (targetStats.maxHp * 30 / 100 < targetStats.hp) {
                        healAmount += healAmount * 0.3;
                    }
                    console.log(healAmount, healRatio, playerMgcStr);

                    await updateDoc(doc(db, target, 'PlayerInfo'), {
                        [ 'stats.hp' ]: increment(healAmount),
                    }, { merge: true });
                    await updateDoc(doc(db, user.id, 'PlayerInfo'), {
                        [ 'stats.mana' ]: increment(-Math.abs(abilityOrb.requiredMana)),
                    }, { merge: true });
                    return resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) });
                }

                case 'healRevive': {
                    const playerMgcStr = playerInfo.data().stats.magicStrength;
                    const healRatio = Number(abilityOrb.ratio.split('/')[ 0 ]);
                    const healAmount = Math.round((playerMgcStr / 100) * healRatio);

                    await updateDoc(doc(db, target, 'PlayerInfo'), {
                        [ 'stats.hp' ]: healAmount,
                        [ 'dead' ]: false,
                    }, { merge: true });
                    return resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) });
                }

                case 'empowerAlly': {
                    const playerMgcStr = playerInfo.data().stats.magicStrength;
                    const empowerRatio = Number(abilityOrb.ratio.split('/')[ 0 ]);
                    const mainStat = (playerInfo.class === 'warrior') ? 'atk' : 'magicStrength';
                    const oldMainStat = await (await getDoc(doc(db, target, 'PlayerInfo'))).data().stats[ mainStat ];
                    const activeBuffs = {
                        buff: `increased${Utils.CapitalizeFirstLetter(mainStat)}:${oldMainStat}`,
                        attacks: Number(abilityOrb.attacks),
                    };
                    await updateDoc(doc(db, target, 'PlayerInfo'), {
                        [ 'activeBuffs' ]: arrayUnion(activeBuffs),
                    }, { merge: true });
                    await updateDoc(doc(db, user.id, 'PlayerInfo'), {
                        [ `stats.${mainStat}` ]: increment((playerMgcStr / 100) * empowerRatio),
                    }, { merge: true });
                    return resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) });
                }

                case 'weaken': {
                    const playerMgcStr = playerInfo.data().stats.magicStrength;
                    const weakenRatio = (playerMgcStr / 100) * Number(abilityOrb.ratio.split('/')[ 0 ]);
                    activeBattles.enemyArmor -= weakenRatio;
                    await updateDoc(doc(db, user.id, 'ActiveBattles'), {
                        [ `battle${target}` ]: activeBattles,
                    }, { merge: true });
                    return resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) });
                }

                case 'weakenPower': {
                    const playerMgcStr = playerInfo.data().stats.magicStrength;
                    const weakenRatio = (playerMgcStr / 100) * Number(abilityOrb.ratio.split('/')[ 0 ]);
                    activeBattles.enemyAtk -= weakenRatio;
                    await updateDoc(doc(db, user.id, 'ActiveBattles'), {
                        [ `battle${target}` ]: activeBattles,
                    }, { merge: true });
                    return resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) });
                }
                case 'empowerMana': {
                    const playerMgcStr = playerInfo.data().stats.magicStrength;
                    const empowerRatio = Number(abilityOrb.ratio.split('/')[ 0 ]);
                    const oldMana = await (await getDoc(doc(db, user.id, 'PlayerInfo'))).data().stats.mana;
                    const activeBuffs = {
                        buff: `increasedMana:${oldMana}`,
                        attacks: Number(abilityOrb.attacks),
                    };
                    await updateDoc(doc(db, user.id, 'PlayerInfo'), {
                        [ 'activeBuffs' ]: arrayUnion(activeBuffs),
                    }, { merge: true });
                    await updateDoc(doc(db, user.id, 'PlayerInfo'), {
                        [ 'stats.manaPerAttack' ]: increment((playerMgcStr / 100) * empowerRatio),
                    }, { merge: true });
                    return resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) });
                }
                case 'empowerAllyMana': {
                    const playerMgcStr = playerInfo.data().stats.magicStrength;
                    const empowerRatio = Number(abilityOrb.ratio.split('/')[ 0 ]);
                    const oldMana = await (await getDoc(doc(db, target, 'PlayerInfo'))).data().stats.mana;
                    const activeBuffs = {
                        buff: `increasedMana:${oldMana}`,
                        attacks: Number(abilityOrb.attacks),
                    };
                    await updateDoc(doc(db, target, 'PlayerInfo'), {
                        [ 'activeBuffs' ]: arrayUnion(activeBuffs),
                    }, { merge: true });
                    await updateDoc(doc(db, target, 'PlayerInfo'), {
                        [ 'stats.manaPerAttack' ]: increment((playerMgcStr / 100) * empowerRatio),
                    }, { merge: true });
                    return resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) });
                }

                case 'protectAlly': {
                    const playerMgcStr = playerInfo.data().stats.magicStrength;
                    const protectRatio = Number(abilityOrb.ratio.split('/')[ 0 ]);
                    const oldArmor = await (await getDoc(doc(db, target, 'PlayerInfo'))).data().stats.armor;
                    const activeBuffs = {
                        buff: `increasedArmor:${oldArmor}`,
                        attacks: Number(abilityOrb.attacks),
                    };
                    await updateDoc(doc(db, target, 'PlayerInfo'), {
                        [ 'activeBuffs' ]: arrayUnion(activeBuffs),
                    }, { merge: true });
                    await updateDoc(doc(db, target, 'PlayerInfo'), {
                        [ 'stats.armor' ]: increment((playerMgcStr / 100) * protectRatio),
                    }, { merge: true });
                    return resolve({ manaRemaining: (playerInfo.data().stats.mana) + (-Math.abs(abilityOrb.requiredMana)) });
                }

                default:
                    break;
            }
    });
}

module.exports = { ability };
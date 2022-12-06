const { getFirestore, doc, updateDoc, increment, getDoc } = require('firebase/firestore');
const { initializeApp } = require('firebase/app');
const { firebaseConfig } = require('../firebaseConfig.js');
const { ErrorEmbed, EventErrors } = require('../errors/errors.js');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function goldManager(action, amount, user) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        if (action == 'give') {
            const playerSnap = await getDoc(doc(db, user.id, 'PlayerInfo'));
            if (playerSnap.exists()) {
                const playerGold = playerSnap.data().gold;
                await updateDoc(doc(db, user.id, 'PlayerInfo'), {
                    ['gold']: increment(amount),
                }, { merge: true });
                return resolve(playerGold + amount);
            }
        }
        else if (action == 'buy') {
            console.log('waiting');
            await getDoc(doc(db, user.id, 'PlayerInfo')).then(async docSnap => {
                if (docSnap.exists()) {
                    const playerGold = docSnap.data().gold;
                    if (amount > playerGold) {
                        const embed = ErrorEmbed(EventErrors.NotEnoughGold, `Oro que tienes: ${playerGold}\nOro que necesitas: ${amount}`);
                        return reject({ errorEmbed: embed, errorCode: EventErrors.NotEnoughGold });
                    }
                    await updateDoc(doc(db, user.id, 'PlayerInfo'), {
                        ['gold']: increment(-Math.abs(amount)),
                    }, { merge: true });
                    return resolve(playerGold - amount);
                }
            });
        }
    });
}

module.exports = { goldManager };
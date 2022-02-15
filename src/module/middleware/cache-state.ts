/*
    Cache State
    - store feature callback middleware that sets dispatch value in local storage
*/
import { TrebleGSM } from 'treble-gsm';
import { ITreblePersist } from '../interfaces';
import { lsKeyNameSpace, treblePersistConsole } from '../globals';

const cacheState = (stateItem: TrebleGSM.MiddlewareData) => {

    try {
        const storageIsEnabled = (typeof (Storage) !== "undefined") ? true : false;
        const persistFeatures = stateItem?.features as ITreblePersist.StoreFeatures;
        const isPersist = (persistFeatures?.persist) ? true : false;
        const persistType = (persistFeatures?.persistOptions?.type) ? persistFeatures?.persistOptions?.type : 'local';

        if (isPersist && storageIsEnabled) {
            const stateToCache = stateItem.dispatchValue;
            const persistKey = `${lsKeyNameSpace}-${stateItem.action}`

            if (persistType === 'local') {
                localStorage.setItem(persistKey, stateToCache);
            }
            else if (persistType === 'session') {
                sessionStorage.setItem(persistKey, stateToCache);
            }
            else if (persistType === 'cookie' && navigator.cookieEnabled) {
                const isSecure = persistFeatures.persistOptions?.secure;
                if (stateToCache !== 'object') {
                    const now = new Date();
                    const time = now.getTime();
                    const expireTime = time + 1000 * 36000;
                    now.setTime(expireTime);
                    document.cookie = `${persistKey}=${stateToCache}; expires=${now.toUTCString()}; ${(isSecure) ? 'secure' : ''}`
                } else {
                    throw TypeError('Cookie must be primitive type');
                }
            }

            console.log('persisted');
            console.log(stateToCache);
            console.log(persistType);
        }

    } catch (error) {
        throw error;
    }
}

export default cacheState;
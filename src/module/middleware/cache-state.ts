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
            const stateToCache = JSON.stringify(stateItem.dispatchValue);
            const persistKey = `${lsKeyNameSpace}-${stateItem.action}`;

            if (persistType === 'local') {
                localStorage.setItem(persistKey, stateToCache);
            }
            else if (persistType === 'session') {
                sessionStorage.setItem(persistKey, stateToCache);
            }

        }

    } catch (error) {
        throw error;
    }
}

export default cacheState;
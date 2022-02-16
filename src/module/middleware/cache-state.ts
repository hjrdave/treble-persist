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
                const expires = persistFeatures.persistOptions?.expires;

                const valueCookie = `${persistKey} = ${stateToCache};`;
                const expireCookie = `expires=${(expires !== undefined) ? (typeof expires === 'number') ? new Date(expires * 1000) : expires : ''};`;
                const secureCookie = (isSecure) ? 'secure;' : '';

                if (stateToCache !== 'object') {

                    document.cookie = `${valueCookie} ${expireCookie} ${secureCookie}`;

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
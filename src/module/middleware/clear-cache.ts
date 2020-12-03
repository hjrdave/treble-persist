/*
    Clear Cache
    - Listens for specific treble gsm dispatchers and makes sure cache is cleared if dispatched
*/
import { TrebleGSM } from 'treble-gsm';
import { lsKeyNameSpace, treblePersistConsole } from '../globals';

const clearCache = (payload: TrebleGSM.DispatchPayload) => {

    if (typeof Storage !== undefined) {
        const reducerAction = payload.reducerAction;
        const actionKey = payload.type;
        if (reducerAction === 'resetToInitialState' || reducerAction === 'resetAllToInitialState') {
            localStorage.removeItem(`${lsKeyNameSpace}-${actionKey}`);
            return
        }
    } else {
        console.warn(`${treblePersistConsole} - Browser does not have local storage enabled.`);
    }

}

export default clearCache;
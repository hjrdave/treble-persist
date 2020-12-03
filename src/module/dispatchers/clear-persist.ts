/*
    Clear Persist
    - Targets state and clears it from cache.
*/
import { TrebleGSM } from 'treble-gsm';
import { lsKeyNameSpace, treblePersistConsole } from '../globals';

interface IClearPersist {
    (
        dispatch: (payload: TrebleGSM.DispatchPayload) => void,
        action: string,
        options?: {
            disableMiddleware?: boolean,
            [key: string]: any
        }

    ): void
}
const clearPersist: IClearPersist = (dispatch, action) => {
    try {
        if (typeof action !== 'string') {
            throw TypeError('action prop must be a string');
        }
        if (typeof Storage !== undefined) {
            localStorage.removeItem(`${lsKeyNameSpace}-${action}`);
        } else {
            console.warn(`${treblePersistConsole} - Browser does not have local storage enabled.`);
        }
    } catch (error) {
        console.error(`${treblePersistConsole} ${error}`);
    }
}
export default clearPersist;
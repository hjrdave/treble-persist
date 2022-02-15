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

}
export default clearPersist;
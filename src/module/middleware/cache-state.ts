/*
    Cache State
    - store feature callback middleware that sets dispatch value in local storage
*/
import { TrebleGSM } from 'treble-gsm';
import { lsKeyNameSpace, treblePersistConsole } from '../globals';

const cacheState = (data: TrebleGSM.MiddlewareData) => {
    if (typeof Storage !== undefined) {
        const persistKey = data.features?.persist;
        const dispatchValue = data.dispatchValue;

        //if persist key is set to true cache state
        if (persistKey) {
            //checks if the value is an object then stringify for storage
            const handleValue = (value: any) => {
                if (typeof value === 'object') {
                    return JSON.stringify(value);
                }
                return value
            }

            localStorage.setItem(`${lsKeyNameSpace}-${data.action}`, handleValue(dispatchValue));
        }
        else {
            localStorage.removeItem(`${lsKeyNameSpace}-${data.action}`);
        }
    } else {
        console.warn(`${treblePersistConsole} - Browser does not have local storage enabled.`);
    }

}

export default cacheState;
import React from 'react';
import { useTreble, TrebleGSM } from 'treble-gsm';
import { lsKeyNameSpace } from '../globals';

export default function RenderComp() {

    const Store = useTreble()[1];
    const { storeData } = useTreble()[2];

    React.useEffect(() => {
        if (typeof (Storage) !== "undefined") {
            storeData?.map((stateItem: TrebleGSM.StoreItem) => {
                if (stateItem.features?.persist) {

                    const handleCachedValue = (cachedValue: any) => {
                        //makes sure boolean values are not returned as strings
                        //This might cause issues down the road.  If it becomes an issue, will seek alternative
                        if (cachedValue === 'true' || cachedValue === 'false') {
                            return (cachedValue === 'true') ? true : (cachedValue === 'false') ? false : cachedValue
                        }
                        //checks to see if the localstorage string is a valid json string
                        const isJsonString = (value: any) => {
                            try {
                                JSON.parse(value)
                            } catch (e) {
                                return false
                            }
                            return true
                        }
                        //if string is valid it parses back to object
                        if (isJsonString(cachedValue)) {
                            return JSON.parse(cachedValue);
                        }
                        return cachedValue
                    }
                    const cachedValue = handleCachedValue(localStorage.getItem(`${lsKeyNameSpace}-${stateItem.action}`)) || stateItem.state[0];
                    if (cachedValue !== undefined) {
                        Store.update(stateItem.action, cachedValue, { disableMiddleware: true });
                    }
                } else {
                    localStorage.removeItem(`${lsKeyNameSpace}-${stateItem.action}`);
                }
            })
        }
    }, []);



    return null
}
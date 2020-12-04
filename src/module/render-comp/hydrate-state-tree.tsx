import React from 'react';
import { useTreble, TrebleGSM } from 'treble-gsm';
import { lsKeyNameSpace } from '../globals';

export default function HydrateStateTree() {

    const Store = useTreble()[1];
    const { storeData } = useTreble()[2];

    //hydrates state tree on mount
    React.useEffect(() => {
        if (typeof (Storage) !== "undefined") {
            storeData?.map((stateItem: TrebleGSM.StoreItem) => {

                //hydrates state if persist key is true
                if (stateItem.features?.persist) {

                    //get cached data from local storage by key
                    const cachedData: string = localStorage.getItem(`${lsKeyNameSpace}-${stateItem.action}`) || stateItem.state[0];

                    //handles cached data scenerios and then returns proper state
                    if (cachedData !== undefined) {


                        const extractState = (cachedData: string) => {
                            const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

                            function reviver(key: any, value: any) {
                                if (typeof value === "string" && dateFormat.test(value)) {
                                    return new Date(value);
                                }

                                return value;
                            }
                            //parse cached data from json to object
                            const parsedData = JSON.parse(cachedData, reviver);
                            //makes sure boolean values are not returned as strings
                            //This might cause issues down the road.  If it becomes an issue, will seek alternative
                            if (parsedData.state === 'true' || parsedData.state === 'false') {
                                return (parsedData.state === 'true') ? true : (parsedData.state === 'false') ? false : parsedData.state
                            }
                            return { ...parsedData, expires: new Date(parsedData.expires) };
                        }
                        const processedCachedData = extractState(cachedData);
                        const now = new Date();
                        //see if cache is expired
                        if (processedCachedData.expires < now) {
                            localStorage.removeItem(`${lsKeyNameSpace}-${stateItem.action}`)
                        }
                        else {
                            //update store item with cached state
                            Store.update(stateItem.action, processedCachedData.state, { disableMiddleware: true });
                        }

                    }
                }
                else {
                    //makes sure key is removed if persist is false
                    localStorage.removeItem(`${lsKeyNameSpace}-${stateItem.action}`);
                }
            })
        }
    }, []);



    return null
}
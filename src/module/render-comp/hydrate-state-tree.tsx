import React from 'react';
import { useTreble } from 'treble-gsm';
import useLocalStorage from '../hooks/use-local-storage';
import useSessionStorage from '../hooks/use-session-storage';
import { lsKeyNameSpace } from '../globals';

export default function HydrateStateTree() {

    const [State, Store, Util] = useTreble();
    const local = useLocalStorage();
    const session = useSessionStorage();

    //hydrates state tree on mount
    React.useEffect(() => {
        Util.storeData.map((stateItem: any) => {
            if (stateItem?.features?.persist) {
                const persistKey = `${lsKeyNameSpace}-${stateItem.action}`;
                const persistType = (stateItem?.features?.persistOptions?.type) ? stateItem?.features?.persistOptions.type : 'local';
                if (persistType === 'local') {
                    const cachedValue = local.get(persistKey);
                    if (cachedValue !== null) {
                        Store.update(stateItem.action, cachedValue, { disableMiddleware: true });
                    }
                }
                else if (persistType === 'session') {
                    const cachedValue = session.get(persistKey);
                    if (cachedValue !== null) {
                        Store.update(stateItem.action, cachedValue, { disableMiddleware: true });
                    }
                }
            }
        });
    }, []);



    return null
}
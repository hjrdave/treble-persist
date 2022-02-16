import React from 'react';
import { useTreble, TrebleGSM } from 'treble-gsm';
import { lsKeyNameSpace } from '../globals';

export default function HydrateStateTree() {

    const [State, Store, Util] = useTreble();

    //hydrates state tree on mount
    React.useEffect(() => {
        alert('works')
    }, []);



    return null
}
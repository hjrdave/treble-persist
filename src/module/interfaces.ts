/*
    Exported Interfaces for module
*/
import { TrebleGSM } from 'treble-gsm';
export declare namespace ITreblePersist {

    export interface DispatcherOptions extends TrebleGSM.DispatcherOptions { }
    export interface Dispatchers {
        clearPersist: (action: string) => void
    }
    export interface DispatchersNS {
        tp_clearPersist: (action: string) => void
    }
    export interface StoreFeatures {
        persist?: boolean,
        persistOptions?: {
            type?: 'local' | 'session' | 'cookie';
            domain?: string;
            path?: string;
            expires?: string;
            secure?: boolean;
        }
    }
}
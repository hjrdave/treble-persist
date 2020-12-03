/*
    Exported Interfaces for module
*/
import { TrebleGSM } from 'treble-gsm';
export declare namespace ITreblePersist {

    export interface DispatcherOptions extends TrebleGSM.DispatcherOptions { }
    export interface Dispatchers {
        clearPersist: (action: string) => void
    }
}
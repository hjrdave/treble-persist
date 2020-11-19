/*
    Exported Interfaces for module
*/
import { TrebleGSM } from 'treble-gsm';
export declare namespace ITreblePersist {

    export interface DispatcherOptions extends TrebleGSM.DispatcherOptions { }
    export interface Dispatchers {
        // append: (action: string, dispatchValue: {[key:string]: any}, options?: DispatcherOptions) => void,
        // prepend: (action: string, dispatchValue: {[key:string]: any}, options?: DispatcherOptions) => void,
        // edit: (action: string, dispatchValue: {[key:string]: any}, options?: DispatcherOptions) => void,
        // remove: (action: string, dispatchValue: {[key:string]: any}, options?: DispatcherOptions) => void,
        // removeBatch: (action: string, dispatchValue: {[key:string]: any}[], options?: DispatcherOptions) => void,
        // orderBy: (action: string, targetProp: string, orderType: 'asc' | 'desc', options?: DispatcherOptions) => void,
    }
}
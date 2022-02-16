/*public hook*/
import useLocalStorage from "./use-local-storage";
import useSessionStorage from "./use-session-storage";

const usePersist = () => {
    const local = useLocalStorage();
    const session = useSessionStorage();

    const getLocal = (key: string) => local.get(key);
    const setLocal = (key: string, value: any) => local.set(key, value);
    const removeLocal = (key: string) => local.remove(key);
    const clearLocal = () => local.clear();

    const getSession = (key: string) => session.get(key);
    const setSession = (key: string, value: any) => session.set(key, value);
    const removeSession = (key: string) => session.remove(key);
    const clearSession = () => session.clear();

    return {
        getLocal,
        setLocal,
        removeLocal,
        clearLocal,
        getSession,
        setSession,
        removeSession,
        clearSession
    }
}

export default usePersist;
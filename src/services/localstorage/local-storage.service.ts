import {
    LOCAL_STORAGE_CLEARING_ERROR_MESSAGE,
    LOCAL_STORAGE_GETTING_ERROR_MESSAGE,
    LOCAL_STORAGE_REMOVING_ERROR_MESSAGE,
    LOCAL_STORAGE_SAVING_ERROR_MESSAGE,
} from "@/utils/constants/local-storage.constants";

export const LocalStorageService = {
    /**Takes a key and any value, stringifies that value and saves it into localstorage*/
    saveItem: function <T>(key: string, value: T) {
        if (!key) return;
        if (value !== undefined && value !== null) {
            try {
                const jsonValue = JSON.stringify(value);
                localStorage.setItem(key, jsonValue);
            } catch (error) {
                console.error(LOCAL_STORAGE_SAVING_ERROR_MESSAGE, error);
            }
        }
    },
    /**Gets the item related to a given key*/
    getItem: function <T>(key: string): T | undefined {
        if (!key) return;
        try {
            const stringValue = localStorage.getItem(key);
            if (stringValue) return JSON.parse(stringValue) as T;
        } catch (error) {
            console.error(LOCAL_STORAGE_GETTING_ERROR_MESSAGE, error);
        }
    },
    /**Removes the item related to a given key*/
    removeItem: function(key: string) {
        if (!key) return;
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(LOCAL_STORAGE_REMOVING_ERROR_MESSAGE, error);
        }
    },
    clear: function() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error(LOCAL_STORAGE_CLEARING_ERROR_MESSAGE, error);
        }
    },
};

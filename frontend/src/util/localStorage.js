// Author - Abhinav Acharya Tirumala Vinjamuri
// Util function for Local Storage so that we don't need to worry about converting it into a string and back to object...

export const localStorageUtil = {
    setItem: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }, 
    
    getItem: function (key) {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },

    removeItem: function (key) {
        localStorage.removeItem(key);
    },

    clear: function () {
        localStorage.clear();
    }

}
// Author - Abhinav Acharya Tirumala Vinjamuri
import { localStorageUtil } from "./localStorage";

export const isAuthenticated = () => {
    if (localStorageUtil.getItem('user')) {
        return true;
    }
    return false;
}

export const isAdmin = () => {
    if (!localStorageUtil.getItem('user')) {
        return false;
    }
    if (localStorageUtil.getItem('user')?.role === 'admin') {
        return true;
    }
    return false;
}
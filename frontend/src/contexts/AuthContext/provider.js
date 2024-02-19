import { useState, useMemo } from 'react';
import { AuthContext } from './authcontext';
import { localStorageUtil } from '../../util';

export const AuthContextProvider = ({children}) => {
    const [authContext, authContextSetter] = useState({
        username: undefined,
        email: undefined,
        role: undefined
    });

    const value = useMemo(() => ({
        username: authContext.username,
        email: authContext.email,
        role: authContext.role,
        setAuthContext: (newAuthContext) => {
            authContextSetter((prevAuthContext) => {
                if(newAuthContext && newAuthContext.username){
                    //To Do: storing to localstorage part goes here
                    localStorageUtil.setItem('user', newAuthContext);
                }
                else{
                    //Authcontext is undefined and needs to be removed from localstorage
                    localStorageUtil.removeItem("user");
                }
                return newAuthContext;
            });
        }
    }), [ authContext.username, authContext.email, authContext.role]);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
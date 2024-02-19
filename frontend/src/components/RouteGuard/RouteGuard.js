import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { localStorageUtil } from "../../util";
import { AuthContext } from '../../contexts/AuthContext/authcontext';
import React from "react";
import { useEffect } from "react";

function RouteGuard(){
    const { setAuthContext } = React.useContext(AuthContext);
    const navigate = useNavigate();
    // const { email, username, accessId, tokenId} = useContext(AuthContext);
    if (localStorageUtil.getItem('user') === null) {
        navigate("login",{relative: false});
    }
    // if (localStorageUtil.getItem('role') === 'admin') {
    //     return <Navigate to={{pathname: "admin/home"}} relative={false}/>
    // }
    // else if (localStorageUtil.getItem('role') === 'user') {
    //     return <Navigate to={{pathname: "/home"}} relative={false}/>
    // }
    let username, email, role;

    if(localStorageUtil.getItem('user') && localStorageUtil.getItem('user')['username']){
        username = localStorageUtil.getItem('user')['username'];
        email = localStorageUtil.getItem('user')['email'];
        role = localStorageUtil.getItem('user')['role'];
    }

    useEffect(() => {
        setAuthContext({username: username, email: email, role:role});
        console.log("Routeguard has recieved auth context as ", email, username, role);
    }, [username, email, role]);
    console.log("Routeguard has recieved auth context as ", email, username, role);
    
    return (
        <>
            {username && role && email ? <Outlet/> : <Navigate to={{pathname: "login"}} relative={false}/>}
        </>
    );
}

export default RouteGuard;
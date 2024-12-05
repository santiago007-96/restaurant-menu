import React, { useState, useEffect, createContext } from "react";
import { setToken, getToken, removeToken } from "../api/token";
import { useUser } from "../hooks";
import { LoginForm } from "../components/Admin/LoginForm";

export const AuthContext = createContext({
    auth: undefined, // Porque no sabe si el usuario se ha logeado
    login: () => null,
    logout: () => null,
});

// Provider envuelve toda la app
export const AuthProvider = ({ children }) => {
    // const { children } = props;
    const [auth, setAuth] = useState(undefined)
    const { getMe } = useUser();
    

    useEffect(() => {
        async function getAuthor() {
            const token = getToken();

            if(token) {
                const me = await getMe(token);
                setAuth({ token, me });
            } else {
                setAuth(null);
            }
        }
        getAuthor();
    }, [])
    
    // useEffect(() => {
    //     (async () => {
    //         const token = getToken();

    //         if(token) {
    //             const me = await getMe(token);
    //             setAuth({ token, me });
    //         } else {
    //             setAuth(null);
    //         }
    //     })();
    // }, [])
    

    const login = async (token) => {
        setToken(token);
        const me = await getMe(token);
        setAuth({ token, me });
        
    };

    const logout = () => {
        if( auth ) {
            removeToken();
            setAuth(null);
        }
    };

    const valueContext = {
        auth,
        login,
        logout,
        
    };

    if( auth === undefined ) return null
    
    return (
        <AuthContext.Provider value={ valueContext }>
            { children }
        </AuthContext.Provider>
    )
};

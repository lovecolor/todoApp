import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useAsync from "../hooks/use-async";
import { useAppApiClient } from "../hooks/useAppApiClient";

const AuthContext = React.createContext<{
    token: string | null,
    isLoggedIn: boolean,
    user: any,
    login: (token: string, user) => void,
    logout: () => void
}>({
    token: null,
    isLoggedIn: false,
    user: null,
    login: (token: string, user) => { },
    logout: () => { },
});

export const AuthContextProvider: React.FC = (props) => {
    const { run, result, error } = useAsync(useAppApiClient().getLoggedInUserviaToken)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState<string | null>(null)
    const currentToken = localStorage.getItem("token")



    const [user, setUser] = useState<any | null>(null)
    const loginHandler = (token: string, user) => {
        setToken(token)
        setUser(user)
        setIsLoggedIn(true)
        localStorage.setItem('token', token);
    };

    const logoutHandler = () => {
        setToken(null)
        setUser(null)
        setIsLoggedIn(false)
        localStorage.removeItem('token');



    }
    const contextValue = {
        token: token,

        isLoggedIn: isLoggedIn,
        user: user,
        login: loginHandler,
        logout: logoutHandler,
    };
    useEffect(() => {
        if (currentToken) {
            run()
        }
    }, [])
    useEffect(() => {
        if (result) {
            setUser(result)
            setToken(currentToken)
            setIsLoggedIn(true)
        }
    }, [result])
    useEffect(() => {
        if (error) {
            localStorage.clear()
            setToken(null)

        }
    }, [error])
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
import axios from "axios";
import React, { useState, useEffect, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const saveUser = (user) => {
        setUser(user);
    }

    const removeUser = () => {
        setUser(null);
    }

    const fetchUser = async () => {
        try {
           const { data } = await axios.get(`/api/v1/users/showMe`);
           console.log(data);
           saveUser(data.user);
        } catch (error) {
            removeUser();
        }
        setIsLoading(false);
    }

    const logoutUser = async () => {
        try {
            await axios.delete('/api/v1/auth/logout');
            removeUser();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <AppContext.Provider value={{
            isLoading,
            saveUser,
            user,
            logoutUser
        }}>
            {children}
        </AppContext.Provider>
    );
};

// make sure user
export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppProvider };
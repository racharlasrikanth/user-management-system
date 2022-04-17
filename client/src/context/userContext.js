import React, { useReducer, useContext, useEffect } from 'react';
import reducer from "./../reducers/userReducer";

const initialState = {
    user: null,
    userIsLoading: false,
}

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const getCurrentUser = () => {
        dispatch({ type:"GET_CURRENT_USER", payload:null });
    }

    useEffect(() => {
      getCurrentUser();
    }, [])
    

    return <UserContext.Provider value={{ ...state, getCurrentUser }}>
        {children}
    </UserContext.Provider>
}

// make sure please add
export const useUserContext = () => {
    return useContext(UserContext);
}
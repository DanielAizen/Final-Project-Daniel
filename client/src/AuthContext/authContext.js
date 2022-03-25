import  {useState, createContext } from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({ childern }) =>{
    const [user, setUser] = useState({
        user: null,
        auth_token: null,
        is_auth: false
    });


    return (
        <AuthContext.Provider value={{user, setUser}}>
            { childern }
        </AuthContext.Provider>
    );
}
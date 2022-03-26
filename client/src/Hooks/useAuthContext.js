import { AuthContext } from "../AuthContext/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw Error("User wasn't authenticated - please try again");
    }
    return context;
}
import { AuthContext } from "../AuthContext/authContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    console.log("useAuthContext",context);
    if(!context){
        throw Error("User wasn't authenticated - please try again");
    }
    return context;
}
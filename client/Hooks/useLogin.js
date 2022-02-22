import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () =>{
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const login = (token) =>{
        setError(null)
    }
}
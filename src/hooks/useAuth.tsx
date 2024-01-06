

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);



    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('token')
            setToken(token)
        })()
    }, [])

    useEffect(() => {
        if (token) {
            AsyncStorage.setItem('token', token)
        } else {
            AsyncStorage.removeItem('token')
        }
    }, [token])


    return {
        token,
        setToken
    }

}


export default useAuth;
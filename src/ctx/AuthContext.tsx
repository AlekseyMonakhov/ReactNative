import { createContext } from 'react'
import useAuth from '../hooks/useAuth'



interface IAuthContext {
    token: string | null,
    setToken: (token: string | null) => void
}

const AuthContext = createContext<IAuthContext>({
    token: null,
    setToken: (token: string | null) => { }
})

const AuthProvider = ({ children }: any) => {
    const { setToken, token } = useAuth()

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthProvider, AuthContext }
import {children, createContext, useContext, useState} from "react"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const login = (email) =>{
        setUser({email}) // passando como objeto para pegar dados no futuro
    }

    const logout = ()=>{
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
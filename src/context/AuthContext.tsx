import { IContextType, IUser } from "@/types"
import { createContext, useContext, useEffect, useState } from "react"

export const initialUser = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
}

const initialState = {
    user: initialUser,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<IContextType>(initialState)

const AuthProvider = ({children}: { children: React.Node }) => {

    const [user, setUser] = useState<IUser>(initialUser)
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    function checkAuthUser() {
        return true
    }

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
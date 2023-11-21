import { getCurrentUser } from "@/lib/appwrite/api"
import { IContextType, IUser } from "@/types"
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

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

const AuthProvider = ({children}: { children: React.ReactNode }) => {
    
    const navigate = useNavigate()
    const [user, setUser] = useState<IUser>(initialUser)
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false)


    async function checkAuthUser() {
        
        setIsLoading(true)

        try {
            const currentAccount = await getCurrentUser()
            if(currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio
                })

                setIsAuthenticated(true)

                return true
            }  

            return false

        } catch (error) {
            console.log(error)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(
            localStorage.getItem("cookieFallback") === "[]" ||
            localStorage.getItem("cookieFallback") === null ||
            localStorage.getItem("cookieFallback") === undefined
        ) {
            navigate("/signin")
        }

        checkAuthUser()
    }, [])

    const value = {
        user,
        setUser,
        isLoading,
        checkAuthUser,
        isAuthenticated,
        setIsAuthenticated,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

export function useUserContext() {
    return useContext(AuthContext)
}
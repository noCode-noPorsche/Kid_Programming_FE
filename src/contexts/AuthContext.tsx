import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import http from '../utils/http'

interface User {
    id: string
    email: string
    fullName: string
    role: string
}

interface AuthContextType {
    user: User | null
    setUser: (user: User | null) => void
    isAuthenticated: boolean
    fetchUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                setUser(null)
                return
            }

            const res = await http.get('auth/infor')
            if (res.data?.data) {
                setUser(res.data.data)
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin user:', error)
            setUser(null)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const value = {
        user,
        setUser,
        isAuthenticated: !!user,
        fetchUser
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
} 
import { createContext, useState, FC, ReactNode } from 'react'

type User = { name: string, color: string, light: string }

type Props = {
    user: User; setUser: (user: User) => void;
}

const defaultContext = { user: { name: '', color: '', light: '' }, setUser: () => { } }

export const UserContext = createContext<Props>(defaultContext)

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(defaultContext.user)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
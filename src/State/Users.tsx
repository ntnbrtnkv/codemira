import { createContext, useState, FC, ReactNode } from 'react'

type User = { name: string, color: string, light: string }

type Props = {
    user: User;
    setUser: (user: User) => void;
    allUsers: User[];
    setAllUsers: (users: User[]) => void;
}

const savedUser = sessionStorage.getItem('user');

const parsedUser = savedUser ? JSON.parse(savedUser) : null;

const defaultContext: Props = {
    user: parsedUser ?? { name: '', color: '', light: '' },
    setUser: () => { },
    allUsers: [],
    setAllUsers: () => { },
}

export const UsersContext = createContext<Props>(defaultContext)

export const UsersProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(defaultContext.user)
    const [allUsers, setAllUsers] = useState(defaultContext.allUsers)

    const saveUser = (user: User) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    return (
        <UsersContext.Provider value={{ user, setUser: saveUser, allUsers, setAllUsers }}>
            {children}
        </UsersContext.Provider>
    )
}
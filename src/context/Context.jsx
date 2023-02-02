import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {

    const [user, setUser] = useState();

    const userData = {
        user,
        setUser,
    }

    return (
        <UserContext.Provider value={{ userData }}>
            {children}
        </UserContext.Provider>
    )

}
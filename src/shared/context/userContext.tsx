import React, { Children } from "react";
import { useUserData } from "../../hooks/useUserData";

export interface IUserContextData {
    name?: string;
    iconImg?: string;
  }

export const UserContext = React.createContext<IUserContextData>({})

export function UserContentProvider({children}: { children: React.ReactNode}) {
  const [data] = useUserData()
  // console.log(data)
    return (
      <UserContext.Provider value={data}>
        {children}
      </UserContext.Provider>
    )
}
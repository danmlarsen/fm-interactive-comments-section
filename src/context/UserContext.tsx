/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

import { currentUser } from "../assets/data.json";

const UserContext = createContext(currentUser);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  return context;
}

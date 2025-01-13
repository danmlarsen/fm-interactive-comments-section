/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

import { currentUser } from "../assets/data.json";

type UserContextValue = {
  currentUser: typeof currentUser;
};

const UserContext = createContext<UserContextValue>({} as UserContextValue);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser should be used within <UserContextProvider>");
  }

  return context;
}

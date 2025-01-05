/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

import { currentUser } from "../assets/data.json";

type UserContextValue = {
  currentUser: typeof currentUser;
  votes: string[];
  addVote: (id: string) => void;
};

const UserContext = createContext<UserContextValue>({} as UserContextValue);

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [votes, setVotes] = useState<string[]>([]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        votes,
        addVote(id) {
          setVotes((prev) => (prev.includes(id) ? prev : [...prev, id]));
        },
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

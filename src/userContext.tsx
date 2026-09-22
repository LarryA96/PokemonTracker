import { createContext, useContext, useState, type ReactNode } from "react";

type UserContextType = {
  userId: string | null;
  setUserId: (userId: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserIdState] = useState<string | null>(
    localStorage.getItem("userId"),
  );

  function setUserId(userId: string) {
    setUserIdState(userId);
    localStorage.setItem("userId", userId);
  }

  function logout() {
    setUserIdState(null);
    localStorage.removeItem("userId");
  }

  return (
    <UserContext.Provider value={{ userId, setUserId, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}

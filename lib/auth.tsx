import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Id } from "../convex/_generated/dataModel";

type AuthContextType = {
  userId: Id<"users"> | null;
  login: (userId: Id<"users">) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<Id<"users"> | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("userId").then((id) => {
      if (id) setUserId(id as Id<"users">);
    });
  }, []);

  const login = async (id: Id<"users">) => {
    await AsyncStorage.setItem("userId", id);
    setUserId(id);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userId");
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

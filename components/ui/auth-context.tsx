"use client"

import * as React from "react";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setToken(storedToken);
    if (storedToken) {
      // Optionally decode JWT for user info, or fetch /me endpoint
      setUser({}); // Placeholder, replace with real user info fetch if needed
    }
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    if (typeof window !== "undefined") localStorage.setItem("token", newToken);
    // Optionally fetch user info here
    setUser({});
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    if (typeof window !== "undefined") localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
} 
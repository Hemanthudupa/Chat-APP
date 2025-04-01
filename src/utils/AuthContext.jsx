import { createContext, useContext, useState } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const login = (token) => setToken(token);
  const logout = () => setToken(undefined);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

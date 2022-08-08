import { useEffect, useState } from "react";
import { useContext, createContext } from "react";
import usersService from "../services/usersService";

const authContext = createContext(null);
authContext.displayName = "auth-conext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const refreshAndRedirect = () => {
    setUser(usersService.getUser());
  };

  const createUser = async user => {
    const response = await usersService.createUser(user);
    return response;
  };

  const login = async Credential => {
    const response = await usersService.loginUser(Credential);
    refreshAndRedirect();
    return response;
  };

  const logout = () => {
    usersService.loguot();
    refreshAndRedirect();
  };

  useEffect(() => {
    refreshAndRedirect();
  }, []);

  return (
    <authContext.Provider value={{ createUser, logout, login, user }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};

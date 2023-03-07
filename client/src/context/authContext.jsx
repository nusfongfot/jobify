import { useState, useContext, createContext, useEffect } from "react";
import * as AuthAPI from "../api/authApi";
import {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
} from "../services/localStorage";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const fetchMe = async () => {
    const res = await AuthAPI.getMe();
    setUser(res.data.user);
    console.log(res.data.user);
  };

  const login = async (data) => {
    try {
      const res = await AuthAPI.login(data);
      const { findUser, token } = res.data;
      setUser(findUser);
      setAccessToken(token);
      navigate("/dashboard");
      window.location.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (formData) => {
    try {
      await AuthAPI.register(formData);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_BAD_REQUEST") {
        alert("This email is already in use");
      }
    }
  };

  const logout = () => {
    removeAccessToken();
    setUser(null);
    navigate("/");
  };

  const updateUser = async (formData) => {
    const updated = await AuthAPI.updateUser(formData);
    setUser(updated.data.user);
  };

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      fetchMe();
    }
  }, []);

  const shared = {
    user,
    setUser,
    register,
    login,
    logout,
    updateUser,
  };
  return <AuthContext.Provider value={shared}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthContextProvider };

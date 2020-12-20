import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";

interface AuthContextState {
  token: TokenState;
  signIn({ username, password }: UserData): Promise<void>;
  userLogged(): boolean;
}

interface UserData {
  username: string;
  password: string;
}

interface TokenState {
  token: string;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<TokenState>(() => {
    const token = localStorage.getItem("@PermissionYT:token");

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token };
    }

    return {} as TokenState;
  });

  const signIn = useCallback(async ({ username, password }: UserData) => {
    const response = await api.post("/sessions", {
      username,
      password,
    });

    const { token } = response.data;

    setToken(token);

    localStorage.setItem("@PermissionYT:token", token);
    api.defaults.headers.authorization = `Bearer ${token}`;
  }, []);

  const userLogged = useCallback(() => {
    const token = localStorage.getItem("@PermissionYT:token");
    if (token) {
      return true;
    }
    return false;
  }, []);

  return (
    <AuthContext.Provider value={{ token, signIn, userLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextState {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };

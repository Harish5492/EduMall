import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { MatxLoading } from "app/components";
import { LoginApi, Profile } from "app/views/ApiBackend/ApiBackend";
import { useSelector } from "react-redux";

const initialState = {
  user: null,
  isInitialised: false,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user } = action.payload;
      return { ...state, isAuthenticated, isInitialised: true, user };
    }

    case "LOGIN": {
      const { user } = action.payload;
      return { ...state, isAuthenticated: true, user };
    }

    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const token = useSelector((state) => state.authToken);
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    const response = await LoginApi({ email, password });
    const { user } = response.data;
    dispatch({ type: "LOGIN", payload: { user } });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await Profile(token);
        dispatch({
          type: "INIT",
          payload: { isAuthenticated: true, user: data.userData },
        });
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INIT",
          payload: { isAuthenticated: false, user: null },
        });
      }
    })();
  }, [token]);

  // SHOW LOADER
  if (!state.isInitialised) return <MatxLoading />;

  return (
    <AuthContext.Provider value={{ ...state, method: "JWT", login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

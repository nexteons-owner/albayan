import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

// utils
import { setSession, getAuthCredentials } from "./jwt";
import { getUserByToken, login as loginService } from "../../services/user";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};
interface state {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user?: object;
}
interface action {
  payload?: any;
  type?: any;
}
const handlers: any = {
  INITIALIZE: (state: state, action: action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: state, action: action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: state, action: action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  login: (mobile: string, password: string) => Promise.resolve(),
  logout: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }: any): any {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = getAuthCredentials();
        // return SSRCookie.parse(context.req.headers.cookie ?? "");

        if (accessToken && accessToken) {
          setSession(accessToken, []);
          const response: any = getUserByToken();
          const resp = response.data.data;
          const { userDetails } = resp;
          const stateUser = {};
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: { ...stateUser },
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              isUnitPriceUpdated: false,
              user: null,
              company: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            isUnitPriceUpdated: false,
            user: null,
            company: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (mobile: string, password: string) => {
    const response = await loginService(mobile, password);

    if (!response.status) {
      return response;
    }
    console.log(response);
    const { accessToken } = response?.data?.data?.userInfo;

    if (accessToken !== undefined) {
      setSession(accessToken, []);
      const stateUser = {};
      dispatch({
        type: "LOGIN",
        payload: {
          user: { ...stateUser },
        },
      });
    } else {
      setSession("", []);
      dispatch({ type: "LOGOUT" });
    }
    return response;
  };

  const logout = async () => {
    setSession("", []);
    dispatch({ type: "LOGOUT" });
  };

  const resetPassword = () => {};

  const updateProfile = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

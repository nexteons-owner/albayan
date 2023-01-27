import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-query";

// utils
import { setSession, getAuthCredentials } from "./jwt";
import { getUserByToken, login as loginService } from "../../repository/user";

const initialState: state = {
  isAuthenticated: false,
  isInitialized: false,
  user: {},
};
interface user {
  name?: string;
  id?: string;
  permission?: string[];
}
interface state {
  isAuthenticated?: boolean;
  isInitialized?: boolean;
  user?: user;
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
  const {
    mutateAsync,
    isLoading: isAddingUser,
    error: addError,
  } = useMutation(loginService);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = getAuthCredentials();
        // return SSRCookie.parse(context.req.headers.cookie ?? "");

        if (accessToken && accessToken) {
          setSession(accessToken);
          const response: any = await getUserByToken();
          const { _userName: name, _userId: id } = response.data.data.userInfo;
          const stateUser: user = { name, id, permission: [] };
          console.log(stateUser);
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: stateUser,
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
    console.log("asdasd");
    const response = await mutateAsync({
      email: mobile,
      password,
    });
    console.log("This was an async mutation!");
    console.log("newUser: ", response);

    if (!response.status) {
      return response;
    }
    try {
      const {
        accessToken,
        _userName: name,
        _userId: id,
      } = response.data.data.userInfo;

      if (accessToken !== undefined) {
        setSession(accessToken);
        const stateUser: user = { name, id, permission: [] };
        dispatch({
          type: "LOGIN",
          payload: {
            user: { ...stateUser },
          },
        });
      } else {
        setSession("");
        dispatch({ type: "LOGOUT" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    setSession("");
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

import jwtDecode from "jwt-decode";
import Cookie from "js-cookie";
import { AUTH_CRED } from "./constants";

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded: any = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

const setSession = (token: string, permissions: Array<String>) => {
  if (token) {
    Cookie.set(AUTH_CRED, JSON.stringify({ token, permissions }));
  } else {
    Cookie.remove(AUTH_CRED);
  }
};

const getAuthCredentials = () => {
  const auth = Cookie.get();
  if (auth !== null || auth !== undefined) {
    if (Object.prototype.hasOwnProperty.call(auth, `${AUTH_CRED}`)) {
      const tokenObject: any = Cookie.get(AUTH_CRED);
      return JSON.parse(tokenObject).token;
    }
    return null;
  }
  return null;
};

export { isValidToken, setSession, getAuthCredentials };

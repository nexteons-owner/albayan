import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import PropTypes from "prop-types";
// hooks
import useAuth from "../../auth/useAuth";
import useNetwork from "../../network/useNetwork";
// pages
import Login from "../../../modules/authentication/Login";
// import Nointernet from "../components/backdrops/Nointernet";

// ----------------------------------------------------------------------

interface AuthGuard {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuard> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const { online } = useNetwork();
  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState("");

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation != "" && pathname !== requestedLocation) {
    setRequestedLocation("");
    return <Navigate to={requestedLocation} />;
  }

  return (
    <div>
      {children}
      {/* <Nointernet /> */}
    </div>
  );
};

export default AuthGuard;
AuthGuard.propTypes = {
  children: PropTypes.node,
};

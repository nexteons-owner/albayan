import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
// hooks
import useAuth from "../../auth/useAuth";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";

// ----------------------------------------------------------------------
interface GuestGuard {
  children: React.ReactNode;
}

const GuestGuard: React.FC<GuestGuard> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.dashboard.main} />;
  }

  return <>{children}</>;
};

export default GuestGuard;

GuestGuard.propTypes = {
  children: PropTypes.node,
};

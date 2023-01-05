import { lazy } from "react";
import { Navigate, useRoutes } from "react-router";
// guards
import AuthGuard from "../global/layouts/guards/authGuard";
import GuestGuard from "../global/layouts/guards/guestGuard";

// constants
import {
  PATH_DASHBOARD,
  PATH_AUTH,
  ROOTS_AUTH,
  PMROOT,
  PMDASHBOARD,
  PFNOTFOUND,
  PFNOLINK,
  PFMAIN,
} from "./paths";
// components
import Loadable from "../components/loadable";

const BlankLayout = Loadable(
  lazy(() => import("../global/layouts/fullScreen"))
);
const DashBoardLayout = Loadable(
  lazy(() => import("../global/layouts/dashboardLayout"))
);

const Login = Loadable(lazy(() => import("../modules/authentication/Login")));
const DashBoard = Loadable(lazy(() => import("../modules/dashboard")));

export default function Router() {
  return useRoutes([
    {
      path: PMROOT,
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      ),
    },
    {
      path: PMDASHBOARD,
      element: (
        <AuthGuard>
           <DashBoardLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: "",
          element: <Navigate to={PATH_DASHBOARD.dashboard.main} replace />,
        },
        {
          children: [
            {
              path: PFMAIN,
              element: <DashBoard />,
            },
          ],
        },
      ],
    },
    {
      path: ROOTS_AUTH,
      element: <BlankLayout />,
      children: [
        { path: PFNOTFOUND, element: <h1>Not Found</h1> },
        { path: PFNOLINK, element: <h1>No link</h1> },
      ],
    },
    { path: PFNOLINK, element: <h1>Not Found</h1> },
  ]);
}

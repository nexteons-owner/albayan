import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
// guards
import AuthGuard from "../global/layouts/guards/authGuard";
import GuestGuard from "../global/layouts/guards/guestGuard";
import { getClaimsLoader } from "../modules/dashboard";

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

export const router = createBrowserRouter([
  {
    path: PMROOT,
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
    loader: () => {
      console.log("GuestGuard Layout");
      return true;
    },
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
        loader: () => getClaimsLoader(),
        path: PFMAIN,
        element: <DashBoard />,
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

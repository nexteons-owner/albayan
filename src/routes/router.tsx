import { lazy } from "react";
import { createBrowserRouter, Navigate, useRouteError } from "react-router-dom";
// guards
import AuthGuard from "../global/layouts/guards/authGuard";
import GuestGuard from "../global/layouts/guards/guestGuard";
import { resp } from "./testData";

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
  PFPAYERS,
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
const PayerDashBoard = Loadable(
  lazy(() => import("../modules/dashboard/payers"))
);
export const router = createBrowserRouter([
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
        path: PFMAIN,
        errorElement: <ErrorBoundary />,
        element: <DashBoard />,
      },
      {
        path: PFPAYERS,
        errorElement: <ErrorBoundary />,
        element: <PayerDashBoard />,
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

function ErrorBoundary() {
  let error: any = useRouteError();
  console.error(error);
  return <div>Failed{error.statusText}</div>;
}

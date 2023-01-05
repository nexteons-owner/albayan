import React from "react";
import { Outlet } from "react-router";

const FullScreenLayout: React.FC = () => (
  <>
    <Outlet />
  </>
);

export default FullScreenLayout;

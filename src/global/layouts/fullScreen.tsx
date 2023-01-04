import React from "react";
import { Outlet } from "react-router";

const BlankLayout: React.FC = () => (
  <>
    <Outlet />
  </>
);

export default BlankLayout;

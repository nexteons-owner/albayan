import React from "react";
import { Outlet } from "react-router-dom";

const FullScreenLayout: React.FC = () => (
  <>
    <Outlet />
  </>
);

export default FullScreenLayout;

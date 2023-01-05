import React, { Suspense } from "react";

// project imports
import { Sspiner } from "../customUiControls";

// ===========================|| LOADABLE - LAZY LOADING ||=========================== //

const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<Sspiner />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;

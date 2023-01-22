import { Suspense } from "react";

import useAuth from "./global/auth/useAuth";
import { RouterProvider } from "react-router-dom";
import { Sspiner } from "./components/customUiControls";
import { router } from "./routes/router";

function App() {
  const { isInitialized } = useAuth();

  return isInitialized ? (
    <Suspense fallback={<Sspiner />}>
      <RouterProvider router={router} fallbackElement={<Sspiner />} />
    </Suspense>
  ) : (
    <Sspiner />
  );
}

export default App;

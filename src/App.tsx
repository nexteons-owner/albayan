import useAuth from "./global/auth/useAuth";
import { RouterProvider } from "react-router-dom";
import { Sspiner } from "./components/customUiControls";
import { router } from "./routes/router";

function App() {
  const { isInitialized } = useAuth();

  return isInitialized ? (
    <RouterProvider router={router} fallbackElement={<Sspiner />} />
  ) : (
    <Sspiner />
  );
}

export default App;

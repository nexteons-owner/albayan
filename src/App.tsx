import Router from "./routes/router";
import useAuth from "./global/auth/useAuth";
import { Sspiner } from "./components/customUiControls";

function App() {
  const { isInitialized } = useAuth();

  return isInitialized ? <Router /> : <Sspiner />;
}

export default App;

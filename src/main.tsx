import React, { Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { buildTheme } from "./global/theme";
import { AuthProvider } from "./global/auth/jwtContext";
import { Sspiner } from "./components/customUiControls";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Sspiner />}>
      <BrowserRouter>
        <ThemeProvider theme={buildTheme()}>
          <CssBaseline />
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);

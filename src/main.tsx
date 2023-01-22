import React, { Suspense } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ReactDOM from "react-dom/client";

import App from "./App";
import { buildTheme } from "./global/theme";
import { AuthProvider } from "./global/auth/jwtContext";
import { Sspiner } from "./components/customUiControls";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Sspiner />}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={buildTheme()}>
          <CssBaseline />
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);

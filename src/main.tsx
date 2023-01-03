import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ReactDOM from "react-dom/client";
import App from "./App";
import { buildTheme } from "./assets/global/ThemeVariable";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={buildTheme()}>
      <CssBaseline />

      <App />
    </ThemeProvider>
  </React.StrictMode>
);

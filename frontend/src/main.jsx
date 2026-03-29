import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./index.css";
import App from "./App.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0b1120",
      paper: "#111827",
    },
    primary: {
      main: "#22d3ee",
    },
    secondary: {
      main: "#38bdf8",
    },
  },
  shape: {
    borderRadius: 12,
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)

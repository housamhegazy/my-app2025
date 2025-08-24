import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './i18n'
import "./index.css";
import App from './App.jsx'
import { HelmetProvider } from "react-helmet-async";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ThemeProvider } from "./context/themeContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <App/>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
